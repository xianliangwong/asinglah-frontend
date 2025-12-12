import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectLoginError, selectLoginSuccessWithToken } from '../../features/login/login.selector';
import { Observable } from 'rxjs';
import { closeLoginFail, login } from '../../features/login/login.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: any;
  error$!: Observable<string | null>;
  success!: Signal<{ status: string; accessToken: string | null } | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.success = this.store.selectSignal(selectLoginSuccessWithToken);

    effect(() => {
      const result = this.success();
      if (result?.status === 'success') {
        console.log('success login, nav to dashboard');
        // this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.error$ = this.store.select(selectLoginError);
    //this.success = this.store.selectSignal(selectLoginSuccessWithToken);
  }

  onSubmit() {
    console.log('submit button pressed');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    //create the dto object
    const logInRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(login({ logInRequest }));
  }

  closeError() {
    //action to reset log in state
    this.store.dispatch(closeLoginFail());
  }
}
