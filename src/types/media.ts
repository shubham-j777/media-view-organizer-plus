
export type MediaType = 'anime' | 'movie' | 'series';

export interface Media {
  id: string;
  title: string;
  type: MediaType;
  imageUrl: string;
  summary: string;
  rating: number | null;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
