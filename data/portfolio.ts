import faceData from './faces.json';

export const portfolioFilters = ['Todo', 'UGC', 'Caras', 'Dibujos'] as const;
export type PortfolioFilter = typeof portfolioFilters[number];

export type FaceArtwork = {
  id: string;
  kind: 'artwork';
  category: 'Caras';
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
  category: 'UGC' | 'Dibujos';
  title: string;
  label: string;
};

export type PortfolioItem = FaceArtwork | UpcomingProject;

export const faceArtworks: FaceArtwork[] = faceData.map(artwork => ({
  ...artwork,
  kind: 'artwork',
  category: 'Caras',
}));

export const portfolioItems: PortfolioItem[] = [
  { id: 'ugc-upcoming', kind: 'upcoming', category: 'UGC', title: 'Un mundo de pequeños detalles', label: 'Proyecto UGC destacado' },
  ...faceArtworks.slice(0, 1),
  { id: 'drawings-upcoming', kind: 'upcoming', category: 'Dibujos', title: 'Ideas que se vuelven arte', label: 'Muestra de arte digital' },
  ...faceArtworks.slice(1),
];
