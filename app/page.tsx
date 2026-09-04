'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Heart, Menu, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/social-links';
import { PortfolioGallery } from '@/components/portfolio-gallery';
import { commissionTopics, discordInviteUrl } from '@/data/commissions';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  { title: 'Comisiones UGC', description: 'Pequeños detalles, mucha personalidad. Creamos accesorios UGC únicos para complementar tu estilo y darle identidad a cada diseño.', tag: 'Para destacar a tu manera' },
  { title: 'Caras personalizadas', description: 'Un poco de actitud, un poco de encanto. Expresiones diseñadas para transmitir exactamente el estilo que buscas.', tag: 'Todo está en la expresión' },
  { title: 'Arte digital', description: 'Dibujos, ilustraciones, iconos y banners creados por nuestro equipo para darle forma a tus ideas.', tag: 'Del boceto a la historia' },
  { title: 'Pedidos personalizados', description: '¿Tienes algo diferente en mente? Cuéntanos tu idea y creemos algo especialmente para ti.', tag: 'Tu idea empieza aquí' },
];
const navigation = [['Portafolio', '#portfolio'], ['Servicios', '#services'], ['Nosotros', '#about'], ['Términos', '#terms']];

function Star({ className = '' }: { className?: string }) {
  return <span className={`star ${className}`} aria-hidden="true">✦</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span className="label-star" aria-hidden="true">✳</span>{children}<span className="label-line" /></div>;
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<'commission' | null>(null);

  return <>
    <a href="#main" className="skip-link">Saltar al contenido</a>
    <header id="top" className="site-header"><div className="header-inner">
      <a className="header-brand" href="#top" aria-label="Inicio de DB_JOLBZIE">
        <span className="header-brand-name"><span className="brand-prefix">DB</span><span className="brand-underscore">_</span><span className="brand-signature">JOLBZIE</span><span className="brand-star" aria-hidden="true">✦</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><SocialLinks /><Button className="button header-commission" onClick={() => setDialog('commission')}>Pedir comisión <ArrowUpRight size={17} /></Button><Button variant="ghost" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
    </div>{menuOpen && <div id="mobile-navigation" className="mobile-nav">
      <nav className="mobile-page-links" aria-label="Navegación móvil">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}</nav>
      <SocialLinks />
      <Button className="button header-commission mobile-commission" onClick={() => { setMenuOpen(false); setDialog('commission'); }}>Pedir comisión <ArrowUpRight size={17} /></Button>
    </div>}</header>

    <main id="main" className="page-shell">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy">
        <p className="eyebrow"><span className="tiny-dot" /> COLECTIVO CREATIVO · ARTE DIGITAL Y UGC</p>
        <h1 id="hero-title">Arte, UGC e<br />ilustraciones<br /><span className="hero-highlight">a tu medida</span><span className="lilac">.</span></h1>
        <p className="hero-description">Creamos UGC, caras personalizadas, dibujos, ilustraciones, iconos, banners y comisiones especiales. Arte digital con un estilo único y mucha personalidad.</p>
        <div className="hero-buttons"><a className="button button-primary" href="#portfolio">Ver portafolio <ArrowDown size={16} /></a><Button className="button button-outline" variant="outline" onClick={() => setDialog('commission')}>Pedir comisión <ArrowUpRight size={16} /></Button></div>
        <p className="hero-footnote"><Heart size={12} strokeWidth={1.4} /> Distintas miradas, una misma pasión por crear.</p>
      </div><div className="hero-visual" data-protected-media>
        <Image className="hero-banner" src="/images/db-jolbzie-hero.png" alt="Banner oficial de Jolbzie: tres personajes ilustrados junto al nombre del colectivo, en tonos violeta y rosa." width={1440} height={476} priority draggable={false} unoptimized />
        <Star className="banner-star-one" /><Star className="banner-star-two" />
      </div></section>

      <section id="services" className="services-section" aria-labelledby="services-title"><SectionLabel><h2 id="services-title">LO QUE OFRECEMOS</h2></SectionLabel><div className="services-grid">{services.map((service, index) => <article className="service" key={service.title}><div className="service-top"><span className="service-number">0{index + 1}</span><span className="service-accent" aria-hidden="true">{index === 1 ? '✧' : index === 3 ? '♡' : '✦'}</span></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-tag">{service.tag}</span></article>)}</div></section>

      <PortfolioGallery />

      <div className="about-terms">
        <section id="about" className="about-section" aria-labelledby="about-title">
          <SectionLabel><h2 id="about-title">SOBRE NOSOTROS</h2></SectionLabel>
          <div className="about-content">
            <div className="about-art" data-protected-media>
              <Image className="about-banner" src="/images/db-jolbzie-hero.png" alt="Identidad de DB_JOLBZIE: los tres personajes del colectivo junto a su nombre, en violeta y rosa." width={1440} height={476} loading="lazy" draggable={false} unoptimized />
              <Star className="about-star" />
            </div>
            <div className="about-copy">
              <h3>Hola, somos Jolbzie<span className="lilac">.</span> <span className="greeting-star" aria-hidden="true">✳</span></h3>
              <p>Somos un grupo creativo que trabaja en UGC, caras personalizadas, dibujos, ilustraciones y arte digital.</p>
              <p>Nos encanta convertir ideas en creaciones con personalidad. Cuidamos cada detalle y unimos nuestros estilos para crear algo único, muy <em>tuyo</em>.</p>
              <p className="about-thanks">Gracias por estar aquí. Creemos algo que te encante.</p>
              <span className="signature handwritten">— Equipo Jolbzie ♡</span>
            </div>
          </div>
        </section>
        <section id="terms" className="terms-section" aria-labelledby="terms-title">
          <SectionLabel><h2 id="terms-title">TÉRMINOS DE SERVICIO</h2></SectionLabel>
          <p className="terms-intro">Tu comisión, paso a paso. Coordinamos los detalles contigo por Discord.</p>
          <Accordion className="terms-accordion">
            {commissionTopics.map(topic => <AccordionItem key={topic.title} value={topic.title}>
              <AccordionTrigger className="terms-trigger">{topic.title}<Plus className="term-plus" size={17} aria-hidden="true" /></AccordionTrigger>
              <AccordionContent className="terms-content">
                <p>{topic.description}</p>
                {topic.showDiscordLink && <a className="terms-discord-link" href={discordInviteUrl} target="_blank" rel="noopener noreferrer">Entrar al servidor de Discord <ArrowUpRight size={15} aria-hidden="true" /></a>}
              </AccordionContent>
            </AccordionItem>)}
          </Accordion>
        </section>
      </div>

      <section id="commission" className="commission-section" aria-labelledby="commission-title">
        <div className="cta-orbit orbit-one" aria-hidden="true" /><div className="cta-orbit orbit-two" aria-hidden="true" />
        <Star className="cta-star-one" /><Star className="cta-star-two" />
        <div className="commission-copy">
          <p className="eyebrow">TU IDEA. NUESTRA CREATIVIDAD. UN TOQUE DE MAGIA.</p>
          <h2 id="commission-title">Creemos algo <span className="handwritten">muy tuyo.</span></h2>
          <p className="commission-description">¿Tienes un personaje, un concepto o una idea en mente? Escríbenos por Discord y abre tu ticket para empezar.</p>
        </div>
        <div className="cta-buttons"><a className="button button-primary commission-discord" href={discordInviteUrl} target="_blank" rel="noopener noreferrer">Abrir ticket en Discord <ArrowUpRight size={19} aria-hidden="true" /></a></div>
      </section>
    </main>

    <footer className="site-footer"><div className="footer-inner"><div><a className="wordmark" href="#top">DB_JOLBZIE<span>✦</span></a><p>Muchas ideas. Un mismo impulso creativo.</p></div><p className="footer-copyright">© {new Date().getFullYear()} DB_JOLBZIE</p></div></footer>

    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="artist-dialog"><span className="dialog-sparkle" aria-hidden="true">✦</span><p className="eyebrow">COLECTIVO DB_JOLBZIE</p><DialogTitle className="dialog-title">Tu idea empieza aquí.</DialogTitle><DialogDescription className="dialog-description">Gestionamos las comisiones por tickets en Discord. Entra al servidor y abre un ticket para contarnos tu idea y consultar los detalles con el equipo.</DialogDescription><div className="dialog-note"><Heart size={16} />Puedes compartir tus referencias, el estilo que buscas y cualquier detalle de tu proyecto.</div><a className="button button-primary" href={discordInviteUrl} target="_blank" rel="noopener noreferrer">Abrir ticket en Discord <ArrowUpRight size={17} aria-hidden="true" /></a></DialogContent></Dialog>
  </>;
}
