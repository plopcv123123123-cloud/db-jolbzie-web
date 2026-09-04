'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, Play, Plus, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { featuredPortfolioItems, portfolioFilters, portfolioItems, type PortfolioArtwork, type PortfolioFilter, type PortfolioItem } from '@/data/portfolio';
import type { UgcMedia, UgcProject } from '@/data/ugc';

const PAGE_SIZE = 9;

type PreviewMedia = UgcMedia & {
  previewId: string;
  title: string;
  category: 'UGC' | 'Caras' | 'Dibujos';
  thumbnail?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
};

function ArtworkWatermark() {
  return <span className="artwork-watermark" aria-hidden="true">DB_JOLBZIE</span>;
}

function artworkToPreview(artwork: PortfolioArtwork): PreviewMedia {
  return { id: artwork.id, previewId: `artwork:${artwork.id}`, type: 'image', category: artwork.category, title: artwork.title, src: artwork.src, thumbnail: artwork.thumbnail, alt: artwork.alt, width: artwork.width, height: artwork.height, thumbnailWidth: artwork.thumbnailWidth, thumbnailHeight: artwork.thumbnailHeight };
}

function projectMediaToPreview(project: UgcProject, media: UgcMedia): PreviewMedia {
  return { ...media, previewId: `ugc:${project.id}:${media.id}`, title: project.title, category: 'UGC' };
}

function previewMediaFor(items: PortfolioItem[], includeUgcGallery: boolean) {
  return items.flatMap(item => item.kind === 'artwork'
    ? [artworkToPreview(item)]
    : (includeUgcGallery ? [item.mainMedia, ...item.galleryMedia] : [item.coverMedia]).map(media => projectMediaToPreview(item, media)));
}

function MediaThumbnail({ media, eager = false }: { media: UgcMedia; eager?: boolean }) {
  const previewMedia = media as UgcMedia & Partial<Pick<PreviewMedia, 'thumbnail' | 'thumbnailWidth' | 'thumbnailHeight'>>;
  const previewSrc = media.type === 'image' && previewMedia.thumbnail ? previewMedia.thumbnail : media.src;
  const previewWidth = previewMedia.thumbnailWidth ?? media.width;
  const previewHeight = previewMedia.thumbnailHeight ?? media.height;

  return <>
    {media.type === 'image'
      ? <Image className="face-artwork-image" src={previewSrc} width={previewWidth} height={previewHeight} alt={media.alt} loading={eager ? 'eager' : 'lazy'} draggable={false} unoptimized />
      : <><video className="face-artwork-image ugc-video-thumbnail" src={media.src} poster={media.poster} autoPlay loop muted playsInline preload="metadata" controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback draggable={false} aria-label={media.alt} /><span className="ugc-play-mark" aria-hidden="true"><Play size={18} fill="currentColor" /></span></>}
    <ArtworkWatermark />
  </>;
}

function ExpandedPreview({ media }: { media: PreviewMedia }) {
  const [loaded, setLoaded] = useState(media.type === 'video');
  const [failed, setFailed] = useState(false);
  return <div className="face-preview-stage" aria-busy={!loaded && !failed}>
    <div className="preview-artwork-canvas" data-protected-media style={{ '--artwork-ratio': media.width / media.height } as CSSProperties}>
      {media.type === 'video'
        ? <video className="ugc-preview-video" src={media.src} poster={media.poster} controls autoPlay muted playsInline preload="metadata" controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback draggable={false} aria-label={media.alt} />
        : <>
          {!loaded && media.thumbnail && <Image className="face-preview-thumbnail" src={media.thumbnail} width={media.thumbnailWidth} height={media.thumbnailHeight} alt="" aria-hidden="true" draggable={false} unoptimized />}
          <Image className={`face-preview-image ${loaded ? 'is-loaded' : ''}`} src={media.src} width={media.width} height={media.height} alt={media.alt} loading="eager" draggable={false} unoptimized onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
        </>}
      <span className="artwork-watermark-center" aria-hidden="true">DB_JOLBZIE</span>
      <ArtworkWatermark />
    </div>
    {!loaded && <output className="face-preview-status">{failed ? 'No se pudo cargar la vista ampliada.' : 'Cargando obra…'}</output>}
  </div>;
}

