import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm : FormGroup;
  errorMsg: string;
  weatherResult : any;

  constructor(private formBuilder : FormBuilder,
    
    private weatherService : WeatherService) {
    
   }

  ngOnInit( ) {
    this.weatherForm=this.formBuilder.group({
      city:["", [Validators.required]],
    })
  }


  searchWeather(){
  
    
    
    this.weatherService.searchWeather(this.weatherForm.value).subscribe(
      (dataFromAPI)=>{
        
        this.weatherResult = dataFromAPI.apiResult;
      }
    );
    
  
  }
}
