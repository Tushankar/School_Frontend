import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";

const DynamicPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug && slug.length > 0) {
      fetchPageData();
    }
  }, [slug]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      // Fetch navbar data to find the content for this slug
      const response = await fetch("http://localhost:4000/api/navbar");
      if (response.ok) {
        const navbarData = await response.json();

        // Find the dropdown item that matches this slug
        let foundContent = null;
        let pageTitle = "";

        for (const navItem of navbarData) {
          if (navItem.dropdown) {
            for (const dropItem of navItem.dropdown) {
              if (dropItem.url === `/${slug.join("/")}` && dropItem.content) {
                foundContent = {
                  title: dropItem.name,
                  content: dropItem.content,
                  images: dropItem.images || [],
                };
                pageTitle = dropItem.name;
                break;
              }
            }
            if (foundContent) break;
          }
        }

        if (foundContent) {
          setPageData(foundContent);
        } else {
          setError("Page not found");
        }
      } else {
        setError("Failed to load page data");
      }
    } catch (err) {
      console.error("Error fetching page data:", err);
      setError("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBarOnly />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBarOnly />
        <Ticker />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The page you're looking for doesn't exist or has no content.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{pageData.title} - Al-Rasheed Academy</title>
        <meta
          name="description"
          content={`Learn more about ${pageData.title} at Al-Rasheed Academy`}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <NavBarOnly />
        <Ticker />

        {/* Banner Section - Same as contact page, no animations */}
        <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/hall.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-5xl font-light tracking-wide">
              {pageData.title}
            </h1>
            <p className="mt-4 text-sm">Home › {pageData.title}</p>
          </div>
        </div>

        {/* Main Content - Full width, no borders, no animations */}
        <div className="w-full">
          <div className="flex flex-col items-center justify-center px-4 md:px-6 pt-16 pb-8">
            {/* Centered Logo */}
            <div className="relative w-24 h-24 flex-shrink-0 mb-6">
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes slideInFromLeft {
                    0% { opacity: 0; transform: translateX(-100%); }
                    100% { opacity: 1; transform: translateX(0); }
                  }
                  @keyframes slideInFromRight {
                    0% { opacity: 0; transform: translateX(100%); }
                    100% { opacity: 1; transform: translateX(0); }
                  }
                  @keyframes slideInFromTop {
                    0% { opacity: 0; transform: translateY(-100%); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes slideInFromBottom {
                    0% { opacity: 0; transform: translateY(100%); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                  .slide-left {
                    animation: slideInFromLeft 1500ms ease-in-out;
                    animation-fill-mode: both;
                  }
                  .slide-right {
                    animation: slideInFromRight 1500ms ease-in-out;
                    animation-fill-mode: both;
                  }
                  .slide-top {
                    animation: slideInFromTop 1500ms ease-in-out;
                    animation-fill-mode: both;
                  }
                  .slide-bottom {
                    animation: slideInFromBottom 1500ms ease-in-out;
                    animation-fill-mode: both;
                  }
                `,
                }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-1.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{ animationDelay: "200ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-2.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{ animationDelay: "400ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqdd.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{ animationDelay: "600ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/48999.png"
                alt=""
                className="absolute w-full h-full object-contain slide-left"
                style={{
                  animationDelay: "800ms",
                  animationDuration: "1000ms",
                }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/1333.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "300ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-13.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "500ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-12.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "700ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-6.png"
                alt=""
                className="absolute w-full h-full object-contain slide-right"
                style={{ animationDelay: "900ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qqq.png"
                alt=""
                className="absolute w-full h-full object-contain slide-top"
                style={{ animationDelay: "400ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-9.png"
                alt=""
                className="absolute w-full h-full object-contain slide-top"
                style={{ animationDelay: "600ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/7788.png"
                alt=""
                className="absolute w-full h-full object-contain slide-top"
                style={{ animationDelay: "800ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-11.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "500ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-10.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "700ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "900ms" }}
              />
              <img
                src="https://www.alrasheedacademy.org/images/qw.png"
                alt=""
                className="absolute w-full h-full object-contain slide-bottom"
                style={{ animationDelay: "1100ms" }}
              />
            </div>

            {/* Centered Title and Description */}
            <div className="text-center">
              <h1 className="text-4xl font-bold md:text-5xl mb-4">
                {pageData.title}
              </h1>
              <p className="text-muted-foreground text-base">
                Learn more about our programs and services at Al-Rasheed
                Academy.
              </p>
            </div>
          </div>

          {/* Content Section - Full width, no animations */}
          <div className="px-4 md:px-6 pb-16">
            <div className="w-full">
              <div className="bg-white">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-a:text-blue-600 prose-blockquote:text-gray-600 prose-img:max-w-full prose-img:h-auto"
                  dangerouslySetInnerHTML={{ __html: pageData.content }}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DynamicPage;
