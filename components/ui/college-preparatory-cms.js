import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff, Save, Loader2 } from "lucide-react";

const CollegePreparatoryCMS = ({ setSelected }) => {
  const [collegeData, setCollegeData] = useState({
    // Banner Section
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "Our Curriculum",
      breadcrumb: "Home › Curriculum",
    },
    // Header Section
    header: {
      description:
        "ARA school guides students and their families though the college planning and application process. Topics covered include College Application, Financial Aid Application (FAFSA), Common App, Resume Design and Letters of Recommendation.",
    },
    // Hero Section
    hero: {
      image:
        "https://images.unsplash.com/photo-1760605193118-a3536e1eea61?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
      imageAlt: "Our Students During Their Participation in the College Fair!",
      description:
        "ARA Academy School's college guidance program helps students navigate every step of their path to college, including:",
      programFeatures: [
        {
          title: "Guidance:",
          description:
            "Course selection guidance, Career Day, job shadowing, Resume",
          isActive: true,
        },
        {
          title: "Standardized testing:",
          description: "SAT",
          isActive: true,
        },
        {
          title: "College selection:",
          description: "college visits and individual college guidance",
          isActive: true,
        },
        {
          title: "College planning resources:",
          description:
            "Free Application for Federal Student Aid (FAFSA), Common Application, and more!",
          isActive: true,
        },
      ],
    },
    // Universities Section
    universities: {
      title: "Our Graduates Have Been Accepted at the Following Universities",
      logos: [
        "/assets/1.png",
        "/assets/2.png",
        "/assets/3.png",
        "/assets/4.png",
        "/assets/5.png",
        "/assets/6.png",
        "/assets/7.png",
        "/assets/8.png",
        "/assets/9.png",
        "/assets/10.png",
        "/assets/11.png",
        "/assets/12.png",
        "/assets/13.png",
      ],
      autoPlayInterval: 2000, // milliseconds
    },
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCollegeData();
  }, []);

  const fetchCollegeData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/college-preparatory",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCollegeData(data);
      } else {
        toast.error("Failed to fetch college preparatory data");
      }
    } catch (err) {
      console.error("Failed to fetch college preparatory data", err);
      toast.error("Failed to fetch college preparatory data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/college-preparatory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(collegeData),
        }
      );
      if (response.ok) {
        toast.success("College Preparatory page updated successfully!");
      } else {
        toast.error("Failed to update college preparatory page");
      }
    } catch (err) {
      console.error("Error updating college preparatory page", err);
      toast.error("Error updating college preparatory page");
    } finally {
      setSaving(false);
    }
  };

  const handleProgramFeatureChange = (index, field, value) => {
    const updatedFeatures = [...collegeData.hero.programFeatures];
    updatedFeatures[index][field] = value;
    setCollegeData({
      ...collegeData,
      hero: {
        ...collegeData.hero,
        programFeatures: updatedFeatures,
      },
    });
  };

  const toggleProgramFeature = (index) => {
    const updatedFeatures = [...collegeData.hero.programFeatures];
    updatedFeatures[index].isActive = !updatedFeatures[index].isActive;
    setCollegeData({
      ...collegeData,
      hero: {
        ...collegeData.hero,
        programFeatures: updatedFeatures,
      },
    });
  };

  const addProgramFeature = () => {
    const newFeature = {
      title: "",
      description: "",
      isActive: true,
    };
    setCollegeData({
      ...collegeData,
      hero: {
        ...collegeData.hero,
        programFeatures: [...collegeData.hero.programFeatures, newFeature],
      },
    });
  };

  const removeProgramFeature = (index) => {
    const updatedFeatures = collegeData.hero.programFeatures.filter(
      (_, i) => i !== index
    );
    setCollegeData({
      ...collegeData,
      hero: {
        ...collegeData.hero,
        programFeatures: updatedFeatures,
      },
    });
  };

  const handleLogoChange = (index, value) => {
    const updatedLogos = [...collegeData.universities.logos];
    updatedLogos[index] = value;
    setCollegeData({
      ...collegeData,
      universities: {
        ...collegeData.universities,
        logos: updatedLogos,
      },
    });
  };

  const addLogo = () => {
    setCollegeData({
      ...collegeData,
      universities: {
        ...collegeData.universities,
        logos: [...collegeData.universities.logos, ""],
      },
    });
  };

  const removeLogo = (index) => {
    const updatedLogos = collegeData.universities.logos.filter(
      (_, i) => i !== index
    );
    setCollegeData({
      ...collegeData,
      universities: {
        ...collegeData.universities,
        logos: updatedLogos,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading college preparatory data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            College Preparatory CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Edit college preparatory page content and program information
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addProgramFeature} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Program Feature
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

      {/* Banner Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Banner Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Background Image URL
            </label>
            <Input
              value={collegeData.banner.backgroundImage}
              onChange={(e) =>
                setCollegeData({
                  ...collegeData,
                  banner: {
                    ...collegeData.banner,
                    backgroundImage: e.target.value,
                  },
                })
              }
              placeholder="/assets/hall.jpg"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <Input
              value={collegeData.banner.title}
              onChange={(e) =>
                setCollegeData({
                  ...collegeData,
                  banner: {
                    ...collegeData.banner,
                    title: e.target.value,
                  },
                })
              }
              placeholder="Our Curriculum"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Breadcrumb
            </label>
            <Input
              value={collegeData.banner.breadcrumb}
              onChange={(e) =>
                setCollegeData({
                  ...collegeData,
                  banner: {
                    ...collegeData.banner,
                    breadcrumb: e.target.value,
                  },
                })
              }
              placeholder="Home › Curriculum"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Header Section
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description Text
          </label>
          <Textarea
            value={collegeData.header.description}
            onChange={(e) =>
              setCollegeData({
                ...collegeData,
                header: {
                  ...collegeData.header,
                  description: e.target.value,
                },
              })
            }
            placeholder="ARA school guides students and their families..."
            rows={4}
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Hero Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hero Image URL
            </label>
            <Input
              value={collegeData.hero.image}
              onChange={(e) =>
                setCollegeData({
                  ...collegeData,
                  hero: {
                    ...collegeData.hero,
                    image: e.target.value,
                  },
                })
              }
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Alt Text
            </label>
            <Input
              value={collegeData.hero.imageAlt}
              onChange={(e) =>
                setCollegeData({
                  ...collegeData,
                  hero: {
                    ...collegeData.hero,
                    imageAlt: e.target.value,
                  },
                })
              }
              placeholder="Our Students During Their Participation..."
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <Textarea
            value={collegeData.hero.description}
            onChange={(e) =>
              setCollegeData({
                ...collegeData,
                hero: {
                  ...collegeData.hero,
                  description: e.target.value,
                },
              })
            }
            placeholder="ARA Academy School's college guidance program..."
            rows={3}
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Program Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Program Features ({collegeData.hero.programFeatures.length})
        </h3>
        {collegeData.hero.programFeatures.map((feature, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                  Feature {index + 1}: {feature.title || "Untitled"}
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
                  onClick={() => toggleProgramFeature(index)}
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
                  onClick={() => removeProgramFeature(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <Input
                  value={feature.title}
                  onChange={(e) =>
                    handleProgramFeatureChange(index, "title", e.target.value)
                  }
                  placeholder="Guidance:"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <Input
                  value={feature.description}
                  onChange={(e) =>
                    handleProgramFeatureChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Course selection guidance..."
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Universities Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Universities Section
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Section Title
          </label>
          <Input
            value={collegeData.universities.title}
            onChange={(e) =>
              setCollegeData({
                ...collegeData,
                universities: {
                  ...collegeData.universities,
                  title: e.target.value,
                },
              })
            }
            placeholder="Our Graduates Have Been Accepted at..."
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Auto-play Interval (milliseconds)
          </label>
          <Input
            type="number"
            value={collegeData.universities.autoPlayInterval}
            onChange={(e) =>
              setCollegeData({
                ...collegeData,
                universities: {
                  ...collegeData.universities,
                  autoPlayInterval: parseInt(e.target.value) || 2000,
                },
              })
            }
            placeholder="2000"
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              University Logos ({collegeData.universities.logos.length})
            </label>
            <Button onClick={addLogo} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Logo
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegeData.universities.logos.map((logo, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={logo}
                  onChange={(e) => handleLogoChange(index, e.target.value)}
                  placeholder={`/assets/${index + 1}.png`}
                  className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                <Button
                  onClick={() => removeLogo(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegePreparatoryCMS;
