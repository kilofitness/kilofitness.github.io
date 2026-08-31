type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initialiseAnalytics() {
  if (!measurementId || document.querySelector("script[data-kilo-ga]")) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.kiloGa = "true";
  document.head.appendChild(script);

  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    (window as Window & { dataLayer?: unknown[] }).dataLayer = [
      ...((window as Window & { dataLayer?: unknown[] }).dataLayer ?? []),
      args,
    ];
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

export function trackEvent(name: string, params: EventParams = {}) {
  try {
    window.gtag?.("event", name, params);
  } catch {
    // Analytics must never interfere with booking or navigation.
  }
}

export function trackCta(placement: string) {
  trackEvent("line_reservation_click", { placement });
}
