import { Component, OnInit } from "@angular/core";
import { ResgistrationService } from "../../regestration.service";
import { DashboardService } from "../../maps/DashboardService.service";
import { Router } from "@angular/router";
import { DashboardSelectionService } from "../dashboard-selection.service";

@Component({
    selector: 'ngx-viewDash',
    styleUrls: ['./viewdash.component.scss'],
    templateUrl: './viewdash.component.html',
  })
  export class ViewDashComponent implements OnInit {
    dashboard:DashboardService;
   
   
    constructor(private service:ResgistrationService,private router: Router, private dashboardSelectionService: DashboardSelectionService){}
   
    ngOnInit():void{
     // Call the saveDash method of the DashboardService
     this.service.getAllDashboards().subscribe(
       (response) => {
         console.log('Dashboard saved successfully:', response);
         // Handle any success logic or navigate to a different page
         this.dashboard=response
         console.log("dashboardddddd:", this.dashboard)
   
       },
       (error) => {
         console.error('Error saving dashboard:', error);
         // Handle any error logic or display an error message
       }
     );
    }
   
    getDashboards(): void {
     console.log("dashboard:", this.dashboard)
   
   }
   
   viewDashboardCharts(dashboard: any): void {
    const dashboardId = dashboard.id;
    this.dashboardSelectionService.setSelectedDashboardId(dashboardId); // Set the selected dashboard ID in the service
     this.router.navigate(['pages/dashs/DashChart']);
   }
   
   }

  