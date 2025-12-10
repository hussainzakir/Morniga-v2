import { Component, input, output, signal, ChangeDetectionStrategy, effect, untracked } from '@angular/core';
import { Product } from '../../types';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductModalComponent {
  product = input.required<Product | null>();
  close = output<void>();
  addToCart = output<{ product: Product, quantity: number }>();

  isVisible = signal(false);
  animationState = signal<'idle' | 'animating'>('idle');
  quantity = signal(1);

  constructor() {
    effect(() => {
      if (this.product()) {
        // Use a timeout to allow the element to be added to the DOM before animating
        setTimeout(() => this.isVisible.set(true), 10);
      } else {
        untracked(() => this.isVisible.set(false));
      }
    });
  }

  closeModal(): void {
    this.isVisible.set(false);
    // Allow animation to finish before emitting close event
    setTimeout(() => this.close.emit(), 300);
  }

  increment(): void {
    this.quantity.update(q => q + 1);
  }

  decrement(): void {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  onAddToCart(): void {
    if (this.animationState() === 'animating' || !this.product()) {
      return;
    }
    this.animationState.set('animating');
    setTimeout(() => {
      this.addToCart.emit({ product: this.product()!, quantity: this.quantity() });
      this.quantity.set(1); // Reset quantity
      // Reset state after a short delay in case the modal is reused.
      setTimeout(() => this.animationState.set('idle'), 500); 
    }, 1200); // Wait for the full animation to finish
  }

  // Prevent clicks inside the modal from closing it
  onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
