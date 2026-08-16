import { useEffect, useRef, useState } from "react";
import { site } from "./data/site";

type PhotoProps = {
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
  preferJpeg?: boolean;
};

const navigation = [
  { label: "關於 KILO", href: "#about" },
  { label: "空間", href: "#space" },
  { label: "教練", href: "#coach" },
  { label: "訓練", href: "#training" },
  { label: "聯絡我們", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: site.instagram },
  { label: "Threads", href: site.threads },
  { label: "Facebook", href: site.facebook },
];

const imageUrl = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;
const trainerImageUrl = (image: string) => {
  if (/^https?:\/\//.test(image)) return image;
  return imageUrl(image.replace(/^\/images\//, ""));
};

function Photo({ name, alt, width, height, className = "", eager = false, preferJpeg = false }: PhotoProps) {
  return (
    <picture className={`photo ${className}`}>
      {!preferJpeg && (
        <source
          type="image/avif"
          srcSet={`${imageUrl(`${name}-1200.avif`)} 1200w`}
          sizes="(max-width: 767px) 100vw, (max-width: 1400px) 85vw, 1400px"
        />
      )}
      <img
        src={imageUrl(`${name}-1600.jpg`)}
        srcSet={`${imageUrl(`${name}-1000.jpg`)} 1000w, ${imageUrl(`${name}-1600.jpg`)} 1600w`}
        sizes="(max-width: 767px) 100vw, (max-width: 1400px) 85vw, 1400px"
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding={eager ? "sync" : "async"}
      />
    </picture>
  );
}

function HeroMedia() {
  return (
    <picture className="photo hero-photo">
      <source
        media="(max-width: 900px) and (orientation: portrait)"
        srcSet={`${imageUrl("rack-portrait-1000.jpg")} 1000w, ${imageUrl("rack-portrait-1600.jpg")} 1600w`}
        sizes="100vw"
      />
      <img
        src={imageUrl("training-space-1600.jpg")}
        srcSet={`${imageUrl("training-space-1000.jpg")} 1000w, ${imageUrl("training-space-1600.jpg")} 1600w`}
        sizes="100vw"
        alt="KILO Fitness 沙鹿私人訓練空間與重訓設備"
        width={7008}
        height={3944}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
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
    const pageContent = document.querySelectorAll<HTMLElement>("main, .footer");
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
        KILO
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
        <p className="eyebrow reveal">KILO FITNESS · SHALU</p>
        <h1 className="reveal reveal-delay-1">你的進步，<br />按照你的節奏。</h1>
        <div className="hero-meta reveal reveal-delay-2">
          <div>
            <p>Fitness · Support · Community</p>
            <p>運動・陪伴・社群</p>
          </div>
          <div className="hero-actions">
            <a className="text-link text-link-light" href="#about">認識 KILO <ArrowIcon /></a>
            <a
              className="text-link text-link-primary"
              href={site.lineUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="透過 LINE 預約體驗（另開新視窗）"
              data-cta="line-hero"
            >
              LINE 預約體驗 <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="向下瀏覽">
        <span>SCROLL</span><i />
      </a>
    </section>
  );
}

const pillars = [
  { en: "FITNESS", zh: "運動", text: "專注於有效、安全且適合個人的訓練。" },
  { en: "SUPPORT", zh: "陪伴", text: "每個人的起點不同，訓練也應該按照自己的節奏前進。" },
  { en: "COMMUNITY", zh: "社群", text: "讓健身不只是一堂課，而是一段有人一起走的過程。" },
];

function Manifesto() {
  return (
    <section className="manifesto light-section" id="about">
      <div className="page-shell">
        <div className="section-intro">
          <p className="eyebrow reveal">ABOUT KILO · 01</p>
          <div className="intro-grid">
            <h2 className="display-heading reveal">不只是訓練。<br />我們想陪你<br />走得更久。</h2>
            <div className="intro-copy reveal">
              <p>KILO 相信，真正有價值的訓練，不只是今天多舉起幾公斤，而是讓你在往後的生活裡，擁有更多力量、更多選擇。</p>
              <p className="brand-thought">你的肌肉量，決定你往後生活的質量。</p>
            </div>
          </div>
        </div>
        <div className="pillars">
          {pillars.map((pillar, index) => (
            <article className="pillar reveal" key={pillar.en}>
              <span className="pillar-number">0{index + 1}</span>
              <p className="pillar-en">{pillar.en}</p>
              <h3>{pillar.zh}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Space() {
  return (
    <section className="space-section dark-section" id="space">
      <div className="page-shell space-heading">
        <p className="eyebrow reveal">THE SPACE · 02</p>
        <div className="space-title-row">
          <h2 className="display-heading reveal">專注訓練的<br />一方空間。</h2>
          <p className="space-lead reveal">沒有擁擠的人潮。<br />沒有多餘的干擾。<br />留下真正需要的設備，<br />以及專注於自己的時間。</p>
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
          <span className="large-index">K</span>
          <p>光線、材質與設備各有位置。<br />空間保持克制，讓注意力回到每一次動作。</p>
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
          <p>從訓練設備到盥洗空間，<br />每一處細節都維持同樣的用心。</p>
        </div>
        <div className="amenity-gallery">
          <figure className="amenity-photo reveal-image">
            <Photo name="amenities-sink" alt="KILO Fitness 盥洗空間的洗手台與暖色鏡面燈光" width={3944} height={7008} />
            <figcaption><span>05</span> AMENITIES</figcaption>
          </figure>
          <figure className="amenity-photo amenity-photo-secondary reveal-image">
            <Photo name="amenities-toilet" alt="KILO Fitness 盥洗空間內的洗手間與暖色線性照明" width={3944} height={7008} />
            <figcaption>RESTROOM</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Coach() {
  return (
    <section className="coach-section light-section" id="coach">
      <div className="page-shell">
        <p className="eyebrow reveal">YOUR COACH · 03</p>
        <div className="coach-intro">
          <div className="coach-image-wrap reveal-image">
            <Photo name="bench" alt="KILO Fitness 訓練椅與暖色質感牆面" width={3944} height={7008} />
            <p>UNDERSTAND · ADAPT · PROGRESS</p>
          </div>
          <div className="coach-copy reveal">
            <h2 className="display-heading">真正理解你的訓練，<br />從理解你開始。</h2>
            <p>每個人的生活、身體狀態與目標都不一樣。好的教練不只安排動作，也會傾聽、觀察，陪你找到適合長期前進的方式。</p>
            <div className="coach-values" aria-label="KILO 教練理念">
              <span>理解你的起點</span>
              <span>調整訓練節奏</span>
              <span>一起穩定前進</span>
            </div>
          </div>
        </div>

        {site.trainers.length > 0 && (
          <div className="trainer-list">
            {site.trainers.map((trainer) => (
              <article className="trainer" key={trainer.name}>
                <img src={trainerImageUrl(trainer.image)} alt={trainer.imageAlt} loading="lazy" />
                <div>
                  <p className="eyebrow">{trainer.role}</p>
                  <h3>{trainer.name}</h3>
                  {trainer.englishName && <p className="trainer-english">{trainer.englishName}</p>}
                  <p>{trainer.bio}</p>
                  <ul>{trainer.specialties.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
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
            </article>
          ))}
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
          <p className="eyebrow reveal">WHY KILO · 05</p>
          <h2 className="display-heading reveal">為什麼是<br />KILO？</h2>
          <div className="why-body reveal">
            <p>KILO 以「運動・陪伴・社群」為核心。訓練不是一段需要獨自完成的路，而是有人理解你的目標、尊重你的節奏，和你一起把改變留在生活裡。</p>
            <p>我們在意的不只是重量，也在意你能不能自在地持續。因為真正重要的進步，從來不是一時衝刺，而是每一次願意再往前一點。</p>
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

function Contact() {
  return (
    <section className="contact-section dark-section" id="contact">
      <div className="page-shell">
        <div className="contact-top reveal">
          <p className="eyebrow">START HERE · 06</p>
          <p className="contact-location">{site.locationLabel}</p>
        </div>
        <h2 className="display-heading reveal">準備開始了嗎？</h2>
        <div className="contact-bottom">
          <div className="contact-copy reveal">
            <p>想了解課程、教練或訓練方式，<br />歡迎直接和 KILO 聊聊。</p>
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
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              data-cta="instagram-contact"
            >
              Instagram 私訊 <ArrowIcon />
            </a>
            {site.phone && (
              <a className="secondary-contact" href={`tel:${site.phone}`}>電話聯絡 <ArrowIcon /></a>
            )}
            {site.mapUrl && (
              <a className="secondary-contact" href={site.mapUrl} target="_blank" rel="noreferrer">Google 地圖 <ArrowIcon /></a>
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
        <div>
          <a className="footer-wordmark" href="#top">KILO</a>
          <p>Fitness · Support · Community</p>
        </div>
        <nav aria-label="頁尾導覽">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
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

function App() {
  useEffect(() => {
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
    if (site.address) schema.address = site.address;
    if (site.phone) schema.telephone = site.phone;
    if (site.canonicalUrl) schema.url = site.canonicalUrl;
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
      <main id="main-content">
        <Hero />
        <Manifesto />
        <Space />
        <Coach />
        <Training />
        <BrandStatement />
        <WhyKilo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