export function PortfolioGallery() {
  const [category, setCategory] = useState<PortfolioFilter>('Todos');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isOverview = category === 'Todos';
  const filteredItems = isOverview ? featuredPortfolioItems : portfolioItems.filter(item => item.category === category);
  const visibleItems = filteredItems.slice(0, visibleCount);
  const previewItems = previewMediaFor(filteredItems, category === 'UGC');
  const selectedUgcProjectId = category === 'UGC' && selectedId?.startsWith('ugc:') ? selectedId.split(':')[1] : null;
  const activePreviewItems = selectedUgcProjectId ? previewItems.filter(item => item.previewId.startsWith(`ugc:${selectedUgcProjectId}:`)) : previewItems;
  const selectedIndex = activePreviewItems.findIndex(item => item.previewId === selectedId);
  const selectedMedia = activePreviewItems[selectedIndex];

  function changeCategory(nextCategory: PortfolioFilter) {
    setCategory(nextCategory);
    setVisibleCount(PAGE_SIZE);
    setSelectedId(null);
  }

  function openPreview(event: MouseEvent<HTMLButtonElement>, previewId: string) {
    returnFocusRef.current = event.currentTarget;
    setSelectedId(previewId);
  }

  function changeMedia(direction: number) {
    if (!activePreviewItems.length) return;
    const nextIndex = (selectedIndex + direction + activePreviewItems.length) % activePreviewItems.length;
    setSelectedId(activePreviewItems[nextIndex].previewId);
  }

  function handlePreviewKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      changeMedia(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  return <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title">
    <div className="portfolio-backdrop" aria-hidden="true">
      <span className="portfolio-orbit portfolio-orbit-one" />
      <span className="portfolio-orbit portfolio-orbit-two" />
      <span className="portfolio-sparkle portfolio-sparkle-one">✦</span>
      <span className="portfolio-sparkle portfolio-sparkle-two">✧</span>
    </div>
    <div className="portfolio-heading">
      <div className="portfolio-intro">
        <div className="section-label"><span className="label-star" aria-hidden="true">✳</span><span>PORTAFOLIO</span><span className="label-line" /></div>
        <h2 id="portfolio-title">Ideas con personalidad.</h2>
        <div className="portfolio-intro-footer"><p>Una selección de nuestro universo creativo.</p><span className="gallery-aside">un vistazo a lo que creamos <span className="star" aria-hidden="true">✦</span></span></div>
      </div>
      <div className="portfolio-toolbar">
        <fieldset className="gallery-filters" aria-label="Filtrar el portafolio">
          {portfolioFilters.map(filter => <Button key={filter} variant="ghost" className={`filter-button ${category === filter ? 'active' : ''}`} aria-pressed={category === filter} aria-controls="portfolio-gallery" onClick={() => changeCategory(filter)}>{filter}</Button>)}
        </fieldset>
      </div>
    </div>

    {category === 'UGC' ? <div id="portfolio-gallery" className="ugc-project-gallery">
      {visibleItems.map((item, projectIndex) => item.kind === 'ugc' && <article className="ugc-project" key={item.id}>
        <span className="ugc-project-index" aria-hidden="true">PROYECTO {String(projectIndex + 1).padStart(2, '0')} <b>✦</b></span>
        <Button variant="ghost" className="ugc-main-media" aria-haspopup="dialog" aria-label={`Ampliar ${item.mainMedia.type === 'video' ? 'video' : 'imagen'} principal de ${item.title}`} onClick={event => openPreview(event, projectMediaToPreview(item, item.mainMedia).previewId)}>
          <span className="ugc-media-canvas" data-protected-media style={{ aspectRatio: `${item.mainMedia.width} / ${item.mainMedia.height}` }}><MediaThumbnail media={item.mainMedia} /></span>
          <span className="face-zoom-mark" aria-hidden="true"><ZoomIn size={17} /></span>
        </Button>
        {item.galleryMedia.length > 0 && <div className="ugc-secondary-media">
          {item.galleryMedia.map(media => <Button key={media.id} variant="ghost" className="ugc-secondary-button" aria-haspopup="dialog" aria-label={`Abrir ${media.alt.toLocaleLowerCase('es')}`} onClick={event => openPreview(event, projectMediaToPreview(item, media).previewId)}>
            <span className="ugc-media-canvas" data-protected-media style={{ aspectRatio: `${media.width} / ${media.height}` }}><MediaThumbnail media={media} /></span>
          </Button>)}
        </div>}
        <div className="ugc-project-copy">
          <div><p className="ugc-project-type">{item.type}</p><h3>{item.title}</h3>{item.description && <p className="ugc-project-description">{item.description}</p>}</div>
          {item.robloxUrl && <Button variant="outline" className="ugc-roblox-link" render={<a href={item.robloxUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${item.title} en Roblox (abre una pestaña nueva)`} />}>
            Ver en Roblox <ExternalLink size={16} aria-hidden="true" />
          </Button>}
        </div>
      </article>)}
    </div> : <div id="portfolio-gallery" className={`artwork-gallery ${category === 'Dibujos' || category === 'Todos' ? 'artwork-gallery-editorial' : ''}`}>
      {visibleItems.map((item, index) => {
        const media = item.kind === 'artwork' ? artworkToPreview(item) : projectMediaToPreview(item, item.coverMedia);
        const categoryLabel = item.kind === 'ugc' ? 'UGC' : item.category === 'Caras' ? 'CARA PERSONALIZADA' : 'ILUSTRACIÓN';
        return <figure className={`portfolio-artwork ${item.category === 'Dibujos' ? 'portfolio-drawing' : ''} ${item.kind === 'ugc' ? 'portfolio-ugc-overview' : ''}`} key={item.id}>
          <div className="artwork-card-frame">
            <Button variant="ghost" className="face-artwork-button" aria-haspopup="dialog" aria-label={`Ampliar ${item.title.toLocaleLowerCase('es')} ${index + 1}`} onClick={event => openPreview(event, media.previewId)}>
              <span className="artwork-image-wrap" data-protected-media style={{ aspectRatio: `${media.width} / ${media.height}` }}><MediaThumbnail media={media} /></span>
              <span className="artwork-view-cue" aria-hidden="true">Ver obra <ExternalLink size={13} /></span>
              <span className="face-zoom-mark" aria-hidden="true"><ZoomIn size={17} /></span>
            </Button>
          </div>
          <figcaption><span className="artwork-caption-copy"><span className="artwork-category">{categoryLabel}</span>{item.kind === 'ugc' && <strong className="artwork-title">{item.title}</strong>}</span><span className="artwork-number" aria-hidden="true"><span>✦</span>{String(index + 1).padStart(2, '0')}</span></figcaption>
        </figure>;
      })}
    </div>}

    <div className="gallery-bottom">
      <output className="gallery-count">{isOverview ? 'Selección destacada' : category === 'UGC' ? `${filteredItems.length} proyectos UGC` : `${visibleItems.length} de ${filteredItems.length} ${category === 'Caras' ? 'caras personalizadas' : 'ilustraciones'}`}</output>
      {!isOverview && visibleCount < filteredItems.length && <Button variant="outline" className="button button-outline gallery-more" aria-controls="portfolio-gallery" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Mostrar más <Plus size={16} aria-hidden="true" /></Button>}
      {previewItems.length > 0 && <p className="gallery-hint">{isOverview ? 'Explora cada categoría para descubrir la colección completa.' : category === 'UGC' ? 'Selecciona una imagen o video para verlo en detalle.' : 'Selecciona una obra para verla en detalle.'}</p>}
    </div>

    <Dialog open={selectedId !== null} onOpenChange={open => { if (!open) setSelectedId(null); }}>
      <DialogContent className={`face-lightbox ${selectedMedia?.category === 'Dibujos' ? 'drawing-lightbox' : ''} ${selectedMedia?.category === 'UGC' ? 'ugc-lightbox' : ''}`} overlayClassName="face-lightbox-overlay" showCloseButton={false} initialFocus={closeButtonRef} finalFocus={returnFocusRef} onKeyDown={handlePreviewKeyDown}>
        <div className="face-preview-header"><div><p className="eyebrow">{selectedMedia?.category.toLocaleUpperCase('es')} · DB_JOLBZIE</p><DialogTitle>{selectedMedia?.title ?? 'Vista ampliada'}</DialogTitle></div><DialogClose render={<Button ref={closeButtonRef} variant="ghost" className="face-preview-control" size="icon" aria-label="Cerrar vista ampliada" />}><X size={20} /></DialogClose></div>
        <DialogDescription className="sr-only">Usa los botones o las flechas del teclado para recorrer las obras. Pulsa Escape o haz clic fuera para cerrar.</DialogDescription>
        {selectedMedia && <ExpandedPreview media={selectedMedia} key={selectedMedia.previewId} />}
        <div className="face-preview-navigation">
          <Button variant="outline" className="face-preview-control" size="icon" aria-label="Ver obra anterior" disabled={activePreviewItems.length < 2} onClick={() => changeMedia(-1)}><ArrowLeft size={20} /></Button>
          <p className="face-preview-counter" aria-live="polite" aria-atomic="true">{selectedIndex + 1} de {activePreviewItems.length}</p>
          <Button variant="outline" className="face-preview-control" size="icon" aria-label="Ver obra siguiente" disabled={activePreviewItems.length < 2} onClick={() => changeMedia(1)}><ArrowRight size={20} /></Button>
        </div>
      </DialogContent>
    </Dialog>
  </section>;
}
