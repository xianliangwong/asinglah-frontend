import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'fail' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastSignalService {
  toast = signal<{ message: string; type: ToastType } | null>(null);

  show(message: string, type: ToastType) {
    this.toast.set({ message, type });
    console.log(message);
    // Auto-dismiss after 3 seconds
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.toast.set(null);
  }
}
