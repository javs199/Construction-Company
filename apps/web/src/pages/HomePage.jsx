import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

const IMG = {
  hero: 'https://images.hostinger.com/b45d5566-e15c-497d-9d55-9d2e0d0bb577.png',
  pool: 'https://images.hostinger.com/b2c03542-d035-40ff-b2ef-f357d60eed3f.png',
  architect: 'https://images.hostinger.com/6e51037b-acff-4d87-9fa8-6ec211887b5a.png',
  villaBw: 'https://images.hostinger.com/840c78ba-08e9-4786-a523-decd4b04715c.png',
  bathBw: 'https://images.hostinger.com/3367f020-0354-45fb-9ca9-328c74af7d31.png',
  terraceBw: 'https://images.hostinger.com/adad3f06-f110-4552-902c-6500c50e2c55.png',
  plans: 'https://images.hostinger.com/2493da16-6c92-451d-946a-013eb903bc4d.png',
  villaPool: 'https://images.hostinger.com/2bb55de1-2bb4-4f1d-971b-43ee4e4e0386.png',
  meeting: 'https://images.hostinger.com/928533e3-7039-438f-80c8-798c9ec6df9f.png',
  coast: 'https://images.hostinger.com/c0f2c670-85a7-498a-abe8-e6f1e3fd36de.png',
};

function LanguageToggle({ className }) {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className={cn("flex items-center gap-1.5 font-sans-body text-[11px] font-medium tracking-wide", className)}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        lang="en"
        className={cn(language === 'en' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground transition', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm')}
        aria-label={t('accessibility.changeToEnglish')}
      >
        {t('accessibility.langEn')}
      </button>
      <span aria-hidden="true" className="opacity-40 text-muted-foreground">|</span>
      <button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        lang="es"
        className={cn(language === 'es' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground transition', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm')}
        aria-label={t('accessibility.changeToSpanish')}
      >
        {t('accessibility.langEs')}
      </button>
    </div>
  );
}

