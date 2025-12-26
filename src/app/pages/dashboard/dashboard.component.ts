import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SidepanelComponent } from 'src/app/component/sidepanel/sidepanel.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { ExpensegroupFormComponent } from 'src/app/component/expensegroup-form/expensegroup-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, SidepanelComponent, CommonModule, MatIconModule, ExpensegroupFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isCollapsed: boolean;

  isCreatingExpenseGroup: boolean = false;

  constructor(private store: Store) {
    this.isCollapsed = false;
  }

  toggleSidePanel() {
    this.isCollapsed = !this.isCollapsed;
  }

  onAddExpenseGroup() {
    this.isCreatingExpenseGroup = true;
  }

  closeForm() {
    this.isCreatingExpenseGroup = false;
    //dispatch to reset state
    //dispatch action to get back count for list of expense groups
  }
}
