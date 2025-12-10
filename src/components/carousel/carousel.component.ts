
import { Component, signal, OnDestroy, OnInit, ChangeDetectionStrategy, effect, untracked } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit, OnDestroy {
  images = signal<string[]>([
    'https://picsum.photos/seed/moringa1/1920/1080',
    'https://picsum.photos/seed/moringa2/1920/1080',
    'https://picsum.photos/seed/moringa3/1920/1080',
    'https://picsum.photos/seed/moringa4/1920/1080'
  ]);
  currentIndex = signal(0);
  private intervalId: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex.update(prevIndex => (prevIndex + 1) % this.images().length);
    }, 5000);
  }

  selectImage(index: number): void {
    this.currentIndex.set(index);
    clearInterval(this.intervalId);
    this.startCarousel();
  }
}
