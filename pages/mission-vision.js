import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import MissionVisionPage from "../components/MissionVisionPage";

export default function MissionVision() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarOnly />
      <MissionVisionPage />
      <Footer />
    </div>
  );
}
