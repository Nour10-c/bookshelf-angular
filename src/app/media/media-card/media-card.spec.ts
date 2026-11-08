import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MediaCard } from './media-card';
import { WatchItem } from '../media';

describe('MediaCard', () => {
  let component: MediaCard;
  let fixture: ComponentFixture<MediaCard>;

  const mockItem: WatchItem = {
    id: 1,
    title: 'Inception',
    type: 'movie',
    platform: 'Netflix',
    status: 'planned',
    rating: 5,
    posterUrl: '',
    addedAt: '2026-11-08T10:00:00.000Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCard);
    fixture.componentRef.setInput('item', mockItem);

    await fixture.whenStable();
    fixture.detectChanges();

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive a media item', () => {
    expect(fixture.componentInstance.item()).toEqual(mockItem);
  });
});
