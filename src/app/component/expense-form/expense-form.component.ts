export interface InitCurrecnyDropDownList {
  imgString: string;
  currencyCode: string;
}

import { CommonModule } from '@angular/common';
import { Component, computed, effect, Signal } from '@angular/core';

import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormsModule,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, skip, Subscription } from 'rxjs';
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

import { ToastSignalService } from 'src/app/features/toast/ToastSignalService';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    FormsModule,
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
    splitMode: new FormControl('splitEqual'),
    splitMembers: new FormArray<FormGroup<any>>([]),
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

  //split expense tab
  activeTab: 'expense' | 'owed' = 'expense'; // Default to the first tab

  private splitMembersSub?: Subscription;

  //can change the data source instead of initialize here
  initCurrencyDropDownList: InitCurrecnyDropDownList[] = [
    { imgString: 'assets/img/png_jalurgemilang_48px.png', currencyCode: 'MYR' },
  ];

  placeHolderCurrency!: InitCurrecnyDropDownList;

  constructor(
    private store: Store,
    private toastService: ToastSignalService,
  ) {
    //when splitAmongList changes
    effect(() => {
      const list = this.splitAmongstList$();
      const expenseAmountRaw = this.expenseForm.get('expenseAmount')?.value;
      if (list && list.length > 0 && expenseAmountRaw !== null) {
        this.setMembers(list);

        this.calculateSplitEven();
        const splitMembers = this.expenseForm.get('splitMembers') as FormArray;

        let percentages;
        let allFilled;
        let totalPercentage;
        let isUpdating = false;

        this.splitMembersSub = splitMembers.valueChanges
          .pipe(skip(1), distinctUntilChanged())
          .subscribe((values) => {
            if (isUpdating) return;
            allFilled = false;
            percentages = 0;
            totalPercentage = 0;
            percentages = values.map((v: any) => Number(v.percentage));
            allFilled = percentages.every((p: any) => !isNaN(p) && p !== null && p !== '');

            totalPercentage = percentages.reduce(
              (acc: number, curr: number) => acc + (curr || 0),
              0,
            );

            if (!allFilled) {
              return;
            }

            if (allFilled) {
              if (totalPercentage > 100) {
                this.toastService.show('total percentage cannot exceed 100', 'fail');
              } else {
                isUpdating = true;
                this.calculatePercentageSplit();
                isUpdating = false;
              }
            }
          });
      }
    });
  }

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
    //add checking if expenseAmount form control is not null then only dispatch event
    const expenseAmountFormControl = this.expenseForm.get('expenseAmount')?.value;
    if (
      expenseAmountFormControl === null ||
      expenseAmountFormControl === undefined ||
      expenseAmountFormControl === ''
    ) {
      this.toastService.show('expense amount must be filled before proceeding', 'info');
    } else {
      console.log('value of expenseAmountFormControl: ' + expenseAmountFormControl);
      this.selectedMembers.clear();
      this.store.dispatch(clickSplitAmongstButton());
    }
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
        // const splitAmongstArray = Array.from(this.selectedMembers);
        // this.store.dispatch(addSplitAmongstList({ requestDTO: splitAmongstArray }));
        // this.store.dispatch(hideSplitAmongstList());
      }
      const splitAmongstArray = Array.from(this.selectedMembers);
      this.store.dispatch(addSplitAmongstList({ requestDTO: splitAmongstArray }));
      this.store.dispatch(hideSplitAmongstList());
    }
  }

  onRemoveSplitAmongstPersonAvatar(memberId: number) {
    console.log('member id to be removed: ' + memberId);
    this.store.dispatch(removeSplitAmongstPerson({ memberId: memberId }));
  }

  selectTab(tabName: 'expense' | 'owed') {
    this.activeTab = tabName;
  }

  //#region form Array

  // Custom validator function
  totalPercentageValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    const total = formArray.controls
      .map((ctrl) => Number(ctrl.get('percentage')?.value) || 0)
      .reduce((acc, curr) => acc + curr, 0);
    return total > 100 ? { percentageOverflow: true } : null;
  };

  get splitMemberArray(): FormArray {
    return this.expenseForm.get('splitMembers') as FormArray;
  }

  setMembers(members: any[]): void {
    try {
      const formArray = new FormArray(
        members.map(
          (m) =>
            new FormGroup({
              email: new FormControl(m.email),
              splitExpDesc: new FormControl(''),
              percentage: new FormControl<number>(0, [Validators.min(0), Validators.max(100)]), //input field for each member's percentage share
              amount: new FormControl<number>({ value: 0, disabled: true }), // derived, not editable
            }),
        ),
        [this.totalPercentageValidator],
      );

      this.expenseForm.setControl('splitMembers', formArray);
    } catch (error) {
      console.log('error setting form array split member: ' + error);
    }
  }

  //#endregion

  //#region split expense calculation func

  calculateSplitEven(): void {
    const totalAmount = Number(this.expenseForm.get('expenseAmount')?.value) ?? 0.0;
    const splitAmountPerPerson: number = totalAmount / (this.splitAmongstList$()?.length || 0.0);

    const splitMembers = this.expenseForm.get('splitMembers') as FormArray;

    splitMembers.controls.forEach((group) => {
      group.get('amount')?.setValue(splitAmountPerPerson);
    });
  }

  //add calculateSplitPercentage
  calculatePercentageSplit(): void {
    const totalAmount = Number(this.expenseForm.get('expenseAmount')?.value) ?? 0.0;
    const splitMembers = this.expenseForm.get('splitMembers') as FormArray;

    splitMembers.controls.forEach((group) => {
      const percent = Number(group.get('percentage')?.value) ?? 0.0;
      group.get('amount')?.setValue((totalAmount * percent) / 100);
    });
  }

  //#endregion

  ngOnDestroy() {
    this.splitMembersSub?.unsubscribe();
  }
}
