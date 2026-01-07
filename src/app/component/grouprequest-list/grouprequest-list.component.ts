import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { updateExpenseGroupInv } from 'src/app/features/sidepanel/sidepanel.action';
import {
  selectGroupInvClickState,
  selectGrpInvList,
  selectUserId,
} from 'src/app/features/sidepanel/sidepanel.selector';
import { UpdateExpenseGroupInv } from 'src/app/model/requestDTO/ExpenseGroupDTO/UpdateStatus-groupMember.dto';

import { GroupInvitationResDTO } from 'src/app/model/responseDTO/groupInvitationResDTO';

@Component({
  selector: 'app-grouprequest-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouprequest-list.component.html',
  styleUrl: './grouprequest-list.component.css',
})
export class GrouprequestListComponent {
  items$!: Observable<GroupInvitationResDTO[] | null>;

  pagedItems$!: Observable<GroupInvitationResDTO[] | null>;

  userId: Signal<number> = signal(0);

  pageSize = 5;
  currentPage = 0;

  // track current page as a stream
  private page$ = new BehaviorSubject<number>(0);

  constructor(private store: Store) {
    this.items$ = this.store.select(selectGrpInvList);
    this.userId = this.store.selectSignal(selectUserId);
  }

  ngOnInit() {
    this.pagedItems$ = combineLatest([this.items$, this.page$]).pipe(
      map(([items, page]) => {
        const start = page * this.pageSize;
        return items!.slice(start, start + this.pageSize);
      })
    );

    console.log('userId = ' + this.userId());
  }

  goToPage(page: number) {
    if (page >= 0) {
      this.currentPage = page;
      this.page$.next(page);
    }
  }

  get totalPagesArray$() {
    return this.items$.pipe(
      map((items) => {
        const totalPages = Math.ceil(items!.length / this.pageSize);
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      })
    );
  }

  get totalPages$() {
    return this.items$.pipe(map((items) => Math.ceil(items!.length / this.pageSize)));
  }

  updateGoToPage() {
    if (this.currentPage > 0) {
      this.goToPage(this.currentPage - 1);
    }
  }

  clickAcceptInv(id: number) {
    //init object groupId,userId,statusId, 2= success
    console.log(id + ':group Id');
    const requestDTO: UpdateExpenseGroupInv = {
      groupId: id,
      userId: this.userId(),
      statusId: 2,
    };
    //dispatch action to update status to backend
    this.store.dispatch(updateExpenseGroupInv({ requestDTO }));
    this.updateGoToPage();
  }

  clickRejectInv(id: number) {
    //init object groupId,userId,statusId, 3= rejected
    const requestDTO: UpdateExpenseGroupInv = {
      groupId: id,
      userId: this.userId(),
      statusId: 3,
    };
    //dispatch action to update status to backend
    this.store.dispatch(updateExpenseGroupInv({ requestDTO }));
    this.updateGoToPage();
  }
}
