export interface InitCurrecnyDropDownList {
  imgString: string;
  currencyCode: string;
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
import { clickPaidByButton } from 'src/app/features/expense-page/expense.action';
import { selectClickedPaidByButton } from 'src/app/features/expense-page/expense.selector';

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

  paidByButton!: Observable<boolean>;

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
    this.paidByButton = this.store.select(selectClickedPaidByButton);
  }

  onSubmit() {}

  toggleDropdown() {
    this.currencyDropDown = !this.currencyDropDown;
  }

  onClickAddPaidBy() {
    this.store.dispatch(clickPaidByButton());
  }

  onClickSplitAmonst() {}
}