function ThemeToggle({ className }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      aria-label={isDark ? t('accessibility.switchToLight') : t('accessibility.switchToDark')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/60 text-foreground transition hover:border-primary/50 hover:text-primary',
        className,
      )}
    >
      {isDark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
    </button>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const nav = t('navigation');
  const menuBtnRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8 lg:px-10">
        <a href="#top" className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm">
          {t('header.company')}
          <span className="block tracking-[0.32em] text-muted-foreground">{t('header.descriptor')}</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {Array.isArray(nav) && nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans-body text-[12px] font-medium tracking-wide text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:flex mr-2" />
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-sm bg-primary px-5 py-2.5 font-sans-body text-[12px] font-medium tracking-wide text-primary-foreground transition hover:opacity-90 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('hero.ctaDiscuss')}
          </a>
          <button
            ref={menuBtnRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={open ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" focusable="false" /> : <Menu className="h-4 w-4" aria-hidden="true" focusable="false" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background/95 px-5 py-6 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-4">
            <LanguageToggle className="mb-2" />
            {Array.isArray(nav) && nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-sans-body text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t('hero.ctaDiscuss')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const projectsList = t('projects.list');
  const servicesList = t('services.list');
  const approachPhases = t('approach.phases');
  const nav = t('navigation');
  
  const projectImgs = [IMG.villaBw, IMG.bathBw, IMG.terraceBw];

  return (
    <div id="top" className="min-h-[100dvh] bg-background text-foreground">
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        siteName={t('header.company')}
      />

      <a href="#main-content" className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-[100] focus-visible:top-4 focus-visible:left-4 focus-visible:rounded-sm focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-primary-foreground focus-visible:outline-none">
        {t('accessibility.skipToMain')}
      </a>

      <Header />

      <main id="main-content">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background pt-28 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-12 md:gap-8 md:px-8 md:pb-24 lg:px-10">
          <div className="flex flex-col justify-center md:col-span-5 lg:col-span-5">
            <Reveal>
              <p className="mb-5 font-sans-body text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                {t('hero.eyebrow')}
              </p>
              <h1 className="font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
                {Array.isArray(t('hero.headline')) && t('hero.headline').map((frag, idx) => (
                  <React.Fragment key={idx}>
                    {frag.accent ? (
                      <span className="italic text-gold-display">{frag.text}</span>
                    ) : (
                      frag.text
                    )}
                    {frag.br && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <p className="mt-6 max-w-md font-sans-body text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {t('hero.supporting')}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-sans-body text-[13px] font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('hero.ctaDiscuss')}
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-transparent px-6 py-3 font-sans-body text-[13px] font-medium text-foreground transition hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('hero.ctaView')}
                </a>
              </div>
              <ul className="mt-10 space-y-2.5 font-sans-body text-[12px] text-muted-foreground">
                {Array.isArray(t('hero.trustMarkers')) && t('hero.trustMarkers').map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" focusable="false" />
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="md:col-span-7 lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="overflow-hidden rounded-sm">
                  <img src={IMG.hero} alt={t('accessibility.imageHero')} fetchpriority="high" className="aspect-[16/10] w-full object-cover" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:right-0 sm:mt-0 sm:w-[55%] sm:grid-cols-2">
                  <div className="overflow-hidden rounded-sm border border-border/60 shadow-lg">
                    <img src={IMG.pool} alt={t('accessibility.imagePool')} className="aspect-[4/3] w-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-sm border border-border/60 shadow-lg">
                    <img src={IMG.architect} alt={t('accessibility.imageArchitect')} className="aspect-[4/3] w-full object-cover object-top" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="h-10 md:h-16" />
      </section>

      {/* Service tabs strip */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {Array.isArray(t('capabilities')) && t('capabilities').map((label) => (
            <a
              key={label}
              href="#services"
              className="px-4 py-5 text-center font-sans-body text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition hover:bg-background hover:text-foreground md:py-6 md:text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
          <Reveal>
            <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('projects.eyebrow')}</p>
                <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl lg:text-[2.75rem]">
                  {t('projects.headline')}
                </h2>
              </div>
              <p className="max-w-sm font-sans-body text-sm text-muted-foreground">
                {t('projects.body')}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(projectsList) && projectsList.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article>
                  <div className="group relative overflow-hidden rounded-sm bg-muted">
                    <img
                      src={projectImgs[i]}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <div className="absolute bottom-2 left-2 right-2 rounded bg-background/80 px-2 py-1 text-center font-sans-body text-[10px] text-foreground backdrop-blur-sm">
                      {t('accessibility.tempVisualRef')}
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-medium">{p.title}</h3>
                      <p className="mt-1 font-sans-body text-xs text-muted-foreground">{p.meta}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partner split */}
      <section id="trusted-partner" className="border-b py-20 md:py-28" style={{ backgroundColor: 'var(--tp-bg)', borderColor: 'var(--tp-border)', color: 'var(--tp-text)' }}>
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8 lg:px-10">
          <Reveal>
            <div className="relative">
              <img src={IMG.plans} alt={t('accessibility.imagePlans')} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-sm object-cover" />
              <p className="mt-3 font-sans-body text-[11px] uppercase tracking-wider" style={{ color: 'var(--tp-muted)' }}>
                {t('accessibility.tempImagePartner')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-3 font-sans-body text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--tp-muted)' }}>{t('trustedPartner.eyebrow')}</p>
            <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">
              {t('trustedPartner.headline')}
            </h2>
            <p className="mt-6 font-sans-body text-sm leading-relaxed" style={{ color: 'var(--tp-muted)' }}>
              {t('trustedPartner.body')}
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {Array.isArray(t('trustedPartner.principles')) && t('trustedPartner.principles').map((p) => (
                <li key={p.title} className="border-t pt-4" style={{ borderColor: 'var(--tp-border)' }}>
                  <h3 className="font-sans-body text-sm font-semibold">{p.title}</h3>
                  <p className="mt-2 font-sans-body text-xs leading-relaxed" style={{ color: 'var(--tp-muted)' }}>
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Services detail */}
      <section id="services" className="border-b border-border bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
          <Reveal>
            <p className="mb-3 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('services.eyebrow')}</p>
            <h2 className="mb-16 max-w-2xl font-display text-3xl font-medium leading-tight md:mb-24 md:text-4xl">
              {t('services.headline')}
            </h2>
          </Reveal>
          <div className="flex flex-col gap-20 md:gap-32">
            {Array.isArray(servicesList) && servicesList.map((s, i) => {
              const isEven = i % 2 === 0;
              const servicesImgs = [IMG.villaBw, IMG.bathBw, IMG.villaPool, IMG.architect];
              return (
                <article key={s.title} className="group">
                  <Reveal>
                    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16 lg:gap-20">
                      <div className={cn("md:col-span-7", !isEven && "md:order-2")}>
                        <img src={servicesImgs[i]} alt={s.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-sm object-cover" />
                        <p className="mt-3 font-sans-body text-[10px] uppercase tracking-wider text-muted-foreground">
                          {t('services.temporaryLabel')}
                        </p>
                      </div>
                      <div className={cn("md:col-span-5 md:px-2 lg:px-4", !isEven && "md:order-1")}>
                        <div className="flex flex-col gap-5 border-l pl-6 border-gold">
                          <span className="font-display text-2xl font-medium text-gold-display">{s.number}</span>
                          <div>
                            <h3 className="font-display text-2xl font-medium text-foreground">{s.title}</h3>
                            <p className="mt-4 font-sans-body text-sm leading-relaxed text-muted-foreground">
                              {s.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  {i < servicesList.length - 1 && (
                    <div className="mt-20 border-b border-border md:mt-32" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pool Expertise */}
      <section id="pool-expertise" className="border-b border-border bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8 lg:px-10">
          <Reveal className="md:col-span-7">
            <div className="relative">
              <img src={IMG.pool} alt={t('accessibility.altImagePool')} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-sm object-cover" />
              <p className="mt-3 font-sans-body text-[11px] uppercase tracking-wider text-muted-foreground">
                {t('accessibility.tempImagePool')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="max-w-md">
              <p className="mb-4 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('poolExpertise.eyebrow')}</p>
              <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">
                {t('poolExpertise.headline')}
              </h2>
              <div className="mt-8 border-l border-gold pl-6">
                <p className="font-sans-body text-sm leading-relaxed text-foreground">
                  {t('poolExpertise.body')}
                </p>
                <p className="mt-4 font-sans-body text-sm leading-relaxed text-muted-foreground">
                  {t('poolExpertise.statement')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Construction Company */}
      <section id="why-construction-company" className="border-b border-border bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8 lg:px-10">
          <Reveal className="md:col-span-5 lg:col-span-4">
            <p className="mb-4 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('whyCompany.eyebrow')}</p>
            <h2 className="mb-6 font-display text-3xl font-medium leading-tight md:text-4xl">
              {t('whyCompany.headline')}
            </h2>
            <p className="font-sans-body text-sm leading-relaxed text-muted-foreground">
              {t('whyCompany.intro')}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7 lg:col-span-8">
            <ol className="flex flex-col border-t border-border">
              {Array.isArray(t('whyCompany.items')) && t('whyCompany.items').map((item) => (
                <li key={item.n} className="flex flex-col gap-2 border-b border-border py-6 sm:flex-row sm:items-start sm:gap-8 md:py-8">
                  <span className="font-display text-2xl font-medium text-gold-display">{item.n}</span>
                  <div className="flex-1">
                    <h3 className="font-sans-body text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 font-sans-body text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
          <Reveal>
            <p className="mb-3 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('approach.eyebrow')}</p>
            <h2 className="mb-12 max-w-lg font-display text-3xl font-medium md:mb-16 md:text-4xl">
              {t('approach.headline')}
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(approachPhases) && approachPhases.map((ph, i) => (
              <Reveal key={ph.n} delay={i * 0.06}>
                <div className="border-t border-gold/40 pt-5">
                  <p className="font-sans-body text-[11px] tracking-[0.2em] text-gold-text">{ph.n}</p>
                  <h3 className="mt-3 font-display text-xl font-medium">{ph.title}</h3>
                  <p className="mt-2 font-sans-body text-sm leading-relaxed text-muted-foreground">{ph.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Remote Owners & Investors */}
      <section id="remote-owners" className="border-b border-border py-20 md:py-28" style={{ backgroundColor: 'var(--tp-bg)', color: 'var(--tp-text)' }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8 lg:px-10">
          <Reveal className="md:col-span-5">
            <div className="max-w-md md:pr-4">
              <p className="mb-4 font-sans-body text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--tp-muted)' }}>{t('remoteOwners.eyebrow')}</p>
              <h2 className="mb-6 font-display text-3xl font-medium leading-tight md:text-4xl">
                {t('remoteOwners.headline')}
              </h2>
              <p className="font-sans-body text-sm leading-relaxed" style={{ color: 'var(--tp-muted)' }}>
                {t('remoteOwners.body')}
              </p>
              <div className="mt-8 border-l pl-6" style={{ borderColor: 'var(--tp-accent)' }}>
                <p className="font-sans-body text-sm font-medium leading-relaxed">
                  {t('remoteOwners.statement')}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="relative">
              <img src={IMG.villaPool} alt={t('accessibility.altImageRemotePrimary')} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-sm object-cover" />
              <p className="mt-3 font-sans-body text-[11px] uppercase tracking-wider" style={{ color: 'var(--tp-muted)' }}>
                {t('accessibility.tempImageRemotePrimary')}
              </p>
              
              <div className="mt-8 w-full md:absolute md:-bottom-12 md:-left-12 md:mt-0 md:w-[60%] lg:-left-16 lg:-bottom-16">
                <img src={IMG.meeting} alt={t('accessibility.altImageRemoteSecondary')} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-sm object-cover md:border-8" style={{ borderColor: 'var(--tp-bg)' }} />
                <p className="mt-2 font-sans-body text-[10px] uppercase tracking-wider" style={{ color: 'var(--tp-muted)' }}>
                  {t('accessibility.tempImageRemoteSecondary')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Company Story */}
      <section id="about" className="border-b border-border bg-surface py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8 lg:px-10">
          <Reveal className="md:col-span-5">
            <div className="relative">
              <img src={IMG.plans} alt={t('accessibility.altImageFounder')} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-sm object-cover" />
              <p className="mt-3 font-sans-body text-[11px] uppercase tracking-wider text-muted-foreground">
                {t('accessibility.tempImageFounder')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="max-w-2xl">
              <p className="mb-4 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('companyStory.eyebrow')}</p>
              <h2 className="mb-6 font-display text-3xl font-medium leading-tight md:text-4xl">
                {t('companyStory.headline')}
              </h2>
              <p className="mb-10 font-sans-body text-sm leading-relaxed text-muted-foreground">
                {t('companyStory.intro')}
              </p>
              
              <ul className="flex flex-col border-t border-border">
                {Array.isArray(t('companyStory.placeholders')) && t('companyStory.placeholders').map((item, i) => (
                  <li key={i} className="border-b border-border py-5 flex items-center gap-5">
                    <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
                    <span className="font-sans-body text-sm font-medium text-foreground">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-b border-border bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <div className="mx-auto mb-8 flex h-8 w-8 items-center justify-center">
              <span className="block h-2 w-2 rotate-45 bg-gold" />
            </div>
            <blockquote className="font-display text-2xl font-medium leading-snug text-foreground md:text-3xl lg:text-[2.15rem]">
              {t('testimonial.quote')}
            </blockquote>
            <p className="mt-8 font-sans-body text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {t('testimonial.meta')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Location */}
      <section className="border-b border-border bg-background">
        <div className="relative">
          <img src={IMG.coast} alt={t('accessibility.imageCoast')} loading="lazy" decoding="async" className="aspect-[21/9] max-h-[420px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-center md:px-8">
            <p className="font-sans-body text-[11px] uppercase tracking-[0.3em] text-foreground/90">
              {t('location.headline')}
            </p>
            <p className="mt-2 font-sans-body text-[11px] text-foreground/70">
              {t('location.body')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28" style={{ backgroundColor: 'var(--final-cta-bg)', color: 'var(--final-cta-text)' }}>
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-medium md:text-4xl lg:text-5xl" style={{ color: 'var(--final-cta-text)' }}>
              {t('finalCta.headline')}
            </h2>
            <p className="mx-auto mt-5 max-w-md font-sans-body text-sm leading-relaxed" style={{ color: 'var(--final-cta-muted)' }}>
              {t('finalCta.body')}
            </p>
            <a
              href={t('contact.emailHref')}
              className="mt-10 inline-flex rounded-sm px-8 py-3.5 font-sans-body text-[13px] font-medium transition active:scale-[0.98] bg-[var(--final-cta-button-bg)] text-[var(--final-cta-button-text)] hover:bg-[var(--final-cta-button-hover-bg)] hover:text-[var(--final-cta-button-hover-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {t('finalCta.cta')}
            </a>
            <div className="mt-8 flex flex-col items-center gap-2 font-sans-body text-xs sm:flex-row sm:justify-center sm:gap-4" style={{ color: 'var(--final-cta-muted)' }}>
              <a href={t('contact.emailHref')} className="rounded-sm transition hover:text-[var(--final-cta-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold px-1">{t('contact.emailAddress')}</a>
              <span className="hidden sm:inline">·</span>
              <span>{t('footer.phonePlaceholder')}</span>
              <span className="hidden sm:inline">·</span>
              <span>{t('footer.location')}</span>
            </div>
          </Reveal>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-14" style={{ backgroundColor: 'var(--footer-bg)', borderColor: 'var(--footer-border)', color: 'var(--footer-text)' }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-8 lg:px-10">
          <div className="md:col-span-1">
            <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.28em]">{t('header.company')}</p>
            <p className="mt-4 max-w-xs font-sans-body text-xs leading-relaxed" style={{ color: 'var(--footer-muted)' }}>
              {t('footer.desc')}<br />
              {t('footer.location')}
            </p>
          </div>
          <div>
            <p className="mb-3 font-sans-body text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--footer-muted)' }}>{t('footer.explore')}</p>
            <ul className="space-y-2 font-sans-body text-sm">
              {Array.isArray(nav) && nav.slice(0, 4).map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B] rounded-sm">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-sans-body text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--footer-muted)' }}>{t('footer.contact')}</p>
            <ul className="space-y-2 font-sans-body text-sm" style={{ color: 'var(--footer-muted)' }}>
              <li>{t('footer.location')}</li>
              <li>
                <a href={t('contact.emailHref')} className="rounded-sm transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold px-1" style={{ color: 'var(--footer-text)' }}>
                  {t('contact.emailAddress')}
                </a>
              </li>
              <li>{t('footer.phonePlaceholder')}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-4 border-t px-5 pt-6 font-sans-body text-[11px] md:flex-row md:items-center md:px-8 lg:px-10" style={{ borderColor: 'var(--footer-border)', color: 'var(--footer-muted)' }}>
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  );
}
