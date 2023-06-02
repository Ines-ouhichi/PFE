import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import * as L from 'leaflet';
import { GmapsComponent } from '../gmaps/gmaps.component';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartService } from '../ChartService.service';
import { ResgistrationService } from '../../regestration.service';
import { SharedService } from '../SharedService.servie';
import { HttpErrorResponse } from '@angular/common/http';
//import { divOverlay } from 'leaflet';
import { NbComponentStatus, NbDialogService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { DashboardService } from '../DashboardService.service';




@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  templateUrl:'leaflet.component.html',
})
export class LeafletComponent implements OnInit {
   chartCanvas: ElementRef;


  charts: ChartService[];
  chartInstances: { [key: string]: any } = {};
  Datachart: any;
  Typechart: string;
  chartTitle: string; 
  id:number;
  dashboard:DashboardService;
  selectedDashboardId: number;
  chartData: any[] = [];


  showInputs: boolean = false;
  dashboardTitle: string;
  dashboardDescription: string;
  selectedCharts: ChartService[] = [];



  //toast configuration
config: NbToastrConfig;
index = 1;
destroyByClick = true;
//duration = 50000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;
status: NbComponentStatus = 'success';
title = '';
content='Chart Deleted successfully' ; 
types: NbComponentStatus[] = [
 // 'primary',
  'success',
 // 'info',
 // 'warning',
 // 'danger',
];

  constructor(
    private chartService: ChartService,
    private service:ResgistrationService, 
    private router: Router,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private dashboardService:DashboardService,
    ) { }
  
   
 

  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration:1200,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : 'Chart Deleted successfully ';

