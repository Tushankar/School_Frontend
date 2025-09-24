import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next.js + Tailwind CDN</title>
        {/* Tailwind Play CDN - quick way to use Tailwind without installing PostCSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* GSAP + ScrollTrigger CDN (used for simple scroll animations) */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
