import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ResgistrationService } from "../../regestration.service";
import { DashboardSelectionService } from "../dashboard-selection.service";
import { Chart } from 'chart.js';


@Component({
    selector: 'ngx-DashChart',
    styleUrls: ['./dashchart.component.scss'],
    templateUrl: './dashchart.component.html',
  })
  export class DashChartComponent implements OnInit {
    dashboardId: number;
    visuals: any[];
    chartData: any[] = [];
    chartCanvas: ElementRef;
    chartInstances: { [key: string]: any } = {};


  
    constructor(
      private route: ActivatedRoute,
      private service: ResgistrationService, private dashboardSelectionService: DashboardSelectionService
    ) { }
  
    ngOnInit(): void {
        const limit = 50;
    this.service.getAllTransactions().subscribe(
      (response) => {
        console.log('Data fetched successfully:', response);
        //this.chartData = response.content;
        this.chartData = response.content.slice(0, limit);
            const dashboardId = this.dashboardSelectionService.getSelectedDashboardId(); // Retrieve the selected dashboard ID from the service
            console.log("dahboardId",dashboardId)
            this.service.GetDashById(dashboardId).subscribe(
              (response) => {
            this.visuals = response.visuals;
                console.log('Charts for the selected dashboard:', this.visuals);
                this.visuals.forEach((visual) => {
                  const chartType = visual.chartType;
                  const title = visual.titre;
                  // const data = /* Retrieve or generate chart data */;
        
                  console.log('Chart Type:', chartType);
                  console.log('Title:', title);
                  visual.chartData = this.getChartData1(visual.chartType);
                  this.service.getChartByTitle(visual.titre).subscribe(

                    (title: string) => {
                      console.log("cvvv")
                      //chart.titre  = title;
                     // this.setChartTilte(title);
          
                    console.log('cbbb')
                    const chartCanvas = document.getElementById(visual.titre) as HTMLCanvasElement;
                    if (!chartCanvas) {
                      console.error('Chart canvas element not found.');
                      return;
                    }
                    const ctx = chartCanvas.getContext('2d');
                    console.log("title is ",visual.titre);
                    console.log('typetype',visual.chartType);
                    console.log('datadata',visual.chartData)
                    const chartInstance :any= new Chart(ctx, {
                        type: visual.chartType,
                        data: visual.chartData,
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
                  }
                  );
                  this.chartInstances[visual.titre] = chartInstance;
                  console.log('instance',chartInstance)
                  
          
                 // this.closeCard(chart.id);
                
            },
              (error) => {
                console.error('Error fetching chart title:', error);
              }
            );

                  //console.log('Data:', data);
        
                  // Implement logic to display or render the chart with the retrieved information
                });
                // Add your logic here to display the charts as desired
              },
              (error) => {
                console.error('Error retrieving dashboard:', error);
              }
            );
        },
        (error) => {
          console.error('Error fetching data from Elasticsearch:', error);
        });
    }
  
  

    getChartData1(chartType: string) {
    
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
    

  }