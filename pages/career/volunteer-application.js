import Head from "next/head";
import { motion } from "framer-motion";
import NavBarOnly from "../../components/NavBarOnly";
import Footer from "../../components/Footer";
import Ticker from "../../components/Ticker";
import { useState } from "react";

// Local public asset for the Crest/Logo (served from public/ by Vite)
const CREST_IMAGE = "/logo.png";

// Mock data for state options
const STATE_OPTIONS = [
  { label: "Select state", value: "" },
  { label: "New York", value: "NY" },
  { label: "California", value: "CA" },
  { label: "Florida", value: "FL" },
  { label: "Illinois", value: "IL" },
  { label: "Texas", value: "TX" },
  { label: "Virginia", value: "VA" },
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  position: "",
};

// --- Utility Components for Cleaner JSX ---

// Reusable Input/Select/Textarea styling
const FormField = ({
  label,
  name,
  required,
  type = "text",
  pattern,
  title,
  value,
  onChange,
  placeholder,
  isSelect = false,
  isTextarea = false,
  options = [],
}) => {
  // Relying on CSS class 'form-input-field' for border/focus/text color styles
  const commonClasses =
    "w-full rounded-xl px-4 py-3 text-base transition-all duration-150 font-sans form-input-field";

  return (
    <label className="flex flex-col gap-2 text-sm">
      {/* Label color now set by inline style for reliability */}
      <span
        className="font-semibold text-sm tracking-wider"
        style={{ color: "#cc8a33" }}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={commonClasses}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${commonClasses} min-h-[130px] resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          title={title}
          className={commonClasses}
        />
      )}
    </label>
  );
};

