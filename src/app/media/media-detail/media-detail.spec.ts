import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { MediaDetail } from './media-detail';
import { WatchItem } from '../media';

describe('MediaDetail', () => {
  let component: MediaDetail;
  let fixture: ComponentFixture<MediaDetail>;
  let httpMock: HttpTestingController;

  const mockItem: WatchItem = {
    id: 1,
    title: 'Inception',
    type: 'movie',
    platform: 'Netflix',
    status: 'done',
    rating: 5,
    addedAt: '2026-11-08T10:00:00.000Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaDetail],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(MediaDetail);
    fixture.componentRef.setInput('id', '1');

    httpMock.expectOne('http://localhost:3000/watchlist').flush([mockItem]);

    fixture.detectChanges();
    await fixture.whenStable();

    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
