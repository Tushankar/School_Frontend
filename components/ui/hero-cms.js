import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Input } from "./input";
import { getToken } from "../../lib/auth";

const HeroCMS = ({ setSelected }) => {
  const [heroData, setHeroData] = useState({
    arabicText: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ",
    subtitle: "Excellence in Islamic Education",
    titleLine1: "Recognized by",
    titleLine2: "New York State",
    titleLine3: "Education Department",
    backgroundImages: [
      "/assets/istudies_1.png",
      "/assets/istudies_2.png",
      "/assets/istudies_3.png",
      "/assets/istudies_4.png",
      "/assets/istudies_5.png",
      "/assets/istudies_6.png",
      "/assets/istudies_7.png",
    ],
    socialLinks: {
      instagram: "#",
      youtube: "#",
      twitter: "#",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState(0);

  useEffect(() => {
    fetchHeroData();
  }, []);

  // Auto-scroll through preview images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPreviewImage(
        (prev) => (prev + 1) % heroData.backgroundImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [heroData.backgroundImages.length]);

  const fetchHeroData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/hero"
      );
      if (response.ok) {
        const data = await response.json();
        setHeroData(data);
      } else {
        console.log("Using default hero data");
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
      toast.error("Failed to load hero data");
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
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/hero",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(heroData),
        }
      );

      if (response.ok) {
        toast.success("Hero content updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }
    } catch (error) {
      console.error("Error saving hero data:", error);
      toast.error(error.message || "Failed to save hero content");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setHeroData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setHeroData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...heroData.backgroundImages];
    newImages[index] = value;
    setHeroData((prev) => ({
      ...prev,
      backgroundImages: newImages,
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 md:py-12 gap-2 md:gap-4">
        <div className="animate-spin rounded-full h-6 md:h-8 w-6 md:w-8 border-b-2 border-blue-600"></div>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Loading hero content...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-8 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Hero Section CMS
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage the main hero section content and images
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm w-full sm:w-auto"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-3 md:h-4 w-3 md:w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8">
        {/* Text Content Section */}
        <div className="space-y-3 md:space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-3 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
              Text Content
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Arabic Text
                </label>
                <Input
                  type="text"
                  value={heroData.arabicText}
                  onChange={(e) =>
                    handleInputChange("arabicText", e.target.value)
                  }
                  placeholder="Enter Arabic text"
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Subtitle
                </label>
                <Input
                  type="text"
                  value={heroData.subtitle}
                  onChange={(e) =>
                    handleInputChange("subtitle", e.target.value)
                  }
                  placeholder="Enter subtitle"
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Title Line 1
                </label>
                <Input
                  type="text"
                  value={heroData.titleLine1}
                  onChange={(e) =>
                    handleInputChange("titleLine1", e.target.value)
                  }
                  placeholder="Enter title line 1"
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Title Line 2
                </label>
                <Input
                  type="text"
                  value={heroData.titleLine2}
                  onChange={(e) =>
                    handleInputChange("titleLine2", e.target.value)
                  }
                  placeholder="Enter title line 2"
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Title Line 3
                </label>
                <Input
                  type="text"
                  value={heroData.titleLine3}
                  onChange={(e) =>
                    handleInputChange("titleLine3", e.target.value)
                  }
                  placeholder="Enter title line 3"
                  className="w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-3 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
              Social Media Links
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Instagram URL
                </label>
                <Input
                  type="url"
                  value={heroData.socialLinks.instagram}
                  onChange={(e) =>
                    handleSocialLinkChange("instagram", e.target.value)
                  }
                  placeholder="https://instagram.com/..."
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  YouTube URL
                </label>
                <Input
                  type="url"
                  value={heroData.socialLinks.youtube}
                  onChange={(e) =>
                    handleSocialLinkChange("youtube", e.target.value)
                  }
                  placeholder="https://youtube.com/..."
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Twitter URL
                </label>
                <Input
                  type="url"
                  value={heroData.socialLinks.twitter}
                  onChange={(e) =>
                    handleSocialLinkChange("twitter", e.target.value)
                  }
                  placeholder="https://twitter.com/..."
                  className="w-full text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background Images Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Background Images
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Enter the paths to the 7 background images that will rotate in the
            hero section.
          </p>

          <div className="space-y-4">
            {heroData.backgroundImages.map((image, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image {index + 1}
                </label>
                <Input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`/assets/image_${index + 1}.png`}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Preview
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Current images will be displayed in rotation on the homepage hero
              section. Make sure all image paths are valid and images exist in
              the public/assets folder.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Preview
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            How the hero section will appear on your homepage
          </p>
        </div>

        {/* Hero Preview */}
        <div className="relative h-96 bg-black overflow-hidden">
          {/* Background Images Preview */}
          <div className="absolute inset-0">
            {heroData.backgroundImages.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${image})`,
                  opacity: index === currentPreviewImage ? 0.9 : 0,
                }}
              />
            ))}
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            {/* Arabic Text */}
            <div className="mb-4">
              <h2 className="text-white text-lg mb-4 opacity-90 font-serif">
                {heroData.arabicText}
              </h2>
            </div>

            {/* Main Heading */}
            <div className="mb-6">
              <h3 className="text-white text-sm font-light mb-2 tracking-wider opacity-90">
                {heroData.subtitle}
              </h3>
              <h1 className="text-2xl font-serif font-bold leading-tight tracking-wide text-white">
                <span className="text-yellow-600">{heroData.titleLine1}</span>
                <br />
                <span className="text-white">{heroData.titleLine2}</span>
                <br />
                <span className="text-yellow-600">{heroData.titleLine3}</span>
              </h1>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href={heroData.socialLinks.instagram}
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={heroData.socialLinks.youtube}
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={heroData.socialLinks.twitter}
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Image Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroData.backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPreviewImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPreviewImage
                    ? "bg-yellow-500 scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                title={`View image ${index + 1}`}
              />
            ))}
          </div>

          {/* Manual Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentPreviewImage(
                (prev) =>
                  (prev - 1 + heroData.backgroundImages.length) %
                  heroData.backgroundImages.length
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-75 hover:opacity-100"
            title="Previous image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentPreviewImage(
                (prev) => (prev + 1) % heroData.backgroundImages.length
              )
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-75 hover:opacity-100"
            title="Next image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            This is a scaled preview. The actual hero section will be
            full-screen height on your homepage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroCMS;
