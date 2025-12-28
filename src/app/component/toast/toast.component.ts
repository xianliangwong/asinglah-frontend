import { CommonModule, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ToastSignalService } from 'src/app/features/toast/ToastSignalService';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  constructor(private toastService: ToastSignalService) {}

  get toast() {
    return this.toastService.toast;
  }

  dismiss() {
    this.toastService.clear();
  }
}