function VolunteerApplication() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (submitted) {
      setSubmitted(false);
    }
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/volunteer-applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Volunteer Application Submitted:", data);
        setSubmitted(true);
        setForm(INITIAL_FORM); // Clear form after submission

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert(
          "Failed to submit application: " + (data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // --- COMPREHENSIVE STYLE BLOCK FOR ALL CUSTOM AESTHETICS ---
  const customStyles = `
    /* Custom Colors and Variables for easy maintenance */
    :root {
      --color-dark-stone: #23160c;
      --color-gold-dark: #cc8a33;
      --color-gold-light: #f3c875;
      --color-parchment: #f5efe5;
      --color-ribbon-red: #b7233b;
      --color-input-border: rgba(214, 163, 75, 0.4);
      --color-input-focus-ring: rgba(214, 163, 75, 0.25);
      --color-placeholder: rgba(204, 138, 51, 0.6);
      --color-shadow-base: rgba(214, 163, 75, 0.28);
      --color-shadow-hover: rgba(214, 163, 75, 0.4);
    }

    /* Keyframes for the Pulsating Glow */
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 8px 20px var(--color-shadow-base); filter: brightness(1); }
      50% { box-shadow: 0 20px 60px rgba(255,214,134,0.6); filter: brightness(1.12); }
    }

    /* 1. Form Field Styling (Borders, Focus, Text) */
    .form-input-field {
        border: 1px solid var(--color-input-border);
        color: var(--color-dark-stone);
        background: rgba(255,255,255,0.98);
    }
    .form-input-field::placeholder {
        color: var(--color-placeholder);
    }
    .form-input-field:focus {
        outline: none;
        border-color: var(--color-gold-dark);
        background: #fff8ec;
        box-shadow: 0 0 0 3px var(--color-input-focus-ring);
    }

    /* 2. Submit Button Styling */
    .submit-btn {
      background: #F7C813;
      color: var(--color-dark-stone);
      box-shadow: 0 16px 30px var(--color-shadow-base);
      transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
      animation: glowPulse 3.5s ease-in-out infinite;
    }
    .submit-btn:hover:not(:disabled), .submit-btn:focus:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px var(--color-shadow-hover);
      filter: brightness(1.04);
    }
    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
        animation: none;
    }
    
    /* 3. Badge Animation */
    .badge-img {
        animation: glowPulse 3.5s ease-in-out infinite;
    }
    
    /* 4. Card Pseudo-element for inner gradient */
    .card-section {
        position: relative;
        border: 1px solid rgba(214, 163, 75, 0.2);
    }
    .card-section::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(140deg, rgba(214, 163, 75, 0.06), transparent 55%);
        pointer-events: none;
    }

    /* 5. Mobile Layout Fixes */
    @media (max-width: 768px) {
        .main-content {
            flex-direction: column;
        }
    }

    /* Small logo animation used by the navbar logo stack */
    @keyframes customAnimationIn {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
    .animate-custom {
      animation: customAnimationIn 1500ms ease-in-out;
      animation-fill-mode: both;
    }

  /* Hide scrollbars but keep scrolling behaviour
     - Firefox: scrollbar-width: none
     - IE/Edge: -ms-overflow-style: none
     - WebKit (Chrome/Safari/Edge Chromium): set scrollbar size to 0
  */
  html, body {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar {
    width: 0; /* Chrome, Safari, and Opera */
    height: 0;
    background: transparent;
  }

  /* Hide scrollbar for the form card specifically (preserve scrolling) */
  .card-section {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    /* keep overflow-y:auto to allow scrolling on smaller screens */
  }
  .card-section::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
  `;

  // --- Inline Styles for Complex React Props ---
  const mainBgStyle = {
    background:
      "radial-gradient(circle at 20% -10%, rgba(217, 170, 92, 0.28), transparent 55%), radial-gradient(circle at 80% 0%, rgba(90, 60, 22, 0.35), rgba(16, 12, 9, 0.95) 60%)",
    color: "var(--color-parchment)",
  };

  const badgeBgStyle = {
    background: "radial-gradient(circle at 35% 35%, #fff7e5, #f3dfba)",
  };

  return (
    <>
      <Head>
        <title>Volunteer Application - Al-Rasheed Academy</title>
        <style>{customStyles}</style>
      </Head>

      <NavBarOnly />
      <Ticker />

      {/* Banner Section */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/hall.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl font-light tracking-wide"
          >
            Volunteer Application
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            Home › Career › Volunteer Application
          </motion.p>
        </div>
      </div>

      <div
        className="min-h-screen flex flex-col relative font-serif"
        style={mainBgStyle}
      >
        {/* Ribbon removed as requested */}

        {/* MAIN CONTENT - Full Width Form */}
        <main className="flex-1 flex min-h-screen main-content">
          {/* Full Width Form Card */}
          <section
            className="w-full bg-white/95 p-6 sm:p-12 relative overflow-y-auto card-section"
            style={{ color: "var(--color-dark-stone)" }}
          >
            {/* The card-section::before handles the inner gradient */}

            <header className="flex flex-col text-center items-center gap-7 mb-10">
              {/* Logo */}
              <div className="relative w-16 h-16">
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-1.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-2.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/qqdd.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/48999.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{
                    animationDelay: "1000ms",
                    animationDuration: "1000ms",
                  }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/1333.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-13.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-12.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-6.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/qqq.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1500ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-9.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/7788.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-11.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-10.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
                <img
                  src="https://www.alrasheedacademy.org/images/qw.png"
                  alt=""
                  className="absolute w-full h-full object-contain animate-custom"
                  style={{ animationDelay: "1000ms" }}
                />
              </div>
              <div>
                <p
                  className="uppercase tracking-[0.14em] text-[0.78rem] mb-1 opacity-80"
                  style={{ color: "var(--color-gold-dark)" }}
                >
                  Volunteer Program
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-semibold m-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #cc8a33, #f3c875, #cc8a33)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Sign-Up Form
                </h2>
                <p
                  className="mt-2 max-w-lg leading-relaxed opacity-80"
                  style={{ color: "var(--color-dark-stone)" }}
                >
                  We are always looking for passionate individuals to contribute
                  to our mission. Please fill out the form below to express your
                  interest.
                </p>
              </div>
            </header>

            <form
              className="relative flex flex-col gap-6 isolate"
              onSubmit={handleSubmit}
            >
              {/* Row 1: First and Last Name */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                <FormField
                  label="First name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Last name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Row 2: Phone and Email */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                <FormField
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="(555) 555-5555"
                />
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>

              {/* Row 3: Address 1 and 2 */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                <FormField
                  label="Address line 1"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Address line 2"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                />
              </div>

              {/* Row 5: City, State, ZIP */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
                <FormField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  isSelect
                  options={STATE_OPTIONS}
                />
                <FormField
                  label="ZIP code"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  pattern="\d{5}"
                  title="Five digit zip code"
                />
              </div>

              {/* Row 6: Position/Comments */}
              <FormField
                label="Volunteer position/Notes"
                name="position"
                value={form.position}
                onChange={handleChange}
                isTextarea
                placeholder="Share the areas where you would like to contribute (e.g., event planning, tutoring, administration)."
              />

              {/* Form Actions (Submit Button and Feedback) */}
              <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn px-12 py-3 rounded-full text-lg font-bold tracking-wider cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
                {submitted && (
                  <span
                    className="text-sm font-semibold opacity-90"
                    style={{ color: "var(--color-gold-dark)" }}
                  >
                    Thanks! We have received your interest.
                  </span>
                )}
              </div>
            </form>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default VolunteerApplication;
