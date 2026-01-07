import { CommonModule, NgClass } from '@angular/common';
import { Component, effect, Signal, signal } from '@angular/core';
import { SidepanelComponent } from 'src/app/component/sidepanel/sidepanel.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { ExpensegroupFormComponent } from 'src/app/component/expensegroup-form/expensegroup-form.component';
import { selectGroupInvClickState } from 'src/app/features/sidepanel/sidepanel.selector';
import { GrouprequestListComponent } from 'src/app/component/grouprequest-list/grouprequest-list.component';
import { exitGroupsInvList } from 'src/app/features/sidepanel/sidepanel.action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass,
    SidepanelComponent,
    CommonModule,
    MatIconModule,
    ExpensegroupFormComponent,
    GrouprequestListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isCollapsed: boolean;

  isCreatingExpenseGroup: boolean = false;

  isGroupInvListSelected: Signal<boolean> = signal(false);

  constructor(private store: Store) {
    this.isCollapsed = false;
    this.isGroupInvListSelected = this.store.selectSignal(selectGroupInvClickState);
  }

  ngInit() {
    //add selector signal to side panel states

    effect(() => {
      console.log('isGroupInvListSelected:', this.isGroupInvListSelected());
    });
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

  closeGroupInvList() {
    this.store.dispatch(exitGroupsInvList());
  }
}
