import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { MediaService } from '../media.service';
import { WatchStatus, WatchType } from '../media';

@Component({
  selector: 'app-media-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './media-form.html',
  styleUrl: './media-form.css',
})
export class MediaForm {
  id = input<string>();

  private readonly fb = inject(FormBuilder);
  private readonly mediaService = inject(MediaService);
  private readonly router = inject(Router);

  protected readonly saving = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly loading = this.mediaService.loading;

  protected readonly isEdit = computed(() => this.id() !== undefined);

  protected readonly item = computed(() => {
    const id = this.id();

    if (id === undefined) {
      return undefined;
    }

    return this.mediaService.items().find(
      media => media.id === Number(id)
    );
  });

  protected readonly submitLabel = computed(() => {
    if (this.saving()) {
      return 'Enregistrement...';
    }

    return this.isEdit() ? 'Enregistrer les modifications' : 'Ajouter le média';
  });

  protected readonly mediaForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    type: ['movie', [Validators.required]],
    platform: ['', [Validators.required]],
    status: ['planned', [Validators.required]],
    rating: ['', [Validators.min(1), Validators.max(5)]],
  });

  constructor() {
    effect(() => {
      const media = this.item();

      if (media && this.mediaForm.pristine) {
        this.mediaForm.patchValue({
          title: media.title,
          type: media.type,
          platform: media.platform,
          status: media.status,
          rating: media.rating?.toString() ?? '',
        });
      }
    });
  }

  protected onSubmit(): void {
    if (this.mediaForm.invalid) {
      this.mediaForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.submitError.set(null);

    const values = this.mediaForm.getRawValue();

    const rating = values.rating === ''
      ? undefined
      : Number(values.rating);

    const mediaData = {
      title: values.title.trim(),
      type: values.type as WatchType,
      platform: values.platform.trim(),
      status: values.status as WatchStatus,
      ...(rating !== undefined ? { rating } : {}),
    };

    const id = this.id();

    const request$ = id !== undefined
      ? this.mediaService.updateItem(Number(id), mediaData)
      : this.mediaService.addItem(mediaData);

    request$.subscribe({
      next: (savedMedia) => {
        this.router.navigate(['/watchlist', savedMedia.id]);
      },
      error: () => {
        this.saving.set(false);
        this.submitError.set(
          'Impossible d’enregistrer le média. Vérifie que l’API fonctionne.'
        );
      },
    });
  }
}
