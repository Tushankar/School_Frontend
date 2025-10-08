import React from "react";
import { motion } from "framer-motion";

const TrustedBrands = () => {
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
            Accreditations, Memberships, and Recognitions
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
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
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
                src="https://www.alrasheedacademy.org/images/Nysed-seal.png"
                alt="NYSED Seal"
                style={{
                  height: "170px",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
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
              University of the State of New York Education Department Board of
              Regents
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
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
                src="https://www.alrasheedacademy.org/images/Logo-Long-Revised-1-2048x564.png"
                alt="Logo Long Revised"
                style={{
                  height: "170px",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
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
              The Council of Islamic Schools
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
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
                src="https://www.alrasheedacademy.org/images/cognia-white-500-400x108.png"
                alt="COGNIA"
                style={{
                  height: "140px",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
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
              Cognia Accreditation Organization
            </p>
          </motion.div>
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
            View All Accreditations
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedBrands;
