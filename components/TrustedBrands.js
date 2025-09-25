import React from "react";

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
        <h1
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
        </h1>

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
          <div
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
          </div>

          <div
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
          </div>

          <div
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
          </div>
        </div>

        {/* Bottom Section */}
        <div
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
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
