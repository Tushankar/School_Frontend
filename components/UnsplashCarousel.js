import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  DollarSign,
  Clock,
  Users,
  MessageSquare,
  UserX,
} from "lucide-react";

const AboutUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (aboutUsData?.images?.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % aboutUsData.images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [aboutUsData?.images?.length]);

  const fetchAboutUsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/about-us"
      );
      if (response.ok) {
        const data = await response.json();
        setAboutUsData(data);
      } else {
        // Fallback to default data if API fails
        setAboutUsData({
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
      }
    } catch (error) {
      console.error("Error fetching about us data:", error);
      // Fallback to default data
      setAboutUsData({
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">
              Loading about us content...
            </span>
          </div>
        </div>
      </div>
    );
  }

  const images = aboutUsData.images || [];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8"
        >
          <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            {aboutUsData.title}
          </span>
        </motion.h1>
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-4 lg:space-y-6"
          >
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
              {aboutUsData.features?.map((feature, index) => {
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

            <button
              onClick={() =>
                (window.location.href = aboutUsData.buttonUrl || "/admission")
              }
              className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:scale-105 transform transition duration-200 font-medium shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-300 text-sm sm:text-base"
              aria-label={aboutUsData.buttonText || "Enroll Now"}
            >
              {aboutUsData.buttonText || "Enroll Now"}
            </button>
          </motion.div>

          {/* Right Content - Images Layout */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {/* Main larger image - top right */}
            <div className="relative mb-4">
              <img
                src={images[currentImageIndex]}
                alt="School"
                className="w-full h-64 object-cover rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/600x256?text=Image+Not+Available";
                }}
              />
              {/* Dots for navigation */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex
                        ? "bg-yellow-400"
                        : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom row with smaller image and rating card */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Smaller image on the left */}
              <div className="flex-1 order-2 sm:order-1 relative">
                <img
                  src={images[(currentImageIndex + 1) % images.length]}
                  alt="School"
                  className="w-full h-40 object-cover rounded-2xl"
                />
              </div>

              {/* Rating Card on the right */}
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col justify-center order-1 sm:order-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-0">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {aboutUsData.rating?.score || "4.9/5"}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {aboutUsData.rating?.reviews || "19,201 reviews"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  {aboutUsData.rating?.description ||
                    "Discover Our TrustScore & Customer Reviews"}
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
