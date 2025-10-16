import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

const tickerStyle = `
@keyframes ticker-scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.ticker {
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
}
.ticker-label {
  background: linear-gradient(180deg, #e14b4b, #c92f35);
  color: #ffffff;
  width: 84px;
  min-width: 84px;
  height: 72px; /* increased from 56px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-family: Georgia, serif;
  text-align: center;
  padding: 4px 6px;
  box-sizing: border-box;
}
.ticker-label .line {
  line-height: 1;
}
.ticker-body {
  flex: 1;
  overflow: hidden;
  height: 72px; /* increased from 56px */
  display: flex;
  align-items: center;
  background: transparent;
  position: relative;
}
.scrolling-text {
  display: block;
  padding-left: 16px;
  transform: translateX(100%);
  /* JS drives the animation for reliability; keep CSS animation disabled to avoid conflicts */
  animation: none;
  will-change: transform;
  white-space: nowrap;
}
.highlight-phrase.underlined {
  text-decoration: underline;
  text-decoration-color: #B8935A;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.highlight-phrase {
  text-decoration: underline;
  text-decoration-color: #B8935A;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
.highlight-phrase.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
}
.highlight-phrase.clickable:hover {
  text-decoration-thickness: 3px;
  color: #9A7B4A;
}
`;

export default function Ticker() {
  const router = useRouter();
  const scrollingRef = useRef(null);
  const bodyRef = useRef(null);
  const phraseRef = useRef(null);
  const pauseRef = useRef(null);
  const resumeRef = useRef(null);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [tickerData, setTickerData] = useState({
    label: "ARA News",
    content: `Accreditation Al-Rasheed Academy is the 1st Accredited School In the Buffalo Area by the COGNIA Accreditation Organization! - Good News! "Unlock Your Future: " Limited Volunteer Spots Available – Shape Your Experience by Contributing to ARA School Community Today! 🌟`,
    highlightText: "Limited Volunteer Spots Available",
    highlightLink: "/career/volunteer-application",
    enabled: true,
    scrollSpeed: 20,
  });

  // Fetch ticker data from backend
  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/auth/cms/ticker"
        );
        if (response.ok) {
          const data = await response.json();
          setTickerData((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Failed to fetch ticker data", err);
        // Keep default data on error
      }
    };

    fetchTickerData();
  }, []);

  // Handle highlight text click
  const handleHighlightClick = () => {
    if (tickerData.highlightLink) {
      router.push(tickerData.highlightLink);
    }
  };

  useEffect(() => {
    const el = scrollingRef.current;
    const container = bodyRef.current;
    if (!el || !container) return;

    let rafId = null;
    let last = performance.now();
    let pos = 0;
    let textWidth = 0;
    let containerWidth = 0;
    const duration = tickerData.scrollSpeed || 20; // seconds for full travel from API

    function measure() {
      // prefer scrollWidth which often reports content width immediately
      textWidth = Math.ceil(
        el.scrollWidth || el.getBoundingClientRect().width || 0
      );
      containerWidth = Math.ceil(
        container.getBoundingClientRect().width || container.clientWidth || 0
      );
      console.debug("[Ticker] measure", { textWidth, containerWidth });
    }

    function step(now) {
      const delta = (now - last) / 1000; // seconds
      last = now;
      const totalDistance = textWidth + containerWidth || 1;
      const speed = totalDistance / duration; // px per second
      pos -= speed * delta;
      if (pos <= -textWidth) {
        pos = containerWidth;
      }
      el.style.transform = `translateX(${pos}px)`;
      rafId = requestAnimationFrame(step);
    }

    // pause/resume helpers
    function pause() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    function resume() {
      if (!rafId) {
        last = performance.now();
        rafId = requestAnimationFrame(step);
      }
    }

    function startAnimation() {
      // start position just inside the right edge so text is visible immediately
      pos = Math.max(containerWidth - 50, Math.floor(containerWidth * 0.2));
      el.style.transform = `translateX(${pos}px)`;
      last = performance.now();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(step);
      console.debug("[Ticker] startAnimation", {
        pos,
        textWidth,
        containerWidth,
      });
    }

    function onResize() {
      measure();
      startAnimation();
    }

    el.style.willChange = "transform";

    // Retry measuring until we get usable widths (handles slow image/font layout)
    let attempts = 0;
    const maxAttempts = 60; // try for up to ~6 seconds

    function waitForSizes() {
      measure();
      attempts += 1;
      const ok = textWidth > 20 && containerWidth > 50;
      if (ok || attempts >= maxAttempts) {
        // ensure we have sensible defaults
        textWidth = textWidth || 300;
        containerWidth = containerWidth || 300;
        // apply a fresh start using the refined sizes
        startAnimation();
      } else {
        setTimeout(waitForSizes, 100);
      }
    }

    // Start measuring and start animation immediately with whatever sizes we have
    measure();
    // Ensure sensible defaults before immediate start
    textWidth = textWidth || 300;
    containerWidth = containerWidth || 300;
    startAnimation();
    // continue checking and refine sizes if necessary
    waitForSizes();
    window.addEventListener("load", waitForSizes);
    window.addEventListener("resize", onResize);

    // expose pause/resume functions to refs so JSX handlers can call them
    pauseRef.current = pause;
    resumeRef.current = resume;

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("load", waitForSizes);
      window.removeEventListener("resize", onResize);
      pauseRef.current = null;
      resumeRef.current = null;
    };
  }, [tickerData.scrollSpeed, tickerData.content]);

  // Don't render if ticker is disabled
  if (!tickerData.enabled) {
    return null;
  }

  const labelParts = tickerData.label.split(" ");

  return (
    <div style={{ backgroundColor: "transparent", padding: 0, margin: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: tickerStyle }} />
      <div
        className="ticker"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <div className="ticker-label" aria-hidden>
          <div className="line">{labelParts[0] || "ARA"}</div>
          <div className="line">{labelParts[1] || "News"}</div>
        </div>

        <div
          className="ticker-body"
          ref={bodyRef}
          style={{ margin: 0, padding: 0, height: "72px" }}
          onMouseEnter={() => {
            if (pauseRef.current) pauseRef.current();
            setIsUnderlined(true);
          }}
          onMouseLeave={() => {
            setIsUnderlined(false);
            if (resumeRef.current) resumeRef.current();
          }}
          onTouchStart={() => {
            if (pauseRef.current) pauseRef.current();
            setIsUnderlined(true);
          }}
          onTouchEnd={() => {
            setIsUnderlined(false);
            if (resumeRef.current) resumeRef.current();
          }}
        >
          <div
            ref={scrollingRef}
            className="scrolling-text font-bold text-lg"
            style={{ color: "#B8935A", fontFamily: "Georgia, serif" }}
          >
            {tickerData.highlightText &&
            tickerData.content.includes(tickerData.highlightText)
              ? // Render content with highlighted text
                tickerData.content
                  .split(tickerData.highlightText)
                  .map((part, index, array) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span
                          ref={index === 0 ? phraseRef : null}
                          className={`highlight-phrase ${
                            isUnderlined ? "underlined" : ""
                          } ${tickerData.highlightLink ? "clickable" : ""}`}
                          onClick={
                            tickerData.highlightLink
                              ? handleHighlightClick
                              : undefined
                          }
                          onMouseEnter={() => {
                            if (pauseRef.current) pauseRef.current();
                            setIsUnderlined(true);
                          }}
                          onMouseLeave={() => {
                            setIsUnderlined(false);
                            if (resumeRef.current) resumeRef.current();
                          }}
                          onTouchStart={() => {
                            if (pauseRef.current) pauseRef.current();
                            setIsUnderlined(true);
                          }}
                          onTouchEnd={() => {
                            setIsUnderlined(false);
                            if (resumeRef.current) resumeRef.current();
                          }}
                        >
                          {tickerData.highlightText}
                        </span>
                      )}
                    </span>
                  ))
              : // Render plain content if no highlight text or text not found
                tickerData.content}
          </div>
        </div>
      </div>
    </div>
  );
}
