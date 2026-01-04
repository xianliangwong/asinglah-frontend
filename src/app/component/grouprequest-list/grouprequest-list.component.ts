import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupInvitationResDTO } from 'src/app/model/responseDTO/groupInvitationResDTO';

@Component({
  selector: 'app-grouprequest-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouprequest-list.component.html',
  styleUrl: './grouprequest-list.component.css',
})
export class GrouprequestListComponent {
  pagedItems$!: Observable<GroupInvitationResDTO[]>;

  constructor(private store: Store) {}

  ngOnInit() {}
}
