import Header from "../components/Header";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import UnsplashCarousel from "../components/UnsplashCarousel";
import TrustedBrands from "../components/TrustedBrands";
import { Demo } from "../components/sparkles-demo";
import CharacterCards from "./character-cards";
import BentoGridPage from "./bento-grid";
import useGsapCards from "../hooks/useGsapCards";
import MapDemo from "../components/ui/demo";

export default function Home() {
  useGsapCards();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Ticker />
      <UnsplashCarousel
        interval={6000}
        queries={["school trophies", "students learning", "classroom"]}
      />
      <TrustedBrands />
      <Demo />
      <CharacterCards />
      <BentoGridPage />
      <MapDemo />

      <Footer />
    </div>
  );
}
