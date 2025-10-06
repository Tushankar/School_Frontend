import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import SportsVisionPage from "../components/SportsVisionPage";

export default function MissionVision() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarOnly />
      <SportsVisionPage />
      <Footer />
    </div>
  );
}
