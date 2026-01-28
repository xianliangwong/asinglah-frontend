export interface InitCurrecnyDropDownList {
  imgString: string;
  currencyCode: string;
}

import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';

import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PriceNumericOnlyDirective } from 'src/app/directive/numeric-only.directive';
import {
  addPaidByPerson,
  clickPaidByButton,
  hidePaidByList,
  removePaidByPerson,
} from 'src/app/features/expense-page/expense.action';
import {
  selectClickedPaidByButton,
  selectGroupMembers,
  selectPaidByPerson,
} from 'src/app/features/expense-page/expense.selector';
import { ExpenseMembers } from 'src/app/features/expense-page/expense.state';
import { selectUserId } from 'src/app/features/sidepanel/sidepanel.selector';
import { RemovableAvatarComponent } from '../removable-avatar/removable-avatar.component';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatIconModule,
    PriceNumericOnlyDirective,
    MatIconModule,
    RemovableAvatarComponent,
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
})
export class ExpenseFormComponent {
  expenseForm = new FormGroup({
    expenseDescription: new FormControl('', Validators.required),
    expenseAmount: new FormControl('', Validators.required),
    expenseDate: new FormControl('', Validators.required),
  });

  currencyDropDown: boolean = false;

  currentActiveUser$!: Signal<number>;
  paidByButton$!: Observable<boolean>;
  paidByPerson$!: Observable<ExpenseMembers | null>;

  listOfGroupMembers$!: Observable<ExpenseMembers[] | null>;

  //can change the data source instead of initialize here
  initCurrencyDropDownList: InitCurrecnyDropDownList[] = [
    { imgString: 'assets/img/png_jalurgemilang_48px.png', currencyCode: 'MYR' },
  ];

  placeHolderCurrency!: InitCurrecnyDropDownList;

  constructor(private store: Store) {}

  ngOnInit() {
    this.placeHolderCurrency = {
      imgString: 'assets/img/png_jalurgemilang_48px.png',
      currencyCode: 'MYR',
    };
    this.paidByButton$ = this.store.select(selectClickedPaidByButton);
    this.currentActiveUser$ = this.store.selectSignal(selectUserId);
    this.listOfGroupMembers$ = this.store.select(selectGroupMembers);
    this.paidByPerson$ = this.store.select(selectPaidByPerson);
  }

  onSubmit() {}

  toggleDropdown() {
    this.currencyDropDown = !this.currencyDropDown;
  }

  onClickAddPaidBy() {
    this.store.dispatch(clickPaidByButton());
  }

  onClickSplitAmonst() {}

  onRemovePaidPersonAvatar(memberId: number) {
    this.store.dispatch(removePaidByPerson());
  }

  addPaidBy(memberId: number, email: string) {
    const requestDTO: ExpenseMembers = {
      userId: memberId,
      email: email,
    };
    this.store.dispatch(addPaidByPerson({ requestDTO }));
    //after select the user , hide the list of available person, reset paidByButton
    this.store.dispatch(hidePaidByList());
  }
}
