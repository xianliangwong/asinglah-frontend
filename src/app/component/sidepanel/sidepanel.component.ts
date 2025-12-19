import { NgClass } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectLoginEmail } from 'src/app/features/login/login.selector';

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

  email!: Signal<{ email: string | null } | null>;

  constructor(private store: Store) {
    this.expenseCount = 0;
    this.groupRequestCount = 0;
    this.email = this.store.selectSignal(selectLoginEmail);
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
