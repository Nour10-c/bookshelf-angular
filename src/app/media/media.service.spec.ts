import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { MediaService } from './media.service';
import { WatchItem } from './media';

describe('MediaService', () => {
  let service: MediaService;
  let httpMock: HttpTestingController;

  const mockItems: WatchItem[] = [
    {
      id: 1,
      title: 'Inception',
      type: 'movie',
      platform: 'Netflix',
      status: 'done',
      rating: 5,
      addedAt: '2026-11-08T10:00:00.000Z',
    },
    {
      id: 2,
      title: 'Breaking Bad',
      type: 'series',
      platform: 'Netflix',
      status: 'planned',
      addedAt: '2026-11-08T10:00:00.000Z',
    },
    {
      id: 3,
      title: 'Berserk',
      type: 'anime',
      platform: 'Crunchyroll',
      status: 'done',
      addedAt: '2026-11-08T10:00:00.000Z',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MediaService);

    // Réponse simulée de la requête GET initiale.
    httpMock.expectOne('http://localhost:3000/watchlist').flush(mockItems);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load the media list', () => {
    expect(service.items().length).toBe(3);
  });

  it('should calculate the total number of media', () => {
    expect(service.totalItems()).toBe(3);
  });

  it('should calculate the number of completed media', () => {
    expect(service.completedItems()).toBe(2);
  });

  it('should calculate the number of planned media', () => {
    expect(service.plannedItems()).toBe(1);
  });

  it('should finish loading after receiving the API response', () => {
    expect(service.loading()).toBe(false);
  });
});
