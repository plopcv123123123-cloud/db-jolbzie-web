'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Plus, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { featuredPortfolioItems, portfolioFilters, portfolioItems, type PortfolioArtwork, type PortfolioFilter } from '@/data/portfolio';

const PAGE_SIZE = 9;

function ArtworkWatermark() {
  return <span className="artwork-watermark" aria-hidden="true">DB_JOLBZIE</span>;
}

function ArtworkPreview({ artwork }: { artwork: PortfolioArtwork }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return <div className="face-preview-stage" aria-busy={!loaded && !failed}>
    <div className="preview-artwork-canvas" style={{ '--artwork-ratio': artwork.width / artwork.height } as CSSProperties}>
      {!loaded && <Image className="face-preview-thumbnail" src={artwork.thumbnail} width={artwork.thumbnailWidth} height={artwork.thumbnailHeight} alt="" aria-hidden="true" unoptimized />}
      <Image className={`face-preview-image ${loaded ? 'is-loaded' : ''}`} src={artwork.src} width={artwork.width} height={artwork.height} alt={artwork.alt} loading="eager" unoptimized onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
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
  const previewItems = filteredItems.filter((item): item is PortfolioArtwork => item.kind === 'artwork');
  const selectedIndex = previewItems.findIndex(item => item.id === selectedId);
  const selectedArtwork = previewItems[selectedIndex];

  function changeCategory(nextCategory: PortfolioFilter) {
    setCategory(nextCategory);
    setVisibleCount(PAGE_SIZE);
    setSelectedId(null);
  }

  function changeArtwork(direction: number) {
    if (!previewItems.length) return;
    const nextIndex = (selectedIndex + direction + previewItems.length) % previewItems.length;
    setSelectedId(previewItems[nextIndex].id);
  }

  function handlePreviewKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      changeArtwork(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  return <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title">
    <div className="portfolio-heading">
      <div className="portfolio-intro">
        <div className="section-label"><span className="label-star" aria-hidden="true">✳</span><span>PORTAFOLIO</span><span className="label-line" /></div>
        <h2 id="portfolio-title">Ideas con personalidad.</h2>
        <p>Una selección de nuestro universo creativo.</p>
      </div>
      <div className="portfolio-toolbar">
        <fieldset className="gallery-filters" aria-label="Filtrar el portafolio">
          {portfolioFilters.map(filter => <Button key={filter} variant="ghost" className={`filter-button ${category === filter ? 'active' : ''}`} aria-pressed={category === filter} aria-controls="portfolio-gallery" onClick={() => changeCategory(filter)}>{filter}</Button>)}
        </fieldset>
        <span className="gallery-aside">un vistazo a lo que creamos <span className="star" aria-hidden="true">✦</span></span>
      </div>
    </div>

    <div id="portfolio-gallery" className={`artwork-gallery ${category === 'Dibujos' || category === 'Todos' ? 'artwork-gallery-editorial' : ''}`}>
      {visibleItems.map((item, index) => item.kind === 'artwork' ? <figure className={`portfolio-artwork ${item.category === 'Dibujos' ? 'portfolio-drawing' : ''}`} key={item.id}>
        <Button variant="ghost" className="face-artwork-button" aria-haspopup="dialog" aria-label={`Ampliar ${item.title.toLocaleLowerCase('es')} ${index + 1}`} onClick={event => { returnFocusRef.current = event.currentTarget; setSelectedId(item.id); }}>
          <span className="artwork-image-wrap" style={{ aspectRatio: `${item.thumbnailWidth} / ${item.thumbnailHeight}` }}>
            <Image className="face-artwork-image" src={item.thumbnail} width={item.thumbnailWidth} height={item.thumbnailHeight} alt={item.alt} loading="lazy" unoptimized />
            <ArtworkWatermark />
          </span>
          <span className="face-zoom-mark" aria-hidden="true"><ZoomIn size={17} /></span>
        </Button>
        <figcaption><span>{item.title}</span><span className="artwork-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></figcaption>
      </figure> : <article className="portfolio-upcoming" key={item.id}>
        <div className="upcoming-artwork-frame"><span className="project-badge">{item.category.toUpperCase()}</span><div className="placeholder-content small"><span className="placeholder-mark" aria-hidden="true"><Plus size={19} strokeWidth={1} /></span><span className="placeholder-label">{item.label}</span><span className="placeholder-note">Próximamente: obra original</span></div></div>
        <div className="upcoming-artwork-caption"><h3>{item.title}</h3><p>{item.category} · Próximamente</p></div>
      </article>)}
    </div>

    <div className="gallery-bottom">
      <output className="gallery-count">{isOverview ? 'Selección destacada' : `${visibleItems.length} de ${filteredItems.length} ${category === 'Caras' ? 'caras personalizadas' : category === 'Dibujos' ? 'ilustraciones' : 'trabajos'}`}</output>
      {!isOverview && visibleCount < filteredItems.length && <Button variant="outline" className="button button-outline gallery-more" aria-controls="portfolio-gallery" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Mostrar más <Plus size={16} aria-hidden="true" /></Button>}
      {previewItems.length > 0 && <p className="gallery-hint">{isOverview ? 'Explora cada categoría para descubrir la colección completa.' : 'Selecciona una obra para verla en detalle.'}</p>}
    </div>

    <Dialog open={selectedId !== null} onOpenChange={open => { if (!open) setSelectedId(null); }}>
      <DialogContent className={`face-lightbox ${selectedArtwork?.category === 'Dibujos' ? 'drawing-lightbox' : ''}`} overlayClassName="face-lightbox-overlay" showCloseButton={false} initialFocus={closeButtonRef} finalFocus={returnFocusRef} onKeyDown={handlePreviewKeyDown}>
        <div className="face-preview-header"><div><p className="eyebrow">{selectedArtwork?.category.toLocaleUpperCase('es')} · DB_JOLBZIE</p><DialogTitle>{selectedArtwork?.title ?? 'Vista ampliada'}</DialogTitle></div><DialogClose render={<Button ref={closeButtonRef} variant="ghost" className="face-preview-control" size="icon" aria-label="Cerrar vista ampliada" />}><X size={20} /></DialogClose></div>
        <DialogDescription className="sr-only">Usa los botones o las flechas del teclado para recorrer las obras. Pulsa Escape o haz clic fuera para cerrar.</DialogDescription>
        {selectedArtwork && <ArtworkPreview artwork={selectedArtwork} key={selectedArtwork.id} />}
        <div className="face-preview-navigation">
          <Button variant="outline" className="face-preview-control" size="icon" aria-label="Ver obra anterior" disabled={previewItems.length < 2} onClick={() => changeArtwork(-1)}><ArrowLeft size={20} /></Button>
          <p className="face-preview-counter" aria-live="polite" aria-atomic="true">{selectedIndex + 1} de {previewItems.length}</p>
          <Button variant="outline" className="face-preview-control" size="icon" aria-label="Ver obra siguiente" disabled={previewItems.length < 2} onClick={() => changeArtwork(1)}><ArrowRight size={20} /></Button>
        </div>
      </DialogContent>
    </Dialog>
  </section>;
}
