import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff, Save, Loader2 } from "lucide-react";

const BentoGridCMS = ({ setSelected }) => {
  const [bentoGridData, setBentoGridData] = useState({
    mainTitle: "Our Features & Programs",
    subtitle: "Discover what makes ARA Academy exceptional",
    features: [
      {
        name: "Admissions",
        description:
          "Learn about our admission process, requirements, and how to join our vibrant school community.",
        href: "/",
        cta: "Apply Now",
        backgroundImage:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        icon: "UserPlus",
        isActive: true,
      },
      {
        name: "Islamic Education",
        description:
          "Comprehensive Islamic studies program integrating faith, knowledge, and character development.",
        href: "/",
        cta: "Learn more",
        backgroundImage:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
        icon: "BookOpen",
        isActive: true,
      },
      {
        name: "College Preparatory",
        description:
          "Rigorous academic preparation and guidance to help students succeed in higher education.",
        href: "/",
        cta: "Learn more",
        backgroundImage:
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
        icon: "GraduationCap",
        isActive: true,
      },
      {
        name: "Latest News",
        description:
          "Stay updated with school announcements, events, achievements, and community news.",
        href: "/latest-news",
        cta: "Read More",
        backgroundImage:
          "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&h=600&fit=crop",
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
        icon: "Newspaper",
        isActive: true,
      },
      {
        name: "Academics",
        description:
          "Explore our comprehensive curriculum, subjects, and academic programs designed for excellence.",
        href: "/curricular",
        cta: "Learn more",
        backgroundImage:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop",
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
        icon: "BookOpen",
        isActive: true,
      },
      {
        name: "Career",
        description:
          "Career guidance, counseling, and preparation for future professional success and lifelong learning.",
        href: "/",
        cta: "Explore Careers",
        backgroundImage:
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop",
        className: "lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-5",
        icon: "Briefcase",
        isActive: true,
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBentoGridData();
  }, []);

  const fetchBentoGridData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/bento-grid",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBentoGridData(data);
      } else {
        toast.error("Failed to fetch bento grid data");
      }
    } catch (err) {
      console.error("Failed to fetch bento grid data", err);
      toast.error("Failed to fetch bento grid data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/bento-grid",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content: bentoGridData }),
        }
      );
      if (response.ok) {
        toast.success("Bento Grid updated successfully!");
      } else {
        toast.error("Failed to update bento grid");
      }
    } catch (err) {
      console.error("Error updating bento grid", err);
      toast.error("Error updating bento grid");
    } finally {
      setSaving(false);
    }
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...bentoGridData.features];
    updatedFeatures[index][field] = value;
    setBentoGridData({ ...bentoGridData, features: updatedFeatures });
  };

  const toggleFeature = (index) => {
    const updatedFeatures = [...bentoGridData.features];
    updatedFeatures[index].isActive = !updatedFeatures[index].isActive;
    setBentoGridData({ ...bentoGridData, features: updatedFeatures });
  };

  const addFeature = () => {
    const newFeature = {
      name: "",
      description: "",
      href: "/",
      cta: "Learn more",
      backgroundImage: "",
      className: "",
      icon: "BookOpen",
      isActive: true,
    };
    setBentoGridData({
      ...bentoGridData,
      features: [...bentoGridData.features, newFeature],
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = bentoGridData.features.filter(
      (_, i) => i !== index
    );
    setBentoGridData({ ...bentoGridData, features: updatedFeatures });
  };

  const iconOptions = [
    { value: "BookOpen", label: "Book Open" },
    { value: "GraduationCap", label: "Graduation Cap" },
    { value: "UserPlus", label: "User Plus" },
    { value: "Newspaper", label: "Newspaper" },
    { value: "Briefcase", label: "Briefcase" },
    { value: "Heart", label: "Heart" },
    { value: "Star", label: "Star" },
    { value: "Users", label: "Users" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading bento grid data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Bento Grid CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Edit bento grid section content and features
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addFeature} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Title and Subtitle */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Page Header
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Main Title
            </label>
            <Input
              value={bentoGridData.mainTitle}
              onChange={(e) =>
                setBentoGridData({
                  ...bentoGridData,
                  mainTitle: e.target.value,
                })
              }
              placeholder="Our Features & Programs"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle
            </label>
            <Input
              value={bentoGridData.subtitle}
              onChange={(e) =>
                setBentoGridData({ ...bentoGridData, subtitle: e.target.value })
              }
              placeholder="Discover what makes ARA Academy exceptional"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Features ({bentoGridData.features.length})
        </h3>
        {bentoGridData.features.map((feature, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                  Feature {index + 1}: {feature.name || "Untitled"}
                </h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    feature.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {feature.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => toggleFeature(index)}
                  variant="outline"
                  size="sm"
                  className={
                    feature.isActive
                      ? "text-red-600 hover:text-red-700"
                      : "text-green-600 hover:text-green-700"
                  }
                >
                  {feature.isActive ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => removeFeature(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  value={feature.name}
                  onChange={(e) =>
                    handleFeatureChange(index, "name", e.target.value)
                  }
                  placeholder="Feature name"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={feature.icon}
                  onChange={(e) =>
                    handleFeatureChange(index, "icon", e.target.value)
                  }
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CTA Button Text
                </label>
                <Input
                  value={feature.cta}
                  onChange={(e) =>
                    handleFeatureChange(index, "cta", e.target.value)
                  }
                  placeholder="Learn more"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link URL
                </label>
                <Input
                  value={feature.href}
                  onChange={(e) =>
                    handleFeatureChange(index, "href", e.target.value)
                  }
                  placeholder="/page-url"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Image URL
                </label>
                <Input
                  value={feature.backgroundImage}
                  onChange={(e) =>
                    handleFeatureChange(
                      index,
                      "backgroundImage",
                      e.target.value
                    )
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CSS Class Name
              </label>
              <Input
                value={feature.className}
                onChange={(e) =>
                  handleFeatureChange(index, "className", e.target.value)
                }
                placeholder="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <Textarea
                value={feature.description}
                onChange={(e) =>
                  handleFeatureChange(index, "description", e.target.value)
                }
                placeholder="Feature description"
                rows={3}
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Preview
        </h3>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                {bentoGridData.mainTitle}
              </span>
            </h1>
            <p className="text-gray-600">{bentoGridData.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bentoGridData.features
              .filter((f) => f.isActive)
              .slice(0, 3)
              .map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        Icon
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {feature.description}
                  </p>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {feature.cta}
                  </button>
                </div>
              ))}
          </div>
          {bentoGridData.features.filter((f) => f.isActive).length > 3 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              +{bentoGridData.features.filter((f) => f.isActive).length - 3}{" "}
              more features...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoGridCMS;
