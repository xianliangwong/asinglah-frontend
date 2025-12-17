import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.css',
})
export class SidepanelComponent {
  expenseCount: number;
  groupRequestCount: number;
  isExpanded!: boolean;

  constructor() {
    this.expenseCount = 0;
    this.groupRequestCount = 0;
  }

  ngOnInit() {}

  onDashboardClick() {
    console.log('Dashboard clicked');
  }

  onExpenseClick() {}

  onAddExpenseGroupClick() {}

  onExpandExpenseGroup() {}

  onGroupRequestClick() {}
}
