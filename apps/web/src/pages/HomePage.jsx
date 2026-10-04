import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { CONTACT } from '@/config/contact';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const IMG = {
  carabao: asset('images/hero/carabao-villa-hero.webp'),
  pool: asset('images/services/custom-pools.jpg'),
  construction: asset('images/supporting/construction-process.jpg'),
  casaDapezi: asset('images/portfolio/casa-dapezi-construction.jpg'),
  lasOlas: asset('images/portfolio/las-olas-residence.jpg'),
  luxuryConstruction: asset('images/services/luxury-construction.jpg'),
  remodeling: asset('images/services/remodeling-renovation.jpg'),
  propertyCare: asset('images/services/property-care.webp'),
  team: asset('images/supporting/team-on-site.jpg'),
  jason: asset('images/about/jason-cascante.webp'),
  remoteOwners: asset('images/supporting/remote-owners-carabao.jpg'),
  propertyCareSupport: asset('images/supporting/property-care-support.jpg'),
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
  const whatsappHref = `${CONTACT.whatsappBase}?text=${encodeURIComponent(t('contact.whatsappMessage'))}`;
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
        <a href="#top" className="block h-10 w-10 shrink-0 sm:h-9 sm:w-44 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm">
          <span className="sr-only">{t('footer.copyright')}</span>
          <img src={asset('branding/isotipo_claro_transparente.svg')} alt="" aria-hidden="true" width="220" height="220" className="h-full w-full object-contain sm:hidden dark:hidden" />
          <img src={asset('branding/isotipo_oscuro_transparente.svg')} alt="" aria-hidden="true" width="220" height="220" className="hidden h-full w-full object-contain dark:block sm:dark:hidden" />
          <img src={asset('branding/imagotipo_claro_transparente.svg')} alt="" aria-hidden="true" width="1675" height="342" className="hidden h-full w-full object-contain sm:block dark:sm:hidden" />
          <img src={asset('branding/imagotipo_oscuro_transparente.svg')} alt="" aria-hidden="true" width="1675" height="342" className="hidden h-full w-full object-contain dark:sm:block" />
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
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('contact.whatsappLabel')}
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
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.whatsappLabel')}
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
  const whatsappHref = `${CONTACT.whatsappBase}?text=${encodeURIComponent(t('contact.whatsappMessage'))}`;
  
  const emailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t('contact.emailSubject'))}`;

  const projectImgs = [IMG.casaDapezi, IMG.carabao, IMG.lasOlas];

  return (
    <div id="top" className="min-h-[100dvh] bg-background text-foreground">
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        siteName={t('footer.copyright')}
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
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('contact.whatsappLabel')}
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
                  <img src={IMG.carabao} alt={t('accessibility.imageHero')} fetchpriority="high" className="aspect-[16/10] w-full object-cover" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:right-0 sm:mt-0 sm:w-[55%] sm:grid-cols-2">
                  <div className="overflow-hidden rounded-sm border border-border/60 shadow-lg">
                    <img src={IMG.pool} alt={t('accessibility.imagePool')} className="aspect-[4/3] w-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-sm border border-border/60 shadow-lg">
                    <img src={IMG.construction} alt={t('accessibility.imageConstruction')} className="aspect-[4/3] w-full object-cover object-top" />
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
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
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
              <img src={IMG.team} alt={t('accessibility.imageTeam')} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-sm object-cover object-left" />
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
              const servicesImgs = [IMG.luxuryConstruction, IMG.remodeling, IMG.pool, IMG.propertyCare];
              return (
                <article key={s.title} className="group">
                  <Reveal>
                    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16 lg:gap-20">
                      <div className={cn("md:col-span-7", !isEven && "md:order-2")}>
                        <img src={servicesImgs[i]} alt={s.alt} loading="lazy" decoding="async" className={cn("aspect-[4/3] w-full rounded-sm object-cover", i === 0 && "object-top")} />
                      </div>
                      <div className={cn("md:col-span-5 md:px-2 lg:px-4", !isEven && "md:order-1")}>
                        <div className="flex flex-col gap-5 border-l pl-6 border-gold">
                          <span className="font-display text-2xl font-medium text-gold-display">{s.number}</span>
                          <div>
                            <h3 className="font-display text-2xl font-medium text-foreground">{s.title}</h3>
                            <p className="mt-4 whitespace-pre-line font-sans-body text-sm leading-relaxed text-muted-foreground">
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
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="max-w-md">
              <p className="mb-4 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('poolExpertise.eyebrow')}</p>
              <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">
                {t('poolExpertise.headline')}
              </h2>
              <div className="mt-8 border-l border-gold pl-6">
                <p className="whitespace-pre-line font-sans-body text-sm leading-relaxed text-foreground">
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(approachPhases) && approachPhases.map((ph, i) => (
              <Reveal key={ph.n} delay={i * 0.06}>
                <div className="border-t border-gold/40 pt-5">
                  <p className="font-sans-body text-[11px] tracking-[0.2em] text-gold-text">{ph.n}</p>
                  <h3 className="mt-3 font-display text-xl font-medium">{ph.title}</h3>
                  <p className="mt-2 whitespace-pre-line font-sans-body text-sm leading-relaxed text-muted-foreground">{ph.body}</p>
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
              <p className="whitespace-pre-line font-sans-body text-sm leading-relaxed" style={{ color: 'var(--tp-muted)' }}>
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
              <img src={IMG.remoteOwners} alt={t('accessibility.altImageRemotePrimary')} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-sm object-cover" />
              
              <div className="mt-8 w-full md:absolute md:-bottom-12 md:-left-12 md:mt-0 md:w-[60%] lg:-left-16 lg:-bottom-16">
                <img src={IMG.propertyCareSupport} alt={t('accessibility.altImageRemoteSecondary')} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-sm object-cover md:border-8" style={{ borderColor: 'var(--tp-bg)' }} />
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
              <img src={IMG.jason} alt={t('accessibility.altImageFounder')} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-sm object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="max-w-2xl">
              <p className="mb-4 font-sans-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{t('companyStory.eyebrow')}</p>
              <h2 className="mb-6 font-display text-3xl font-medium leading-tight md:text-4xl">
                {t('companyStory.headline')}
              </h2>
              <p className="mb-10 whitespace-pre-line font-sans-body text-sm leading-relaxed text-muted-foreground">
                {t('companyStory.intro')}
              </p>
              

            </div>
          </Reveal>
        </div>
      </section>

      {/* Location */}
      <section className="border-b border-border bg-background">
        <div className="relative grid">
          <img src={IMG.carabao} alt={t('accessibility.imageHero')} loading="lazy" decoding="async" className="col-start-1 row-start-1 aspect-[21/9] h-full max-h-[420px] min-h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/80 to-background/80" />
          <div className="relative col-start-1 row-start-1 self-end px-5 pb-10 pt-10 text-center md:px-8">
            <p className="font-sans-body text-[11px] uppercase tracking-[0.3em] text-foreground/90">
              {t('location.headline')}
            </p>
            <p className="mx-auto mt-2 max-w-3xl whitespace-pre-line font-sans-body text-[11px] text-foreground/70">
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
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.whatsappLabel')}
              className="mt-10 inline-flex rounded-sm px-8 py-3.5 font-sans-body text-[13px] font-medium transition active:scale-[0.98] bg-[var(--final-cta-button-bg)] text-[var(--final-cta-button-text)] hover:bg-[var(--final-cta-button-hover-bg)] hover:text-[var(--final-cta-button-hover-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {t('finalCta.cta')}
            </a>
            <div className="mt-8 flex flex-col items-center gap-2 font-sans-body text-xs sm:flex-row sm:justify-center sm:gap-4" style={{ color: 'var(--final-cta-muted)' }}>
              <a href={emailHref} className="rounded-sm transition hover:text-[var(--final-cta-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold px-1">{CONTACT.email}</a>
              <span className="hidden sm:inline">·</span>
              <a href={CONTACT.phoneHref} className="rounded-sm transition hover:text-[var(--final-cta-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">{CONTACT.phoneDisplay}</a>
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
            <img src={asset('branding/imagotipo_oscuro_transparente.svg')} alt={t('footer.copyright')} width="1675" height="342" className="h-auto w-44 object-contain" />
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
                <a href={emailHref} className="break-all rounded-sm transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold px-1" style={{ color: 'var(--footer-text)' }}>
                  {CONTACT.email}
                </a>
              </li>
              <li><a href={CONTACT.phoneHref} className="rounded-sm transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">{CONTACT.phoneDisplay}</a></li>
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
