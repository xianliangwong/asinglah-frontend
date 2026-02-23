import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-owed-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owed-component.component.html',
  styleUrl: './owed-component.component.css',
})
export class OwedComponentComponent {
  activeTab: 'youowed' | 'youareowed' = 'youowed';

  selectTab(tabName: 'youowed' | 'youareowed') {
    this.activeTab = tabName;
  }
}
