import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  GraduationCapIcon,
  UserPlusIcon,
  NewspaperIcon,
  BriefcaseIcon,
  HeartIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";

import { BentoCard, BentoGrid } from "../components/ui/bento-grid";

// Icon mapping for dynamic icon names
const iconMap = {
  UserPlus: UserPlusIcon,
  BookOpen: BookOpenIcon,
  GraduationCap: GraduationCapIcon,
  Newspaper: NewspaperIcon,
  Briefcase: BriefcaseIcon,
  Heart: HeartIcon,
  Star: StarIcon,
  Users: UsersIcon,
};

function BentoDemo({ features }) {
  return (
    <BentoGrid className="lg:grid-rows-4">
      {features.map((feature, index) => {
        const IconComponent = iconMap[feature.icon] || BookOpenIcon;

        // Convert backgroundImage string to ReactNode
        const backgroundElement = feature.backgroundImage ? (
          <img
            src={feature.backgroundImage}
            alt={feature.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null;

        // For responsive design: keep desktop positioning, use simple layout for mobile/tablet
        const responsiveClassName = feature.className
          ? `${feature.className} col-span-1`
          : "col-span-1";

        const featureWithIcon = {
          ...feature,
          Icon: IconComponent,
          background: backgroundElement,
        };

        return (
          <motion.div
            key={feature.name}
            className={responsiveClassName}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
          >
            <BentoCard {...featureWithIcon} className="h-full" />
          </motion.div>
        );
      })}
    </BentoGrid>
  );
}

export default function BentoGridPage() {
  const [bentoGridData, setBentoGridData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBentoGridData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/cms/bento-grid"
        );
        if (response.ok) {
          const data = await response.json();
          setBentoGridData(data);
        } else {
          console.error("Failed to fetch bento grid data");
        }
      } catch (error) {
        console.error("Error fetching bento grid data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBentoGridData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!bentoGridData) {
    return (
      <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600">
              Unable to load content. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              {bentoGridData.mainTitle || "Our Features & Programs"}
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            {bentoGridData.subtitle ||
              "Discover what makes ARA Academy exceptional"}
          </p>
        </motion.div>

        <BentoDemo features={bentoGridData.features || []} />
      </div>
    </div>
  );
}
