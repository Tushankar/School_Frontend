import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Input } from "./input";
import { getToken } from "../../lib/auth";
import {
  Star,
  DollarSign,
  Clock,
  Users,
  MessageSquare,
  UserX,
} from "lucide-react";

const AboutUsCMS = ({ setSelected }) => {
  const [aboutUsData, setAboutUsData] = useState({
    title: "Know About Us",
    mainHeading: "We Innovate Discover ARA",
    highlightedText:
      "Our commitment to fostering compassion and kindness reflects our dedication to the holistic development of each child and their smooth integration into our school environment.",
    features: [
      {
        icon: "DollarSign",
        text: "Quality education shouldn't come with exorbitant fees.",
      },
      {
        icon: "Clock",
        text: "Families deserve a streamlined enrollment process.",
      },
      {
        icon: "Users",
        text: "Students thrive with personalized attention and support.",
      },
      {
        icon: "MessageSquare",
        text: "Open communication between parents, teachers, and students.",
      },
      {
        icon: "UserX",
        text: "Direct access to educational excellence without barriers.",
      },
    ],
    images: [
      "https://www.alrasheedacademy.org/Admin/uploads/657a2bbe855ef1702505406.jpg",
      "https://www.alrasheedacademy.org/Admin/uploads/657a2bca0b9781702505418.jpg",
      "https://www.alrasheedacademy.org/Admin/uploads/657a2bf0ccb0c1702505456.jpg",
    ],
    rating: {
      score: "4.9/5",
      reviews: "19,201 reviews",
      description: "Discover Our TrustScore & Customer Reviews",
    },
    buttonText: "Enroll Now",
    buttonUrl: "/admission",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState(0);

  // Icon mapping
  const iconMap = {
    DollarSign: DollarSign,
    Clock: Clock,
    Users: Users,
    MessageSquare: MessageSquare,
    UserX: UserX,
  };

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  // Auto-scroll through preview images
  useEffect(() => {
    if (aboutUsData.images && aboutUsData.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentPreviewImage(
          (prev) => (prev + 1) % aboutUsData.images.length
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [aboutUsData.images]);

  const fetchAboutUsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/about-us"
      );
      if (response.ok) {
        const data = await response.json();
        setAboutUsData(data);
      } else {
        console.log("Using default about us data");
      }
    } catch (error) {
      console.error("Error fetching about us data:", error);
      toast.error("Failed to load about us data");
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
        "http://localhost:4000/api/auth/cms/about-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(aboutUsData),
        }
      );

      if (response.ok) {
        toast.success("About Us content updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }
    } catch (error) {
      console.error("Error saving about us data:", error);
      toast.error(error.message || "Failed to save about us content");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setAboutUsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRatingChange = (field, value) => {
    setAboutUsData((prev) => ({
      ...prev,
      rating: {
        ...prev.rating,
        [field]: value,
      },
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...aboutUsData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setAboutUsData((prev) => ({
      ...prev,
      features: newFeatures,
    }));
  };

  // Handle adding a new image
  const handleAddImage = () => {
    setAboutUsData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ""],
    }));
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    setAboutUsData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle updating an image URL
  const handleImageChange = (index, value) => {
    setAboutUsData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading about us content...
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
            About Us Section CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage the about us section content and images
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Text Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Text Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Section Title
                </label>
                <Input
                  type="text"
                  value={aboutUsData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter section title"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Main Heading
                </label>
                <Input
                  type="text"
                  value={aboutUsData.mainHeading}
                  onChange={(e) =>
                    handleInputChange("mainHeading", e.target.value)
                  }
                  placeholder="Enter main heading"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Highlighted Text
                </label>
                <textarea
                  value={aboutUsData.highlightedText}
                  onChange={(e) =>
                    handleInputChange("highlightedText", e.target.value)
                  }
                  placeholder="Enter highlighted text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Button Text
                </label>
                <Input
                  type="text"
                  value={aboutUsData.buttonText}
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
                  value={aboutUsData.buttonUrl}
                  onChange={(e) =>
                    handleInputChange("buttonUrl", e.target.value)
                  }
                  placeholder="Enter button URL"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Rating Section
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Score
                </label>
                <Input
                  type="text"
                  value={aboutUsData.rating.score}
                  onChange={(e) => handleRatingChange("score", e.target.value)}
                  placeholder="e.g., 4.9/5"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reviews Text
                </label>
                <Input
                  type="text"
                  value={aboutUsData.rating.reviews}
                  onChange={(e) =>
                    handleRatingChange("reviews", e.target.value)
                  }
                  placeholder="e.g., 19,201 reviews"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <Input
                  type="text"
                  value={aboutUsData.rating.description}
                  onChange={(e) =>
                    handleRatingChange("description", e.target.value)
                  }
                  placeholder="Enter description"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Features */}
        <div className="space-y-6">
          {/* Features Section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Features
            </h3>
            <div className="space-y-4">
              {aboutUsData.features.map((feature, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Icon
                      </label>
                      <select
                        value={feature.icon}
                        onChange={(e) =>
                          handleFeatureChange(index, "icon", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="DollarSign">Dollar Sign</option>
                        <option value="Clock">Clock</option>
                        <option value="Users">Users</option>
                        <option value="MessageSquare">Message Square</option>
                        <option value="UserX">User X</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Text
                      </label>
                      <Input
                        type="text"
                        value={feature.text}
                        onChange={(e) =>
                          handleFeatureChange(index, "text", e.target.value)
                        }
                        placeholder="Enter feature text"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Background Images Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Background Images
          </h3>
          <Button
            onClick={handleAddImage}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
          >
            Add Image
          </Button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Manage the background images that will rotate in the about us section.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aboutUsData.images.map((image, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image {index + 1}
                  </label>
                  <Input
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`Enter image ${index + 1} URL`}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={() => handleRemoveImage(index)}
                  disabled={aboutUsData.images.length <= 1}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove
                </Button>
              </div>
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={
                    image || "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Invalid+URL";
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Image Preview Information
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Current images will be displayed in rotation on the about us
            section. Make sure all image URLs are valid and images exist. You
            can add multiple images and they will cycle through automatically.
          </p>
        </div>
      </div>

      {/* Full Preview Section */}
      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900">
            Full Preview (Light Mode)
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            How the about us section will appear on your homepage in light mode
          </p>
        </div>

        {/* About Us Preview */}
        <div className="p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                {aboutUsData.title}
              </span>
            </h1>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-gray-800 leading-tight">
                    {aboutUsData.mainHeading}
                    <br />
                    <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent font-medium">
                      {aboutUsData.highlightedText}
                    </span>
                  </h2>
                </div>

                <div className="space-y-4 lg:space-y-6 text-gray-600 leading-relaxed">
                  {aboutUsData.features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon] || DollarSign;
                    return (
                      <div
                        key={index}
                        className="flex items-start sm:items-center gap-3"
                      >
                        <IconComponent className="w-5 h-5 text-blue-600 mt-0.5 sm:mt-0" />
                        <p className="text-sm sm:text-base">{feature.text}</p>
                      </div>
                    );
                  })}
                </div>

                <button className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium shadow-md text-sm sm:text-base hover:scale-105 transform transition duration-200">
                  {aboutUsData.buttonText}
                </button>
              </div>

              {/* Right Content - Images Layout */}
              <div className="relative">
                {/* Main larger image - top right */}
                <div className="relative mb-4">
                  <img
                    src={aboutUsData.images[currentPreviewImage]}
                    alt="School"
                    className="w-full h-64 object-cover rounded-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/600x256?text=Image+Not+Available";
                    }}
                  />
                  {/* Dots for navigation */}
                  {aboutUsData.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {aboutUsData.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPreviewImage(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === currentPreviewImage
                              ? "bg-yellow-400"
                              : "bg-white bg-opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom row with smaller image and rating card */}
                <div
                  className={`flex gap-4 ${
                    aboutUsData.images.length > 1
                      ? "flex-col sm:flex-row"
                      : "justify-center"
                  }`}
                >
                  {/* Smaller image on the left */}
                  {aboutUsData.images.length > 1 && (
                    <div className="flex-1 order-2 sm:order-1 relative">
                      <img
                        src={
                          aboutUsData.images[
                            (currentPreviewImage + 1) %
                              aboutUsData.images.length
                          ]
                        }
                        alt="School"
                        className="w-full h-40 object-cover rounded-2xl"
                      />
                    </div>
                  )}

                  {/* Rating Card on the right */}
                  <div
                    className={`${
                      aboutUsData.images.length > 1
                        ? "flex-1"
                        : "w-full max-w-sm"
                    } bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col justify-center ${
                      aboutUsData.images.length > 1 ? "order-1 sm:order-2" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-0">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {aboutUsData.rating.score}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        ★ {aboutUsData.rating.reviews}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      {aboutUsData.rating.description}
                    </p>

                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-green-500 text-green-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCMS;
