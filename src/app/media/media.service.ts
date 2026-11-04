
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { WatchItem, WatchStatus } from './media';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/watchlist';

  private readonly itemsSignal = signal<WatchItem[]>([]);
  private readonly loadingSignal = signal(true);
  private readonly errorSignal = signal<string | null>(null);

  readonly items = this.itemsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly totalItems = computed(() => this.itemsSignal().length);

  readonly completedItems = computed(() =>
    this.itemsSignal().filter(item => item.status === 'done').length
  );

  readonly plannedItems = computed(() =>
    this.itemsSignal().filter(item => item.status === 'planned').length
  );

  constructor() {
    this.loadItems();
  }

  loadItems(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<WatchItem[]>(this.apiUrl).subscribe({
      next: items => {
        this.itemsSignal.set(items);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set(
          'Impossible de charger la watchlist. Vérifie que l’API fonctionne sur le port 3000.'
        );
        this.loadingSignal.set(false);
      },
    });
  }

  updateStatus(id: number, status: WatchStatus): void {
    this.errorSignal.set(null);

    this.http.patch<WatchItem>(`${this.apiUrl}/${id}`, { status }).subscribe({
      next: updated => {
        this.itemsSignal.update(items =>
          items.map(item => item.id === id ? updated : item)
        );
      },
      error: () => {
        this.errorSignal.set('Impossible de modifier le statut.');
      },
    });
  }

  addItem(
    newItem: Omit<WatchItem, 'id' | 'addedAt'>
  ): Observable<WatchItem> {
    const item = {
      ...newItem,
      addedAt: new Date().toISOString(),
    };

    return this.http.post<WatchItem>(this.apiUrl, item).pipe(
      tap(created => {
        this.itemsSignal.update(items => [...items, created]);
      })
    );
  }

  updateItem(
    id: number,
    changes: Partial<Omit<WatchItem, 'id' | 'addedAt'>>
  ): Observable<WatchItem> {
    return this.http.patch<WatchItem>(
      `${this.apiUrl}/${id}`,
      changes
    ).pipe(
      tap(updated => {
        this.itemsSignal.update(items =>
          items.map(item => item.id === id ? updated : item)
        );
      })
    );
  }

  deleteItem(id: number): void {
    this.errorSignal.set(null);

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.itemsSignal.update(items =>
          items.filter(item => item.id !== id)
        );
      },
      error: () => {
        this.errorSignal.set('Impossible de supprimer cet élément.');
      },
    });
  }
}
