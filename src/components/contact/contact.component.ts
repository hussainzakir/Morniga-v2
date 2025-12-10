
import { Component, ChangeDetectionStrategy, signal, effect, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class ContactComponent {
  close = output<void>();

  isVisible = signal(false);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private fb: FormBuilder) {
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

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Contact form submitted:', this.contactForm.value);
      this.closeModal();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  // Prevent clicks inside the modal from closing it
  onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
