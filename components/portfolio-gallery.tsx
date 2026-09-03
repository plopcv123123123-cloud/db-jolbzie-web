'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Plus, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { portfolioFilters, portfolioItems, type FaceArtwork, type PortfolioFilter } from '@/data/portfolio';

const PAGE_SIZE = 12;

function ArtworkPreview({ artwork }: { artwork: FaceArtwork }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return <div className="face-preview-stage" aria-busy={!loaded && !failed}>
    <Image className="face-preview-thumbnail" src={artwork.thumbnail} width={artwork.thumbnailWidth} height={artwork.thumbnailHeight} alt="" aria-hidden="true" unoptimized />
    <Image className={`face-preview-image ${loaded ? 'is-loaded' : ''}`} src={artwork.src} width={artwork.width} height={artwork.height} alt={artwork.alt} loading="eager" unoptimized onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
    {!loaded && <output className="face-preview-status">{failed ? 'No se pudo cargar la vista ampliada.' : 'Cargando obra…'}</output>}
  </div>;
}

export function PortfolioGallery() {
  const [category, setCategory] = useState<PortfolioFilter>('Todo');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const filteredItems = portfolioItems.filter(item => category === 'Todo' || item.category === category);
  const visibleItems = filteredItems.slice(0, visibleCount);
  const previewItems = filteredItems.filter((item): item is FaceArtwork => item.kind === 'artwork');
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
      <div className="section-label"><span className="label-star" aria-hidden="true">✳</span><h2 id="portfolio-title">TRABAJOS DESTACADOS</h2><span className="label-line" /></div>
      <fieldset className="gallery-filters" aria-label="Filtrar el portafolio">
        {portfolioFilters.map(filter => <Button key={filter} variant="ghost" className={`filter-button ${category === filter ? 'active' : ''}`} aria-pressed={category === filter} aria-controls="portfolio-gallery" onClick={() => changeCategory(filter)}>{filter}</Button>)}
      </fieldset>
      <span className="gallery-aside">un vistazo a lo que creamos <span className="star" aria-hidden="true">✦</span></span>
    </div>

    <div id="portfolio-gallery" className="artwork-gallery">
      {visibleItems.map((item, index) => item.kind === 'artwork' ? <figure className="portfolio-artwork" key={item.id}>
        <Button variant="ghost" className="face-artwork-button" aria-haspopup="dialog" aria-label={`Ampliar cara personalizada ${item.id.replace('cara-', '')}`} onClick={event => { returnFocusRef.current = event.currentTarget; setSelectedId(item.id); }}>
          <Image className="face-artwork-image" src={item.thumbnail} width={item.thumbnailWidth} height={item.thumbnailHeight} alt={item.alt} loading="lazy" unoptimized />
          <span className="face-zoom-mark" aria-hidden="true"><ZoomIn size={17} /></span>
        </Button>
        <figcaption><span>{item.title}</span><span className="artwork-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></figcaption>
      </figure> : <article className="portfolio-upcoming" key={item.id}>
        <div className="upcoming-artwork-frame"><span className="project-badge">{item.category.toUpperCase()}</span><div className="placeholder-content small"><span className="placeholder-mark" aria-hidden="true"><Plus size={19} strokeWidth={1} /></span><span className="placeholder-label">{item.label}</span><span className="placeholder-note">Próximamente: obra original</span></div></div>
        <div className="upcoming-artwork-caption"><h3>{item.title}</h3><p>{item.category} · Próximamente</p></div>
      </article>)}
    </div>

    <div className="gallery-bottom">
      <output className="gallery-count">{visibleItems.length} de {filteredItems.length} {category === 'Caras' ? 'caras personalizadas' : 'trabajos'}</output>
      {visibleCount < filteredItems.length && <Button variant="outline" className="button button-outline gallery-more" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Mostrar más <Plus size={15} /></Button>}
      {previewItems.length > 0 && <p className="gallery-hint">Selecciona una obra para verla en detalle.</p>}
    </div>

    <Dialog open={selectedId !== null} onOpenChange={open => { if (!open) setSelectedId(null); }}>
      <DialogContent className="face-lightbox" overlayClassName="face-lightbox-overlay" showCloseButton={false} initialFocus={closeButtonRef} finalFocus={returnFocusRef} onKeyDown={handlePreviewKeyDown}>
        <div className="face-preview-header"><div><p className="eyebrow">CARAS · DB_JOLBZIE</p><DialogTitle>Cara personalizada</DialogTitle></div><DialogClose render={<Button ref={closeButtonRef} variant="ghost" className="face-preview-control" size="icon" aria-label="Cerrar vista ampliada" />}><X size={20} /></DialogClose></div>
        <DialogDescription className="sr-only">Usa los botones o las flechas del teclado para recorrer las obras. Pulsa Escape o haz clic fuera para cerrar.</DialogDescription>
        {selectedArtwork && <ArtworkPreview artwork={selectedArtwork} key={selectedArtwork.id} />}
        <div className="face-preview-navigation">
          <Button variant="outline" className="face-preview-control" size="icon" aria-label="Ver cara anterior" disabled={previewItems.length < 2} onClick={() => changeArtwork(-1)}><ArrowLeft size={20} /></Button>
          <p className="face-preview-counter" aria-live="polite" aria-atomic="true">{selectedIndex + 1} de {previewItems.length}</p>
          <Button variant="outline" className="face-preview-control" size="icon" aria-label="Ver cara siguiente" disabled={previewItems.length < 2} onClick={() => changeArtwork(1)}><ArrowRight size={20} /></Button>
        </div>
      </DialogContent>
    </Dialog>
  </section>;
}
