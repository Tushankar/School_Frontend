import { useEffect, useState } from "react";
import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";

const defaultSlides = [
  {
    img: "/assets/istudies_1.png",
    heading: "Islamic Studies at Al-Rasheed Academy: Embracing Faith and Knowledge",
    text: "At Al-Rasheed Academy, we understand the significance of providing a well-rounded education that encompasses both academic excellence and spiritual development. Our commitment to nurturing the whole child extends to the implementation of our Islamic Studies curriculum, which plays a vital role in shaping the character and values of our students.",
  },
  {
    img: "/assets/istudies_2.png",
    heading: "Integration of Islamic Values",
    text: "Our Islamic Studies curriculum is designed to instill a deep understanding of Islamic principles, values, and traditions. By integrating these teachings into our daily lessons, we aim to foster an environment where students not only excel academically but also develop a strong moral compass rooted in Islamic ethics.",
  },
  {
    img: "/assets/istudies_3.png",
    heading: "Quranic Studies",
    text: "The study of the Quran is at the heart of our Islamic Studies program. Students engage in the recitation and memorization of Quranic verses, gaining a profound connection with the holy book. We emphasize the importance of understanding the meanings and teachings of the Quran, empowering students to apply its principles to their lives.",
  },
  {
    img: "/assets/istudies_4.png",
    heading: "Prophet's Life and Sunnah",
    text: "Our curriculum includes an exploration of the life and teachings of Prophet Muhammad (peace be upon him) and the importance of following the Sunnah. Through engaging lessons, students learn about the Prophet's exemplary character, compassion, and leadership, providing them with role models to emulate in their daily lives.",
  },
  {
    img: "/assets/istudies_5.png",
    heading: "Islamic History and Civilization",
    text: "We delve into the rich history and contributions of Islamic civilizations, fostering an appreciation for the cultural and intellectual achievements of the Islamic world. Students gain a broader perspective on the global impact of Islamic societies throughout history.",
  },
  {
    img: "/assets/istudies_6.png",
    heading: "Community and Service Learning",
    text: "As part of our commitment to instilling a sense of social responsibility, students actively participate in community service projects grounded in Islamic values. These experiences provide practical opportunities for students to embody compassion, generosity, and empathy, reflecting the teachings of Islam.",
  },
  {
    img: "/assets/istudies_7.png",
    heading: "Family Involvement",
    text: "We recognize the importance of a collaborative approach to education. Parents are encouraged to be active participants in their child's learning journey, especially in reinforcing Islamic values at home. Our school community thrives on open communication and partnership to ensure the holistic development of each student. At Al-Rasheed Academy, the Islamic Studies curriculum serves as a cornerstone, guiding students on a path of spiritual growth and academic success. We believe that a strong foundation in Islamic principles, coupled with a rigorous academic program, prepares our students to navigate the challenges of the modern world while upholding the values of compassion, integrity, and service to humanity.",
  },
];

