import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardsComponent } from './Dashboards.component';
import { ViewDashComponent } from './ViewDashs/viewdash.component';
import { DashChartComponent } from './DashCharts/dashchart.component';



const routes: Routes = [{
  path: '',
  component: DashboardsComponent,
  children: [{
    path: 'viewDash',
    component: ViewDashComponent,
  }, {
    path: 'DashChart',
    component: DashChartComponent,
  }
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule { }

export const routedComponents = [
    DashboardsComponent,
    ViewDashComponent,
    DashChartComponent
];
