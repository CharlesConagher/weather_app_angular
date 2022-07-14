import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { WeatherCurrentData } from "../models/weather_current.model";
import { WeatherDailyData } from "../models/weather_daily.model";
import { CityData } from "../models/city_name.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherCurrent(lat: number, lon: number): Observable<WeatherCurrentData> {
    return this.http.get<WeatherCurrentData>(environment.OpenWeatherCurrentURL, {
      params: new HttpParams()
        .set('lat', lat)
        .set('lon', lon)
        .set('appid', environment.OpenWeatherAPIKey)
    })
  }

  getWeatherDaily(lat: number, lon: number): Observable<WeatherDailyData> {
    return this.http.get<WeatherDailyData>(environment.OpenWeatherDailyURL, {
      params: new HttpParams()
        .set('lat', lat)
        .set('lon', lon)
        .set('exclude', 'current,minutely,hourly,alerts')
        .set('appid', environment.OpenWeatherAPIKey)
    })
  }

  decodeCityName(cityName: string): Observable<CityData> {
    return this.http.get<CityData>(environment.OpenWeatherGeocoderURL, {
      params: new HttpParams()
        .set('q', cityName)
        .set('appid', environment.OpenWeatherAPIKey)
    })
  }
}
