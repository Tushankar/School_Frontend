import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const PrincipalMessageCMS = ({ setSelected }) => {
  const [principalMessageData, setPrincipalMessageData] = useState({
    // Banner Section
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "Principal's Message",
      breadcrumb: "Home › Principal's Message",
    },
    // Content Section

    content: {
      greeting: "Dear ARA Community,",
      paragraphs: [
        "I am delighted to extend my warmest greetings to each member of our esteemed school community and it is with great pleasure that I introduce myself as the School Principal and one of the founders of our beloved institution.",
        "With over 25 years of dedicated service in the field of education and management, I bring a wealth of experience and a steadfast commitment to fostering an environment that nurtures academic excellence, character development, and lifelong learning.",
        "Having played a pivotal role as the founding president of our school, I have been intricately involved in shaping its vision and mission from the outset. Our journey, marked by milestones and achievements, reflects the collective efforts of a dedicated team, supportive parents, and, most importantly, our talented students.",
        "My passion for education stems from a belief in its transformative power and the profound impact it has on individuals and society at large. As we move forward, I am committed to upholding the principles that have been the cornerstone of our institution—integrity, inclusivity, innovation, and a relentless pursuit of excellence.",
        "I am eager to work collaboratively with our esteemed faculty, dedicated staff, involved parents, and, of course, our bright and enthusiastic students. Together, we will continue to build on the strong foundation laid by the visionaries who founded this school.",
        "I invite each of you to join hands as we embark on another exciting chapter in the history of our school. Your support, engagement, and commitment are invaluable, and together, we will create an environment where every student can thrive, learn, and achieve their fullest potential.",
        "Thank you for entrusting me with the responsibility of leading our school. I am honored to serve in this capacity and look forward to a year filled with growth, learning, and success.",
      ],
      signature: {
        closing: "Best regards,",
        title: "School Principal",
        school: "Al-Rasheed Academy",
      },
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrincipalMessageData();
  }, []);

  const fetchPrincipalMessageData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/cms/principal-message",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Validate and sanitize the data structure
        const sanitizedData = sanitizePrincipalMessageData(data);

        // Create a completely fresh state object
        const freshState = {
          banner: {
            backgroundImage:
              sanitizedData.banner?.backgroundImage ||
              principalMessageData.banner.backgroundImage,
            title:
              sanitizedData.banner?.title || principalMessageData.banner.title,
            breadcrumb:
              sanitizedData.banner?.breadcrumb ||
              principalMessageData.banner.breadcrumb,
          },
          content: {
            greeting:
              sanitizedData.content?.greeting ||
              principalMessageData.content.greeting,
            paragraphs:
              sanitizedData.content?.paragraphs ||
              principalMessageData.content.paragraphs,
            signature:
              sanitizedData.content?.signature ||
              principalMessageData.content.signature,
          },
        };

        setPrincipalMessageData(freshState);
      } else if (response.status === 404) {
        // No data exists yet, use defaults
        console.log("No CMS data found, using defaults");
      }
    } catch (err) {
      console.error("Failed to fetch principal message data", err);
      toast.error("Failed to fetch principal message data");
    }
  };

  // Helper function to sanitize corrupted data from server
  const sanitizePrincipalMessageData = (data) => {
    const sanitized = {};

    // Helper to ensure value is a string
    const ensureString = (value, defaultValue) => {
      if (typeof value === "string") return value;
      return defaultValue;
    };

    // Sanitize banner section
    if (data.banner) {
      sanitized.banner = {
        backgroundImage: ensureString(
          data.banner.backgroundImage,
          "/assets/hall.jpg"
        ),
        title: ensureString(data.banner.title, "Principal's Message"),
        breadcrumb: ensureString(
          data.banner.breadcrumb,
          "Home › Principal's Message"
        ),
      };
    }

    // Sanitize content section
    if (data.content) {
      sanitized.content = {
        greeting: ensureString(data.content.greeting, "Dear ARA Community,"),
        paragraphs: Array.isArray(data.content.paragraphs)
          ? data.content.paragraphs.map((paragraph, index) =>
              ensureString(
                paragraph,
                principalMessageData.content.paragraphs[index] || ""
              )
            )
          : principalMessageData.content.paragraphs,
        signature: data.content.signature
          ? {
              closing: ensureString(
                data.content.signature.closing,
                "Best regards,"
              ),
              title: ensureString(
                data.content.signature.title,
                "School Principal"
              ),
              school: ensureString(
                data.content.signature.school,
                "Al-Rasheed Academy"
              ),
            }
          : principalMessageData.content.signature,
      };
    }

    return sanitized;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Use the current state data directly since change handlers ensure string values
      const dataToSave = {
        banner: {
          backgroundImage: principalMessageData.banner.backgroundImage || "",
          title: principalMessageData.banner.title || "",
          breadcrumb: principalMessageData.banner.breadcrumb || "",
        },
        content: {
          greeting: principalMessageData.content.greeting || "",
          paragraphs: principalMessageData.content.paragraphs.map(
            (p) => p || ""
          ),
          signature: {
            closing: principalMessageData.content.signature.closing || "",
            title: principalMessageData.content.signature.title || "",
            school: principalMessageData.content.signature.school || "",
          },
        },
      };

      const response = await fetch(
        "http://localhost:4000/api/auth/cms/principal-message",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content: dataToSave }),
        }
      );
      if (response.ok) {
        toast.success("Principal Message updated successfully!");
      } else {
        toast.error("Failed to update Principal Message");
      }
    } catch (err) {
      toast.error("Error updating Principal Message");
    } finally {
      setLoading(false);
    }
  };

  // Update a direct field under a top-level section, e.g. ("banner","title", value)
  const handleNestedChange = (section, field, value) => {
    // Ensure value is always a string
    const stringValue = typeof value === "string" ? value : String(value || "");

    // Use functional state update to avoid stale closures and accidental object keys
    setPrincipalMessageData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: stringValue,
      },
    }));
  };

  const handleParagraphChange = (index, value) => {
    // Ensure value is always a string
    const stringValue = typeof value === "string" ? value : String(value || "");

    // Functional update + defensive guards
    setPrincipalMessageData((prev) => {
      const prevContent = prev && prev.content ? prev.content : {};
      const prevParagraphs = Array.isArray(prevContent.paragraphs)
        ? prevContent.paragraphs.slice()
        : [];

      prevParagraphs[index] = stringValue;

      return {
        ...prev,
        content: {
          ...prevContent,
          paragraphs: prevParagraphs,
        },
      };
    });
  };

  const handleSignatureChange = (field, value) => {
    // Ensure value is always a string
    const stringValue = typeof value === "string" ? value : String(value || "");

    // Use functional update and defensive checks in case stored data is corrupted
    setPrincipalMessageData((prev) => {
      const prevContent = prev && prev.content ? prev.content : {};
      const prevSignature =
        prevContent.signature &&
        typeof prevContent.signature === "object" &&
        !Array.isArray(prevContent.signature)
          ? prevContent.signature
          : { closing: "", title: "", school: "" };

      return {
        ...prev,
        content: {
          ...prevContent,
          signature: {
            ...prevSignature,
            [field]: stringValue,
          },
        },
      };
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Principal Message CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
            Edit principal message page content and information
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-3 md:px-4 py-2 md:py-2"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-4 md:space-y-8">
        {/* Banner Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-6 shadow-sm">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
            Banner Section
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Background Image URL
              </label>
              <Input
                value={principalMessageData.banner.backgroundImage || ""}
                onChange={(e) =>
                  handleNestedChange(
                    "banner",
                    "backgroundImage",
                    e.target.value
                  )
                }
                placeholder="/assets/hall.jpg"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Banner Title
              </label>
              <Input
                value={principalMessageData.banner.title || ""}
                onChange={(e) =>
                  handleNestedChange("banner", "title", e.target.value)
                }
                placeholder="Principal's Message"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Breadcrumb Text
              </label>
              <Input
                value={principalMessageData.banner.breadcrumb || ""}
                onChange={(e) =>
                  handleNestedChange("banner", "breadcrumb", e.target.value)
                }
                placeholder="Home › Principal's Message"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-6 shadow-sm">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
            Content Section
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Greeting
              </label>
              <Input
                value={principalMessageData.content.greeting || ""}
                onChange={(e) =>
                  handleNestedChange("content", "greeting", e.target.value)
                }
                placeholder="Dear ARA Community,"
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
              />
            </div>

            {/* Paragraphs */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-4">
                Content Paragraphs
              </label>
              <div className="space-y-2 md:space-y-4">
                {principalMessageData.content.paragraphs.map(
                  (paragraph, index) => (
                    <div
                      key={index}
                      className="p-2 md:p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                        Paragraph {index + 1}
                      </label>
                      <textarea
                        value={paragraph || ""}
                        onChange={(e) =>
                          handleParagraphChange(index, e.target.value)
                        }
                        placeholder={`Enter paragraph ${index + 1} content...`}
                        rows="4"
                        className="w-full px-2 md:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Signature */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-4">
                Signature Section
              </label>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    Closing
                  </label>
                  <Input
                    value={principalMessageData.content.signature.closing || ""}
                    onChange={(e) =>
                      handleSignatureChange("closing", e.target.value)
                    }
                    placeholder="Best regards,"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    Title
                  </label>
                  <Input
                    value={principalMessageData.content.signature.title || ""}
                    onChange={(e) =>
                      handleSignatureChange("title", e.target.value)
                    }
                    placeholder="School Principal"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    School Name
                  </label>
                  <Input
                    value={principalMessageData.content.signature.school || ""}
                    onChange={(e) =>
                      handleSignatureChange("school", e.target.value)
                    }
                    placeholder="Al-Rasheed Academy"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalMessageCMS;
