import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff, Save, Loader2 } from "lucide-react";

const DressCodeCMS = ({ setSelected }) => {
  const [dressCodeData, setDressCodeData] = useState({
    // Banner Section
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "Dress Code",
      breadcrumb: "Home › Dress Code",
    },
    // Hero Section
    hero: {
      title: "AL-RASHEED ACADEMY",
      subtitle: "Established in Excellence",
      description:
        "Creating unity, responsibility, and a positive learning environment through proper attire. Your cooperation ensures our students are prepared for success every day.",
      logoImages: [
        "https://www.alrasheedacademy.org/images/Untitled-1.png",
        "https://www.alrasheedacademy.org/images/Untitled-2.png",
        "https://www.alrasheedacademy.org/images/qqdd.png",
        "https://www.alrasheedacademy.org/images/48999.png",
        "https://www.alrasheedacademy.org/images/1333.png",
        "https://www.alrasheedacademy.org/images/Untitled-13.png",
        "https://www.alrasheedacademy.org/images/Untitled-12.png",
        "https://www.alrasheedacademy.org/images/Untitled-6.png",
        "https://www.alrasheedacademy.org/images/qqq.png",
        "https://www.alrasheedacademy.org/images/Untitled-9.png",
        "https://www.alrasheedacademy.org/images/7788.png",
        "https://www.alrasheedacademy.org/images/Untitled-11.png",
        "https://www.alrasheedacademy.org/images/Untitled-10.png",
        "https://www.alrasheedacademy.org/images/Untitled-1qwe.png",
        "https://www.alrasheedacademy.org/images/qw.png",
      ],
    },
    // Key Information Cards
    infoCards: [
      {
        icon: "ShirtIcon",
        title: "Daily Uniform",
        description: "Required every school day for all students",
        isActive: true,
      },
      {
        icon: "Calendar",
        title: "Gym Days",
        description: "Special uniform for PE and outdoor activities",
        isActive: true,
      },
      {
        icon: "CheckCircle2",
        title: "Compliance",
        description: "Full uniform required upon entry to school",
        isActive: true,
      },
    ],
    // Important Notice
    notice: {
      title: "Dress Code Violations Policy",
      content: [
        "Parent Responsibility: Parents are responsible for ensuring their child leaves home in full uniform each day.",
        "School Entry: Students must enter school premises fully uniformed. Students not in proper uniform will not be admitted.",
        "Consequences: If a student arrives without proper uniform, parents must bring the uniform or the student will receive after-school detention.",
        "Repeated Violations: Continued violations will result in suspension until a parent conference is held.",
      ],
    },
    // Uniform Requirements
    uniforms: {
      daily: {
        title: "Uniform Requirements",
        subtitle: "Complete dress code guidelines by grade level",
        description:
          "Every student must wear the required daily uniform every day. Both boys and girls may wear uniform sweaters or fleece jackets/vests as optional layers.",
        gymPolicy:
          "Gym uniforms are worn ONLY on gym, games, and field trip days. Girls 4th grade and up may wear gym uniforms under their abayas.",
        gradeSections: [
          {
            grade: "K-3rd Grade",
            items: [
              "Navy Blue uniform dresses with Navy Blue pants",
              "Maroon collared shirts",
              "Maroon Hijab",
            ],
            image: "/assets/12grade.png",
            isActive: true,
          },
          {
            grade: "4th-12th Grade",
            items: [
              "Black Abaya (with no design)",
              "Maroon Hijab",
              "Black or white socks",
              "Black Cardigans/Button down (no zippers or hoods allowed)",
            ],
            image: "/assets/hijabblack.png",
            isActive: true,
          },
          {
            grade: "All Grades",
            items: [
              "School uniform colors by school level",
              "Navy Blue Hijab",
              "Black or white socks",
              "Navy Blue Uniform Sweaters/Button down (no zippers or hoods)",
            ],
            images: [
              "/assets/kgpant.png",
              "/assets/shoe.png",
              "/assets/kgthr12Pant.png",
            ],
            imageLabels: ["Elementary", "School Shoes", "High School"],
            isActive: true,
          },
        ],
      },
      gym: {
        title: "Physical Education Uniform",
        subtitle:
          "Appropriate athletic wear for gym class, games, and outdoor activities",
        notice: "Black sneakers are required for all gym classes",
        boys: ["T-shirt (no design)", "Baggy sweatpants", "Black sneakers"],
        girls: [
          "Long sleeve t-shirt (no design)",
          "Baggy sweatpants",
          "Black sneakers",
        ],
      },
    },
    // Contact Section
    contact: {
      title: "Need Assistance?",
      description:
        "Our office staff is available to answer any questions about dress code requirements",
      phone: "(716) 706-1303",
      email: "registration@alrasheed.edu",
    },
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDressCodeData();
  }, []);

  const fetchDressCodeData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/dress-code",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDressCodeData(data);
      } else {
        toast.error("Failed to fetch dress code data");
      }
    } catch (err) {
      console.error("Failed to fetch dress code data", err);
      toast.error("Failed to fetch dress code data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!storedToken) {
        toast.error("You must be logged in to save changes");
        setSaving(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/dress-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify(dressCodeData),
        }
      );
      if (response.ok) {
        toast.success("Dress Code updated successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to update dress code");
      }
    } catch (err) {
      console.error("Error updating dress code", err);
      toast.error("Error updating dress code");
    } finally {
      setSaving(false);
    }
  };

  const handleInfoCardChange = (index, field, value) => {
    const updatedCards = [...dressCodeData.infoCards];
    updatedCards[index][field] = value;
    setDressCodeData({ ...dressCodeData, infoCards: updatedCards });
  };

  const toggleInfoCard = (index) => {
    const updatedCards = [...dressCodeData.infoCards];
    updatedCards[index].isActive = !updatedCards[index].isActive;
    setDressCodeData({ ...dressCodeData, infoCards: updatedCards });
  };

  const addInfoCard = () => {
    const newCard = {
      icon: "ShirtIcon",
      title: "",
      description: "",
      isActive: true,
    };
    setDressCodeData({
      ...dressCodeData,
      infoCards: [...dressCodeData.infoCards, newCard],
    });
  };

  const removeInfoCard = (index) => {
    const updatedCards = dressCodeData.infoCards.filter((_, i) => i !== index);
    setDressCodeData({ ...dressCodeData, infoCards: updatedCards });
  };

  const handleGradeSectionChange = (index, field, value) => {
    const updatedSections = [...dressCodeData.uniforms.daily.gradeSections];
    updatedSections[index][field] = value;
    setDressCodeData({
      ...dressCodeData,
      uniforms: {
        ...dressCodeData.uniforms,
        daily: {
          ...dressCodeData.uniforms.daily,
          gradeSections: updatedSections,
        },
      },
    });
  };

  const toggleGradeSection = (index) => {
    const updatedSections = [...dressCodeData.uniforms.daily.gradeSections];
    updatedSections[index].isActive = !updatedSections[index].isActive;
    setDressCodeData({
      ...dressCodeData,
      uniforms: {
        ...dressCodeData.uniforms,
        daily: {
          ...dressCodeData.uniforms.daily,
          gradeSections: updatedSections,
        },
      },
    });
  };

  const addGradeSection = () => {
    const newSection = {
      grade: "",
      items: [""],
      image: "",
      isActive: true,
    };
    setDressCodeData({
      ...dressCodeData,
      uniforms: {
        ...dressCodeData.uniforms,
        daily: {
          ...dressCodeData.uniforms.daily,
          gradeSections: [
            ...dressCodeData.uniforms.daily.gradeSections,
            newSection,
          ],
        },
      },
    });
  };

  const removeGradeSection = (index) => {
    const updatedSections = dressCodeData.uniforms.daily.gradeSections.filter(
      (_, i) => i !== index
    );
    setDressCodeData({
      ...dressCodeData,
      uniforms: {
        ...dressCodeData.uniforms,
        daily: {
          ...dressCodeData.uniforms.daily,
          gradeSections: updatedSections,
        },
      },
    });
  };

  const iconOptions = [
    { value: "ShirtIcon", label: "Shirt Icon" },
    { value: "Calendar", label: "Calendar" },
    { value: "CheckCircle2", label: "Check Circle" },
    { value: "AlertCircle", label: "Alert Circle" },
    { value: "Phone", label: "Phone" },
    { value: "Mail", label: "Mail" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading dress code data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Dress Code CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Edit dress code page content and uniform requirements
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={addInfoCard}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Info Card
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
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
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Banner Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Background Image URL
            </label>
            <Input
              value={dressCodeData.banner.backgroundImage}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  banner: {
                    ...dressCodeData.banner,
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
              value={dressCodeData.banner.title}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  banner: {
                    ...dressCodeData.banner,
                    title: e.target.value,
                  },
                })
              }
              placeholder="Dress Code"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Breadcrumb
            </label>
            <Input
              value={dressCodeData.banner.breadcrumb}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  banner: {
                    ...dressCodeData.banner,
                    breadcrumb: e.target.value,
                  },
                })
              }
              placeholder="Home › Dress Code"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Hero Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              School Title
            </label>
            <Input
              value={dressCodeData.hero.title}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  hero: {
                    ...dressCodeData.hero,
                    title: e.target.value,
                  },
                })
              }
              placeholder="AL-RASHEED ACADEMY"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle
            </label>
            <Input
              value={dressCodeData.hero.subtitle}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  hero: {
                    ...dressCodeData.hero,
                    subtitle: e.target.value,
                  },
                })
              }
              placeholder="Established in Excellence"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <Textarea
            value={dressCodeData.hero.description}
            onChange={(e) =>
              setDressCodeData({
                ...dressCodeData,
                hero: {
                  ...dressCodeData.hero,
                  description: e.target.value,
                },
              })
            }
            placeholder="Creating unity, responsibility, and a positive learning environment..."
            rows={3}
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="space-y-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
          Information Cards ({dressCodeData.infoCards.length})
        </h3>
        {dressCodeData.infoCards.map((card, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h4 className="text-sm md:text-md font-semibold text-gray-900 dark:text-gray-100">
                  Card {index + 1}: {card.title || "Untitled"}
                </h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                    card.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {card.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => toggleInfoCard(index)}
                  variant="outline"
                  size="sm"
                  className={
                    card.isActive
                      ? "text-red-600 hover:text-red-700 flex-1 sm:flex-none"
                      : "text-green-600 hover:text-green-700 flex-1 sm:flex-none"
                  }
                >
                  {card.isActive ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => removeInfoCard(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex-1 sm:flex-none"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  value={card.icon}
                  onChange={(e) =>
                    handleInfoCardChange(index, "icon", e.target.value)
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
                  Title
                </label>
                <Input
                  value={card.title}
                  onChange={(e) =>
                    handleInfoCardChange(index, "title", e.target.value)
                  }
                  placeholder="Card title"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <Input
                  value={card.description}
                  onChange={(e) =>
                    handleInfoCardChange(index, "description", e.target.value)
                  }
                  placeholder="Card description"
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Important Notice Section
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notice Title
          </label>
          <Input
            value={dressCodeData.notice.title}
            onChange={(e) =>
              setDressCodeData({
                ...dressCodeData,
                notice: {
                  ...dressCodeData.notice,
                  title: e.target.value,
                },
              })
            }
            placeholder="Dress Code Violations Policy"
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notice Content (one per line)
          </label>
          <Textarea
            value={dressCodeData.notice.content.join("\n")}
            onChange={(e) =>
              setDressCodeData({
                ...dressCodeData,
                notice: {
                  ...dressCodeData.notice,
                  content: e.target.value
                    .split("\n")
                    .filter((line) => line.trim()),
                },
              })
            }
            placeholder="Enter each notice point on a new line"
            rows={6}
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Uniforms Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Uniform Requirements
        </h3>

        {/* Daily Uniform */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Daily Uniform Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Section Title
              </label>
              <Input
                value={dressCodeData.uniforms.daily.title}
                onChange={(e) =>
                  setDressCodeData({
                    ...dressCodeData,
                    uniforms: {
                      ...dressCodeData.uniforms,
                      daily: {
                        ...dressCodeData.uniforms.daily,
                        title: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Uniform Requirements"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subtitle
              </label>
              <Input
                value={dressCodeData.uniforms.daily.subtitle}
                onChange={(e) =>
                  setDressCodeData({
                    ...dressCodeData,
                    uniforms: {
                      ...dressCodeData.uniforms,
                      daily: {
                        ...dressCodeData.uniforms.daily,
                        subtitle: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Complete dress code guidelines by grade level"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <Textarea
              value={dressCodeData.uniforms.daily.description}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  uniforms: {
                    ...dressCodeData.uniforms,
                    daily: {
                      ...dressCodeData.uniforms.daily,
                      description: e.target.value,
                    },
                  },
                })
              }
              placeholder="Every student must wear the required daily uniform..."
              rows={2}
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gym Policy
            </label>
            <Textarea
              value={dressCodeData.uniforms.daily.gymPolicy}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  uniforms: {
                    ...dressCodeData.uniforms,
                    daily: {
                      ...dressCodeData.uniforms.daily,
                      gymPolicy: e.target.value,
                    },
                  },
                })
              }
              placeholder="Gym uniforms are worn ONLY on gym, games..."
              rows={2}
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Grade Sections */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h4 className="text-sm md:text-md font-semibold text-gray-900 dark:text-gray-100">
              Grade Sections (
              {dressCodeData.uniforms.daily.gradeSections.length})
            </h4>
            <Button
              onClick={addGradeSection}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Grade Section
            </Button>
          </div>
          {dressCodeData.uniforms.daily.gradeSections.map((section, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                    {section.grade || "Untitled Grade"}
                  </h5>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                      section.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {section.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => toggleGradeSection(index)}
                    variant="outline"
                    size="sm"
                    className={
                      section.isActive
                        ? "text-red-600 hover:text-red-700 flex-1 sm:flex-none"
                        : "text-green-600 hover:text-green-700 flex-1 sm:flex-none"
                    }
                  >
                    {section.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => removeGradeSection(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade Level
                  </label>
                  <Input
                    value={section.grade}
                    onChange={(e) =>
                      handleGradeSectionChange(index, "grade", e.target.value)
                    }
                    placeholder="K-3rd Grade"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <Input
                    value={section.image}
                    onChange={(e) =>
                      handleGradeSectionChange(index, "image", e.target.value)
                    }
                    placeholder="/assets/uniform.png"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Uniform Items (one per line)
                </label>
                <Textarea
                  value={section.items.join("\n")}
                  onChange={(e) =>
                    handleGradeSectionChange(
                      index,
                      "items",
                      e.target.value.split("\n").filter((line) => line.trim())
                    )
                  }
                  placeholder="Enter each uniform item on a new line"
                  rows={4}
                  className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Gym Uniform */}
        <div>
          <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Gym Uniform Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gym Section Title
              </label>
              <Input
                value={dressCodeData.uniforms.gym.title}
                onChange={(e) =>
                  setDressCodeData({
                    ...dressCodeData,
                    uniforms: {
                      ...dressCodeData.uniforms,
                      gym: {
                        ...dressCodeData.uniforms.gym,
                        title: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Physical Education Uniform"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gym Subtitle
              </label>
              <Input
                value={dressCodeData.uniforms.gym.subtitle}
                onChange={(e) =>
                  setDressCodeData({
                    ...dressCodeData,
                    uniforms: {
                      ...dressCodeData.uniforms,
                      gym: {
                        ...dressCodeData.uniforms.gym,
                        subtitle: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Appropriate athletic wear for gym class..."
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gym Notice
            </label>
            <Input
              value={dressCodeData.uniforms.gym.notice}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  uniforms: {
                    ...dressCodeData.uniforms,
                    gym: {
                      ...dressCodeData.uniforms.gym,
                      notice: e.target.value,
                    },
                  },
                })
              }
              placeholder="Black sneakers are required for all gym classes"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Boys Gym Uniform (one per line)
              </label>
              <Textarea
                value={dressCodeData.uniforms.gym.boys.join("\n")}
                onChange={(e) =>
                  setDressCodeData({
                    ...dressCodeData,
                    uniforms: {
                      ...dressCodeData.uniforms,
                      gym: {
                        ...dressCodeData.uniforms.gym,
                        boys: e.target.value
                          .split("\n")
                          .filter((line) => line.trim()),
                      },
                    },
                  })
                }
                placeholder="Enter boys gym uniform items"
                rows={4}
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Girls Gym Uniform (one per line)
              </label>
              <Textarea
                value={dressCodeData.uniforms.gym.girls.join("\n")}
                onChange={(e) =>
                  setDressCodeData({
                    ...dressCodeData,
                    uniforms: {
                      ...dressCodeData.uniforms,
                      gym: {
                        ...dressCodeData.uniforms.gym,
                        girls: e.target.value
                          .split("\n")
                          .filter((line) => line.trim()),
                      },
                    },
                  })
                }
                placeholder="Enter girls gym uniform items"
                rows={4}
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Contact Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Title
            </label>
            <Input
              value={dressCodeData.contact.title}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  contact: {
                    ...dressCodeData.contact,
                    title: e.target.value,
                  },
                })
              }
              placeholder="Need Assistance?"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <Input
              value={dressCodeData.contact.phone}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  contact: {
                    ...dressCodeData.contact,
                    phone: e.target.value,
                  },
                })
              }
              placeholder="(716) 706-1303"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <Textarea
              value={dressCodeData.contact.description}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  contact: {
                    ...dressCodeData.contact,
                    description: e.target.value,
                  },
                })
              }
              placeholder="Our office staff is available to answer..."
              rows={2}
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <Input
              value={dressCodeData.contact.email}
              onChange={(e) =>
                setDressCodeData({
                  ...dressCodeData,
                  contact: {
                    ...dressCodeData.contact,
                    email: e.target.value,
                  },
                })
              }
              placeholder="registration@alrasheed.edu"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressCodeCMS;
