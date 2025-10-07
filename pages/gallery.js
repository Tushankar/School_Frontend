import React, { useEffect, useState, useRef } from "react";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";

export default function ArcGalleryHeroDemo() {
  const [dimensions, setDimensions] = useState({
    radius: 480,
    cardSize: 120,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const memoryImages = [
    "https://images.unsplash.com/photo-1755004609214-c252674df1ca?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1750218537952-0ae056c7f53a?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1755038995605-038a7345658f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546238232-20216dec9f72?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1753724223372-9a1df8eb5212?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1754079132860-5b37dab49daa?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1754079132962-2f6c62f14d33?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1754764987594-2236e7736115?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1755048796967-75a82d214846?q=80&w=400&auto=format&fit=crop",
  ];

  const startAngle = 20;
  const endAngle = 160;
  const radiusLg = 480;
  const radiusMd = 360;
  const radiusSm = 260;
  const cardSizeLg = 120;
  const cardSizeMd = 100;
  const cardSizeSm = 80;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const count = Math.max(memoryImages.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  const categories = ["All", "Art", "Events", "Science Fair"];

  return (
    <>
      <NavBarOnly />
      <Ticker />
      <div className="w-full" style={{ backgroundColor: "#F9FAFB" }}>
        <section className="relative overflow-hidden text-gray-900 min-h-screen flex flex-col">
          <div
            className="relative mx-auto"
            style={{
              width: "100%",
              height: dimensions.radius * 1.2,
            }}
          >
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
              {memoryImages.map((src, i) => {
                const angle = startAngle + step * i;
                const angleRad = (angle * Math.PI) / 180;

                const x = Math.cos(angleRad) * dimensions.radius;
                const y = Math.sin(angleRad) * dimensions.radius;

                return (
                  <div
                    key={i}
                    className="absolute opacity-0"
                    style={{
                      width: dimensions.cardSize,
                      height: dimensions.cardSize,
                      left: `calc(50% + ${x}px)`,
                      bottom: `${y}px`,
                      transform: `translate(-50%, 50%)`,
                      animation: `fadeInUp 0.8s ease-out ${i * 100}ms forwards`,
                      zIndex: count - i,
                    }}
                  >
                    <div
                      className="rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200 bg-white transition-transform hover:scale-105 w-full h-full"
                      style={{ transform: `rotate(${angle / 4}deg)` }}
                    >
                      <img
                        src={src}
                        alt={`Memory ${i + 1}`}
                        className="block w-full h-full object-cover"
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/400x400/334155/e2e8f0?text=Memory";
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
            <div
              className="text-center max-w-2xl px-6 opacity-0"
              style={{ animation: "fadeIn 0.8s ease-out 800ms forwards" }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Rediscover Your Memories with AI
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Our intelligent platform finds, organizes, and brings your most
                cherished moments back to life.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-full transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                        : "border border-gray-300 bg-white hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translate(-50%, 60%);
              }
              to {
                opacity: 1;
                transform: translate(-50%, 50%);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>

        {selectedCategory === "All" && <MasonryImageGallery />}
      </div>
      <Footer />
    </>
  );
}

// AnimatedImage component for lazy loading with fade-in effect
function AnimatedImage({ alt, src, ratio, placeholder }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleError = () => {
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <div
      ref={ref}
      className="bg-gray-100 relative w-full rounded-lg border border-gray-200 overflow-hidden"
      style={{ aspectRatio: ratio }}
    >
      <img
        alt={alt}
        src={imgSrc}
        className={`w-full h-full rounded-lg object-cover transition-opacity duration-1000 ease-in-out ${
          isInView && !isLoading ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        onError={handleError}
      />
    </div>
  );
}

// Masonry Image Gallery Component
function MasonryImageGallery() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-10 px-4">
      <div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, col) => (
          <div key={col} className="grid gap-6">
            {Array.from({ length: 10 }).map((_, index) => {
              const isPortrait = Math.random() > 0.5;
              const width = isPortrait ? 1080 : 1920;
              const height = isPortrait ? 1920 : 1080;
              const ratio = isPortrait ? 9 / 16 : 16 / 9;
              return (
                <AnimatedImage
                  key={`${col}-${index}`}
                  alt={`Image ${col}-${index}`}
                  src={`https://picsum.photos/seed/${col}-${index}/${width}/${height}`}
                  ratio={ratio}
                  placeholder={`https://placehold.co/${width}x${height}/EEE/999`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
