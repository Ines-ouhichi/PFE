import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NbComponentStatus, NbDialogRef } from "@nebular/theme";
import { ResgistrationService } from "../../../regestration.service";
import { ChartService } from "../../ChartService.service";
import { Chart } from 'chart.js';


@Component({
    selector:'popUpWindow',
    templateUrl:'pop.component.html',
    styleUrls:['pop.component.scss']
})


export class DialogNamePromptComponent {
    selectedChartType: string;
   

    constructor(protected ref: NbDialogRef<DialogNamePromptComponent>,private router: Router, private registrationService: ResgistrationService,private chartService: ChartService
      ) {}
  

      statuses: NbComponentStatus[] = [ 'primary', 'success', 'info', 'warning', 'danger' ];

    cancel() {
      this.ref.close();
    }
  
    submit(title) {
      this.chartService.setChartTilte(title);
      this.ref.close(title);
      this.router.navigate(['/pages/visuals/visuals']);
    }

    // submit(title) {
    //   const chartData = this.chartService.getChartData();
    //   const chartType = this.chartService.getChartType();
    
    //   // Save chart data, type, and title in ChartService
    //   this.chartService.setChartData(chartData);
    //   this.chartService.setChartType(chartType);
    //   this.chartService.setChartTilte(title);
    
    //   // Create a new chart instance
    //   const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
    //   const ctx = chartCanvas.getContext('2d');
    //   const chartInstance = new Chart(ctx, {
    //     type: chartType,
    //     data: chartData,
    //     options: {
    //       responsive: true,
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       }
    //     }
    //   });
    
    //   // Add the chart instance to the charts array
    //   this.charts.push({ chartType, chartData, chartInstance });
    
    //   // Close the pop-up window
    //   this.ref.close(title);
    // }
    
  }