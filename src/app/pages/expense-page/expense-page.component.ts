import { CommonModule, NgClass } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExpensegroupFormComponent } from 'src/app/component/expensegroup-form/expensegroup-form.component';
import { GrouprequestListComponent } from 'src/app/component/grouprequest-list/grouprequest-list.component';
import { SidepanelComponent } from 'src/app/component/sidepanel/sidepanel.component';
import {
  clickedCloseExpense,
  clickedCreateExpense,
  getGroupMembers,
  resetExpensePage,
} from 'src/app/features/expense-page/expense.action';
import { selectClickedExpenseForm } from 'src/app/features/expense-page/expense.selector';
import { exitGroupsInvList } from 'src/app/features/sidepanel/sidepanel.action';
import { selectGroupInvClickState } from 'src/app/features/sidepanel/sidepanel.selector';
import { ExpenseFormComponent } from 'src/app/component/expense-form/expense-form.component';
import { OwedComponentComponent } from 'src/app/component/owed-component/owed-component.component';

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
    MatIconModule,
    ExpenseFormComponent,
    OwedComponentComponent,
  ],
  templateUrl: './expense-page.component.html',
  styleUrl: './expense-page.component.css',
})
export class ExpensePageComponent {
  //side panel's var
  isCollapsed: boolean;
  isCreatingExpenseGroup: boolean = false;
  isGroupInvListSelected: Signal<boolean> = signal(false);
  //

  expenseGroupId!: number;
  expenseGroupName!: string;

  clickedCreateExpenseButton!: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.isCollapsed = false;
    this.isGroupInvListSelected = this.store.selectSignal(selectGroupInvClickState);
  }

  ngOnInit() {
    //handles param changes from sidepanel nav of expense page
    this.route.params.subscribe((params) => {
      this.expenseGroupId = Number(params['id']);
      this.expenseGroupName = params['groupName'];
      this.clickedCreateExpenseButton = this.store.select(selectClickedExpenseForm);
      this.store.dispatch(getGroupMembers({ expenseGroupId: this.expenseGroupId }));
    });

    // this.expenseGroupId = Number(this.route.snapshot.paramMap.get('id')!);
    // this.expenseGroupName = this.route.snapshot.paramMap.get('groupName')!;
    // this.clickedCreateExpenseButton = this.store.select(selectClickedExpenseForm);
    // this.store.dispatch(getGroupMembers({ expenseGroupId: this.expenseGroupId }));
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
    this.store.dispatch(resetExpensePage());
    //dispatch to reset state
    //dispatch action to get back count for list of expense groups
  }

  closeGroupInvList() {
    this.store.dispatch(exitGroupsInvList());
  }

  //#endregion

  closeExpenseForm() {
    this.store.dispatch(clickedCloseExpense());
  }

  addExpense() {
    this.store.dispatch(clickedCreateExpense());
  }
}
