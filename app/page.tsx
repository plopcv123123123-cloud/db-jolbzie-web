'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Heart, Menu, Plus, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  { title: 'UGC Commissions', description: 'Little details. Big personality. Custom assets for your Roblox world.', tag: 'Made to stand out' },
  { title: 'Custom Faces', description: 'A little attitude, a little charm. Expressions that feel like you.', tag: 'All about expression' },
  { title: 'Digital Art', description: 'Drawings, illustrations, icons and banners, brought to life in my style.', tag: 'From sketch to story' },
  { title: 'Custom Requests', description: 'Something a little different in mind? Let’s dream it up together.', tag: 'Your idea starts here' },
];
const projects = [
  { category: 'UGC', title: 'A world of little details', label: 'Featured UGC project', className: 'featured' },
  { category: 'Faces', title: 'Every expression, yours', label: 'Custom face preview', className: 'faces' },
  { category: 'Drawings', title: 'Ideas into illustrations', label: 'Digital art preview', className: 'drawings' },
];
const terms = ['Payment', 'Revisions', 'Turnaround Time', 'Usage Rights', 'Commercial Use', 'Refunds'];
const navigation = [['Portfolio', '#portfolio'], ['Services', '#services'], ['About', '#about'], ['TOS', '#terms']];

function Star({ className = '' }: { className?: string }) {
  return <span className={`star ${className}`} aria-hidden="true">✦</span>;
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span className="label-star" aria-hidden="true">✳</span>{children}<span className="label-line" /></div>;
}
function MediaPlaceholder({ label, small = false }: { label: string; small?: boolean }) {
  return <div className={`placeholder-content ${small ? 'small' : ''}`}>
    <span className="placeholder-mark" aria-hidden="true"><Plus size={19} strokeWidth={1} /></span>
    <span className="placeholder-label">{label}</span><span className="placeholder-note">Artwork coming soon</span>
  </div>;
}

