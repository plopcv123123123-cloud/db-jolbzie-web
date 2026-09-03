import faceData from './faces.json';
import drawingData from './drawings.json';

export const portfolioFilters = ['Todos', 'UGC', 'Caras', 'Dibujos'] as const;
export type PortfolioFilter = typeof portfolioFilters[number];

export type PortfolioArtwork = {
  id: string;
  kind: 'artwork';
  category: 'Caras' | 'Dibujos';
  title: string;
  alt: string;
  thumbnail: string;
  src: string;
  width: number;
  height: number;
  thumbnailWidth: number;
  thumbnailHeight: number;
};

type UpcomingProject = {
  id: string;
  kind: 'upcoming';
  category: 'UGC';
  title: string;
  label: string;
};

export type PortfolioItem = PortfolioArtwork | UpcomingProject;

export const faceArtworks: PortfolioArtwork[] = faceData.map(artwork => ({
  ...artwork,
  kind: 'artwork',
  category: 'Caras',
}));

export const drawingArtworks: PortfolioArtwork[] = drawingData.map(artwork => ({
  ...artwork,
  kind: 'artwork',
  category: 'Dibujos',
}));

// Alternate categories so the combined selection gives both collections space.
const combinedArtworks = Array.from(
  { length: Math.max(faceArtworks.length, drawingArtworks.length) },
  (_, index) => [drawingArtworks[index], faceArtworks[index]].filter((item): item is PortfolioArtwork => Boolean(item)),
).flat();

export const portfolioItems: PortfolioItem[] = [
  { id: 'ugc-upcoming', kind: 'upcoming', category: 'UGC', title: 'Un mundo de pequeños detalles', label: 'Proyecto UGC destacado' },
  ...combinedArtworks,
];
