import React, { useEffect, useState, useRef } from "react";

// Return the carousel CSS with a customizable height value
const getCarouselStyle = (height) => `
.uw-carousel {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  height: ${height};
  position: relative;
  overflow: hidden;
}
.uw-slide {
  position: absolute;
  inset: 0;
  transition: opacity 800ms ease;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.uw-slide.active {
  opacity: 1;
}
.uw-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.uw-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.12));
  pointer-events: none;
}
.uw-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  background: #f3f3f3;
}
.uw-dots {
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}
.uw-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.6);
  border: 0;
  padding: 0;
  cursor: pointer;
}
.uw-dot.active {
  background: rgba(255,255,255,1);
  box-shadow: 0 0 0 4px rgba(0,0,0,0.08) inset;
}
.uw-counter {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  z-index: 20;
}
`;

export default function UnsplashCarousel({
  interval = 2500,
  // height can be a CSS size string (e.g. '70vh', '500px') or a number (pixels)
  height = "60vh",
  images = [
    "https://www.alrasheedacademy.org/Admin/uploads/657a2bbe855ef1702505406.jpg",
    "https://www.alrasheedacademy.org/Admin/uploads/657a2bca0b9781702505418.jpg",
    "https://www.alrasheedacademy.org/Admin/uploads/657a2bf0ccb0c1702505456.jpg",
  ],
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [mounted, setMounted] = useState(false);

  // Manage the auto-advance timer with a ref so it isn't recreated on every
  // index change. This is more robust and lets us restart the timer when the
  // user manually navigates.
  const timerRef = useRef(null);

  useEffect(() => {
    // ensure we only start the timer on the client after mount (avoid SSR/hydration issues)
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!images || images.length === 0) return;
    // clear any existing timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mounted, images, interval]);

  // debugging: log index changes to the console so we can tell whether
  // the state is updating or the UI is failing to reflect it.
  useEffect(() => {
    console.log("UnsplashCarousel: active index ->", index);
  }, [index]);

  // preload images and track which are loaded
  useEffect(() => {
    const trackers = {};
    images.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        trackers[i] = true;
        setLoaded((s) => ({ ...s, [i]: true }));
      };
      img.onerror = () => {
        trackers[i] = false;
        setLoaded((s) => ({ ...s, [i]: false }));
      };
    });
  }, [images]);

  return (
    <div style={{ backgroundColor: "transparent", padding: 0, margin: 0 }}>
      {/* Resolve numeric heights to pixels, leave strings as-is */}
      <style
        dangerouslySetInnerHTML={{
          __html: getCarouselStyle(
            typeof height === "number" ? `${height}px` : height
          ),
        }}
      />
      <div className="uw-carousel">
        {images.length === 0 && (
          <div className="uw-fallback">No images configured</div>
        )}

        {images.map((src, i) => (
          <div
            key={i}
            className={`uw-slide ${i === index ? "active" : ""}`}
            aria-hidden={i === index ? "false" : "true"}
          >
            {loaded[i] ? (
              <img className="uw-img" src={src} alt={`slide-${i}`} />
            ) : (
              <div className="uw-fallback">Loading image...</div>
            )}
          </div>
        ))}

        <div className="uw-overlay" />
        {/* debug counter to confirm index changes visually */}
        <div className="uw-counter">
          {index + 1} / {images.length}
        </div>
        {/* pagination dots */}
        {images && images.length > 0 && (
          <div
            className="uw-dots"
            role="tablist"
            aria-label="Carousel navigation"
          >
            {images.map((_, i) => (
              <button
                key={i}
                className={`uw-dot ${i === index ? "active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : "false"}
                onClick={() => {
                  setIndex(i);
                  // restart timer so the next auto-advance waits a full interval
                  if (timerRef.current) clearInterval(timerRef.current);
                  timerRef.current = setInterval(() => {
                    setIndex((p) => (p + 1) % images.length);
                  }, interval);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
