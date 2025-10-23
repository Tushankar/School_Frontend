import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TrustedBrands = () => {
  const [trustedBrandsData, setTrustedBrandsData] = useState({
    title: "Accreditations, Memberships, and Recognitions",
    brands: [
      {
        image: "https://www.alrasheedacademy.org/images/Nysed-seal.png",
        description:
          "University of the State of New York Education Department Board of Regents",
        alt: "NYSED Seal",
      },
      {
        image:
          "https://www.alrasheedacademy.org/images/Logo-Long-Revised-1-2048x564.png",
        description: "The Council of Islamic Schools",
        alt: "Logo Long Revised",
      },
      {
        image:
          "https://www.alrasheedacademy.org/images/cognia-white-500-400x108.png",
        description: "Cognia Accreditation Organization",
        alt: "COGNIA",
      },
    ],
    buttonText: "View All Accreditations",
    buttonUrl: "/accreditations",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrustedBrandsData();
  }, []);

  const fetchTrustedBrandsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/trusted-brands"
      );
      if (response.ok) {
        const data = await response.json();
        setTrustedBrandsData(data);
      } else {
        console.log("Using default trusted brands data");
      }
    } catch (error) {
      console.error("Error fetching trusted brands data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "120px 20px 60px",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading accreditations...</span>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "120px 20px 60px",
        minHeight: "70vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "60px",
            textAlign: "left",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(to right, #d97706, #f59e0b, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {trustedBrandsData.title}
          </span>
        </motion.h1>

        {/* Logos Row (left-aligned) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "80px",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginBottom: "40px",
            minHeight: "240px",
          }}
        >
          {trustedBrandsData.brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.2,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "320px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "180px",
                  width: "100%",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={brand.image}
                  alt={brand.alt}
                  style={{
                    height: "170px",
                    width: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x170?text=Image+Not+Available";
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333",
                  textAlign: "center",
                  margin: "0",
                  lineHeight: "1.4",
                }}
              >
                {brand.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button
            onClick={() => (window.location.href = trustedBrandsData.buttonUrl)}
            style={{
              background: "linear-gradient(to right, #d97706, #f59e0b)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            {trustedBrandsData.buttonText}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedBrands;
