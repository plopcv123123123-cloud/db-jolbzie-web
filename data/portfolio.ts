import faceData from './faces.json';
import drawingData from './drawings.json';
import { ugcProjects, type UgcProject } from './ugc';

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

export type PortfolioItem = PortfolioArtwork | UgcProject;

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
  ...ugcProjects,
  ...faceArtworks,
  ...drawingArtworks,
];

// Edit this short selection independently of the complete category collections.
export const featuredPortfolioIds = [
  'ilustracion-02',
  'cara-01',
  'ilustracion-18',
  'cara-14',
  'ilustracion-10',
  'vara-celestial',
  'ilustracion-21',
  'cara-07',
  'capa-de-teto',
] as const;

export const featuredPortfolioItems = featuredPortfolioIds
  .map(id => portfolioItems.find(item => item.id === id))
  .filter((item): item is PortfolioItem => item !== undefined);
