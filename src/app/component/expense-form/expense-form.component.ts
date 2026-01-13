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

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
})
export class ExpenseFormComponent {
  expenseForm = new FormGroup({ expenseDescription: new FormControl('', Validators.required) });

  currencyDropDown: boolean = false;

  //can change the data source instead of initialize here
  initCurrencyDropDownList: InitCurrecnyDropDownList[] = [
    { imgString: 'assets/img/png_jalurgemilang_48px.png', currencyCode: 'MYR' },
  ];

  placeHolderCurrency!: InitCurrecnyDropDownList;

  constructor() {}

  ngOnInit() {
    this.placeHolderCurrency = {
      imgString: 'assets/img/png_jalurgemilang_48px.png',
      currencyCode: 'MYR',
    };
  }

  onSubmit() {}

  toggleDropdown() {
    this.currencyDropDown = !this.currencyDropDown;
  }
}
