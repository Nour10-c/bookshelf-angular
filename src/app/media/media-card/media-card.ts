
import { Component, input, output } from '@angular/core';
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

  protected onAdvanceClick(): void {
    this.advanceStatus.emit(this.item().id);
  }

  protected onRemoveClick(): void {
    this.remove.emit(this.item().id);
  }
}
