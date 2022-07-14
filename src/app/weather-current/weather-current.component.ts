import {Component, Input } from '@angular/core';
import { WeatherCurrentData } from "../models/weather_current.model";

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.sass']
})
export class WeatherCurrentComponent{

  @Input() weatherCurrent?: WeatherCurrentData;

  constructor() { }


}
