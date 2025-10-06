import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import TrustedBrands from "../components/TrustedBrands";
import { Demo } from "../components/sparkles-demo";
import CharacterCards from "./character-cards";
import BentoGridPage from "./bento-grid";

export default function ParentHandbook() {
  return (
    <>
      <Head>
        <title>Parent Handbook - Al-Rasheed Academy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBarOnly />
      <Ticker />

      <main>
        <TrustedBrands />
        <Demo />
        <CharacterCards />
        <BentoGridPage />
      </main>

      <Footer />
    </>
  );
}