export default function IslamicStudies() {
  const [slides, setSlides] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/cms/islamic-studies");
        if (response.ok) {
          const data = await response.json();
          if (data.slides && Array.isArray(data.slides)) {
            setSlides(data.slides);
          }
        }
      } catch (err) {
        console.error("Failed to fetch CMS data", err);
      }
    };
    fetchCmsData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now < pausedUntil) return;
      setCurrent((prev) => prev === slides.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [pausedUntil]);

  const pauseAuto = (ms = 5000) => setPausedUntil(Date.now() + ms);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    pauseAuto();
  };
  const next = () => {
    setCurrent((c) => (c + 1) % slides.length);
    pauseAuto();
  };

  return (
    <>
      <Head>
        <title>Islamic Studies & Quran - Al-Rasheed Academy</title>
      </Head>

      <NavBarOnly />
      <Ticker />

      {/* Banner Section */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/hall.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-light tracking-wide">
            Islamic Studies
          </h1>
          <p className="mt-4 text-sm">
            Home › Islamic Studies
          </p>
        </div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <style jsx>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .fadeInUp { animation: fadeInUp 700ms ease both; }

          .glass-gloss {
            position: absolute;
            width: 220%;
            height: 260%;
            right: -60%;
            bottom: -100%;
            background: linear-gradient(90deg, rgba(255,223,100,0) 0%, rgba(255,210,80,0.14) 50%, rgba(255,223,100,0) 100%);
            transform: rotate(-45deg) translate(0,0);
            filter: blur(6px);
            opacity: 0.95;
            pointer-events: none;
            z-index: 10;
            animation: glossMove 2.6s ease-in-out infinite;
            transition: opacity 200ms linear;
          }

          .glass-gloss-2 {
            position: absolute;
            width: 240%;
            height: 260%;
            right: -70%;
            bottom: -110%;
            background: linear-gradient(90deg, rgba(255,223,100,0) 0%, rgba(255,210,80,0.16) 50%, rgba(255,223,100,0) 100%);
            transform: rotate(-45deg) translate(0,0);
            filter: blur(6px);
            opacity: 0;
            pointer-events: none;
            z-index: 11;
            animation: glossMove 1.6s ease-in-out infinite;
            transition: opacity 150ms linear;
            animation-play-state: paused;
          }

          .glass-card:hover .glass-gloss {
            animation-duration: 1.4s;
          }
          .glass-card:hover .glass-gloss-2 {
            opacity: 0.95;
            animation-play-state: running;
            animation-duration: 1.6s;
          }

          @keyframes glossMove {
            0% {
              transform: rotate(-45deg) translate(120%, 120%);
              opacity: 0;
            }
            15% {
              opacity: 0.2;
            }
            50% {
              transform: rotate(-45deg) translate(-20%, -20%);
              opacity: 0.9;
            }
            85% {
              opacity: 0.2;
            }
            100% {
              transform: rotate(-45deg) translate(-120%, -120%);
              opacity: 0;
            }
          }
        `}</style>

        <div className="relative w-screen overflow-hidden bg-black">
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 text-white opacity-80 hover:opacity-100 transform hover:scale-105 transition-all focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 text-white opacity-80 hover:opacity-100 transform hover:scale-105 transition-all focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="flex"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: "transform 2000ms ease-in-out",
            }}
          >
            {slides.map((slide, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-full h-screen overflow-hidden"
                >
                  <img
                    src={slide.img}
                    alt={slide.heading}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>

                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 w-2/5 p-8 ${
                      isEven ? "right-24" : "left-24"
                    } hidden sm:block group z-40`}
                    onMouseEnter={() => setPausedUntil(Infinity)}
                    onMouseLeave={() => setPausedUntil(Date.now() + 3000)}
                  >
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl transition-all duration-300 relative overflow-hidden glass-card">
                      <span className="glass-gloss" aria-hidden="true" />
                      <span className="glass-gloss-2" aria-hidden="true" />
                      <div className="relative z-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-snug text-white transition duration-300 cursor-pointer group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.85)] text-left">
                          {slide.heading}
                        </h2>
                        <p className="text-lg md:text-xl text-white/95 leading-relaxed text-justify">{slide.text}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute left-4 right-4 bottom-6 p-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg text-white sm:hidden shadow-lg transition-all duration-300 hover:shadow-xl z-40 overflow-hidden glass-card"
                    onMouseEnter={() => setPausedUntil(Infinity)}
                    onMouseLeave={() => setPausedUntil(Date.now() + 3000)}
                  >
                    <span className="glass-gloss" aria-hidden="true" />
                    <span className="glass-gloss-2" aria-hidden="true" />
                    <div className="relative z-20">
                      <h2 className="text-xl font-semibold mb-2 text-white text-left">{slide.heading}</h2>
                      <p className="text-sm leading-relaxed text-white/90 text-justify">{slide.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2 z-50 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  setCurrent(i);
                  pauseAuto();
                }}
                className={`w-3 h-3 rounded-full transition-all focus:outline-none ${
                  current === i ? "bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}