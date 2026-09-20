import { useEffect, useRef, useState } from "react";
import kiloLogo from "../Gym Images/Logo/Kilo Logo.png";
import { ResilientImage } from "./components/ResilientImage";
import type { ResponsiveImageSource } from "./components/ResilientImage";
import { site } from "./data/site";
import type { Trainer, TrainerImage } from "./data/site";
import { initialiseAnalytics, trackCta, trackEvent } from "./utils/analytics";

type PhotoProps = {
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
  preferJpeg?: boolean;
};

const IMAGE_VERSION = "20260920-1";

const navigation = [
  { label: "一對一訓練", href: "#one-on-one" },
  { label: "適合誰", href: "#for-you" },
  { label: "教練", href: "#coach" },
  { label: "空間", href: "#space" },
  { label: "常見問題", href: "#faq" },
];

const socialLinks = [
  { label: "Instagram", href: site.instagram },
  { label: "Threads", href: site.threads },
  { label: "Facebook", href: site.facebook },
];

const socialDockLinks = [
  { label: "Instagram", href: site.instagram, icon: "instagram", tracking: "instagram-floating" },
  { label: "Threads", href: site.threads, icon: "threads", tracking: "threads-floating" },
  { label: "Facebook", href: site.facebook, icon: "facebook", tracking: "facebook-floating" },
  { label: "LINE", href: site.lineUrl, icon: "line", tracking: "line-floating" },
] as const;

const imageUrl = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}?v=${IMAGE_VERSION}`;

function Photo({ name, alt, width, height, className = "", eager = false }: PhotoProps) {
  const sizes = "(max-width: 767px) 100vw, (max-width: 1400px) 85vw, 1400px";

  return (
    <ResilientImage
      className={className}
      sources={[]}
      src={imageUrl(`${name}-1600.jpg`)}
      srcSet={`${imageUrl(`${name}-640.jpg`)} 640w, ${imageUrl(`${name}-1000.jpg`)} 1000w, ${imageUrl(`${name}-1600.jpg`)} 1600w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding={eager ? "sync" : "async"}
    />
  );
}

function HeroMedia() {
  const sources: ResponsiveImageSource[] = [{
    media: "(max-width: 900px) and (orientation: portrait)",
    srcSet: `${imageUrl("rack-portrait-640.jpg")} 640w, ${imageUrl("rack-portrait-1000.jpg")} 1000w, ${imageUrl("rack-portrait-1600.jpg")} 1600w`,
    sizes: "100vw",
  }];

  return (
    <ResilientImage
      className="hero-photo"
      sources={sources}
      src={imageUrl("training-space-1600.jpg")}
      srcSet={`${imageUrl("training-space-640.jpg")} 640w, ${imageUrl("training-space-1000.jpg")} 1000w, ${imageUrl("training-space-1600.jpg")} 1600w`}
      sizes="100vw"
      alt="KILO Fitness 沙鹿私人訓練空間與重訓設備"
      width={7008}
      height={3944}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  );
}

type TrainerPhotoProps = {
  image: TrainerImage;
  className?: string;
  sizes: string;
};

