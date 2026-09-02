'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Heart, Menu, Plus, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/social-links';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  { title: 'Comisiones UGC', description: 'Pequeños detalles, mucha personalidad. Accesorios únicos para tu mundo de Roblox.', tag: 'Para destacar a tu manera' },
  { title: 'Caras personalizadas', description: 'Un poco de actitud, un poco de encanto. Expresiones que van contigo.', tag: 'Todo está en la expresión' },
  { title: 'Arte digital', description: 'Dibujos, ilustraciones, iconos y banners creados por nuestro equipo para darle forma a tus ideas.', tag: 'Del boceto a la historia' },
  { title: 'Pedidos personalizados', description: '¿Tienes algo diferente en mente? Démosle forma a tu idea.', tag: 'Tu idea empieza aquí' },
];
const projects = [
  { category: 'UGC', title: 'Un mundo de pequeños detalles', label: 'Proyecto UGC destacado', className: 'featured' },
  { category: 'Caras', title: 'Expresiones a tu manera', label: 'Muestra de cara personalizada', className: 'faces' },
  { category: 'Dibujos', title: 'Ideas que se vuelven arte', label: 'Muestra de arte digital', className: 'drawings' },
];
const terms = ['Pagos', 'Revisiones', 'Tiempo de entrega', 'Derechos de uso', 'Uso comercial', 'Reembolsos'];
const navigation = [['Portafolio', '#portfolio'], ['Servicios', '#services'], ['Nosotros', '#about'], ['Términos', '#terms']];

function Star({ className = '' }: { className?: string }) {
  return <span className={`star ${className}`} aria-hidden="true">✦</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span className="label-star" aria-hidden="true">✳</span>{children}<span className="label-line" /></div>;
}
function MediaPlaceholder({ label, small = false }: { label: string; small?: boolean }) {
  return <div className={`placeholder-content ${small ? 'small' : ''}`}>
    <span className="placeholder-mark" aria-hidden="true"><Plus size={19} strokeWidth={1} /></span>
    <span className="placeholder-label">{label}</span><span className="placeholder-note">Próximamente: obra original</span>
  </div>;
}

