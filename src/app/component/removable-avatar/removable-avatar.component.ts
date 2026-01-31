import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserId } from 'src/app/features/sidepanel/sidepanel.selector';

@Component({
  selector: 'app-removable-avatar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './removable-avatar.component.html',
  styleUrl: './removable-avatar.component.css',
})
export class RemovableAvatarComponent {
  @Input() name: string = '';
  @Input() id: number = 0;
  @Output() remove = new EventEmitter<number>();

  sessionUserId$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.sessionUserId$ = this.store.select(selectUserId);
  }

  onRemove(): void {
    this.remove.emit(this.id);
  }
}
