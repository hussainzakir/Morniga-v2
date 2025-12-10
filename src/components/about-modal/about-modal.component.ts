import { Component, ChangeDetectionStrategy, signal, effect, output } from '@angular/core';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutModalComponent {
  close = output<void>();

  isVisible = signal(false);

  constructor() {
    effect(() => {
      // Use a timeout to allow the element to be added to the DOM before animating
      setTimeout(() => this.isVisible.set(true), 10);
    });
  }

  closeModal(): void {
    this.isVisible.set(false);
    // Allow animation to finish before emitting close event
    setTimeout(() => this.close.emit(), 300);
  }

  // Prevent clicks inside the modal from closing it
  onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