    this.toastrService.show(title,
      body,
      
      config);
  }


  
  getChartTitle(){
    return this.chartService.getChartTitle();
  }

  
  getChartData() {
    return this.Datachart;
  }

  getChartType() {
    return this.Typechart;
  }


  getChartId(){
    return this.id;
  }


  CreateChart(){
    this.router.navigate(['/pages/visuals/Create']);

  }
  
  
  ngOnInit() {
    const limit = 50;
    this.service.getAllTransactions().subscribe(
      (response) => {
        console.log('Data fetched successfully:', response);
        //this.chartData = response.content;
        this.chartData = response.content.slice(0, limit);
    this.service.getAllCharts().subscribe(
      (charts: ChartService[]) => {
        console.log('************')
        this.charts = charts;
        this.charts.forEach((chart) => {
          //console.log('charttypecharttype',chart.chartType)
          console.log('idididid:',chart.id)
          chart.chartData = this.getChartData1(chart.chartType);
          console.log('data is',this.chartData)
          const chartType = this.getChartType();
        //  chart.titre = chart.getChartTitle();

        console.log('titretitre:',chart.titre)
        //this.service.getChartByTitle(chart.titre).subscribe(
          this.service.getChartByTitle(chart.titre).subscribe(

          (title: string) => {
            console.log("cvvv")
            //chart.titre  = title;
            this.setChartTilte(title);

          console.log('cbbb')
          const chartCanvas = document.getElementById(chart.titre) as HTMLCanvasElement;
          if (!chartCanvas) {
            console.error('Chart canvas element not found.');
            return;
          }
          const ctx = chartCanvas.getContext('2d');
          console.log("title is ",chart.titre);
          console.log('typetype',chart.chartType);
          console.log('datadata',chart.chartData)
          const chartInstance :any= new Chart(ctx, {
              type: chart.chartType,
              data: chart.chartData,
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
        this.chartInstances[chart.titre] = chartInstance;
        console.log('instance',chartInstance)
        

       // this.closeCard(chart.id);
      
  },
    (error) => {
      console.error('Error fetching chart title:', error);
    }
  );
   })
  
      },
      (error) => {
        console.error('Error fetching charts:', error);
      }
      )

      
    },
    (error) => {
      console.error('Error fetching data from Elasticsearch:', error);
    });
}





closeCard(id:number){
  
  this.service.deleteChart(id).subscribe(
    (reponse:void) => {
      // Chart deleted successfully
      
      this.makeToast();

       // Reload the page
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //  this.router.onSameUrlNavigation = 'reload';
    this.reload();
      this.router.navigate([this.router.url]);
    },
    ( error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )

}

onsubmit():void{
  this.showInputs = !this.showInputs;


}

onChartSelection(checked: boolean, chart: ChartService) {
  if (checked) {
    this.selectedCharts.push(chart);
  } else {
    const index = this.selectedCharts.findIndex(selectedChart => selectedChart.id === chart.id);
    if (index !== -1) {
      this.selectedCharts.splice(index, 1);
    }
  }
}

saveToDashboard(): void {

  // Check if dashboard title and description are provided
  if (!this.dashboardTitle || !this.dashboardDescription) {
    // Display an error message or perform appropriate error handling
    return;
  }
  
  
    // Retrieve all charts from the API
    this.service.getAllCharts().subscribe(
      (chartsResponse) => {
        console.log("selected Charts",this.selectedCharts);
        // Extract the relevant chart data
        const chartsToSave = chartsResponse
        .filter((chart) => this.selectedCharts.some((selectedChart) => selectedChart.id === chart.id))
        .map((chart) => ({
          id: chart.id,
          title: chart.titre,
          type: chart.chartType,
          data: chart.chartData,
        }));
  
        // Create a new instance of the DashboardService
        const dashboardService = new DashboardService();
  
        // Set the dashboard name and description
        dashboardService.setDashboardName(this.dashboardTitle);
        dashboardService.setDashboardDescr(this.dashboardDescription);
  
        // Call the createDashboard method of the DashboardService to create the dashboard
        this.service.createDashboard(dashboardService.getDashboardName(), dashboardService.getDashboardDescr()).subscribe(
          (dashboardId) => {
            console.log('dashboardId:', dashboardId);
  
            // Save each chart to the dashboard
            chartsToSave.forEach((chart) => {
              const visualization = new ChartService();
              visualization.id=chart.id;
              visualization.titre = chart.title;
              visualization.chartType = chart.type;
              visualization.chartData = chart.data;
  
  
              // Set the dashboard ID for the visualization
              visualization.DashId = dashboardId;
              console.log('visualisationId:', visualization.DashId);
  
              // Call the saveVisualDash method to save the visualization to the dashboard
              this.service.saveVisualDash(visualization,visualization.DashId).subscribe(
                (visualizationResponse) => {
                  console.log('Visualization saved successfully:', visualizationResponse);
                  // Handle any success logic
                },
                (error) => {
                  console.error('Error saving visualization:', error);
                  // Handle any error logic or display an error message
                }
              );
            });
  
            console.log('Dashboard saved successfully:', dashboardId);
            // Handle any success logic or navigate to a different page
          },
          (error) => {
            console.error('Error creating dashboard:', error);
            // Handle any error logic or display an error message
          }
        );
      },
      (error) => {
        console.error('Error retrieving charts:', error);
        // Handle any error logic or display an error message
      }
    );
  }
  


// saveDashboard(): void {

// // Check if dashboard title and description are provided
// if (!this.dashboardTitle || !this.dashboardDescription) {
//   // Display an error message or perform appropriate error handling
//   return;
// }


//   // Retrieve all charts from the API
//   this.service.getAllCharts().subscribe(
//     (chartsResponse) => {
//       // Extract the relevant chart data
//       const chartsToSave = chartsResponse.map((chart) => ({
//         id: chart.id,
//         title: chart.titre,
//         type: chart.chartType,
//         data: chart.chartData,
//       }));

//       // Create a new instance of the DashboardService
//       const dashboardService = new DashboardService();

//       // Set the dashboard name and description
//       dashboardService.setDashboardName('My Dashboard');
//       dashboardService.setDashboardDescr('Dashboard description');

//       // Call the createDashboard method of the DashboardService to create the dashboard
//       this.service.createDashboard(dashboardService.getDashboardName(), dashboardService.getDashboardDescr()).subscribe(
//         (dashboardId) => {
//           console.log('dashboardId:', dashboardId);

//           // Save each chart to the dashboard
//           chartsToSave.forEach((chart) => {
//             const visualization = new ChartService();
//             visualization.id=chart.id;
//             visualization.titre = chart.title;
//             visualization.chartType = chart.type;
//             visualization.chartData = chart.data;


//             // Set the dashboard ID for the visualization
//             visualization.DashId = dashboardId;
//             console.log('visualisationId:', visualization.DashId);

//             // Call the saveVisualDash method to save the visualization to the dashboard
//             this.service.saveVisualDash(visualization,visualization.DashId).subscribe(
//               (visualizationResponse) => {
//                 console.log('Visualization saved successfully:', visualizationResponse);
//                 // Handle any success logic
//               },
//               (error) => {
//                 console.error('Error saving visualization:', error);
//                 // Handle any error logic or display an error message
//               }
//             );
//           });

//           console.log('Dashboard saved successfully:', dashboardId);
//           // Handle any success logic or navigate to a different page
//         },
//         (error) => {
//           console.error('Error creating dashboard:', error);
//           // Handle any error logic or display an error message
//         }
//       );
//     },
//     (error) => {
//       console.error('Error retrieving charts:', error);
//       // Handle any error logic or display an error message
//     }
//   );
// }













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



setChartTilte(titre:string){
  this.chartTitle=titre;
}

reload(){
  const limit = 50;
  this.service.getAllTransactions().subscribe(
    (response) => {
      console.log('Data fetched successfully:', response);
      //this.chartData = response.content;
      this.chartData = response.content.slice(0, limit);
  this.service.getAllCharts().subscribe(
    (charts: ChartService[]) => {
      console.log('************')
      this.charts = charts;
      this.charts.forEach((chart) => {
        //console.log('charttypecharttype',chart.chartType)
        console.log('idididid:',chart.id)
        chart.chartData = this.getChartData1(chart.chartType);
        console.log('data is',this.chartData)
        const chartType = this.getChartType();
      //  chart.titre = chart.getChartTitle();

      console.log('titretitre:',chart.titre)
      this.service.getChartByTitle(chart.titre).subscribe(
        (title: string) => {
          console.log("cvvv")
          //chart.titre  = title;
          this.setChartTilte(title);

        console.log('cbbb')
        const chartCanvas = document.getElementById(chart.titre) as HTMLCanvasElement;
        if (!chartCanvas) {
          console.error('Chart canvas element not found.');
          return;
        }
        const ctx = chartCanvas.getContext('2d');
        console.log("title is ",chart.titre);
        console.log('typetype',chart.chartType);
        console.log('datadata',chart.chartData)
        const chartInstance :any= new Chart(ctx, {
            type: chart.chartType,
            data: this.chartData,
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
      this.chartInstances[chart.titre] = chartInstance;
      console.log('instance',chartInstance)
      

     // this.closeCard(chart.id);
    
},
  (error) => {
    console.error('Error fetching chart title:', error);
  }
);
 })

    },
    (error) => {
      console.error('Error fetching charts:', error);
    }
    )

    
  },
  (error) => {
    console.error('Error fetching data from Elasticsearch:', error);
  });
}



// ngOnInit() {
   


//   const chartData = this.getChartData();
//   const chartType = this.getChartType();
//   //this.chartTitle =this.getChartTitle();
//   this.chartTitle = this.chartService.getChartTitle();


//   this.service.getAllCharts().subscribe(
//     (charts: Chart[]) => {
//       this.charts = charts;
//     },
//     (error) => {
//       console.error('Error fetching charts:', error);
//     }
//   )



//   console.log('titretitre:',this.chartTitle)
//   this.service.getChartByTitle(this.chartTitle).subscribe(
//     (title: string) => {
//       console.log("")
//       this.chartTitle = title;
//       this.chartService.setChartTilte(title);


//  const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement;
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
//   this.charts.push({ chartType, chartData, chartInstance,chartTitle: this.chartTitle });


// },
//   (error) => {
//     console.error('Error fetching chart title:', error);
//   }
// );
//  }







  /*addChart(chartType: string, chartData: any) {
    const chartId = 'chart-' + this.charts.length;
    this.charts.push({ id: chartId, chartType: chartType, chartData: chartData });

    const chartCanvas = document.getElementById(chartId) as HTMLCanvasElement;
    const ctx = chartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
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
  }*/
  
  // addChart(chartType: string, chartData: any, chartInstance: any, chartTitle: string) {
  //   this.charts.push({ chartType, chartData, chartInstance, chartTitle });
  // }


  // addMapToPage() {
  //   throw new Error('Method not implemented.');
  // }
  
 // @Input() chartData: any;

  
  /*chart: any;

  constructor(private chartService: ChartService) { }
  @ViewChild('chartCanvas', { static: true }) chartCanvas: ElementRef<HTMLCanvasElement>;




  ngOnInit(): void {
    const chart = this.chartService.getChartData();
    const type = this.chartService.getChartType();

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: type,
      data: chart,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  
    chart.options.maintainAspectRatio = false;
    chart.canvas.style.width = '50%';
    chart.canvas.style.height = '400px';
    chart.update();
  }*/
  
 /* @ViewChild('map') mapElement!: ElementRef;
  public map: any;
  // rest of the code

  public addChartToMap(chartInstance: any) {
    const chartContainer = chartInstance.chart.canvas.parentNode;
    const popup = L.popup({
      closeButton: false,
      maxWidth: 500,
      maxHeight: 500,
      autoPan: false,
      className: 'chart-popup'
    }).setLatLng([0, 0]);
    popup.setContent(chartContainer);
    popup.addTo(this.map);
  }*/

/*  <!--<nb-card>
      <nb-card-header>Leaflet Maps</nb-card-header>
      <nb-card-body>
        <div leaflet [leafletOptions]="options"></div>
      </nb-card-body>
    </nb-card>-->*/

    /*@ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: any;



  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Get chart data and chart type from route parameters
    const chartData = this.activatedRoute.snapshot.paramMap.get('chartData');
    const chartType = this.activatedRoute.snapshot.paramMap.get('chartType');
  
    // Recreate chart using chart data and chart type
    const chartConfig = {
      type: chartType,
      data: chartData,
      options:{
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      } // Chart options
    };
  
    const chartCanvas = this.chartCanvas.nativeElement;
    this.chart = new Chart(chartCanvas, chartConfig);
  }*/


//   <nb-card>
//   <nb-card-header>Charts</nb-card-header>
//   <nb-card-body>
//     <div *ngFor="let chart of charts; let i = index">
//       <canvas #chartCanvas></canvas>
//     </div>
//   </nb-card-body>
// </nb-card>


/* <nb-card>
  <nb-card-header>Chart</nb-card-header>
  <nb-card-body>
    <canvas *ngFor="let chart of charts" [id]="chart.chartType"></canvas>
  </nb-card-body>
</nb-card>




<nb-card>
      <nb-card-header  *ngIf="chartTitle">{{ chartTitle.titre }}</nb-card-header>
      <nb-card-body >
        <canvas id='myChart'></canvas>
      </nb-card-body>
    </nb-card>
  


*/


/*// Retrieve all charts from the API
    this.service.getAllCharts().subscribe(
      (chartsResponse) => {
        // Extract the relevant chart data
        const chartsToSave = chartsResponse.map(chart => ({
          id: chart.id,
          title: chart.titre,
          type: chart.chartType,
          data: chart.chartData
        }));
  
        // Create a new instance of the DashboardService
        const dashboardService = new DashboardService();
  
        // Set the dashboard name and description
        dashboardService.setDashboardName('My Dashboard');
        dashboardService.setDashboardDescr('Dashboard description');
  
        // Call the createDashboard method of the DashboardService to create the dashboard
        this.service.createDashboard(dashboardService.getDashboardName(), dashboardService.getDashboardDescr()).subscribe(
          (dashboardId) => {
            console.log("dashboardId:", dashboardId);
  
            // Save each chart to the dashboard
            chartsToSave.forEach((chart, index) => {
              const visualization = new ChartService();
              visualization.titre = chart.title;
              visualization.chartType = chart.type;
              visualization.chartData = chart.data;
              visualization.DashId = dashboardId;

              
            // this.service.updateVisualWithDashId(chart.id, dashboardId).subscribe(
            //   (visualizationResponse) => {
            //     console.log('Visualization updated successfully:', visualizationResponse);
            //     // Handle any success logic
            //   },
            //   (error) => {
            //     console.error('Error updating visualization:', error);
            //     // Handle any error logic or display an error message
            //   }
            // );
  
              // Call the saveVisualDash method to save the visualization to the dashboard
              this.service.saveVisualDash(visualization).subscribe(
                (visualizationResponse) => {
                  console.log('Visualization saved successfully:', visualizationResponse);
  
                  // Update the chart with the associated dashboard ID
                  chart.id = visualizationResponse.id;
  
                  // Check if it's the last chart to be saved
                  if (index === chartsToSave.length - 1) {
                    // Update the charts with their IDs in the dashboard
                    this.updateDashboardWithCharts(dashboardId, chartsToSave);
                  }
                },
                (error) => {
                  console.error('Error saving visualization:', error);
                  // Handle any error logic or display an error message
                }
              );
            });
  
            console.log('Dashboard saved successfully:', dashboardId);
            // Handle any success logic or navigate to a different page
          },
          (error) => {
            console.error('Error creating dashboard:', error);
            // Handle any error logic or display an error message
          }
        );
      },
      (error) => {
        console.error('Error retrieving charts:', error);
        // Handle any error logic or display an error message
      }
    );
*/


/*updateDashboardWithCharts(dashboardId: number, charts: any[]): void {
  charts.forEach((chart, index) => {
    this.service.updateVisualWithDashId(chart.id, dashboardId).subscribe(
      (visualizationResponse) => {
        console.log('Visualization updated with dashboard ID:', visualizationResponse);

        // Check if it's the last chart to be updated
        if (index === charts.length - 1) {
          console.log('All charts updated with dashboard ID');
        }
      },
      (error) => {
        console.error('Error updating visualization with dashboard ID:', error);
        // Handle any error logic or display an error message
      }
    );
  });
} */



// saveDashboard(): void {    
//   // Retrieve all charts from the API
//   this.service.getAllCharts().subscribe(
//     (chartsResponse) => {
//       // Extract the relevant chart data
//       const chartsToSave = chartsResponse.map(chart => ({
//         id: chart.id,
//         title: chart.titre,
//         type: chart.chartType,
//         data: chart.chartData
//       }));

//       // Create a new instance of the DashboardService
//       const dashboardService = new DashboardService();

//       // Set the dashboard name and description
//       dashboardService.setDashboardName('My Dashboard');
//       dashboardService.setDashboardDescr('Dashboard description');
// //console.log("DashId:",this.dashboardService.getDashboardId())

// // Call the createDashboard method of the DashboardService to create the dashboard
//     this.service.createDashboard(dashboardService.getDashboardName(), dashboardService.getDashboardDescr()).subscribe(
//      (dashboardId) => {
//       console.log("dashboardId:",dashboardId);
//   // const dashboardId = dashboardResponse.id; // Get the ID of the created dashboard

//     // Save each chart to the dashboard
//     chartsToSave.forEach(chart => {
//       const visualization = new ChartService();
//       visualization.titre = chart.title;
//       visualization.chartType = chart.type;
//       visualization.chartData = chart.data;



//       this.service.updateVisualWithDashId(chart.id, dashboardId).subscribe(
//         (visualizationResponse) => {
//           console.log('Visualization updated successfully:', visualizationResponse);
//           // Handle any success logic
//         },
//         (error) => {
//           console.error('Error updating visualization:', error);
//           // Handle any error logic or display an error message
//         }
//       );

//       // Set the dashboard ID for the visualization
//       visualization.DashId = dashboardId;
//       console.log("visualisationId:",visualization.DashId)

      
//       // Call the saveVisualDash method to save the visualization to the dashboard
//       this.service.saveVisualDash(visualization).subscribe(
//         (visualizationResponse) => {
//           console.log('Visualization saved successfully:', visualizationResponse);
//           // Handle any success logic
//         },
//         (error) => {
//           console.error('Error saving visualization:', error);
//           // Handle any error logic or display an error message
//         }
//       );
//     });

//     console.log('Dashboard saved successfully:', dashboardId);
//     // Handle any success logic or navigate to a different page
//   },
//   (error) => {
//     console.error('Error creating dashboard:', error);
//     // Handle any error logic or display an error message
//   }
// );
// },
// (error) => {
// console.error('Error retrieving charts:', error);
// // Handle any error logic or display an error message
// }
// );

// }

}