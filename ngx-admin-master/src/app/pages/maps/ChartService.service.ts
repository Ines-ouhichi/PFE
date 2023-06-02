import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

   chartData: any;
   chartType: string;
   titre:string;
   id:number;
   chartInfo: { chartType: string; title: string };
   DashId:number

  constructor() { }

  setChartData(data: any) {
    this.chartData = data;
  }

  setChartType(type: string) {
    this.chartType = type;
  }

  setChartTilte(titre:string){
    this.titre=titre;
  }

  setChartInfo(chartType: string, title: string) {
    this.chartInfo = { chartType, title };
  }
 
  setChartId(id:number){
    this.id=id;
  }

  setDashId(id:number){
    this.DashId=id;
  }

  getChartData() {
    return this.chartData;
  }

  getChartType() {
    return this.chartType;
  }
  getChartTitle(){
    return this.titre;
  }

  getChartInfo() {
    return this.chartInfo;
  }

  getChartId(){
    return this.id;
  }

  getDashId(){
    return this.DashId;
  }


  getChartData1(chartType: string) {
    
    console.log('getChartData method called with chart type:', chartType);

    if (chartType === 'line') {
      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [10, 20, 15, 25, 18, 30, 12],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
    } else if (chartType === 'bar') {
      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [10, 20, 15, 25, 18, 30, 12],
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      };
    } else if (chartType === 'pie') {
      return {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Votes',
            data: [12, 19, 3],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }
        ]
      };
    }
}
}