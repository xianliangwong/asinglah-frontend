import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  exhaustMap,
  filter,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { selectLoginEmail } from 'src/app/features/login/login.selector';
import { loadGroups } from 'src/app/features/sidepanel/sidepanel.action';
import { ToastSignalService } from 'src/app/features/toast/ToastSignalService';
import { CreateExpenseGrpDTO } from 'src/app/model/requestDTO/CreateExpenseGrpDTO';
import { UserDTO } from 'src/app/model/responseDTO/UsersDTO';
import { ExpenseGroupService } from 'src/app/services/expenseGroup.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-expensegroup-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expensegroup-form.component.html',
  styleUrls: ['./expensegroup-form.component.css'],
  //styleUrl: './expensegroup-form.component.css',
})
export class ExpensegroupFormComponent {
  users$!: Observable<UserDTO[]>;

  selectedUsers = signal<UserDTO[]>([]);

  loading = signal(false);

  email: Signal<{ email: string | null } | null>;

  ownerId: Signal<number | null>;

  private sub?: Subscription;

  private submit$ = new Subject<CreateExpenseGrpDTO>();

  @Output() closeButtonClicked = new EventEmitter<void>();

  expenseGroupForm = new FormGroup({
    groupNameControl: new FormControl('', [Validators.required]),
    searchEmailControl: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private store: Store,
    private toastSignalService: ToastSignalService,
    private groupExpenseService: ExpenseGroupService
  ) {
    this.email = this.store.selectSignal(selectLoginEmail);
    // this.ownerId=this.userService.getUserId(String(this.email()?.email)).pipe(map(
    //   (apiReponse)=>{
    //     apiReponse.data.userId
    //   }
    // )

    // )
    this.ownerId = toSignal(
      this.userService
        .getUserId(String(this.email()?.email))
        .pipe(map((apiResponse) => apiResponse.data.userId)),
      { initialValue: null }
    );
  }

  ngOnInit() {
    this.users$ = this.expenseGroupForm.get('searchEmailControl')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((query) => !!query && query.trim().length > 0), // only non-empty values
      tap(() => this.loading.set(true)), //for loading spinner in seach
      switchMap((query) =>
        this.userService.searchUser(String(query)).pipe(
          map((values) => values.filter((u) => u.email !== this.email()?.email)), //filter out the user's own email
          tap(() => this.loading.set(false)),
          catchError((err) => {
            this.loading.set(false);
            return of([]);
          })
        )
      )
    );

    //event emitter for subject to post create group expense
    this.sub = this.submit$
      .pipe(
        exhaustMap((dto) =>
          this.groupExpenseService.createGroupExpense(dto).pipe(
            tap(() => {
              this.toastSignalService.show('Group created!', 'success');
              this.resetForms();
              this.closeButtonClicked.emit();
              this.store.dispatch(loadGroups({ email: String(this.email()?.email) }));
              //this.groupCreated = true;
            }),
            catchError((err) => {
              this.toastSignalService.show('Failed to create group', 'fail');
              return EMPTY;
            })
          )
        )
      )
      .subscribe();
  }

  onSubmit() {
    if (this.selectedUsers.length == 0) {
      //can set for validation on whether group member is populated
    }

    if (this.expenseGroupForm.invalid) {
      this.toastSignalService.show('invalid forms value', 'fail');
      return;
    }

    const requestDTO: CreateExpenseGrpDTO = {
      groupName: String(this.expenseGroupForm.get('groupNameControl')!.value),
      groupOwnerId: Number(this.ownerId()),
      listOfMembers: this.selectedUsers().map((user) => user.userId),
    };

    //triggered event to subject
    this.submit$.next(requestDTO);
  }

  selectUser(user: UserDTO) {
    this.selectedUsers.update((users) => {
      // check if user already exists by email, if already exists then don update
      const exists = users.some((u) => u.email === user.email);
      return exists ? users : [...users, user];
    });
  }

  removeUser(user: UserDTO) {
    this.selectedUsers.update((users) => {
      return users.filter((u) => u.email !== user.email);
    });

    //this.selectedUsers.update(users => users.filter(u => u.email !== user.email) // keep all except the one to remove );
  }

  resetForms() {
    this.expenseGroupForm.reset(); // clear form values
    this.selectedUsers.set([]); // clear members if using signals
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
