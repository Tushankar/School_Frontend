import React from "react";
import {
  BookOpenIcon,
  UsersIcon,
  TrophyIcon,
  HeartIcon,
  GraduationCapIcon,
  LightbulbIcon,
  GlobeIcon,
  UserPlusIcon,
  NewspaperIcon,
  BriefcaseIcon,
} from "lucide-react";

import { BentoCard, BentoGrid } from "../components/ui/bento-grid";

const features = [
  {
    Icon: UserPlusIcon,
    name: "Admissions",
    description:
      "Learn about our admission process, requirements, and how to join our vibrant school community.",
    href: "/",
    cta: "Apply Now",
    background: (
      <img
        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
        alt="Admissions"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: BookOpenIcon,
    name: "Islamic Education",
    description:
      "Comprehensive Islamic studies program integrating faith, knowledge, and character development.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
        alt="Islamic Education"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GraduationCapIcon,
    name: "College Preparatory",
    description:
      "Rigorous academic preparation and guidance to help students succeed in higher education.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop"
        alt="College Preparatory"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: NewspaperIcon,
    name: "Latest News",
    description:
      "Stay updated with school announcements, events, achievements, and community news.",
    href: "/",
    cta: "Read More",
    background: (
      <img
        src="https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&h=600&fit=crop"
        alt="Latest News"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BookOpenIcon,
    name: "Academics",
    description:
      "Explore our comprehensive curriculum, subjects, and academic programs designed for excellence.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop"
        alt="Academics"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
  {
    Icon: BriefcaseIcon,
    name: "Career",
    description:
      "Career guidance, counseling, and preparation for future professional success and lifelong learning.",
    href: "/",
    cta: "Explore Careers",
    background: (
      <img
        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop"
        alt="Career"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
    ),
    className: "lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-5",
  },
];

function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-4">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default function BentoGridPage() {
  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              Our Features & Programs
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover what makes ARA Academy exceptional
          </p>
        </div>

        <BentoDemo />
      </div>
    </div>
  );
}
