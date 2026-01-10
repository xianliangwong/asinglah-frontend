import { CommonModule, NgClass } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { ExpensegroupFormComponent } from 'src/app/component/expensegroup-form/expensegroup-form.component';
import { GrouprequestListComponent } from 'src/app/component/grouprequest-list/grouprequest-list.component';
import { SidepanelComponent } from 'src/app/component/sidepanel/sidepanel.component';
import { exitGroupsInvList } from 'src/app/features/sidepanel/sidepanel.action';
import { selectGroupInvClickState } from 'src/app/features/sidepanel/sidepanel.selector';

@Component({
  selector: 'app-expense-page',
  standalone: true,
  imports: [
    NgClass,
    SidepanelComponent,
    CommonModule,
    MatIconModule,
    ExpensegroupFormComponent,
    GrouprequestListComponent,
  ],
  templateUrl: './expense-page.component.html',
  styleUrl: './expense-page.component.css',
})
export class ExpensePageComponent {
  isCollapsed: boolean;

  isCreatingExpenseGroup: boolean = false;

  isGroupInvListSelected: Signal<boolean> = signal(false);

  constructor(private store: Store) {
    this.isCollapsed = false;
    this.isGroupInvListSelected = this.store.selectSignal(selectGroupInvClickState);
  }

  //#region sidepanel

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

  //#endregion
}
