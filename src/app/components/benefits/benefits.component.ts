import { Component, signal, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';

interface Benefit {
  icon: string; // SVG path data
  title: string;
  description: string;
}

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pinContainer') pinContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('track') trackRef!: ElementRef<HTMLElement>;
  @ViewChildren('benefitCard') benefitCardsRef!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('titleGroup') titleGroupRef!: ElementRef<HTMLElement>;
  
  horizontalScroll = signal(0);
  cardStyles = signal<({ opacity: number; })[]>([]);
  private scrollListener!: () => void;

  title = 'The Miracle of Moringa';
  titleLetters = signal<{ char: string; delay: string }[]>(
    this.title.split('').map(char => ({ char, delay: '0ms' }))
  );

  benefits = signal<Benefit[]>([
    {
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-5H8l4-6v5h3l-4 6z',
      title: 'Rich in Nutrients',
      description: 'Packed with vitamins A, C, and E, plus calcium, potassium, and protein.'
    },
    {
      icon: 'M12 22C6.47 22 2 17.52 2 12S6.47 2 12 2s10 4.48 10 10-4.53 10-10 10zm-1-12H9v2h2v2h2v-2h2V8h-2V6h-2v2z',
      title: 'Antioxidant Powerhouse',
      description: 'Contains powerful antioxidants that protect cells from damage and oxidative stress.'
    },
    {
      icon: 'M13.5 6.5C13.5 5.67 12.83 5 12 5s-1.5.67-1.5 1.5S11.17 8 12 8s1.5-.67 1.5-1.5zM12 10c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z',
      title: 'Supports Brain Health',
      description: 'Enhances cognitive function and mood with its neuro-enhancing properties.'
    },
    {
      icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 .55-.45 1-1 1h-1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1h-1c-.55 0-1-.45-1-1s.45-1 1-1h1v-1c0 .55.45-1 1-1s1 .45 1 1v1h1c.55 0 1 .45 1 1z',
      title: 'Fights Inflammation',
      description: 'Contains natural anti-inflammatory compounds that help reduce inflammation.'
    },
    {
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.08 13.52c-.32.32-.75.52-1.2.52s-.88-.2-1.2-.52L10 12.83l-2.68 2.68c-.32.32-.75.52-1.2.52s-.88-.2-1.2-.52c-.63-.63-.63-1.65 0-2.28L8.72 12 6.04 9.32c-.63-.63-.63-1.65 0-2.28s1.65-.63 2.28 0L11 9.72l2.68-2.68c.63-.63 1.65-.63 2.28 0s.63 1.65 0 2.28L13.28 12l2.68 2.68c.63.63.63 1.65 0 2.28z',
      title: 'Nourishes Skin & Hair',
      description: 'Promotes healthy skin and hair with its hydrating and cleansing elements.'
    },
    {
      icon: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 10c-2.48 0-4.5-2.02-4.5-4.5S9.52 5.5 12 5.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z',
      title: 'Boosts Energy Levels',
      description: 'Provides a natural, caffeine-free energy boost to help you power through your day.'
    },
    {
      icon: 'M21 11.5c0-1.68-1.32-3-3-3h-1.5c-1.24 0-2.25 1.01-2.25 2.25v.25H12v-2.5h1.5V6H9v2h1.5v2.5H6v5.5h1.5V18H9v2h6v-2h1.5v-1.5H18c1.68 0 3-1.32 3-3V11.5z',
      title: 'Protects The Liver',
      description: 'Aids in liver protection and function, helping it filter toxins from the body.'
    }
  ]);

  constructor() {
    this.cardStyles.set(this.benefits().map(() => ({ opacity: 0 })));
  }

  ngAfterViewInit(): void {
    // Timeout ensures elements are rendered and have their final dimensions
    setTimeout(() => this.setupScrollListener(), 100);
  }

  setupScrollListener(): void {
    const pinContainerEl = this.pinContainerRef.nativeElement;
    const trackEl = this.trackRef.nativeElement;
    const cards = this.benefitCardsRef.toArray();

    this.scrollListener = () => {
      if (!pinContainerEl || !trackEl || cards.length === 0) return;
      
      const rect = pinContainerEl.getBoundingClientRect();
      const trackWidth = trackEl.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      const scrollableDistance = trackWidth - viewportWidth;
      const pinDuration = pinContainerEl.offsetHeight - window.innerHeight;
      
      const isPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isPinned) {
        const progress = -rect.top / pinDuration;
        const totalTravelDistance = viewportWidth + scrollableDistance;
        const newTransform = viewportWidth - (progress * totalTravelDistance);
        this.horizontalScroll.set(newTransform);
      } else if (rect.top > 0) {
        this.horizontalScroll.set(viewportWidth);
      } else {
        this.horizontalScroll.set(-scrollableDistance);
      }

      const newCardStyles = cards.map(cardRef => {
        const cardRect = cardRef.nativeElement.getBoundingClientRect();
        const cardWidth = cardRef.nativeElement.offsetWidth;
        let opacity = 0;

        if (cardRect.left > viewportWidth) {
           opacity = 0;
        } 
        else if (cardRect.left > viewportWidth - cardWidth) {
          opacity = (viewportWidth - cardRect.left) / cardWidth;
        } 
        else if (cardRect.right < cardWidth) {
          opacity = cardRect.right / cardWidth;
        } 
        else {
          opacity = 1;
        }
        
        return { opacity: Math.max(0, Math.min(1, opacity)) };
      });

      this.cardStyles.set(newCardStyles);
    };
    
    window.addEventListener('scroll', this.scrollListener, { passive: true });
    this.scrollListener();
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  onLetterHover(hoveredIndex: number): void {
    // Update the delays first
    this.titleLetters.update(letters =>
        letters.map((letter, i) => {
            const distance = Math.abs(i - hoveredIndex);
            const newDelay = `${distance * 50}ms`;
            return { ...letter, delay: newDelay };
        })
    );
    
    // Then, force the animation to restart
    const titleGroupEl = this.titleGroupRef.nativeElement;
    titleGroupEl.classList.remove('is-animating');
    // This is a browser trick to force a reflow, making the class removal "stick" before we add it back
    void titleGroupEl.offsetWidth; 
    titleGroupEl.classList.add('is-animating');
  }

  onTitleLeave(): void {
      this.titleLetters.update(letters =>
          letters.map(letter => ({ ...letter, delay: '0ms' }))
      );
      this.titleGroupRef.nativeElement.classList.remove('is-animating');
  }
}
