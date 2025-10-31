import React, { useState, useEffect } from "react";
import Ticker from "./Ticker";
import { motion } from "framer-motion";

export default function MissionVisionPage() {
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMissionVisionData();
  }, []);

  const getFullImageUrl = (imageUrl) => {
    if (imageUrl && imageUrl.startsWith("/uploads/")) {
      return `https://alrasheedacademyserver.onrender.com${imageUrl}`;
    }
    return imageUrl;
  };

  const fetchMissionVisionData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/mission-vision"
      );
      if (response.ok) {
        const data = await response.json();
        setCmsData(data);
      } else {
        // Fallback to default data if CMS data not found
        setCmsData({
          banner: {
            backgroundImage: "/assets/hall.jpg",
            title: "About Us",
            breadcrumb: "Home › About",
          },
          vision: {
            title: "Our vision",
            description:
              "Al-Rasheed Academy will provide each student with a Safe, Healthy, Nurturing, and Islamic learning environment facilitated by skilled, creative, and highly motivated professionals who promote lifelong learning.",
          },
          missions: {
            title: "Our missions",
            description:
              "Al-Rasheed Academy supports the total development of each student. As each student develops, he / she will become an upstanding citizen, an effective and productive individual for their family, the community, and the world.",
            circles: [
              {
                text: "Provide a Safe & Healthy Nurturing Islamic Environment",
                highlight: "Safe & Healthy",
              },
              {
                text: "Skilled, Creative & Highly Motivated Professionals",
                highlight: "Highly Motivated",
              },
              {
                text: "Total development of each student Upstanding citizen & productive individual",
                highlight: "each student",
              },
            ],
          },
          philosophy: {
            backgroundImage:
              "https://i.pinimg.com/1200x/31/43/2d/31432d4612d0211c4070c1389cb2ecd7.jpg",
            title: "Philosophy Statement",
            description1:
              "The education of the students at Al-Rasheed Academy is the responsibility of the entire community. We believe that the children of the community are the most important resource and future leaders. It is important that we encourage students to develop good Islamic characteristics, citizenship, high moral standards, and positive self-esteem.",
            description2:
              "We recognize that we exist in a worldwide community and that our educational program must reflect global needs. Our goal is to provide a positive Islamic learning environment that challenges students to grow mentally, academically, physically, and socially while ultimately preparing students to become productive members of society.",
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch mission vision data:", error);
      // Fallback to default data
      setCmsData({
        banner: {
          backgroundImage: "/assets/hall.jpg",
          title: "About Us",
          breadcrumb: "Home › About",
        },
        vision: {
          title: "Our vision",
          description:
            "Al-Rasheed Academy will provide each student with a Safe, Healthy, Nurturing, and Islamic learning environment facilitated by skilled, creative, and highly motivated professionals who promote lifelong learning.",
        },
        missions: {
          title: "Our missions",
          description:
            "Al-Rasheed Academy supports the total development of each student. As each student develops, he / she will become an upstanding citizen, an effective and productive individual for their family, the community, and the world.",
          circles: [
            {
              text: "Provide a Safe & Healthy Nurturing Islamic Environment",
              highlight: "Safe & Healthy",
            },
            {
              text: "Skilled, Creative & Highly Motivated Professionals",
              highlight: "Highly Motivated",
            },
            {
              text: "Total development of each student Upstanding citizen & productive individual",
              highlight: "each student",
            },
          ],
        },
        philosophy: {
          backgroundImage:
            "https://i.pinimg.com/1200x/31/43/2d/31432d4612d0211c4070c1389cb2ecd7.jpg",
          title: "Philosophy Statement",
          description1:
            "The education of the students at Al-Rasheed Academy is the responsibility of the entire community. We believe that the children of the community are the most important resource and future leaders. It is important that we encourage students to develop good Islamic characteristics, citizenship, high moral standards, and positive self-esteem.",
          description2:
            "We recognize that we exist in a worldwide community and that our educational program must reflect global needs. Our goal is to provide a positive Islamic learning environment that challenges students to grow mentally, academically, physically, and socially while ultimately preparing students to become productive members of society.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E99544] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!cmsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load content</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F8F9FA", marginTop: 0 }}
    >
      {/* Ticker placed below the navbar */}
      <Ticker />

      {/* Banner Section */}
      <div className="relative w-full h-48 sm:h-64 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${getFullImageUrl(
              cmsData.banner.backgroundImage
            )}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide"
          >
            {cmsData.banner.title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            {cmsData.banner.breadcrumb}
          </motion.p>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-12">
        <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
          {/* Vision Section */}
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <div className="relative py-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300"></div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-wider">
                <span className="text-gray-900">Our</span>{" "}
                <span style={{ color: "#E99544" }}>
                  {cmsData.vision.title.split(" ")[1]}
                </span>
              </h2>
              <div className="mt-2">
                <svg
                  className="mx-auto"
                  width="360"
                  height="24"
                  viewBox="0 0 360 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="12"
                    x2="120"
                    y2="12"
                    stroke="#E99544"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="240"
                    y1="12"
                    x2="360"
                    y2="12"
                    stroke="#E99544"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <g transform="translate(150,0)">
                    <path d="M30 12 L40 6 L50 12 L40 18 Z" fill="#E99544" />
                    <path
                      d="M34 12 L40 8.5 L46 12 L40 15.5 Z"
                      fill="none"
                      stroke="#E99544"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="max-w-2xl mx-auto pt-4">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-semibold">
                {cmsData.vision.description}
              </p>
            </div>
          </motion.section>

          {/* Missions Section */}
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center space-y-8"
          >
            <div className="relative py-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300"></div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extralight tracking-wider">
                <span className="text-gray-900">Our</span>{" "}
                <span style={{ color: "#E99544" }}>
                  {cmsData.missions.title.split(" ")[1]}
                </span>
              </h2>
              <div className="mt-2">
                <svg
                  className="mx-auto"
                  width="360"
                  height="24"
                  viewBox="0 0 360 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="12"
                    x2="120"
                    y2="12"
                    stroke="#E99544"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="240"
                    y1="12"
                    x2="360"
                    y2="12"
                    stroke="#E99544"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <g transform="translate(150,0)">
                    <path d="M30 12 L40 6 L50 12 L40 18 Z" fill="#E99544" />
                    <path
                      d="M34 12 L40 8.5 L46 12 L40 15.5 Z"
                      fill="none"
                      stroke="#E99544"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <div className="text-sm sm:text-base text-gray-800 max-w-xl mx-auto space-y-1 font-semibold">
                <div className="text-sm sm:text-base text-gray-800 max-w-2xl mx-auto space-y-1 font-semibold text-center">
                  <p className="leading-relaxed">
                    {cmsData.missions.description}
                  </p>
                </div>
              </div>

              {/* Three Circles */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-0 pt-6">
                {cmsData.missions.circles.map((circle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.1 * index,
                    }}
                    className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white/60 backdrop-blur-sm border border-gray-300 flex items-center justify-center p-6 sm:p-8 ${
                      index === 2
                        ? "sm:-mr-6 z-10"
                        : index === 1
                        ? "sm:-mr-6 z-10"
                        : ""
                    } ${index === 2 ? "shadow-xl z-20" : ""}`}
                    style={index === 2 ? { backgroundColor: "#E99544" } : {}}
                  >
                    <p
                      className={`text-sm text-center leading-relaxed ${
                        index === 2 ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {circle.text
                        .split(circle.highlight)
                        .map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <span className="font-bold text-base">
                                {circle.highlight}
                              </span>
                            )}
                          </span>
                        ))}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-8"
            >
              <div
                className="rounded-2xl overflow-hidden shadow-lg mx-4 md:mx-0"
                style={{
                  backgroundImage: `url('${getFullImageUrl(
                    cmsData.philosophy.backgroundImage
                  )}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "240px",
                }}
              >
                <div className="bg-white/10 p-6 md:p-12">
                  <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                      {cmsData.philosophy.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                      {cmsData.philosophy.description1}
                    </p>
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed mt-4">
                      {cmsData.philosophy.description2}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="relative pt-8">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300"></div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
