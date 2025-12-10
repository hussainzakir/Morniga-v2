
import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { Product } from './types';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    CarouselComponent,
    ProductListComponent,
    ProductModalComponent,
    BenefitsComponent,
    FooterComponent,
    AuthModalComponent,
    ContactComponent,
    AboutComponent
  ],
})
export class AppComponent {
  cartItemCount = signal(0);
  selectedProduct = signal<Product | null>(null);
  authModalVisible = signal(false);
  contactModalVisible = signal(false);
  
  // Initialize the theme service for the application
  private themeService = inject(ThemeService);

  onProductSelected(product: Product): void {
    this.selectedProduct.set(product);
  }

  onCloseModal(): void {
    this.selectedProduct.set(null);
  }

  onAddToCart(event: { product: Product, quantity: number }): void {
    this.cartItemCount.update(count => count + event.quantity);
    this.selectedProduct.set(null);
  }

  onOpenAuthModal(): void {
    this.authModalVisible.set(true);
  }

  onCloseAuthModal(): void {
    this.authModalVisible.set(false);
  }
  
  onOpenContactModal(): void {
    this.contactModalVisible.set(true);
  }

  onCloseContactModal(): void {
    this.contactModalVisible.set(false);
  }
}