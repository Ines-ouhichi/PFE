import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardSelectionService {
  private selectedDashboardId: number;

  setSelectedDashboardId(id: number): void {
    this.selectedDashboardId = id;
  }

  getSelectedDashboardId(): number {
    return this.selectedDashboardId;
  }
}
