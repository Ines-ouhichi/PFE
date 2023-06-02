import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
import { registerMap } from 'echarts';
import { DashboardService } from '../DashboardService.service';
import { ResgistrationService } from '../../regestration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-bubble-map',
  styleUrls: ['./bubble-map.component.scss'],
  templateUrl: 'bubble-map.component.html'
})
export class BubbleMapComponent {
}
