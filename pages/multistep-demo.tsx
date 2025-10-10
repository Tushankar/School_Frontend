import Head from "next/head";
import { Toaster } from "sonner";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import OnboardingForm from "../components/ui/multistep-form";

export default function MultistepDemo() {
  return (
    <>
      <Head>
        <title>Multistep Form Demo - Al-Rasheed Academy</title>
      </Head>

      <Toaster position="top-right" richColors closeButton />
      <NavBarOnly />
      <Ticker />

      <main className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Multistep Form Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our beautiful, animated multistep form with smooth transitions,
              form validation, and a modern design system built with shadcn/ui components.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <OnboardingForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}