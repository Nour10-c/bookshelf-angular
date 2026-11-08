import { Component, computed, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WatchItem } from '../media';

@Component({
  selector: 'app-media-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './media-card.html',
  styleUrl: './media-card.css',
})
export class MediaCard {
  item = input.required<WatchItem>();

  advanceStatus = output<number>();
  remove = output<number>();

    /** Passe à true si l'image ne charge pas : on retombe sur l'affiche dégradée. */
  private readonly imageFailed = signal(false);

  protected readonly hasImage = computed(() => !!this.item().posterUrl && !this.imageFailed());

  protected onImageError(): void {
    this.imageFailed.set(true);
  }

  protected readonly posterFailed = signal(false);

  protected onPosterError(): void {
    this.posterFailed.set(true);
  }

  protected onAdvanceClick(): void {
    this.advanceStatus.emit(this.item().id);
  }

  protected onRemoveClick(): void {
    this.remove.emit(this.item().id);
  }
}
