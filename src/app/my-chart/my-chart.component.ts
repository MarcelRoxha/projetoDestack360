import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { Chart, } from 'chart.js'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {
//Grafico
canvas: any;
ctx: any;
 myChart: any;
 

constructor() {
 
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  

  }

 
}
