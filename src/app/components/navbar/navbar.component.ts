import { Component, input, signal, ChangeDetectionStrategy, effect, output } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeToggleComponent],
  host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class NavbarComponent {
  cartItemCount = input.required<number>();
  authModalRequest = output<void>();
  contactModalRequest = output<void>();
  isScrolled = signal(false);
  cartUpdated = signal(false);

  private cartTimeout: any;

  constructor() {
    effect(() => {
      // Trigger animation when cartItemCount changes, but not on initial load
      this.cartItemCount(); // depend on cartItemCount
      
      if (this.cartTimeout !== undefined) {
         this.cartUpdated.set(true);
        clearTimeout(this.cartTimeout);
        this.cartTimeout = setTimeout(() => this.cartUpdated.set(false), 600);
      } else {
        // This is to avoid the animation on first load
        this.cartTimeout = null;
      }
    }, { allowSignalWrites: true });
  }

  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }
}