export default function Home() {
  const [category, setCategory] = useState('Todo');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<'commission' | 'pricing' | 'social' | null>(null);
  const shownProjects = projects.filter(project => category === 'Todo' || project.category === category);

  return <>
    <a href="#main" className="skip-link">Saltar al contenido</a>
    <header id="top" className="site-header"><div className="header-inner">
      <a className="wordmark" href="#top" aria-label="Inicio de DB_JOLBZIE">DB_JOLBZIE<span>✦</span></a>
      <nav className="desktop-nav" aria-label="Navegación principal">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><SocialLinks onSelect={() => setDialog('social')} /><Button className="button header-commission" variant="outline" onClick={() => setDialog('commission')}>Pedir comisión <ArrowUpRight size={15} /></Button><Button variant="ghost" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}</nav>}</header>

    <main id="main" className="page-shell">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy">
        <p className="eyebrow"><span className="tiny-dot" /> COLECTIVO CREATIVO · ARTE DIGITAL Y UGC</p>
        <h1 id="hero-title">Arte hecho<br />a <span className="hero-highlight">tu medida</span><span className="lilac">.</span><Star className="title-star" /></h1>
        <p className="hero-description">Creamos UGC, caras personalizadas, dibujos, ilustraciones, iconos y banners. Damos vida a <em>tus</em> ideas con comisiones personalizadas.</p>
        <div className="hero-buttons"><a className="button button-primary" href="#portfolio">Ver portafolio <ArrowDown size={16} /></a><Button className="button button-outline" variant="outline" onClick={() => setDialog('commission')}>Pedir comisión <ArrowUpRight size={16} /></Button></div>
        <p className="hero-footnote"><Heart size={12} strokeWidth={1.4} /> Distintas miradas, una misma pasión por crear.</p>
      </div><div className="hero-art" aria-label="Espacio reservado para la portada principal con tres personajes">
        <div className="hero-blob" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true" /><Star className="hero-star-one" /><Star className="hero-star-two" /><Star className="hero-star-three" /><div className="hero-backplate" aria-hidden="true" />
        <div className="hero-media"><span className="media-corner top-left" aria-hidden="true" /><span className="media-corner bottom-right" aria-hidden="true" /><MediaPlaceholder label="Portada con tres personajes" /><span className="media-index" aria-hidden="true">01 / NUESTRO UNIVERSO CREATIVO</span></div>
        <span className="hero-sticker"><Sparkles size={14} strokeWidth={1.5} /> con un toque de magia</span><span className="handwritten hero-caption">un espacio para imaginar <span aria-hidden="true">⤴</span></span>
      </div></section>

      <section id="services" className="services-section" aria-labelledby="services-title"><SectionLabel><h2 id="services-title">LO QUE OFRECEMOS</h2></SectionLabel><div className="services-grid">{services.map((service, index) => <article className="service" key={service.title}><div className="service-top"><span className="service-number">0{index + 1}</span><span className="service-accent" aria-hidden="true">{index === 1 ? '✧' : index === 3 ? '♡' : '✦'}</span></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-tag">{service.tag}</span></article>)}</div></section>

      <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title"><div className="portfolio-heading"><SectionLabel><h2 id="portfolio-title">TRABAJOS DESTACADOS</h2></SectionLabel><fieldset className="gallery-filters" aria-label="Filtrar el portafolio">{['Todo', 'UGC', 'Caras', 'Dibujos'].map(filter => <Button key={filter} variant="ghost" className={`filter-button ${category === filter ? 'active' : ''}`} aria-pressed={category === filter} aria-controls="portfolio-gallery" onClick={() => setCategory(filter)}>{filter}</Button>)}</fieldset><span className="gallery-aside">un vistazo a lo que creamos <Star /></span></div>
        <div id="portfolio-gallery" className={`portfolio-grid ${category !== 'Todo' ? 'filtered' : ''}`} aria-live="polite">{shownProjects.map(project => <article className={`project ${project.className}`} key={project.category}><div className="project-frame"><span className="project-badge">{project.category === 'UGC' ? 'DESTACADO' : project.category.toUpperCase()}</span><MediaPlaceholder label={project.label} small /><span className="frame-corner" aria-hidden="true">✧</span></div><div className="project-caption"><div><h3>{project.title}</h3><p>{project.category} <span>· Próximamente</span></p></div></div></article>)}</div>
        <p className="gallery-note">Algo bonito está tomando forma. Pronto verás nuestras creaciones aquí.</p>
      </section>

      <div className="about-terms"><section id="about" className="about-section" aria-labelledby="about-title"><SectionLabel><h2 id="about-title">SOBRE NOSOTROS</h2></SectionLabel><div className="about-content"><div className="about-art"><div className="about-outline" aria-hidden="true" /><div className="about-media"><MediaPlaceholder label="Nuestro colectivo" small /></div><Star className="about-star" /><span className="about-sticker" aria-hidden="true">nuestro equipo ♡</span></div><div className="about-copy"><h3>Hola, somos Jolbzie<span className="lilac">.</span> <span className="greeting-star" aria-hidden="true">✳</span></h3><p>Somos un grupo creativo que trabaja en UGC, caras personalizadas, dibujos, ilustraciones y arte digital.</p><p>Nos encanta convertir ideas en creaciones con personalidad. Cuidamos cada detalle y unimos nuestros estilos para crear algo único, muy <em>tuyo</em>.</p><p className="about-thanks">Gracias por estar aquí. Creemos algo que te encante.</p><span className="signature handwritten">— Equipo Jolbzie ♡</span></div></div></section>
      <section id="terms" className="terms-section" aria-labelledby="terms-title"><SectionLabel><h2 id="terms-title">TÉRMINOS DE SERVICIO</h2></SectionLabel><p className="terms-intro">Todo claro antes de empezar.</p><Accordion className="terms-accordion">{terms.map(term => <AccordionItem key={term} value={term}><AccordionTrigger className="terms-trigger">{term}<Plus className="term-plus" size={14} /></AccordionTrigger><AccordionContent className="terms-content">La información sobre {term.toLocaleLowerCase('es')} estará disponible aquí antes de abrir las comisiones. Vuelve pronto para consultar las condiciones de Jolbzie.</AccordionContent></AccordionItem>)}</Accordion></section></div>

      <section id="commission" className="commission-section" aria-labelledby="commission-title"><div className="cta-orbit orbit-one" aria-hidden="true" /><div className="cta-orbit orbit-two" aria-hidden="true" /><Star className="cta-star-one" /><Star className="cta-star-two" /><span className="cta-small-star" aria-hidden="true">✧</span><p className="eyebrow">TU IDEA. NUESTRA CREATIVIDAD. UN TOQUE DE MAGIA.</p><h2 id="commission-title">Creemos algo <span className="handwritten">muy tuyo.</span></h2><p>¿Tienes un personaje, un concepto o una idea en mente?</p><div className="cta-buttons"><Button className="button button-primary" onClick={() => setDialog('commission')}>Pedir una comisión <ArrowUpRight size={16} /></Button><Button className="button button-outline" variant="outline" onClick={() => setDialog('pricing')}>Ver precios y condiciones</Button></div><span className="cta-love" aria-hidden="true">♡</span></section>
    </main>

    <footer className="site-footer"><div className="footer-inner"><div><a className="wordmark" href="#top">DB_JOLBZIE<span>✦</span></a><p>Muchas ideas. Un mismo impulso creativo.</p></div><p className="footer-copyright">© {new Date().getFullYear()} DB_JOLBZIE</p></div></footer>

    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="artist-dialog"><span className="dialog-sparkle" aria-hidden="true">✦</span><p className="eyebrow">COLECTIVO DB_JOLBZIE</p><DialogTitle className="dialog-title">{dialog === 'commission' ? 'Tu idea empieza aquí.' : dialog === 'pricing' ? 'Todo claro desde el inicio.' : 'Sigamos en contacto.'}</DialogTitle><DialogDescription className="dialog-description">{dialog === 'commission' ? 'Pronto podrás pedir tu comisión. Aquí encontrarás nuestros datos de contacto y la disponibilidad del equipo cuando todo esté listo.' : dialog === 'pricing' ? 'Estamos preparando los precios y las condiciones de las comisiones. Podrás consultarlos aquí antes de que abramos los pedidos.' : 'Pronto encontrarás aquí los enlaces a nuestras redes oficiales. Discord será nuestro canal principal para hablar de tus ideas y comisiones.'}</DialogDescription><div className="dialog-note"><Heart size={16} />{dialog === 'commission' ? 'Mientras tanto, imagina tu proyecto, su estilo y esos detalles que lo hacen único.' : 'Gracias por ser parte de nuestro rincón creativo.'}</div><Button className="button button-primary" onClick={() => { setDialog(null); document.getElementById(dialog === 'pricing' ? 'terms' : 'services')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>{dialog === 'pricing' ? 'Ver condiciones' : 'Ver lo que ofrecemos'}<ArrowDown size={15} /></Button></DialogContent></Dialog>
  </>;
}
