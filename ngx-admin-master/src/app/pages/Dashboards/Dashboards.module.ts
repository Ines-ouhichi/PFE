import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbCardModule, NbIconModule, NbToastrModule } from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardsRoutingModule, routedComponents } from './Dashboards-routing.module';
//import { DialogNamePromptComponent } from './gmaps/popUp/pop.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  imports: [
    ThemeModule,
    DashboardsRoutingModule,
    NgxEchartsModule,
    NbCardModule,
    NbIconModule,
  ],
  exports: [],
  declarations: [
    //DialogNamePromptComponent,
    ...routedComponents,
  ],
})
export class DashsModule { }