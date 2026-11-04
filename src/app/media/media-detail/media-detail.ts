import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-media-detail',
  imports: [RouterLink],
  templateUrl: './media-detail.html',
  styleUrl: './media-detail.css',
})
export class MediaDetail {
  id = input.required<string>();

  private readonly mediaService = inject(MediaService);

  protected readonly loading = this.mediaService.loading;

  protected readonly item = computed(() =>
    this.mediaService.items().find(
      media => media.id === Number(this.id())
    )
  );
}
