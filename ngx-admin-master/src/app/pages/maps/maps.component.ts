import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GmapsComponent } from './gmaps/gmaps.component';
import { LeafletComponent } from './leaflet/leaflet.component';

@Component({
  selector: 'ngx-maps',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class MapsComponent {}
