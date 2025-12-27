import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { selectLoginEmail } from 'src/app/features/login/login.selector';
import { UserDTO } from 'src/app/model/responseDTO/UsersDTO';
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

  expenseGroupForm = new FormGroup({
    groupNameControl: new FormControl('', [Validators.required]),
    searchEmailControl: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService, private store: Store) {
    this.email = this.store.selectSignal(selectLoginEmail);
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
  }

  onSubmit() {}

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
}
