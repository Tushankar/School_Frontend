import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Input } from "./input";
import { getToken } from "../../lib/auth";
import { Plus, Trash2, Eye } from "lucide-react";

const TrustedBrandsCMS = ({ setSelected }) => {
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTrustedBrandsData();
  }, []);

  const fetchTrustedBrandsData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/trusted-brands",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTrustedBrandsData(data);
      } else {
        console.log("Using default trusted brands data");
      }
    } catch (error) {
      console.error("Error fetching trusted brands data:", error);
      toast.error("Failed to load trusted brands data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("You must be logged in to save changes");
        setSaving(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/trusted-brands",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(trustedBrandsData),
        }
      );

      if (response.ok) {
        toast.success("Trusted Brands content updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }
    } catch (error) {
      console.error("Error saving trusted brands data:", error);
      toast.error(error.message || "Failed to save trusted brands content");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setTrustedBrandsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBrandChange = (index, field, value) => {
    const newBrands = [...trustedBrandsData.brands];
    newBrands[index] = { ...newBrands[index], [field]: value };
    setTrustedBrandsData((prev) => ({
      ...prev,
      brands: newBrands,
    }));
  };

  const handleAddBrand = () => {
    setTrustedBrandsData((prev) => ({
      ...prev,
      brands: [...prev.brands, { image: "", description: "", alt: "" }],
    }));
  };

  const handleRemoveBrand = (index) => {
    setTrustedBrandsData((prev) => ({
      ...prev,
      brands: prev.brands.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading trusted brands content...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Trusted Brands Section CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage accreditations, memberships, and recognitions
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Title and Button */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Section Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Section Title
                </label>
                <Input
                  type="text"
                  value={trustedBrandsData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter section title"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Button Text
                </label>
                <Input
                  type="text"
                  value={trustedBrandsData.buttonText}
                  onChange={(e) =>
                    handleInputChange("buttonText", e.target.value)
                  }
                  placeholder="Enter button text"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Button URL
                </label>
                <Input
                  type="text"
                  value={trustedBrandsData.buttonUrl}
                  onChange={(e) =>
                    handleInputChange("buttonUrl", e.target.value)
                  }
                  placeholder="Enter button URL"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Brands Management */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Brands & Accreditations
              </h3>
              <Button
                onClick={handleAddBrand}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Brand
              </Button>
            </div>
            <div className="space-y-4">
              {trustedBrandsData.brands.map((brand, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Brand {index + 1}
                    </h4>
                    <Button
                      onClick={() => handleRemoveBrand(index)}
                      disabled={trustedBrandsData.brands.length <= 1}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Image URL
                      </label>
                      <Input
                        type="text"
                        value={brand.image}
                        onChange={(e) =>
                          handleBrandChange(index, "image", e.target.value)
                        }
                        placeholder="Enter image URL"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Alt Text
                      </label>
                      <Input
                        type="text"
                        value={brand.alt}
                        onChange={(e) =>
                          handleBrandChange(index, "alt", e.target.value)
                        }
                        placeholder="Enter alt text for accessibility"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={brand.description}
                        onChange={(e) =>
                          handleBrandChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Enter brand description"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                        rows={2}
                      />
                    </div>
                    {/* Image Preview */}
                    <div className="relative">
                      <img
                        src={
                          brand.image ||
                          "https://via.placeholder.com/300x150?text=No+Image"
                        }
                        alt={brand.alt || `Preview ${index + 1}`}
                        className="w-full h-24 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/300x150?text=Invalid+URL";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Section */}
      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900">
            Full Preview (Light Mode)
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            How the trusted brands section will appear on your homepage
          </p>
        </div>

        {/* Trusted Brands Preview */}
        <div className="p-8 bg-gray-50">
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
                {trustedBrandsData.title}
              </span>
            </h1>

            {/* Logos Row */}
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
                <div
                  key={index}
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
                      src={
                        brand.image ||
                        "https://via.placeholder.com/300x150?text=No+Image"
                      }
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
                          "https://via.placeholder.com/300x150?text=Invalid+URL";
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
                </div>
              ))}
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
                {trustedBrandsData.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBrandsCMS;
