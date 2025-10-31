import { Sparkles } from "./ui/sparkles"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function Demo() {
  const [affiliationsData, setAffiliationsData] = useState({
    title: "Affiliation.",
    subtitle: "Used by the leaders.",
    showSubtitle: false,
    logos: [
      {
        id: "retool",
        image: "https://www.alrasheedacademy.org/images/Untitled-wqqwqwe.png",
        alt: "Retool"
      },
      {
        id: "vercel",
        image: "https://www.alrasheedacademy.org/images/Untitled-qw.png",
        alt: "Vercel"
      },
      {
        id: "remote",
        image: "https://www.alrasheedacademy.org/images/Untitled-wqe.png",
        alt: "Remote"
      },
      {
        id: "arc",
        image: "https://cmsv2-assets.apptegy.net/uploads/9227/logo/10529/logo-web.png",
        alt: "Arc"
      },
      {
        id: "raycast",
        image: "https://www.alrasheedacademy.org/images/District%20Logo.png",
        alt: "Raycast"
      }
    ],
    sparklesConfig: {
      density: 1200,
      color: "#8350e8"
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAffiliationsData();
  }, []);

  const fetchAffiliationsData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/affiliations"
      );
      if (response.ok) {
        const data = await response.json();
        setAffiliationsData(data);
      } else {
        console.log("Using default affiliations data");
      }
    } catch (error) {
      console.error("Error fetching affiliations data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full overflow-hidden bg-gray-50 flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading affiliations...</span>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-gray-50">
      <div className="mx-auto mt-32 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-3xl text-gray-800"
        >
          <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
           {affiliationsData.title}
          </span>

          <br />

          {affiliationsData.showSubtitle && (
            <span>{affiliationsData.subtitle}</span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-14 overflow-hidden"
        >
          <div className="flex gap-16 animate-slide-left-to-right">
            {/* Render logos twice for seamless loop */}
            {[...affiliationsData.logos, ...affiliationsData.logos].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="h-32 flex items-center justify-center flex-shrink-0">
                <img
                  src={logo.image.startsWith("/uploads/") ? `https://alrasheedacademyserver.onrender.com${logo.image}` : logo.image}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150x80?text=Image+Not+Available";
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mt-0 h-64 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 bg-white" />
        <Sparkles
          density={affiliationsData.sparklesConfig.density}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color={affiliationsData.sparklesConfig.color}
        />
      </motion.div>
    </div>
  )
}

