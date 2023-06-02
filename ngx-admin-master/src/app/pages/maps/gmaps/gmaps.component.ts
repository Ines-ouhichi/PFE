import { Component, ViewChild, ElementRef, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import {Chart} from 'chart.js';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ChartService } from '../ChartService.service';
import { LeafletComponent } from '../leaflet/leaflet.component';
import { ResgistrationService } from '../../regestration.service';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from './popUp/pop.component';




@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  templateUrl: './gmaps.component.html',
})
export class GmapsComponent implements OnInit, OnDestroy {
 @ViewChild('chartCanvas') chartCanvas!: ElementRef;


  selectedChartType: string //= 'line'; // Initialize as empty
  chartTypeChanges = new Subject<string>();
  chartTypeChangesSubscription: Subscription;

  chartData: any[] = [];
  chart: any;
 public chartInstance: any;
  titre: any;
  titleInvalid: boolean;

  
 

  open3() {
    this.dialogService.open(DialogNamePromptComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    })
      //.onClose.subscribe(this.titre );
      .onClose.subscribe((result) => {
        if (result) {
          // Handle the result if needed
          console.log('Dialog result:', result);
        }
      });
  }

  constructor(private http: HttpClient,
     private router: Router
     ,private chartService: ChartService
     ,private service:ResgistrationService
     ,private dialogService: NbDialogService,
     ) { }
  
  
  onSaveChart(chartType: string) {
    this.dialogService
    .open(DialogNamePromptComponent)
    .onClose.subscribe((title: string) => {
      if (title) {
        console.log('title',title)
        const chartData = this.getChartData(this.selectedChartType);
        this.chartService.setChartData(chartData);
        this.chartService.setChartType(chartType)
        this.chartService.setChartInfo(this.chartService.getChartType(), title);
        console.log('Chart Type:', this.chartService.getChartType());
      
        
        this.service.saveCharts(this.chartService).subscribe(
          (response) => {
            console.log('Visualization saved successfully!');
          },
          (error) => {
            console.error('Error saving visualization:', error);
          }
        );

       // this.router.navigate(['/pages/maps/leaflet']);
      }
    });
 
  }
 
  saveChartTitle() {
    if (this.titre && this.titre.trim()) {
      console.log('chart title');
      this.chartService.setChartTilte(this.titre.trim());
    } else {
      this.titleInvalid = true;
    }
  }

  ngOnInit(){
   
    console.log('ngOnInit called');
   // Subscribe to chartTypeChanges observable to get selected chart type
    this.chartTypeChangesSubscription = this.chartTypeChanges.subscribe((chartType: string) => {
      this.selectedChartType = chartType;
      console.log('chartTypeChangesSubscription updated with:', this.selectedChartType);
      this.updateChart(chartType);
    
    });

    this.fetchDataFromElasticsearch(); // Fetch data from Elasticsearch on component initialization

  }


  

  ngOnDestroy() {
    console.log('ngOnDestroy called');

    // Unsubscribe to chartTypeChanges observable to prevent memory leaks
    this.chartTypeChangesSubscription.unsubscribe();
  }

    
  

  
  updateChart(chartType: string) {
    console.log('updateChart method called with selected chart type:', chartType);
    //const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
    //const ctx = chartCanvas.getContext('2d');
   
    const chartData = this.getChartData(chartType);
    const chart = new Chart(this.chartCanvas.nativeElement, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  
  this.chartService.setChartData(chart);
  }


  

  getChartData(chartType: string) {
    
    console.log('getChartData method called with chart type:', chartType);

    if (chartType === 'line') {
      return {
        labels: this.chartData.map((transaction: any) => transaction.date),
        datasets: [
          {
            label: 'Amount',
            data: this.chartData.map((transaction: any) => transaction.amount),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };
    } else if (chartType === 'bar') {
      return {
        labels: this.chartData.map((transaction: any) => transaction.date),
        datasets: [
          {
            label: 'Amount',
            data: this.chartData.map((transaction: any) => transaction.amount),
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
        ],
      };
    } else if (chartType === 'pie') {
      const transactionTypes = Array.from(new Set(this.chartData.map((transaction: any) => transaction.type)));
      const data = transactionTypes.map((type: string) => {
        const transactionsOfType = this.chartData.filter((transaction: any) => transaction.type === type);
        const totalAmount = transactionsOfType.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
        return totalAmount;
      });

      return {
        labels: transactionTypes,
        datasets: [
          {
            label: 'Amount',
            data,
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4,
          },
        ],
      };
    } else if (chartType === 'scatter') {
      return {
        datasets: [
          {
            label: 'Scatter Data',
            data: this.chartData.map((transaction: any) => ({
              x: transaction.date,
              y: transaction.amount,
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            pointRadius: 5, // Adjust the size of the scatter points
          },
        ],
      };
    }
    else if (chartType === 'horizontalBar') {
      // Horizontal Bar chart configuration
      const transactionTypes = Array.from(new Set(this.chartData.map((transaction: any) => transaction.type)));
      const data = transactionTypes.map((type: string) => {
        const transactionsOfType = this.chartData.filter((transaction: any) => transaction.type === type);
        const totalAmount = transactionsOfType.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
        return totalAmount;
      });
      
      return {
        labels: transactionTypes,// this.chartData.map((transaction: any) => transaction.type),
        datasets: [
          {
            label: 'Amount',
             data ,//: this.chartData.map((transaction: any) => transaction.amount),
            backgroundColor: ['rgb(203, 130, 245)', 'rgb(60, 186, 159)', 'rgb(232, 195, 185)'], //'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            hoverOffset: 4,

          },
        ],
      };
    }else if (chartType === 'radar') {
      const transactionTypes = Array.from(new Set(this.chartData.map((transaction: any) => transaction.type)));
      const data = transactionTypes.map((type: string) => {
        const transactionsOfType = this.chartData.filter((transaction: any) => transaction.type === type);
        const totalAmount = transactionsOfType.reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
        return totalAmount;
      });
    
      return {
        labels: transactionTypes,
        datasets: [
          {
            label: 'Amount',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,        
            hoverOffset: 4,

          },
        ],
        
        
      };
    }
    
    


    }
  
 
  



  fetchDataFromElasticsearch() {
    //const size = 10000;
    const limit = 50;
    this.service.getAllTransactions().subscribe(
      (response) => {
        console.log('Data fetched successfully:', response);
        //this.chartData = response.content;
        this.chartData = response.content.slice(0, limit);
        // Update the chart with the fetched data
        this.updateChart(this.selectedChartType);
      },
      (error) => {
        console.error('Error fetching data from Elasticsearch:', error);
      }
    );
  }

  


  /*getChartData(chartType: string) {
    
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
 */


   /*const chartData = this.getChartData(this.selectedChartType);
  const chart = new Chart(this.chartCanvas.nativeElement, {
    type: this.selectedChartType,
    data: chartData,
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });*/

  /* onSaveChart() {
    // Get chart data and chart type
    const chartData = this.chart.data;
    const chartType = this.selectedChartType;
  
    // Navigate to target component and pass chart data and chart type as route parameters
    this.router.navigate(['/pages/maps/leaflet'], { state: { chartData, chartType } });
  }*/


   //console.log('idididid:',this.chartService.getChartId());


       /* this.sharedservice.addChart({
          chartType: this.chartService.getChartType(),
          chartData: this.chartData,
          chartInstance: this.chart,
          chartTitle: this.titre
        });*/



         //   const chartData = this.getChartData(this.selectedChartType);
  //   this.chartService.setChartData(chartData);
  //   this.chartService.setChartType(chartType);
  //   console.log("titre de chart",this.titre)
  //   this.chartService.setChartTilte(this.titre);
  //  this.service.saveCharts(this.chartService).subscribe(response => {
  //   console.log('Visualisation saved successfully!');
  // },
  // error => {
  //   console.error('Error saving visualisation: ', error);
  // })
  //  // this.router.navigate(['/pages/maps/leaflet']/*, { state: { chartData, chartType} }*/);




}