import { Component, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  productSelected = output<Product>();

  products = signal<Product[]>([
    {
      id: 1,
      name: 'Moringa Powder',
      type: 'Powder',
      price: 19.99,
      description: 'Finely ground from pure, shade-dried moringa leaves. A versatile superfood powerhouse perfect for smoothies, recipes, and daily wellness boosts.',
      imageUrl: 'https://picsum.photos/seed/moringapowder/500/500'
    },
    {
      id: 2,
      name: 'Moringa Oil',
      type: 'Oil',
      price: 29.99,
      description: 'Cold-pressed to perfection, our moringa oil is a luxurious, nutrient-rich elixir for skin and hair, known for its moisturizing and anti-aging properties.',
      imageUrl: 'https://picsum.photos/seed/moringaoil/500/500'
    },
    {
      id: 3,
      name: 'Moringa Tea',
      type: 'Tea',
      price: 14.99,
      description: 'A soothing and refreshing herbal infusion packed with antioxidants. Enjoy a calming cup of wellness with our premium, organically sourced moringa tea leaves.',
      imageUrl: 'https://picsum.photos/seed/moringatea/500/500'
    }
  ]);

  selectProduct(product: Product): void {
    this.productSelected.emit(product);
  }
}
