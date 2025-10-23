import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Input } from "./input";
import { getToken } from "../../lib/auth";
import { Plus, Trash2, Eye } from "lucide-react";

const AffiliationsCMS = ({ setSelected }) => {
  const [affiliationsData, setAffiliationsData] = useState({
    title: "Affiliation.",
    subtitle: "Used by the leaders.",
    showSubtitle: false,
    logos: [
      {
        id: "retool",
        image: "https://www.alrasheedacademy.org/images/Untitled-wqqwqwe.png",
        alt: "Retool",
      },
      {
        id: "vercel",
        image: "https://www.alrasheedacademy.org/images/Untitled-qw.png",
        alt: "Vercel",
      },
      {
        id: "remote",
        image: "https://www.alrasheedacademy.org/images/Untitled-wqe.png",
        alt: "Remote",
      },
      {
        id: "arc",
        image:
          "https://cmsv2-assets.apptegy.net/uploads/9227/logo/10529/logo-web.png",
        alt: "Arc",
      },
      {
        id: "raycast",
        image: "https://www.alrasheedacademy.org/images/District%20Logo.png",
        alt: "Raycast",
      },
    ],
    sparklesConfig: {
      density: 1200,
      color: "#8350e8",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAffiliationsData();
  }, []);

  const fetchAffiliationsData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/affiliations",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAffiliationsData(data);
      } else {
        console.log("Using default affiliations data");
      }
    } catch (error) {
      console.error("Error fetching affiliations data:", error);
      toast.error("Failed to load affiliations data");
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
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/affiliations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(affiliationsData),
        }
      );

      if (response.ok) {
        toast.success("Affiliations content updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }
    } catch (error) {
      console.error("Error saving affiliations data:", error);
      toast.error(error.message || "Failed to save affiliations content");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setAffiliationsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoChange = (index, field, value) => {
    const newLogos = [...affiliationsData.logos];
    newLogos[index] = { ...newLogos[index], [field]: value };
    setAffiliationsData((prev) => ({
      ...prev,
      logos: newLogos,
    }));
  };

  const handleAddLogo = () => {
    setAffiliationsData((prev) => ({
      ...prev,
      logos: [...prev.logos, { id: `logo-${Date.now()}`, image: "", alt: "" }],
    }));
  };

  const handleRemoveLogo = (index) => {
    setAffiliationsData((prev) => ({
      ...prev,
      logos: prev.logos.filter((_, i) => i !== index),
    }));
  };

  const handleSparklesChange = (field, value) => {
    setAffiliationsData((prev) => ({
      ...prev,
      sparklesConfig: {
        ...prev.sparklesConfig,
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading affiliations content...
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
            Affiliations Section CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage the affiliations/logos section with sparkles effect
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
        {/* Left Column - Title and Settings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Section Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Main Title
                </label>
                <Input
                  type="text"
                  value={affiliationsData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter main title"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subtitle (Optional)
                </label>
                <Input
                  type="text"
                  value={affiliationsData.subtitle}
                  onChange={(e) =>
                    handleInputChange("subtitle", e.target.value)
                  }
                  placeholder="Enter subtitle"
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showSubtitle"
                  checked={affiliationsData.showSubtitle}
                  onChange={(e) =>
                    handleInputChange("showSubtitle", e.target.checked)
                  }
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <label
                  htmlFor="showSubtitle"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Show subtitle
                </label>
              </div>
            </div>
          </div>

          {/* Sparkles Configuration */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sparkles Effect Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Density (particles)
                </label>
                <Input
                  type="number"
                  value={affiliationsData.sparklesConfig.density}
                  onChange={(e) =>
                    handleSparklesChange("density", parseInt(e.target.value))
                  }
                  placeholder="1200"
                  className="w-full"
                  min="100"
                  max="2000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color (hex code)
                </label>
                <Input
                  type="text"
                  value={affiliationsData.sparklesConfig.color}
                  onChange={(e) =>
                    handleSparklesChange("color", e.target.value)
                  }
                  placeholder="#8350e8"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Logos Management */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Logo Management
              </h3>
              <Button
                onClick={handleAddLogo}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Logo
              </Button>
            </div>
            <div className="space-y-4">
              {affiliationsData.logos.map((logo, index) => (
                <div
                  key={logo.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Logo {index + 1}
                    </h4>
                    <Button
                      onClick={() => handleRemoveLogo(index)}
                      disabled={affiliationsData.logos.length <= 1}
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
                        value={logo.image}
                        onChange={(e) =>
                          handleLogoChange(index, "image", e.target.value)
                        }
                        placeholder="Enter logo image URL"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Alt Text
                      </label>
                      <Input
                        type="text"
                        value={logo.alt}
                        onChange={(e) =>
                          handleLogoChange(index, "alt", e.target.value)
                        }
                        placeholder="Enter alt text for accessibility"
                        className="w-full"
                      />
                    </div>
                    {/* Logo Preview */}
                    <div className="relative">
                      <img
                        src={
                          logo.image ||
                          "https://via.placeholder.com/150x80?text=No+Logo"
                        }
                        alt={logo.alt || `Preview ${index + 1}`}
                        className="w-full h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/150x80?text=Invalid+URL";
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
            How the affiliations section will appear on your homepage
          </p>
        </div>

        {/* Affiliations Preview */}
        <div className="p-8 bg-gray-50">
          <div className="w-full overflow-hidden">
            <div className="mx-auto mt-32 w-full max-w-6xl">
              <div className="text-center text-3xl text-gray-800">
                <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                  {affiliationsData.title}
                </span>
                <br />
                {affiliationsData.showSubtitle && (
                  <span className="text-lg">{affiliationsData.subtitle}</span>
                )}
              </div>

              <div className="mt-14 overflow-hidden">
                <div className="flex gap-16 animate-slide-left-to-right">
                  {/* Render logos twice for seamless loop */}
                  {[...affiliationsData.logos, ...affiliationsData.logos].map(
                    (logo, index) => (
                      <div
                        key={`${logo.id}-${index}`}
                        className="h-32 flex items-center justify-center flex-shrink-0"
                      >
                        <img
                          src={
                            logo.image ||
                            "https://via.placeholder.com/150x80?text=No+Logo"
                          }
                          alt={logo.alt}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/150x80?text=Invalid+URL";
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="relative mt-0 h-64 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
              <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 bg-white" />
              {/* Sparkles preview with dynamic config */}
              <div
                className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                style={{
                  background: `radial-gradient(circle, ${affiliationsData.sparklesConfig.color}20 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="text-center text-xs text-gray-500 mt-4">
                  Sparkles Effect ({affiliationsData.sparklesConfig.density}{" "}
                  density, {affiliationsData.sparklesConfig.color})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliationsCMS;
