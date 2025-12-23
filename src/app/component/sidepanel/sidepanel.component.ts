import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, DestroyRef, effect, inject, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoginEmail } from 'src/app/features/login/login.selector';
import {
  selectExpenseGroupByUserId,
  selectLogOut,
} from 'src/app/features/sidepanel/sidepanel.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { loadGroups, loadLogOut, resetState } from 'src/app/features/sidepanel/sidepanel.action';
import { rebindLoginEmail } from 'src/app/features/login/login.action';
import { JoinedGroupResDTO } from 'src/app/model/responseDTO/JoinedGroupResDTO';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [NgClass, MatIconModule, CommonModule],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.css',
})
export class SidepanelComponent {
  expenseCount: number;
  groupRequestCount: number;
  isExpanded: boolean = false;

  email: Signal<{ email: string | null } | null>;
  private destroyRef = inject(DestroyRef);

  logout$!: Observable<boolean>;
  groupExpenseList$!: Observable<JoinedGroupResDTO[] | null>;

  constructor(private store: Store, private router: Router) {
    this.expenseCount = 0;
    this.groupRequestCount = 0;
    this.email = this.store.selectSignal(selectLoginEmail);
    //step 1: need to get userid from email , by dispatching action to get effect on api endpoint
    //step 2: once recevied user id, send to get all the expense group in which the user is in the group with
    //step 3 : for log out, call the sign out endpoint
    if (this.email()?.email === null || this.email()?.email === undefined) {
      const savedEmail = String(localStorage.getItem('email'));
      //use the action to push saveEmail from localstorage
      //dispatch action to set
      savedEmail?.trim() && this.store.dispatch(rebindLoginEmail({ email: savedEmail }));
    } else {
      localStorage.setItem('email', String(this.email()?.email));
    }
  }

  ngOnInit() {
    this.logout$ = this.store.select(selectLogOut);

    //take untildestroted handles unsub when component is destroyed
    this.logout$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoggedOut) => {
      if (isLoggedOut) {
        console.log(this.router.url);
        this.router.navigate(['/login']).then(() => {
          this.store.dispatch(resetState());
        });
      }
    });

    if (this.email()?.email !== null || this.email()?.email !== undefined) {
      //dispatch action get userid
      this.store.dispatch(loadGroups({ email: String(this.email()?.email) }));
      this.groupExpenseList$ = this.store.select(selectExpenseGroupByUserId);
    }
  }

  onDashboardClick() {
    console.log('Dashboard clicked');
  }

  onExpenseClick() {}

  onAddExpenseGroupClick() {}

  onExpandExpenseGroup() {
    this.isExpanded = !this.isExpanded;
  }

  onGroupRequestClick() {}

  onLogOutClick() {
    this.store.dispatch(loadLogOut());
    localStorage.removeItem('email');
  }
}
