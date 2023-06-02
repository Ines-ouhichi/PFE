import { Component, OnInit } from '@angular/core';
import { PositionModel } from './entity/position.model';
import { ActivatedRoute } from '@angular/router';
import { ResgistrationService } from '../../regestration.service';

@Component({
  selector: 'ngx-search-map',
  templateUrl: './search-map.component.html',
})
export class SearchMapComponent implements OnInit {
  dashboardId: number;
  visuals: any[];

  constructor(
    private route: ActivatedRoute,
    private service: ResgistrationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dashboardId = +params['id'];
      this.fetchDashboardVisuals();
    });
  }

  fetchDashboardVisuals(): void {
    this.service.GetDashById(this.dashboardId).subscribe(
      (response) => {
        this.visuals = response.visuals;
        console.log('Visuals for the selected dashboard:', this.visuals);
      },
      (error) => {
        console.error('Error retrieving dashboard visuals:', error);
      }
    );
  }

  
}
