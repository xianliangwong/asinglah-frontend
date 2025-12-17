import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SidepanelComponent } from 'src/app/component/sidepanel/sidepanel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, SidepanelComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isCollapsed: boolean;
  constructor() {
    this.isCollapsed = false;
  }

  toggleSidePanel() {}
}
