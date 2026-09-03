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

export const portfolioItems: PortfolioItem[] = [
  { id: 'ugc-upcoming', kind: 'upcoming', category: 'UGC', title: 'Un mundo de pequeños detalles', label: 'Proyecto UGC destacado' },
  ...faceArtworks,
  ...drawingArtworks,
];

// Edit this short selection independently of the complete category collections.
// UGC retains its existing placeholder until real assets are supplied.
export const featuredPortfolioIds = [
  'ilustracion-02',
  'cara-01',
  'ilustracion-18',
  'cara-14',
  'ilustracion-10',
  'ugc-upcoming',
  'ilustracion-21',
  'cara-07',
] as const;

export const featuredPortfolioItems = featuredPortfolioIds
  .map(id => portfolioItems.find(item => item.id === id))
  .filter((item): item is PortfolioItem => item !== undefined);
