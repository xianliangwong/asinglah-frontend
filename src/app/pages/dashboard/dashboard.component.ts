import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SidepanelComponent } from 'src/app/component/sidepanel/sidepanel.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, SidepanelComponent, CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isCollapsed: boolean;

  constructor(private store: Store) {
    this.isCollapsed = false;
  }

  toggleSidePanel() {
    this.isCollapsed = !this.isCollapsed;
  }
}
