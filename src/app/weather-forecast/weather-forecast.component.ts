import {Component, Input } from '@angular/core';
import { WeatherDailyData } from "../models/weather_daily.model";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.sass']
})
export class WeatherForecastComponent {

  @Input() WeatherForecast?: WeatherDailyData;

  constructor() { }

}
