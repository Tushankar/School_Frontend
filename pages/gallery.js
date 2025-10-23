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
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/gallery?category=${selectedCategory}`
        );
        if (response.ok) {
          const data = await response.json();
          setGalleryImages(data);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, [selectedCategory]);

  const memoryImages = [
    "/assets/hall.jpg",
    "/assets/studentExam.jpg",
    "/assets/science.jpeg",
    "/assets/gardening.jpeg",
    "/assets/chemicalReaction.jpg",
    "/assets/istudies_1.png",
    "/assets/istudies_2.png",
    "/assets/istudies_3.png",
    "/assets/istudies_4.png",
    "/assets/istudies_5.png",
    "/assets/istudies_6.png",
    "/assets/istudies_7.png",
  ];

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
            className="relative mx-auto w-full"
            style={{
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

          <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 -mt-20 sm:-mt-32 md:-mt-40 lg:-mt-52">
            <div
              className="text-center max-w-2xl opacity-0"
              style={{ animation: "fadeIn 0.8s ease-out 800ms forwards" }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Rediscover Your Memories with AI
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
                Our intelligent platform finds, organizes, and brings your most
                cherished moments back to life.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 text-sm sm:text-base ${
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

        <MasonryImageGallery images={galleryImages} loading={loading} />
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
    console.error("Image failed to load:", src);
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <div
      ref={ref}
      className="bg-gray-100 relative w-full rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      style={{ aspectRatio: ratio }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}
      <img
        alt={alt}
        src={isInView ? imgSrc : placeholder}
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
function MasonryImageGallery({ images, loading }) {
  if (loading) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">
            Loading gallery images...
          </p>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="text-center">
          <p className="text-gray-500 text-sm sm:text-base">
            No images available in this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image, index) => {
          const isPortrait = Math.random() > 0.5;
          const ratio = isPortrait ? 9 / 16 : 16 / 9;
          const imageUrl = `http://localhost:4000${image.imageUrl}`;
          console.log("Gallery Image URL:", imageUrl, "| Title:", image.title);
          return (
            <AnimatedImage
              key={image._id || index}
              alt={image.title || "Gallery Image"}
              src={imageUrl}
              ratio={ratio}
              placeholder={`https://placehold.co/400x400/EEE/999?text=${encodeURIComponent(
                image.title || "Image"
              )}`}
            />
          );
        })}
      </div>
    </div>
  );
}
