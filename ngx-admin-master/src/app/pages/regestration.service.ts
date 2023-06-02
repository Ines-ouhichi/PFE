import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChartService } from "./maps/ChartService.service";
import { Observable } from "rxjs";
import { DashboardService } from "./maps/DashboardService.service";
import { map, switchMap, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class ResgistrationService {

    constructor(private _http:HttpClient) { }


    // public saveCharts(chart:ChartService):Observable<any>{
    //     return this._http.post<any>("http://localhost:7070/api/visualisations",chart);
    // }

    public saveCharts(chart: ChartService): Observable<any> {
      const chartInfo = chart.getChartInfo();
      return this._http.post<any>('http://localhost:7070/api/visualisations/save', { chartType: chartInfo.chartType,titre: chartInfo.title  });
    }

    public getChartByTitle(title: string): Observable<any> {
      return this._http.get<any>('http://localhost:7070/api/visualisations/get/'+title);
    }
    public getAllCharts():Observable<any>{
      return this ._http.get<any>('http://localhost:7070/api/visualisations');
    }

    public GetChartById(id:number): Observable<any> {
      return this._http.get<any>('http://localhost:7070/api/visualisations/'+id);
    }

    public deleteChart(id:number): Observable<void> {
      return this._http.delete<void>('http://localhost:7070/api/visualisations/'+id);
    }

    public saveDashboard(dashboard: DashboardService): Observable<any> {
      return this._http.post<any>('http://localhost:7070/api/dashboard/saveDashboard', dashboard);
    }

   public saveDash(dashboard:DashboardService) :Observable<any>{
    return this._http.post<any>('http://localhost:7070/api/dashboard/saveDashboard',{Name:dashboard.name,Description:dashboard.description});
   }

   public saveVisualDash(visual:ChartService,dashId:number) :Observable<any>{
    return this._http.post<any>('http://localhost:7070/api/visualisations/saveNewVisual/'+dashId,visual);
   }

   createDashboard(name: string, description: string): Observable<any> {
    const dashboard= {
      name: name,
      description: description
    };

  // Make an HTTP POST request to create the dashboard
  return this._http.post<any>('http://localhost:7070/api/dashboard/saveDashboard', dashboard)
    .pipe(
      tap(response => console.log('Create Dashboard Response:', response)), // Log the response
      map(response => response.id) // Extract the ID from the response
    );
  }


  updateVisualWithDashId(visualId:number,dashId:number):Observable<any>{
    const apiUrl = `http://localhost:7070/api/visualisations/${visualId}/updateDashboardId/${dashId}`;

    return this._http.put<any>(apiUrl, null);  }


    public getAllTransactions():Observable<any>{
      return this ._http.get<any>('http://localhost:7079/findEverything');
    }

    public getAllDashboards():Observable<any>{
      return this ._http.get<any>('http://localhost:7070/api/dashboard/Dashboards');
    }

    public GetDashById(id:number): Observable<any> {
      return this._http.get<any>('http://localhost:7070/api/dashboard/Dashboards/'+id);
    }

}
  

  