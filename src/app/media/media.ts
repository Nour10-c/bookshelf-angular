
export type WatchType = 'movie' | 'series' | 'anime' | 'documentary';

export type WatchStatus = 'planned' | 'in-progress' | 'done';

export interface WatchItem {
  id: number;
  title: string;
  type: WatchType;
  platform: string;
  status: WatchStatus;
  rating?: number;
  addedAt: string;
}
