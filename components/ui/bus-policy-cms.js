import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { toast } from "sonner";
import { Loader2, Save, Eye, EyeOff } from "lucide-react";

const BusPolicyCMS = ({ setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cmsData, setCmsData] = useState({
    // Banner Section
    banner: {
      title: "Bus Transportation Policy",
      subtitle: "Home › Admission › Bus Policy",
      backgroundImage: "/assets/hall.jpg",
    },

    // Hero Section
    hero: {
      title: "Bus Transportation Policy",
      subtitle: "Safety Guidelines & Regulations",
      description:
        "Safe and reliable transportation is essential to student success at Al-Rasheed Academy. This policy ensures the safety, security, and well-being of all students utilizing school bus services while fostering a positive and respectful transportation environment.",
    },

    // Section I: General Transportation Guidelines
    section1: {
      title: "I. General Transportation Guidelines",
      eligibility: {
        title: "Eligibility for Bus Service",
        items: [
          "Bus transportation available to students residing beyond 1 mile from campus",
          "Service provided on established routes with designated stops",
          "Transportation is a privilege, not a right, and may be revoked for policy violations",
        ],
      },
      busStopSafety: {
        title: "Bus Stop Safety",
        items: [
          "Arrive at designated stops 5 minutes before scheduled pickup",
          "Wait at least 10 feet away from the roadway",
          "Never approach bus until it comes to complete stop and driver signals",
          "Cross streets only at designated crosswalks with driver supervision",
        ],
      },
    },

    // Section II: Student Conduct & Behavior Expectations
    section2: {
      title: "II. Student Conduct & Behavior Expectations",
      boardingProcedures: {
        title: "Boarding & Departure Procedures",
        items: [
          "Board in an orderly manner - no pushing, running, or crowding",
          "Take your seat immediately and remain seated while bus is in motion",
          "Keep aisles clear at all times",
          "Exit from front to back when arriving at destination",
          "Follow driver instructions at all times",
        ],
      },
      behaviorStandards: {
        title: "On-Bus Behavior Standards",
        description: "Students are expected to:",
        items: [
          "Speak in quiet, respectful tones",
          "Keep hands and feet to yourself",
          "Remain seated facing forward",
          "Keep the bus clean",
          "No eating, drinking, or chewing gum",
          "Respect all students and staff",
        ],
      },
      prohibitedItems: {
        title: "Prohibited Items & Actions",
        description: "The following are NOT permitted on school buses:",
        items: [
          "Weapons, drugs, alcohol, tobacco products, or vaping devices",
          "Glass containers, sharp objects, or hazardous materials",
          "Pets or animals (except service animals)",
          "Large items blocking aisles or emergency exits",
          "Electronic devices at excessive volume",
          "Opening windows without driver permission",
          "Throwing objects inside or outside the bus",
          "Vandalism or defacing bus property",
        ],
      },
    },

    // Section III: Safety Procedures
    section3: {
      title: "III. Safety Procedures",
      dangerZone: {
        title: "10-Foot Danger Zone",
        description:
          "Students must understand the danger zone surrounding all sides of the bus:",
        items: [
          "Never walk behind the bus",
          "Always walk 10 feet in front when crossing",
          "Make eye contact with driver before crossing",
        ],
      },
      emergencyEvacuation: {
        title: "Emergency Evacuation",
        items: [
          "All students receive annual bus evacuation training",
          "Emergency exits are clearly marked",
          "Students must follow driver instructions during emergencies",
          "Practice drills conducted at least once per school year",
        ],
      },
      specialAccommodations: {
        title: "Special Accommodations",
        items: [
          "Students with disabilities receive appropriate accommodations",
          "English language learners receive translated safety materials",
          "Parents may request special seating arrangements for medical reasons",
        ],
      },
    },

    // Contact Information
    contact: {
      title: "Contact Transportation Department",
      phone: "(716) 123-4567",
      phoneNote: "Emergency: Available 24/7",
      email: "transport@alrasheedacademy.org",
      officeHours: "Monday-Friday, 7:30 AM - 4:00 PM",
    },

    // Footer
    footer: {
      effectiveDate: "Fall 2025",
      lastRevised: "October 2025",
      nextReview: "August 2026",
      copyright: "ARA ©2012 All rights reserved.",
      subtitle:
        "K-12 Schools - Recognized by New York State Education Department",
    },
  });

  useEffect(() => {
    fetchBusPolicyData();
  }, []);

  const fetchBusPolicyData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/bus-policy"
      );
      if (response.ok) {
        const data = await response.json();
        setCmsData((prevData) => ({ ...prevData, ...data }));
      } else {
        toast.error("Failed to fetch bus policy data");
      }
    } catch (err) {
      console.error("Failed to fetch bus policy data", err);
      toast.error("Failed to fetch bus policy data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/bus-policy",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content: cmsData }),
        }
      );
      if (response.ok) {
        toast.success("Bus policy updated successfully!");
      } else {
        toast.error("Failed to update bus policy");
      }
    } catch (err) {
      console.error("Error updating bus policy", err);
      toast.error("Error updating bus policy");
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (section, subsection, field, value) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value,
        },
      },
    }));
  };

  const updateArrayItem = (section, subsection, arrayField, index, value) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [arrayField]: prev[section][subsection][arrayField].map((item, i) =>
            i === index ? value : item
          ),
        },
      },
    }));
  };

  const addArrayItem = (section, subsection, arrayField) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [arrayField]: [...prev[section][subsection][arrayField], ""],
        },
      },
    }));
  };

  const removeArrayItem = (section, subsection, arrayField, index) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [arrayField]: prev[section][subsection][arrayField].filter(
            (_, i) => i !== index
          ),
        },
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading bus policy data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Bus Policy CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Edit bus transportation policy content and information
          </p>
        </div>
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

      <div className="space-y-8">
        {/* Banner Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Banner Section
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <Input
                value={cmsData.banner.title}
                onChange={(e) =>
                  updateNestedField("banner", null, "title", e.target.value)
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subtitle
              </label>
              <Input
                value={cmsData.banner.subtitle}
                onChange={(e) =>
                  updateNestedField("banner", null, "subtitle", e.target.value)
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Hero Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <Input
                value={cmsData.hero.title}
                onChange={(e) =>
                  updateNestedField("hero", null, "title", e.target.value)
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subtitle
              </label>
              <Input
                value={cmsData.hero.subtitle}
                onChange={(e) =>
                  updateNestedField("hero", null, "subtitle", e.target.value)
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <Textarea
                value={cmsData.hero.description}
                onChange={(e) =>
                  updateNestedField("hero", null, "description", e.target.value)
                }
                rows={3}
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Section I: General Transportation Guidelines */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Section I: General Transportation Guidelines
          </h3>

          {/* Eligibility */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Eligibility for Bus Service
            </h4>
            <div className="space-y-2">
              {cmsData.section1.eligibility.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        "section1",
                        "eligibility",
                        "items",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={() =>
                      removeArrayItem("section1", "eligibility", "items", index)
                    }
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => addArrayItem("section1", "eligibility", "items")}
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>

          {/* Bus Stop Safety */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Bus Stop Safety
            </h4>
            <div className="space-y-2">
              {cmsData.section1.busStopSafety.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        "section1",
                        "busStopSafety",
                        "items",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={() =>
                      removeArrayItem(
                        "section1",
                        "busStopSafety",
                        "items",
                        index
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  addArrayItem("section1", "busStopSafety", "items")
                }
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>
        </div>

        {/* Section II: Student Conduct & Behavior Expectations */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Section II: Student Conduct & Behavior Expectations
          </h3>

          {/* Boarding Procedures */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Boarding & Departure Procedures
            </h4>
            <div className="space-y-2">
              {cmsData.section2.boardingProcedures.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        "section2",
                        "boardingProcedures",
                        "items",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={() =>
                      removeArrayItem(
                        "section2",
                        "boardingProcedures",
                        "items",
                        index
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  addArrayItem("section2", "boardingProcedures", "items")
                }
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>

          {/* Behavior Standards */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              On-Bus Behavior Standards
            </h4>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <Input
                value={cmsData.section2.behaviorStandards.description}
                onChange={(e) =>
                  updateNestedField(
                    "section2",
                    "behaviorStandards",
                    "description",
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              {cmsData.section2.behaviorStandards.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        "section2",
                        "behaviorStandards",
                        "items",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={() =>
                      removeArrayItem(
                        "section2",
                        "behaviorStandards",
                        "items",
                        index
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  addArrayItem("section2", "behaviorStandards", "items")
                }
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>

          {/* Prohibited Items */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Prohibited Items & Actions
            </h4>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <Input
                value={cmsData.section2.prohibitedItems.description}
                onChange={(e) =>
                  updateNestedField(
                    "section2",
                    "prohibitedItems",
                    "description",
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              {cmsData.section2.prohibitedItems.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        "section2",
                        "prohibitedItems",
                        "items",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={() =>
                      removeArrayItem(
                        "section2",
                        "prohibitedItems",
                        "items",
                        index
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  addArrayItem("section2", "prohibitedItems", "items")
                }
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>
        </div>

        {/* Section III: Safety Procedures */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Section III: Safety Procedures
          </h3>

          {/* Danger Zone */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              10-Foot Danger Zone
            </h4>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <Textarea
                value={cmsData.section3.dangerZone.description}
                onChange={(e) =>
                  updateNestedField(
                    "section3",
                    "dangerZone",
                    "description",
                    e.target.value
                  )
                }
                rows={2}
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              {cmsData.section3.dangerZone.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        "section3",
                        "dangerZone",
                        "items",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={() =>
                      removeArrayItem("section3", "dangerZone", "items", index)
                    }
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => addArrayItem("section3", "dangerZone", "items")}
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>

          {/* Emergency Evacuation */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Emergency Evacuation
            </h4>
            <div className="space-y-2">
              {cmsData.section3.emergencyEvacuation.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        "section3",
                        "emergencyEvacuation",
                        "items",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  <Button
                    onClick={() =>
                      removeArrayItem(
                        "section3",
                        "emergencyEvacuation",
                        "items",
                        index
                      )
                    }
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  addArrayItem("section3", "emergencyEvacuation", "items")
                }
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>

          {/* Special Accommodations */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Special Accommodations
            </h4>
            <div className="space-y-2">
              {cmsData.section3.specialAccommodations.items.map(
                (item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateArrayItem(
                          "section3",
                          "specialAccommodations",
                          "items",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                    <Button
                      onClick={() =>
                        removeArrayItem(
                          "section3",
                          "specialAccommodations",
                          "items",
                          index
                        )
                      }
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                )
              )}
              <Button
                onClick={() =>
                  addArrayItem("section3", "specialAccommodations", "items")
                }
                variant="outline"
                size="sm"
              >
                Add Item
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <Input
                value={cmsData.contact.phone}
                onChange={(e) =>
                  updateNestedField("contact", null, "phone", e.target.value)
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Note
              </label>
              <Input
                value={cmsData.contact.phoneNote}
                onChange={(e) =>
                  updateNestedField(
                    "contact",
                    null,
                    "phoneNote",
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <Input
                value={cmsData.contact.email}
                onChange={(e) =>
                  updateNestedField("contact", null, "email", e.target.value)
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Office Hours
              </label>
              <Input
                value={cmsData.contact.officeHours}
                onChange={(e) =>
                  updateNestedField(
                    "contact",
                    null,
                    "officeHours",
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Footer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Effective Date
              </label>
              <Input
                value={cmsData.footer.effectiveDate}
                onChange={(e) =>
                  updateNestedField(
                    "footer",
                    null,
                    "effectiveDate",
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Revised
              </label>
              <Input
                value={cmsData.footer.lastRevised}
                onChange={(e) =>
                  updateNestedField(
                    "footer",
                    null,
                    "lastRevised",
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Next Review
              </label>
              <Input
                value={cmsData.footer.nextReview}
                onChange={(e) =>
                  updateNestedField(
                    "footer",
                    null,
                    "nextReview",
                    e.target.value
                  )
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Copyright
              </label>
              <Input
                value={cmsData.footer.copyright}
                onChange={(e) =>
                  updateNestedField("footer", null, "copyright", e.target.value)
                }
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle
            </label>
            <Input
              value={cmsData.footer.subtitle}
              onChange={(e) =>
                updateNestedField("footer", null, "subtitle", e.target.value)
              }
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusPolicyCMS;
