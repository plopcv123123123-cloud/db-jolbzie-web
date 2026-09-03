export type UgcMedia = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  width: number;
  height: number;
  poster?: string;
};

export type UgcProject = {
  id: string;
  kind: 'ugc';
  category: 'UGC';
  title: string;
  type: string;
  description?: string;
  mainMedia: UgcMedia;
  galleryMedia: UgcMedia[];
  robloxUrl?: string;
  featured?: boolean;
};

export const ugcProjects: UgcProject[] = [
  {
    id: 'vara-celestial',
    kind: 'ugc',
    category: 'UGC',
    title: 'Vara Celestial',
    type: 'Accesorio UGC · Espalda',
    description: 'Una vara fantástica con detalles de conejo, tonos violetas y un cristal luminoso.',
    mainMedia: {
      id: 'vara-celestial-principal',
      type: 'image',
      src: '/portfolio/ugc/vara-celestial-principal.png',
      alt: 'Vista frontal de la Vara Celestial con figura de conejo y cristal azul',
      width: 740,
      height: 666,
    },
    galleryMedia: [
      {
        id: 'vara-celestial-detalle',
        type: 'image',
        src: '/portfolio/ugc/vara-celestial-detalle.png',
        alt: 'Vista posterior de la Vara Celestial sobre un escenario nevado',
        width: 764,
        height: 684,
      },
      {
        id: 'vara-celestial-video',
        type: 'video',
        src: '/portfolio/ugc/vara-celestial-video.mp4',
        poster: '/portfolio/ugc/vara-celestial-principal.png',
        alt: 'Video de presentación de la Vara Celestial',
        width: 800,
        height: 800,
      },
    ],
    robloxUrl: 'https://www.roblox.com/es/catalog/122165561426327/Vara-Celestial-de-Franch',
    featured: true,
  },
  {
    id: 'capa-de-teto',
    kind: 'ugc',
    category: 'UGC',
    title: 'Capa de Teto',
    type: 'Accesorio UGC · Frontal',
    description: 'Una capa ilustrada que lleva una expresión de Teto Kasane al avatar.',
    mainMedia: {
      id: 'capa-teto-principal',
      type: 'image',
      src: '/portfolio/ugc/capa-teto-principal.png',
      alt: 'Vista frontal de la Capa de Teto con ilustración en tonos rosados',
      width: 784,
      height: 716,
    },
    galleryMedia: [
      {
        id: 'capa-teto-detalle',
        type: 'image',
        src: '/portfolio/ugc/capa-teto-detalle.png',
        alt: 'Vista alternativa de la Capa de Teto dentro de Roblox Studio',
        width: 778,
        height: 667,
      },
      {
        id: 'capa-teto-video',
        type: 'video',
        src: '/portfolio/ugc/capa-teto-video.mp4',
        poster: '/portfolio/ugc/capa-teto-principal.png',
        alt: 'Video de presentación de la Capa de Teto',
        width: 800,
        height: 800,
      },
    ],
    robloxUrl: 'https://www.roblox.com/es/catalog/84215497891095/Teto-Kasane-Capa',
    featured: true,
  },
];