export default function Home() {
  const [category, setCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<'commission' | 'pricing' | 'social' | null>(null);
  const shownProjects = projects.filter(project => category === 'All' || project.category === category);

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <a className="wordmark" href="#" aria-label="DB JOLBZIE home">DB_JOLBZIE<span>✦</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><Button className="button header-commission" variant="outline" onClick={() => setDialog('commission')}>Commission Me <ArrowUpRight size={15} /></Button><Button variant="ghost" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}</nav>}</header>

    <main id="main" className="page-shell">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy">
        <p className="eyebrow"><span className="tiny-dot" /> DIGITAL ARTIST & ROBLOX CREATOR</p>
        <h1 id="hero-title">Custom art made<br />for your <span className="hero-highlight">Roblox</span><br className="desktop-break" /> world<span className="lilac">.</span><Star className="title-star" /></h1>
        <p className="hero-description">A little imagination. A world of personality.<br />I create UGC, custom faces, drawings and more—<br className="wide-only" />made to bring <em>your</em> ideas to life.</p>
        <div className="hero-buttons"><a className="button button-primary" href="#portfolio">Explore My Work <ArrowDown size={16} /></a><Button className="button button-outline" variant="outline" onClick={() => setDialog('commission')}>Commission Me <ArrowUpRight size={16} /></Button></div>
        <p className="hero-footnote"><Heart size={12} strokeWidth={1.4} /> A little piece of my world, made for yours.</p>
      </div><div className="hero-art" aria-label="Placeholder for future three-character hero banner">
        <div className="hero-blob" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true" /><Star className="hero-star-one" /><Star className="hero-star-two" /><Star className="hero-star-three" /><div className="hero-backplate" aria-hidden="true" />
        <div className="hero-media"><span className="media-corner top-left" aria-hidden="true" /><span className="media-corner bottom-right" aria-hidden="true" /><MediaPlaceholder label="3-character hero banner" /><span className="media-index" aria-hidden="true">01 / MY CREATIVE WORLD</span></div>
        <span className="hero-sticker"><Sparkles size={14} strokeWidth={1.5} /> made with a little magic</span><span className="handwritten hero-caption">a space for imagination <span aria-hidden="true">⤴</span></span>
      </div></section>

      <section id="services" className="services-section" aria-labelledby="services-title"><SectionLabel><h2 id="services-title">WHAT I OFFER</h2></SectionLabel><div className="services-grid">{services.map((service, index) => <article className="service" key={service.title}><div className="service-top"><span className="service-number">0{index + 1}</span><span className="service-accent" aria-hidden="true">{index === 1 ? '✧' : index === 3 ? '♡' : '✦'}</span></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-tag">{service.tag}</span></article>)}</div></section>

      <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title"><div className="portfolio-heading"><SectionLabel><h2 id="portfolio-title">SELECTED WORK</h2></SectionLabel><div className="gallery-filters" role="group" aria-label="Filter portfolio">{['All', 'UGC', 'Faces', 'Drawings'].map(filter => <Button key={filter} variant="ghost" className={`filter-button ${category === filter ? 'active' : ''}`} aria-pressed={category === filter} aria-controls="portfolio-gallery" onClick={() => setCategory(filter)}>{filter}</Button>)}</div><span className="gallery-aside">a few things from my world <Star /></span></div>
        <div id="portfolio-gallery" className={`portfolio-grid ${category !== 'All' ? 'filtered' : ''}`} aria-live="polite">{shownProjects.map(project => <article className={`project ${project.className}`} key={project.category}><div className="project-frame"><span className="project-badge">{project.category === 'UGC' ? 'THE SPOTLIGHT' : project.category.toUpperCase()}</span><MediaPlaceholder label={project.label} small /><span className="frame-corner" aria-hidden="true">✧</span></div><div className="project-caption"><div><h3>{project.title}</h3><p>{project.category} <span>· Preview coming soon</span></p></div></div></article>)}</div>
        <p className="gallery-note">Good things are taking shape. Original work will live here soon.</p>
      </section>

      <div className="about-terms"><section id="about" className="about-section" aria-labelledby="about-title"><SectionLabel><h2 id="about-title">THE ARTIST BEHIND IT</h2></SectionLabel><div className="about-content"><div className="about-art"><div className="about-outline" aria-hidden="true" /><div className="about-media"><MediaPlaceholder label="Artist / avatar" small /></div><Star className="about-star" /><span className="about-sticker" aria-hidden="true">a little bit of me ♡</span></div><div className="about-copy"><h3>Hi, I’m Jolbzie<span className="lilac">.</span> <span className="greeting-star" aria-hidden="true">✳</span></h3><p>A digital artist and Roblox creator with a love for turning little ideas into something full of personality.</p><p>From UGC to faces and illustrations, I care about the details, the creativity, and making something that feels like <em>you</em>.</p><p className="about-thanks">Thanks for being here. Let’s make something you’ll love.</p><span className="signature handwritten">— Jolbzie ♡</span></div></div></section>
      <section id="terms" className="terms-section" aria-labelledby="terms-title"><SectionLabel><h2 id="terms-title">A FEW THINGS TO KNOW</h2></SectionLabel><p className="terms-intro">A little clarity before we create.</p><Accordion className="terms-accordion">{terms.map(term => <AccordionItem key={term} value={term}><AccordionTrigger className="terms-trigger">{term}<Plus className="term-plus" size={14} /></AccordionTrigger><AccordionContent className="terms-content">{term} details will be added here before commissions open. Please check back for Jolbzie’s confirmed guidelines.</AccordionContent></AccordionItem>)}</Accordion></section></div>

      <section id="commission" className="commission-section" aria-labelledby="commission-title"><div className="cta-orbit orbit-one" aria-hidden="true" /><div className="cta-orbit orbit-two" aria-hidden="true" /><Star className="cta-star-one" /><Star className="cta-star-two" /><span className="cta-small-star" aria-hidden="true">✧</span><p className="eyebrow">YOUR IDEA. MY CREATIVITY. A LITTLE MAGIC.</p><h2 id="commission-title">Let’s make something <span className="handwritten">so you.</span></h2><p>Got a character, a concept, or a tiny spark of an idea?</p><div className="cta-buttons"><Button className="button button-primary" onClick={() => setDialog('commission')}>Start a Commission <ArrowUpRight size={16} /></Button><Button className="button button-outline" variant="outline" onClick={() => setDialog('pricing')}>Pricing & Guidelines</Button></div><span className="cta-love" aria-hidden="true">♡</span></section>
    </main>

    <footer className="site-footer"><div className="footer-inner"><div><a className="wordmark" href="#">DB_JOLBZIE<span>✦</span></a><p>Little ideas. A world of possibilities.</p></div><nav aria-label="Footer navigation">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><div className="social-links">{['Discord', 'Roblox', 'Instagram', 'TikTok'].map(social => <Button key={social} variant="link" onClick={() => setDialog('social')}>{social}<ArrowUpRight size={11} /></Button>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} DB_JOLBZIE</span><span>Made with care & a little stardust <span className="lilac">✦</span></span></div></footer>

    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="artist-dialog"><span className="dialog-sparkle" aria-hidden="true">✦</span><p className="eyebrow">DB_JOLBZIE STUDIO</p><DialogTitle className="dialog-title">{dialog === 'commission' ? 'Your idea starts here.' : dialog === 'pricing' ? 'A little clarity, first.' : 'Let’s stay connected.'}</DialogTitle><DialogDescription className="dialog-description">{dialog === 'commission' ? 'Commission enquiries are coming soon. Contact details and availability will be added here when everything is ready.' : dialog === 'pricing' ? 'Pricing and commission guidelines are being prepared. Confirmed rates and terms will be published here before bookings open.' : 'Jolbzie’s official social links will be added soon. Come back to explore more of my creative world.'}</DialogDescription><div className="dialog-note"><Heart size={16} />{dialog === 'commission' ? 'In the meantime, dream up your character, style and little details.' : 'Thanks for being part of this little creative corner.'}</div><Button className="button button-primary" onClick={() => { setDialog(null); document.getElementById(dialog === 'pricing' ? 'terms' : 'services')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>{dialog === 'pricing' ? 'Explore the Guidelines' : 'Explore What I Offer'}<ArrowDown size={15} /></Button></DialogContent></Dialog>
  </>;
}
