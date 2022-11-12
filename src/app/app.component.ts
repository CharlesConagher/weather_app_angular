import { Component } from '@angular/core';
import { WeatherService } from "./services/weather.service";
import { WeatherCurrentData } from "./models/weather_current.model";
import { WeatherDailyData } from "./models/weather_daily.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private weatherService: WeatherService) {
  }

  weatherCurrentData?: WeatherCurrentData
  weatherDailyData?: WeatherDailyData

  getGeoloc(){
    try{
      navigator.geolocation.getCurrentPosition( async position =>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.downloadWeatherCurrent(lat, lon)
        this.downloadWeatherDaily(lat, lon)
      })
    } catch (err) {
      console.log('geolocation is not available')
    }
  }

  getCityWeather(cityName: string){
    this.weatherService.decodeCityName(cityName)
      .subscribe( {
        next: (response) => {
          this.downloadWeatherCurrent(response[0].lat, response[0].lon)
          this.downloadWeatherDaily(response[0].lat, response[0].lon)
        },
        error: (err) => console.log(err)
      })
  }

  downloadWeatherCurrent(lat: number, lon: number) {
    this.weatherService.getWeatherCurrent(lat, lon)
      .subscribe({
        next: response => {
          response.main.temp -= 273
          response.main.feels_like -=273
          response.main.pressure /= 1.33
          this.weatherCurrentData = response
        },
        error: (err) => console.log(err)
      })
  }

  downloadWeatherDaily(lat: number, lon: number){
    this.weatherService.getWeatherDaily(lat, lon)
      .subscribe({
        next: (response) => {
          for (let day of response.daily){
            day.temp.day -=273
          }
          this.weatherDailyData = response
        },
        error: (err) => console.log(err)
      })
  }
}
