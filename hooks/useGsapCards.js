import { useEffect } from "react";

export default function useGsapCards() {
  useEffect(() => {
    // Wait for window.gsap to be available (loaded via CDN in _app.js)
    if (typeof window === "undefined" || !window.gsap) return;

    const gsap = window.gsap;
    const { ScrollTrigger } = gsap;

    if (ScrollTrigger) {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch (e) {
        // already registered
      }
    }

    // animate smaller cards
    const cards = document.querySelectorAll(".animate-card");
    cards.forEach((card) => {
      const anim = card.getAttribute("data-anim") || "up";
      let fromVars = { y: 30, autoAlpha: 0 };
      if (anim === "left") fromVars = { x: -80, autoAlpha: 0 };
      if (anim === "right") fromVars = { x: 80, autoAlpha: 0 };

      gsap.fromTo(card, fromVars, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    // animate full sections (page-level)
    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((sec) => {
      const anim = sec.getAttribute("data-anim") || "up";
      let from = { y: 40, autoAlpha: 0 };
      if (anim === "left") from = { x: -200, autoAlpha: 0 };
      if (anim === "right") from = { x: 200, autoAlpha: 0 };

      gsap.fromTo(sec, from, {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    return () => {
      // kill scrolltriggers created by this hook
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {}
    };
  }, []);
}
