import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaCard } from '../media-card/media-card';
import { MediaService } from '../media.service';
import { WatchStatus } from '../media';

type StatusFilter = WatchStatus | 'all';

@Component({
  selector: 'app-watchlist',
  imports: [MediaCard, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  /** Filtre venant de l'URL : /?status=planned (grâce à withComponentInputBinding). */
  status = input<string>();

  private readonly mediaService = inject(MediaService);

  protected readonly items = this.mediaService.items;
  protected readonly loading = this.mediaService.loading;
  protected readonly error = this.mediaService.error;

  protected readonly totalItems = this.mediaService.totalItems;
  protected readonly completedItems = this.mediaService.completedItems;
  protected readonly plannedItems = this.mediaService.plannedItems;

  protected readonly filters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'planned', label: 'À regarder' },
    { value: 'in-progress', label: 'En cours' },
    { value: 'done', label: 'Terminés' },
  ];

  /** Statut appliqué : une valeur inconnue dans l'URL revient à « Tous ». */
  protected readonly activeFilter = computed<StatusFilter>(() => {
    const status = this.status();
    const known = this.filters.find((filter) => filter.value === status);
    return known ? known.value : 'all';
  });

  /** Titre de la section : « Ma Watchlist » pour tout, sinon le nom du statut. */
  protected readonly sectionTitle = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? 'Ma Watchlist'
      : (this.filters.find((f) => f.value === filter)?.label ?? 'Ma Watchlist');
  });

  protected readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    const items = this.items();
    return filter === 'all' ? items : items.filter((item) => item.status === filter);
  });

  protected onAdvanceStatus(id: number): void {
    const item = this.items().find((media) => media.id === id);

    if (!item) return;

    const nextStatus: Record<WatchStatus, WatchStatus> = {
      planned: 'in-progress',
      'in-progress': 'done',
      done: 'planned',
    };

    this.mediaService.updateStatus(id, nextStatus[item.status]);
  }

  protected onRemove(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet élément ?')) {
      this.mediaService.deleteItem(id);
    }
  }

  protected onReload(): void {
    this.mediaService.loadItems();
  }
}
