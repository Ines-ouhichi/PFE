import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class SharedService {
    private charts: { chartType: string, chartData: any, chartInstance: any, chartTitle: string }[] = [];
  
    addChart(chart: { chartType: string, chartData: any, chartInstance: any, chartTitle: string }) {
      this.charts.push(chart);
    }
  
    getCharts() {
      return this.charts;
    }
  }
  