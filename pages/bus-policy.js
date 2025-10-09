import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import BusPolicy from "../components/ui/BusPolicy";

export default function BusPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarOnly />
      <BusPolicy />
      <Footer />
    </div>
  );
}
