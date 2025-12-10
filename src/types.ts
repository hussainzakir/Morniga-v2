
export interface Product {
  id: number;
  name: string;
  type: 'Powder' | 'Oil' | 'Tea';
  price: number;
  description: string;
  imageUrl: string;
}
