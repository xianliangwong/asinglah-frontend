import { NgClass } from '@angular/common';
import { Component, DestroyRef, effect, inject, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoginEmail } from 'src/app/features/login/login.selector';
import { selectLogOut } from 'src/app/features/sidepanel/sidepanel.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.css',
})
export class SidepanelComponent {
  expenseCount: number;
  groupRequestCount: number;
  isExpanded!: boolean;

  email: Signal<{ email: string | null } | null>;
  private destroyRef = inject(DestroyRef);

  logout$!: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.expenseCount = 0;
    this.groupRequestCount = 0;
    this.email = this.store.selectSignal(selectLoginEmail);
    //step 1: need to get userid from email , by dispatching action to get effect on api endpoint
    //step 2: once recevied user id, send to get all the expense group in which the user is in the group with
    //step 3 : for log out, call the sign out endpoint
    if (this.email()?.email === null || this.email()?.email === undefined) {
      const savedEmail = localStorage.getItem('email');
      //use the sidepanel action to push saveEmail from localstorage
    } else {
      localStorage.setItem('email', String(this.email()?.email));
    }
  }

  ngOnInit() {
    this.logout$ = this.store.select(selectLogOut);

    //take untildestroted handles unsub when component is destroyed
    this.logout$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoggedOut) => {
      if (isLoggedOut) {
        this.router.navigate(['/login']);
      }
    });
  }

  onDashboardClick() {
    console.log('Dashboard clicked');
  }

  onExpenseClick() {}

  onAddExpenseGroupClick() {}

  onExpandExpenseGroup() {}

  onGroupRequestClick() {}
}
