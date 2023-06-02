import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartService } from './ChartService.service';
import { ResgistrationService } from '../regestration.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    id:number;
    name:string;
    description:string 
    charts:ChartService[];
    service:ResgistrationService;

    constructor() { 
        //this.charts=[];
    }

 


    setDashboardId(id:number){
        this.id=id;
    }

    setDashboardName(name:string){
        this.name=name;
    }

    setDashboardDescr(description:string){
        this.description=description;
    }



    getDashboardId(){
        return this.id;
    }
    

    
    getDashboardName(){
        return this.name;
    }

    
    getDashboardDescr(){
        return this.description;
    }
    
    



  createDashboard(name: string, description: string): Observable<any> {
    // Simulating the creation of a dashboard
    const dashboard = {
      id: 1,
      name: name,
      description: description,
      charts: []
    };
    // Returning an observable with the created dashboard
    return of(dashboard);
  }

  associateVisualization(dashboardId: number, visualizationId: number): Observable<any> {
    // Simulating the association of a visualization with a dashboard
    return of({ message: `Visualization ${visualizationId} associated with dashboard ${dashboardId}` });
  }
}
