import { useCallback, useEffect, useRef, useState } from "react";

export type ResponsiveImageSource = {
  srcSet: string;
  sizes?: string;
  media?: string;
  type?: string;
};

type ImageStatus = "loading" | "retrying" | "loaded" | "failed";

type ResilientImageProps = {
  src: string;
  srcSet?: string;
  sources?: ResponsiveImageSource[];
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "sync" | "async" | "auto";
};

const RETRY_DELAYS = [1500, 4000] as const;

function addRetryToken(url: string, token: number) {
  if (token === 0) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}image_retry=${token}`;
}

function addRetryTokenToSrcSet(srcSet: string, token: number) {
  if (token === 0) return srcSet;

  return srcSet
    .split(",")
    .map((candidate) => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [addRetryToken(url, token), ...descriptor].join(" ");
    })
    .join(", ");
}

export function ResilientImage({
  src,
  srcSet,
  sources = [],
  sizes,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
}: ResilientImageProps) {
  const [status, setStatus] = useState<ImageStatus>("loading");
  const [retryCount, setRetryCount] = useState(0);
  const [retryToken, setRetryToken] = useState(0);
  const [fallbackOnly, setFallbackOnly] = useState(false);
  const retryTimer = useRef<number | null>(null);

  const clearRetryTimer = useCallback(() => {
    if (retryTimer.current !== null) {
      window.clearTimeout(retryTimer.current);
      retryTimer.current = null;
    }
  }, []);

  const retryNow = useCallback(() => {
    clearRetryTimer();
    setFallbackOnly(true);
    setRetryCount(0);
    setRetryToken((current) => current + 1);
    setStatus("loading");
  }, [clearRetryTimer]);

  useEffect(() => {
    return clearRetryTimer;
  }, [clearRetryTimer]);

  useEffect(() => {
    const handleOnline = () => {
      if (status !== "loaded") retryNow();
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [retryNow, status]);

  const handleLoad = () => {
    clearRetryTimer();
    setStatus("loaded");
  };

  const handleError = () => {
    if (status === "retrying" || status === "failed") return;

    if (retryCount < RETRY_DELAYS.length) {
      setStatus("retrying");
      const delay = RETRY_DELAYS[retryCount];
      retryTimer.current = window.setTimeout(() => {
        setFallbackOnly(true);
        setRetryCount((current) => current + 1);
        setRetryToken((current) => current + 1);
        setStatus("loading");
        retryTimer.current = null;
      }, delay);
      return;
    }

    setStatus("failed");
  };

  const activeSources = fallbackOnly
    ? sources.filter((source) => source.type !== "image/avif")
    : sources;
  const stateClass = status === "loaded" ? "is-loaded" : status === "failed" ? "is-failed" : "is-loading";

  return (
    <div
      className={`photo resilient-image ${stateClass} ${className}`.trim()}
      aria-busy={status === "loading" || status === "retrying"}
    >
      <picture aria-hidden={status === "failed" ? "true" : undefined}>
        {activeSources.map((source) => (
          <source
            key={`${source.media ?? "all"}-${source.type ?? "image"}`}
            type={source.type}
            media={source.media}
            srcSet={addRetryTokenToSrcSet(source.srcSet, retryToken)}
            sizes={source.sizes}
          />
        ))}
        <img
          src={addRetryToken(src, retryToken)}
          srcSet={srcSet ? addRetryTokenToSrcSet(srcSet, retryToken) : undefined}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding={decoding}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>

      {status === "failed" && (
        <div className="image-fallback" role="status">
          <span>圖片暫時無法載入</span>
          <button type="button" onClick={retryNow}>重新載入圖片</button>
        </div>
      )}
    </div>
  );
}
