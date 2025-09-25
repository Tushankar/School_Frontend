import Header from "../components/Header";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import UnsplashCarousel from "../components/UnsplashCarousel";
import TrustedBrands from "../components/TrustedBrands";
import { Demo } from "../components/sparkles-demo";
import CharacterCards from "./character-cards";
import BentoGridPage from "./bento-grid";
import useGsapCards from "../hooks/useGsapCards";

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

      <main className="flex-grow">
        {/* Hero */}
        <section
          className="bg-gradient-to-r from-indigo-50 to-white animate-section opacity-0"
          data-anim="left"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                  Ship faster with a minimal Next.js + Tailwind starter
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Launch prototypes quickly, iterate on UI, and integrate with
                  your existing backend authentication. Includes ready-made
                  login and signup flows.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="/signup"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
                  >
                    Create account
                  </a>
                  <a
                    href="/login"
                    className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
                  >
                    Log in
                  </a>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <span className="font-semibold">Free for prototypes.</span>{" "}
                  Upgrade later for production optimizations.
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 bg-indigo-50 rounded animate-card opacity-0"
                      data-anim="left"
                    >
                      <h4 className="font-semibold">Fast iteration</h4>
                      <p className="text-sm text-gray-600">
                        Prototype without build configuration.
                      </p>
                    </div>
                    <div
                      className="p-4 bg-indigo-50 rounded animate-card opacity-0"
                      data-anim="right"
                    >
                      <h4 className="font-semibold">Auth-ready</h4>
                      <p className="text-sm text-gray-600">
                        Signup/login wired to a simple Express backend.
                      </p>
                    </div>
                    <div
                      className="p-4 bg-indigo-50 rounded animate-card opacity-0"
                      data-anim="left"
                    >
                      <h4 className="font-semibold">Tailwind CDN</h4>
                      <p className="text-sm text-gray-600">
                        Use utility classes immediately via CDN.
                      </p>
                    </div>
                    <div
                      className="p-4 bg-indigo-50 rounded animate-card opacity-0"
                      data-anim="right"
                    >
                      <h4 className="font-semibold">Next.js pages</h4>
                      <p className="text-sm text-gray-600">
                        Route-based pages and simple component structure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="py-16 animate-section opacity-0"
          data-anim="right"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">Features</h2>
            <p className="mt-2 text-gray-600">
              Everything you need to prototype auth flows and UIs quickly.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="p-6 bg-white rounded-lg shadow animate-card opacity-0"
                data-anim="left"
              >
                <div className="text-indigo-600 text-3xl">⚡</div>
                <h3 className="font-semibold text-lg mt-4">Fast to ship</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Start building UIs immediately using the Tailwind CDN.
                </p>
              </div>

              <div
                className="p-6 bg-white rounded-lg shadow animate-card opacity-0"
                data-anim="right"
              >
                <div className="text-indigo-600 text-3xl">🔗</div>
                <h3 className="font-semibold text-lg mt-4">Auth integration</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Signup and login pages wired to an Express backend with JWT
                  authentication.
                </p>
              </div>

              <div
                className="p-6 bg-white rounded-lg shadow animate-card opacity-0"
                data-anim="left"
              >
                <div className="text-indigo-600 text-3xl">🧩</div>
                <h3 className="font-semibold text-lg mt-4">Composable</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Small components can be reused and extended for your product
                  UI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="bg-indigo-50 py-16 animate-section opacity-0"
          data-anim="left"
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              What people are saying
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="p-6 bg-white rounded-lg shadow animate-card opacity-0"
                data-anim="left"
              >
                <p className="text-gray-700">
                  “Saved our team days of setup time — we had a working auth
                  flow in under an hour.”
                </p>
                <div className="mt-4 text-sm text-gray-600">
                  — Product Lead, Acme Co
                </div>
              </div>
              <div
                className="p-6 bg-white rounded-lg shadow animate-card opacity-0"
                data-anim="right"
              >
                <p className="text-gray-700">
                  “Perfect for prototyping. The Tailwind CDN made styling
                  instant.”
                </p>
                <div className="mt-4 text-sm text-gray-600">
                  — Frontend Engineer, StudioX
                </div>
              </div>
              <div
                className="p-6 bg-white rounded-lg shadow animate-card opacity-0"
                data-anim="left"
              >
                <p className="text-gray-700">
                  “Nice, simple auth example that was easy to extend for our
                  app.”
                </p>
                <div className="mt-4 text-sm text-gray-600">
                  — Developer, StartupY
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="py-16 animate-section opacity-0"
          data-anim="right"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
            <div className="mt-6 space-y-4">
              <details className="p-4 bg-gray-50 rounded">
                <summary className="font-semibold">
                  Can I use this for production?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  The starter is great for prototyping. For production, migrate
                  to a local Tailwind build and secure token storage (httpOnly
                  cookies).
                </p>
              </details>

              <details className="p-4 bg-gray-50 rounded">
                <summary className="font-semibold">
                  How do I change the backend URL?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Set `NEXT_PUBLIC_API_URL` in `client/.env.local` (e.g.
                  `http://localhost:4000`). The client falls back to localhost
                  if not set.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="bg-indigo-600 py-12 animate-section opacity-0"
          data-anim="left"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center text-white">
            <h3 className="text-2xl font-semibold">Ready to try it?</h3>
            <p className="mt-2">
              Create an account and explore the starter — auth routes are ready
              in the server folder.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-indigo-600 rounded-md font-semibold"
              >
                Create account
              </a>
              <a
                href="/login"
                className="px-6 py-3 border border-white text-white rounded-md"
              >
                Log in
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
