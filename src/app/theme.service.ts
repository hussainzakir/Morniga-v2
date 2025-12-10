import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<'green' | 'dark'>('dark');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme') as 'green' | 'dark' | null;
      if (storedTheme) {
        this.theme.set(storedTheme);
      }
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.theme() === 'dark') {
          document.body.classList.add('dark');
          document.body.classList.remove('theme-green');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark');
          document.body.classList.add('theme-green');
          localStorage.setItem('theme', 'green');
        }
      }
    });
  }

  toggleTheme(): void {
    this.theme.update(current => (current === 'green' ? 'dark' : 'green'));
  }
}
