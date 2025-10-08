import Head from "next/head";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../components/ui/spinner-1";
import { Toaster } from "sonner";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) setLoading(true);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next.js + Tailwind CDN</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Tailwind Play CDN - quick way to use Tailwind without installing PostCSS */}
        <script src="https://cdn.tailwindcss.com" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      'montserrat': ['Montserrat', 'sans-serif'],
                    }
                  }
                }
              }
            `,
          }}
        />
        {/* GSAP + ScrollTrigger CDN (used for simple scroll animations) */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" async></script>
      </Head>

      {loading && (
        <div className="route-loader-overlay" aria-hidden>
          <Spinner size={56} color="#E99544" />
        </div>
      )}

      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