function TrainerPhoto({ image, className = "", sizes }: TrainerPhotoProps) {
  const largeWidth = image.jpegWidths.at(-1);
  if (!largeWidth) return null;

  const sources: ResponsiveImageSource[] = image.avifWidth
    ? [{
        type: "image/avif",
        srcSet: `${imageUrl(`${image.name}-${image.avifWidth}.avif`)} ${image.avifWidth}w`,
        sizes,
      }]
    : [];
  const srcSet = image.jpegWidths
    .map((candidateWidth) => `${imageUrl(`${image.name}-${candidateWidth}.jpg`)} ${candidateWidth}w`)
    .join(", ");

  return (
    <ResilientImage
      className={className}
      sources={sources}
      src={imageUrl(`${image.name}-${largeWidth}.jpg`)}
      srcSet={srcSet}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
    />
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function KiloWordmark() {
  return (
    <img
      className="kilo-wordmark"
      src={kiloLogo}
      alt=""
      width="1916"
      height="821"
      aria-hidden="true"
      decoding="async"
      draggable="false"
    />
  );
}

type SocialIconName = (typeof socialDockLinks)[number]["icon"];

function SocialIcon({ name }: { name: SocialIconName }) {
  const icons: Record<SocialIconName, React.ReactNode> = {
    instagram: (
      <>
        <rect x="12" y="12" width="40" height="40" rx="11" />
        <circle cx="32" cy="32" r="9" />
        <circle cx="45" cy="19" r="2" className="social-icon-fill" />
      </>
    ),
    threads: (
      <>
        <path d="M43 23c-2-8-8-12-16-12-10 0-16 8-16 20 0 14 8 22 19 22 10 0 17-6 17-14 0-7-5-12-13-12-7 0-12 4-12 9 0 5 3 8 8 8 8 0 13-7 13-17 0-11-6-17-16-17-6 0-11 3-13 8" />
        <path d="M36 20c6 1 11 4 14 8" />
      </>
    ),
    facebook: (
      <path d="M35 54V34h7l1-8h-8v-4c0-4 2-5 5-5h4V9h-7c-8 0-12 5-12 13v4h-6v8h6v20" />
    ),
    line: (
      <>
        <path d="M8 28C8 17 18 8 32 8s24 9 24 20-10 20-24 20c-2.5 0-5-.3-7-1L14 53l3-10C11 39 8 34 8 28Z" />
        <path d="M17 23v13h7M28 23v13M32 36V23l8 13V23M50 23h-6v13h6M44 29h5" />
      </>
    ),
  };

  return (
    <svg className="social-icon" viewBox="0 0 64 64" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const socialDockStorageKey = "kilo-social-dock-open";

function getInitialSocialDockState() {
  try {
    const savedState = window.localStorage.getItem(socialDockStorageKey);
    if (savedState !== null) return savedState === "true";
  } catch {
    // Storage may be unavailable in privacy-restricted browsing contexts.
  }
  return window.matchMedia("(min-width: 901px)").matches;
}

function SocialDock() {
  const [open, setOpen] = useState(getInitialSocialDockState);

  const toggleDock = () => {
    setOpen((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(socialDockStorageKey, String(next));
      } catch {
        // The control still works when storage is unavailable.
      }
      return next;
    });
  };

  return (
    <aside className={`social-dock${open ? " is-open" : ""}`} aria-label="KILO 社群捷徑">
      <button
        className="social-dock-toggle"
        type="button"
        aria-controls="social-dock-links"
        aria-expanded={open}
        aria-label={open ? "收合社群捷徑" : "展開社群捷徑"}
        onClick={toggleDock}
      >
        <span>{open ? "HIDE" : "SOCIAL"}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </button>
      <nav id="social-dock-links" aria-label="前往 KILO 社群平台" aria-hidden={!open}>
        {socialDockLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`前往 KILO ${social.label}（另開新視窗）`}
            tabIndex={open ? 0 : -1}
            data-cta={social.tracking}
          >
            <SocialIcon name={social.icon} />
            <span>{social.label}</span>
            <small aria-hidden="true">↗</small>
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const pageContent = document.querySelectorAll<HTMLElement>("main, .footer, .social-dock");
    pageContent.forEach((element) => {
      if (menuOpen) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      pageContent.forEach((element) => element.removeAttribute("inert"));
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled || menuOpen ? " is-solid" : ""}`}>
      <a className="wordmark" href="#top" aria-label="KILO Fitness 回到首頁" onClick={closeMenu}>
        <KiloWordmark />
      </a>
      <nav className="desktop-nav" aria-label="主要導覽">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
        <a
          className="nav-reservation"
          href={site.lineUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="透過 LINE 預約體驗（另開新視窗）"
          data-cta="line-nav"
          onClick={() => trackCta("nav")}
        >
          預約體驗 <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <a
        className="mobile-reservation"
        href={site.lineUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="透過 LINE 預約體驗（另開新視窗）"
        data-cta="line-nav"
        onClick={() => trackCta("mobile-nav")}
      >
        預約體驗 <span aria-hidden="true">↗</span>
      </a>
      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "關閉選單" : "開啟選單"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <div id="mobile-navigation" className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="行動版導覽">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-socials" aria-label="KILO 社群平台">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
              {social.label}<ArrowIcon />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-label="KILO Fitness 首頁">
      <HeroMedia />
      <div className="hero-shade" />
      <div className="hero-content page-shell">
        <p className="eyebrow reveal">{site.positioning.eyebrow}</p>
        <h1 className="reveal reveal-delay-1">{site.positioning.title}</h1>
        <div className="hero-service-copy reveal reveal-delay-1">
          <p>{site.positioning.headline}</p>
          <small>{site.positioning.services}</small>
          <strong>{site.positioning.brandLine}</strong>
        </div>
        <div className="hero-meta reveal reveal-delay-2">
          <div>
            <p>{site.locationLabel}</p>
            <p>課程諮詢 · 體驗預約</p>
          </div>
          <div className="hero-actions">
            <a className="text-link text-link-light" href="#one-on-one">認識 KILO <ArrowIcon /></a>
            <a
              className="text-link text-link-primary"
              href={site.lineUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="透過 LINE 預約體驗（另開新視窗）"
              data-cta="line-hero"
              onClick={() => trackCta("hero")}
            >
              LINE 預約體驗 <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#one-on-one" aria-label="向下瀏覽">
        <span>SCROLL</span><i />
      </a>
    </section>
  );
}

function ValueStrip() {
  return (
    <section className="value-strip" aria-label="KILO Fitness 特色">
      <div className="page-shell">
        <ul>
          {site.valueStrip.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

function OneOnOne() {
  return (
    <section className="one-on-one light-section" id="one-on-one">
      <div className="page-shell">
        <div className="conversion-heading">
          <p className="eyebrow reveal">ONE-ON-ONE · 01</p>
          <div>
            <h2 className="display-heading reveal">一對一，不只是有人<br />站在旁邊陪你練。</h2>
            <p className="reveal">從訓練內容、動作細節到每一天的身體狀態，教練都能依照你真正需要的方向進行調整。</p>
          </div>
        </div>
        <div className="value-prop-grid">
          {site.valueProps.map((item, index) => (
            <article className="value-prop reveal" key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <a className="section-cta" href={site.lineUrl} target="_blank" rel="noreferrer" data-cta="line-one-on-one" onClick={() => trackCta("one-on-one")}>
          LINE 了解一對一訓練 <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

function Audiences() {
  return (
    <section className="audiences dark-section" id="for-you">
      <div className="page-shell">
        <div className="conversion-heading audience-heading">
          <p className="eyebrow reveal">FOR YOU · 02</p>
          <div>
            <h2 className="display-heading reveal">從你的目標開始。</h2>
            <p className="reveal">不論你正要開始、想找回規律，或想把訓練做得更好，KILO 都從你現在的狀態出發。</p>
          </div>
        </div>
        <div className="audience-list">
          {site.audiences.map((audience, index) => (
            <article className="audience-item reveal" key={audience.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FirstExperience() {
  return (
    <section className="first-experience light-section" id="first-visit">
      <div className="page-shell">
        <div className="conversion-heading">
          <p className="eyebrow reveal">START HERE · 03</p>
          <div>
            <h2 className="display-heading reveal">第一次來 KILO，<br />很簡單。</h2>
            <p className="reveal">先聊聊你的目標，再一起找到適合你的訓練安排。</p>
          </div>
        </div>
        <ol className="first-steps">
          {site.firstVisitSteps.map((step, index) => (
            <li className="reveal" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
        <a className="section-cta" href={site.lineUrl} target="_blank" rel="noreferrer" data-cta="line-first-visit" onClick={() => trackCta("first-visit")}>
          LINE 預約體驗 <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

function Space() {
  return (
    <section className="space-section dark-section" id="space">
      <div className="page-shell space-heading">
        <p className="eyebrow reveal">THE SPACE</p>
        <div className="space-title-row">
          <h2 className="display-heading reveal">專注在你身上的<br />一方空間。</h2>
          <p className="space-lead reveal">少一點干擾，<br />多一點真正放在訓練上的注意力。<br />讓你能專注於每一次動作，<br />以及自己的目標。</p>
        </div>
      </div>

      <figure className="full-image reveal-image">
        <Photo name="studio-wide" alt="KILO Fitness 主要訓練空間，配置大型訓練架、臥推椅與鏡面" width={7008} height={3944} preferJpeg />
        <figcaption><span>01</span> MAIN TRAINING AREA</figcaption>
      </figure>

      <div className="page-shell editorial-pair">
        <figure className="portrait-feature reveal-image">
          <Photo name="kilo-exterior" alt="夜晚的 KILO Fitness 店面入口與室內訓練設備" width={3944} height={7008} />
          <figcaption><span>02</span> ARRIVAL · KILO AT NIGHT</figcaption>
        </figure>
        <div className="editorial-note reveal">
          <p>每一道光線、每一處細節，都有它存在的理由。<br />留下一點空間，讓注意力回到身體，<br />回到每一次動作。</p>
        </div>
      </div>

      <div className="page-shell detail-layout">
        <figure className="detail-photo reveal-image">
          <Photo name="plates" alt="整齊收納於訓練架上的 KILO 槓片細節" width={3944} height={7008} />
          <figcaption><span>03</span> DETAILS THAT MATTER</figcaption>
        </figure>
        <figure className="wide-feature reveal-image">
          <Photo name="space-sign" alt="KILO Fitness 暖色燈光下的發光招牌與訓練設備細節" width={7008} height={3944} preferJpeg />
          <figcaption><span>04</span> BUILT FOR FOCUS</figcaption>
        </figure>
      </div>

      <div className="page-shell amenity-layout">
        <div className="amenity-note reveal">
          <p className="eyebrow">DETAILS · BEYOND TRAINING</p>
          <p>從訓練設備到公共空間，<br />每一處細節，都維持同樣的用心。</p>
        </div>
        <div className="amenity-gallery">
          <figure className="amenity-photo reveal-image">
            <Photo name="amenities-sink" alt="KILO Fitness 盥洗空間的洗手台與暖色鏡面燈光" width={3944} height={7008} />
            <figcaption><span>05</span> RESTROOM</figcaption>
          </figure>
          <figure className="amenity-photo amenity-photo-secondary reveal-image">
            <Photo name="amenities-toilet" alt="KILO Fitness 盥洗空間內的洗手間與暖色線性照明" width={3944} height={7008} />
          </figure>
        </div>
      </div>
    </section>
  );
}

function TrainerProfile({ trainer }: { trainer: Trainer }) {
  const trainerIndex = site.trainers.findIndex((item) => item.id === trainer.id);

  return (
    <article
      className="coach-profile"
      data-trainer={trainer.id}
      aria-labelledby={`${trainer.id}-name`}
    >
      <div className="coach-profile-marker reveal">
        <span>COACH {String(trainerIndex + 1).padStart(2, "0")} / {String(site.trainers.length).padStart(2, "0")}</span>
        <a href="#coach-directory">回到教練一覽 <span aria-hidden="true">↑</span></a>
      </div>
      <header className="coach-feature">
        <div className="coach-identity reveal">
          <p className="coach-kicker">MEET YOUR COACH</p>
          <h2 id={`${trainer.id}-name`}>
            <span>{trainer.name}</span>
            <span>{trainer.chineseName}</span>
          </h2>
          <div className="coach-role">
            <p>{trainer.roleZh}｜{trainer.educationSummaryZh}</p>
          </div>
          <ul className="coach-highlights" aria-label={`${trainer.name} 教練重點資歷`}>
            {trainer.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
          <p className="coach-introduction">{trainer.intro}</p>
          {trainer.quote && <blockquote className="coach-quote">「{trainer.quote}」</blockquote>}
        </div>
        <figure className="coach-primary-photo reveal-image">
          <TrainerPhoto
            image={trainer.images.primary}
            sizes="(max-width: 640px) 89vw, (max-width: 900px) 58vw, 46vw"
          />
          <figcaption><span>01</span> {trainer.imageCaptions.primary}</figcaption>
        </figure>
      </header>

      {trainer.biography && trainer.biography.length > 0 && (
        <section className="coach-biography reveal" aria-label={`${trainer.name} 教練介紹`}>
          <p className="eyebrow">COACHING BACKGROUND</p>
          <div>
            {trainer.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      )}

      <section className="coach-credentials" aria-labelledby={`${trainer.id}-credentials`}>
        <div className="credential-copy">
          <div className="coach-section-heading reveal">
            <p className="eyebrow">EDUCATION &amp; CERTIFICATIONS</p>
            <h3 id={`${trainer.id}-credentials`}>學歷與專業證照</h3>
          </div>
          <div className="credential-list">
            {trainer.credentials.map((credential, index) => (
              <article className="credential-item reveal" key={credential.title}>
                <span>0{index + 1}</span>
                <div>
                  <h4>
                    <span>{credential.title}</span>
                    {credential.titleDetail && <small>{credential.titleDetail}</small>}
                  </h4>
                  <p>{credential.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <figure className="coach-studio-photo reveal-image">
          <TrainerPhoto
            image={trainer.images.studio}
            sizes="(max-width: 640px) 77vw, (max-width: 900px) 48vw, 32vw"
          />
          <figcaption>{trainer.imageCaptions.studio}</figcaption>
        </figure>
      </section>

      <section className="coach-specialties" aria-labelledby={`${trainer.id}-specialties`}>
        <div className="specialty-copy">
          <div className="coach-section-heading reveal">
            <p className="eyebrow">SPECIALTIES</p>
            <h3 id={`${trainer.id}-specialties`}>專長</h3>
          </div>
          <ol className="specialty-list">
            {trainer.specialties.map((specialty, index) => (
              <li className="reveal" key={specialty.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{specialty.title}</p>
                  {specialty.description && <small>{specialty.description}</small>}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="coach-secondary-photo reveal-image">
          <TrainerPhoto
            image={trainer.images.coaching}
            sizes="(max-width: 640px) 84vw, (max-width: 900px) 52vw, 35vw"
          />
          <figcaption>{trainer.imageCaptions.coaching}</figcaption>
        </figure>
      </section>

      <figure className="coach-action-photo reveal-image">
        <TrainerPhoto
          image={trainer.images.action}
          sizes="(max-width: 1400px) 89vw, 1360px"
        />
        <figcaption>
          <span>{trainer.imageCaptions.actionLabel}</span>
          <p>{trainer.imageCaptions.actionText}</p>
        </figcaption>
      </figure>

      <section className="coach-experience" aria-labelledby={`${trainer.id}-experience`}>
        <div className="coach-section-heading reveal">
          <p className="eyebrow">EXPERIENCE</p>
          <h3 id={`${trainer.id}-experience`}>教學經歷</h3>
        </div>
        <div className="experience-list">
          {trainer.experience.map((item) => (
            <article className="experience-item reveal" key={`${item.period}-${item.organization}`}>
              <p className="experience-period">{item.period}</p>
              <div>
                <h4>{item.organization}<span aria-hidden="true">｜</span><small>{item.location}</small></h4>
                {item.role && <p>{item.role}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="coach-cta reveal">
        <div>
          <p className="eyebrow">TRAIN WITH {trainer.name.toUpperCase()}</p>
          <h3><span>想和 {trainer.name}</span> <span>一起訓練？</span></h3>
          <p>歡迎透過 LINE 了解課程與體驗方式。</p>
        </div>
        {site.lineUrl && (
          <a
            href={site.lineUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`透過 LINE 預約與 ${trainer.name} 體驗訓練（另開新視窗）`}
            data-cta={`line-trainer-${trainer.id}`}
            onClick={() => trackCta(`trainer-${trainer.id}`)}
          >
            LINE 預約體驗 <ArrowIcon />
          </a>
        )}
      </footer>
    </article>
  );
}

function CoachDirectory() {
  return (
    <div className="coach-directory" id="coach-directory">
      <div className="coach-directory-heading reveal">
        <p className="eyebrow">MEET THE TEAM</p>
        <h2>找到理解你目標的教練。</h2>
        <p>先認識每位教練的訓練方向，再查看完整經歷與專長。</p>
      </div>
      <nav className="coach-directory-list" aria-label="選擇教練">
        {site.trainers.map((trainer, index) => (
          <a
            className="coach-directory-item reveal"
            href={`#coach-${trainer.id}`}
            key={trainer.id}
            onClick={() => {
              document.getElementById(`coach-${trainer.id}`)?.setAttribute("open", "");
              trackEvent("coach_profile_open", { trainer: trainer.id });
            }}
          >
            <figure>
              <TrainerPhoto
                image={trainer.images.primary}
                sizes="(max-width: 640px) 34vw, (max-width: 900px) 26vw, 15vw"
              />
            </figure>
            <div className="coach-directory-copy">
              <div className="coach-directory-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <ArrowIcon />
              </div>
              <h3><span>{trainer.name}</span><small>{trainer.chineseName}</small></h3>
              <p>{trainer.roleZh}｜{trainer.educationSummaryZh}</p>
              <ul aria-label={`${trainer.name} 資歷摘要`}>
                {trainer.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </a>
        ))}
      </nav>
    </div>
  );
}

function Coach() {
  return (
    <section className="coach-section light-section" id="coach">
      <div className="page-shell">
        <p className="eyebrow coach-section-label reveal">YOUR COACHES · 03</p>
        <CoachDirectory />
        <div className="trainer-profiles">
          {site.trainers.map((trainer) => (
            <details className="coach-full-profile" id={`coach-${trainer.id}`} key={trainer.id}>
              <summary>查看完整教練介紹 <ArrowIcon /></summary>
              <TrainerProfile trainer={trainer} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

type TrainingIconName = (typeof site.trainingAreas)[number]["icon"];

function TrainingIcon({ name }: { name: TrainingIconName }) {
  const paths: Record<TrainingIconName, React.ReactNode> = {
    strength: (
      <>
        <path d="M7 25v14M13 20v24M19 27v10M19 32h26M45 27v10M51 20v24M57 25v14" />
        <path d="M27 29v6M37 29v6" />
      </>
    ),
    posture: (
      <>
        <circle cx="32" cy="12" r="5" />
        <path d="M19 27c4-6 8-9 13-9s9 3 13 9M32 18v28M25 28l-5 21M39 28l5 21M24 46h16" />
        <path d="M27 35c3 2 7 2 10 0" />
      </>
    ),
    movement: (
      <>
        <circle cx="24" cy="11" r="4" />
        <path d="m25 16 9 12 11 4M34 28 23 39 11 51M34 28l5 15 14 8M18 25l10 3" />
        <path d="M7 55h50M43 17c5 1 9 4 12 8" />
      </>
    ),
    personal: (
      <>
        <circle cx="32" cy="24" r="5" />
        <path d="M21 47c1-8 5-13 11-13s10 5 11 13" />
        <path d="M22 13h-8v8M42 13h8v8M22 51h-8v-8M42 51h8v-8" />
        <path d="M28 43h8" />
      </>
    ),
  };

  return (
    <svg className="training-icon" viewBox="0 0 64 64" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Training() {
  return (
    <section className="training-section dark-section" id="training">
      <div className="page-shell training-grid">
        <div className="training-heading">
          <p className="eyebrow reveal">TRAINING · 04</p>
          <h2 className="display-heading reveal">適合你的，<br />才走得長久。</h2>
          <p className="reveal">不追趕別人的進度。從當下的狀態出發，逐步建立屬於你的訓練方式。</p>
        </div>
        <div className="training-list">
          {site.trainingAreas.map((area, index) => (
            <article className="training-item reveal" key={area.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
              <TrainingIcon name={area.icon} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trial() {
  const { trialSession } = site;
  if (!trialSession.enabled) return null;

  return (
    <section className="trial-section light-section" id="trial">
      <div className="page-shell trial-grid">
        <div>
          <p className="eyebrow reveal">FIRST SESSION</p>
          <h2 className="display-heading reveal">從一次體驗開始。</h2>
        </div>
        <div className="trial-copy reveal">
          {trialSession.price ? <p className="trial-price">一對一體驗 NT${trialSession.price.toLocaleString("zh-TW")}</p> : <p className="trial-lead">想了解目前體驗方案與課程安排？歡迎直接透過 LINE 詢問。</p>}
          {trialSession.durationMinutes && <p>約 {trialSession.durationMinutes} 分鐘</p>}
          {trialSession.description && <p>{trialSession.description}</p>}
          {trialSession.includes && <ul>{trialSession.includes.map((item) => <li key={item}>{item}</li>)}</ul>}
          <a className="section-cta" href={site.lineUrl} target="_blank" rel="noreferrer" data-cta="line-trial" onClick={() => trackCta("trial")}>
            LINE 詢問體驗方案 <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function BrandStatement() {
  return (
    <section className="brand-statement" aria-label="KILO 品牌宣言">
      <Photo name="exterior-sign" alt="夜間發光的 KILO Fitness 店面招牌" width={7008} height={3944} preferJpeg />
      <div className="statement-shade" />
      <div className="statement-content reveal">
        <p className="statement-en">YOUR MUSCLE,<br />YOUR TIMELINE.</p>
        <p className="statement-zh">每個人的進度不同。<br />重要的是，持續往前。</p>
      </div>
    </section>
  );
}

function WhyKilo() {
  return (
    <section className="why-section light-section" id="why-kilo">
      <div className="page-shell why-grid">
        <div className="why-copy">
          <p className="eyebrow reveal">WHY KILO</p>
          <h2 className="display-heading reveal">不只是今天<br />多舉幾公斤。</h2>
          <div className="why-body reveal">
            <p>KILO 在意的不只是一次訓練完成了多少，而是你能不能逐步建立一個真正適合自己、也願意持續下去的方式。</p>
            <p>從動作、強度到訓練進度，教練依照你的狀態安排，讓進步能真正回到日常生活。</p>
          </div>
          <p className="why-signature reveal">Fitness · Support · Community</p>
        </div>
        <figure className="why-image reveal-image">
          <Photo name="kilo-mark" alt="KILO Fitness 牆面上的發光品牌標誌" width={3944} height={7008} />
          <figcaption>KILO · SHALU, TAICHUNG</figcaption>
        </figure>
      </div>
    </section>
  );
}

function LocalInfo() {
  return (
    <section className="local-info light-section" id="location">
      <div className="page-shell local-grid">
        <div>
          <p className="eyebrow reveal">KILO · SHALU</p>
          <h2 className="display-heading reveal">在沙鹿，<br />開始你的訓練。</h2>
        </div>
        <div className="local-details reveal">
          <p className="local-label">LOCATION · 台中沙鹿</p>
          <address>{site.address}</address>
          <a className="local-phone" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          {site.nearbyLandmark && <p className="local-extra">鄰近 {site.nearbyLandmark}</p>}
          {site.businessHours && (
            <dl className="local-hours">
              {site.businessHours.map((item) => <div key={item.days}><dt>{item.days}</dt><dd>{item.hours}</dd></div>)}
            </dl>
          )}
          {site.parking && <p className="local-extra">{[site.parking.car, site.parking.scooter].filter(Boolean).join(" · ")}</p>}
          <div className="local-actions">
            <a className="section-cta section-cta-dark" href={site.mapUrl} target="_blank" rel="noreferrer" data-cta="maps-location" onClick={() => trackEvent("google_maps_click", { placement: "location" })}>Google Maps 導航 <ArrowIcon /></a>
            <a className="text-link" href={site.lineUrl} target="_blank" rel="noreferrer" data-cta="line-location" onClick={() => trackCta("location")}>LINE 預約體驗 <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq-section dark-section" id="faq">
      <div className="page-shell faq-grid">
        <div>
          <p className="eyebrow reveal">FAQ</p>
          <h2 className="display-heading reveal">常見問題。</h2>
        </div>
        <div className="faq-list">
          {site.faqs.map((faq) => (
            <details className="reveal" key={faq.question} onToggle={(event) => {
              if (event.currentTarget.open) trackEvent("faq_open", { question: faq.question });
            }}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section dark-section" id="contact">
      <div className="page-shell">
        <div className="contact-top reveal">
          <p className="eyebrow">START WITH KILO</p>
          <p className="contact-location">{site.locationLabel}</p>
        </div>
        <h2 className="display-heading reveal">找到真正適合你的<br />訓練方式。</h2>
        <div className="contact-bottom">
          <div className="contact-copy reveal">
            <p>不確定自己該從哪裡開始也沒關係。<br />先透過 LINE 告訴我們你的目標，<br />我們一起找到適合你的方向。</p>
            <p className="business-name">{site.chineseName}</p>
            <div className="contact-socials" aria-label="追蹤 KILO">
              <span>FOLLOW KILO</span>
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
              ))}
            </div>
          </div>
          <div className="contact-actions reveal">
            {site.lineUrl && (
              <a
                className="primary-contact"
                href={site.lineUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="透過 LINE 預約體驗（另開新視窗）"
                data-cta="line-contact"
                onClick={() => trackCta("final")}
              >
                <span className="primary-contact-copy">
                  <small>課程諮詢・體驗預約</small>
                  <strong>LINE 預約體驗</strong>
                </span>
                <ArrowIcon />
              </a>
            )}
            <a
              className="secondary-contact"
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
              data-cta="maps-contact"
              aria-label="在 Google Maps 查看 KILO（另開新視窗）"
              onClick={() => trackEvent("google_maps_click", { placement: "final" })}
            >
              Google Maps 查看位置 <ArrowIcon />
            </a>
            {site.phone && (
              <a className="secondary-contact" href={`tel:${site.phone}`}>電話聯絡 <ArrowIcon /></a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="page-shell footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-wordmark" href="#top" aria-label="KILO Fitness 回到首頁">
              <KiloWordmark />
            </a>
            <p>Fitness · Support · Community</p>
          </div>

          <div className="footer-contact">
            <p className="footer-column-label">CONTACT</p>
            {site.address && (
              <address className="footer-location">
                <div className="footer-contact-group">
                  <p className="footer-label">ADDRESS · 地址</p>
                  <a
                    className="footer-address-link"
                    href={site.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="在 Google Maps 查看 KILO Fitness 地址（另開新視窗）"
                    data-cta="directions-footer"
                    onClick={() => trackEvent("google_maps_click", { placement: "footer" })}
                  >
                    <span>{site.address}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                {site.phone && (
                  <div className="footer-contact-group">
                    <p className="footer-label">PHONE · 電話</p>
                    <a className="footer-phone-link" href={`tel:${site.phone}`}>
                      {site.phoneDisplay}
                    </a>
                  </div>
                )}
              </address>
            )}
          </div>

          <nav className="footer-nav" aria-label="頁尾導覽">
            <p className="footer-column-label">EXPLORE</p>
            <div>
              {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </div>
          </nav>
        </div>

        <div className="footer-meta">
          <div className="footer-socials" aria-label="KILO 社群平台">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
            ))}
          </div>
          <p>© 2026 KILO Fitness</p>
        </div>
      </div>
    </footer>
  );
}

function MobileBookingBar() {
  return (
    <a
      className="mobile-booking-bar"
      href={site.lineUrl}
      target="_blank"
      rel="noreferrer"
      data-cta="line-mobile-sticky"
      aria-label="透過 LINE 預約一對一體驗（另開新視窗）"
      onClick={() => trackCta("mobile-sticky")}
    >
      LINE 預約體驗 <ArrowIcon />
    </a>
  );
}

function App() {
  useEffect(() => {
    initialiseAnalytics();
    document.documentElement.classList.add("js-ready");
    const nodes = document.querySelectorAll<HTMLElement>(".reveal, .reveal-image");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );
    nodes.forEach((node) => observer.observe(node));

    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "ExerciseGym",
      name: site.name,
      alternateName: site.chineseName,
      sameAs: socialLinks.map((social) => social.href),
      image: site.canonicalUrl
        ? new URL(imageUrl("kilo-exterior-1600.jpg"), site.canonicalUrl).href
        : imageUrl("kilo-exterior-1600.jpg"),
    };
    if (site.address) {
      schema.address = {
        "@type": "PostalAddress",
        postalCode: "433",
        addressRegion: "台中市",
        addressLocality: "沙鹿區",
        streetAddress: "台灣大道七段303巷7號",
        addressCountry: "TW",
      };
    }
    if (site.phone) schema.telephone = site.phone;
    if (site.canonicalUrl) schema.url = site.canonicalUrl;
    if (site.mapUrl) schema.hasMap = site.mapUrl;
    const openingHours = site.businessHours?.flatMap((item) => (
      item.schemaDays && item.opens && item.closes
        ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: item.schemaDays, opens: item.opens, closes: item.closes }]
        : []
    ));
    if (openingHours?.length) {
      schema.openingHoursSpecification = openingHours;
    }
    if (site.googleRating) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: site.googleRating.rating,
        reviewCount: site.googleRating.reviewCount,
      };
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    let canonical: HTMLLinkElement | null = null;
    if (site.canonicalUrl) {
      canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        canonical.href = site.canonicalUrl;
        canonical.dataset.runtime = "true";
        document.head.appendChild(canonical);
      }
    }

    return () => {
      observer.disconnect();
      script.remove();
      if (canonical?.dataset.runtime === "true") canonical.remove();
      document.documentElement.classList.remove("js-ready");
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">跳至主要內容</a>
      <Header />
      <SocialDock />
      <main id="main-content">
        <Hero />
        <ValueStrip />
        <OneOnOne />
        <Audiences />
        <FirstExperience />
        <Coach />
        <Training />
        <Trial />
        <Space />
        <BrandStatement />
        <WhyKilo />
        <LocalInfo />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}

export default App;
