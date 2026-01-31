export interface InitCurrecnyDropDownList {
  imgString: string;
  currencyCode: string;
}

import { CommonModule } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';

import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { PriceNumericOnlyDirective } from 'src/app/directive/numeric-only.directive';
import {
  addPaidByPerson,
  addSplitAmongstList,
  clickPaidByButton,
  clickSplitAmongstButton,
  hidePaidByList,
  hideSplitAmongstList,
  removePaidByPerson,
  removeSplitAmongstPerson,
} from 'src/app/features/expense-page/expense.action';
import {
  selectClickedPaidByButton,
  selectClickedSplitAmongstButton,
  selectGroupMembers,
  selectPaidByPerson,
  selectSplitAmongstList,
} from 'src/app/features/expense-page/expense.selector';
import { ExpenseMembers } from 'src/app/features/expense-page/expense.state';
import { selectUserId } from 'src/app/features/sidepanel/sidepanel.selector';
import { RemovableAvatarComponent } from '../removable-avatar/removable-avatar.component';
import { ɵEmptyOutletComponent } from '@angular/router';

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
    ɵEmptyOutletComponent,
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

  splitAmongButton$!: Observable<boolean>;
  selectedMembers = new Set<ExpenseMembers>();
  // get existingIds(): Set<number> {
  //   return new Set((this.splitAmongstList$() ?? []).map((e) => e.userId));
  // }
  existingIds = computed(() => new Set((this.splitAmongstList$() ?? []).map((e) => e.userId)));
  splitAmongstList$!: Signal<ExpenseMembers[] | null>;

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
    this.splitAmongstList$ = this.store.selectSignal(selectSplitAmongstList);
    this.splitAmongButton$ = this.store.select(selectClickedSplitAmongstButton);
  }

  onSubmit() {}

  toggleDropdown() {
    this.currencyDropDown = !this.currencyDropDown;
  }

  onClickAddPaidBy() {
    this.store.dispatch(clickPaidByButton());
  }

  onClickSplitAmongst() {
    this.selectedMembers.clear();
    this.store.dispatch(clickSplitAmongstButton());
  }

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

  toggleMember(userId: number, email: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;
    if (checked) {
      const expenseMemberDTO: ExpenseMembers = {
        userId: userId,
        email: email,
      };
      this.selectedMembers.add(expenseMemberDTO);
    } else {
      const expenseMemberDTO: ExpenseMembers = {
        userId: userId,
        email: email,
      };
      this.selectedMembers.delete(expenseMemberDTO);
    }
  }

  onClickAddPeople() {
    //if utilized observable as opposed to signal, need subscribe() to perform if condition logic
    if ((this.splitAmongstList$() ?? []).length == 0) {
      const splitAmongstArray = Array.from(this.selectedMembers);
      this.store.dispatch(addSplitAmongstList({ requestDTO: splitAmongstArray }));
      this.store.dispatch(hideSplitAmongstList());
    } else {
      const existingIds: Set<number> = new Set(
        (this.splitAmongstList$() ?? []).map((value) => {
          return value.userId;
        }),
      );
      for (const member of this.selectedMembers) {
        if (existingIds.has(member.userId)) {
          // duplicate found
          this.selectedMembers.delete(member);
        }
        const splitAmongstArray = Array.from(this.selectedMembers);
        this.store.dispatch(addSplitAmongstList({ requestDTO: splitAmongstArray }));
        this.store.dispatch(hideSplitAmongstList());
      }
    }
  }

  onRemoveSplitAmongstPersonAvatar(memberId: number) {
    console.log('member id to be removed: ' + memberId);
    this.store.dispatch(removeSplitAmongstPerson({ memberId: memberId }));
  }
}
