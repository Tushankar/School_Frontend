import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

const FooterCMS = ({ setSelected }) => {
  const [footerData, setFooterData] = useState({
    company: {
      name: "",
      description: "",
      logo: "",
    },
    socialLinks: [],
    aboutLinks: [],
    serviceLinks: [],
    helpfulLinks: [],
    contactInfo: [],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/footer",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFooterData(data);
      } else {
        toast.error("Failed to fetch footer data");
      }
    } catch (err) {
      console.error("Failed to fetch footer data", err);
      toast.error("Failed to fetch footer data");
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
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/footer",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ content: footerData }),
        }
      );
      if (response.ok) {
        toast.success("Footer updated successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to update footer");
      }
    } catch (err) {
      console.error("Error updating footer", err);
      toast.error("Error updating footer");
    } finally {
      setSaving(false);
    }
  };

  const updateCompanyInfo = (field, value) => {
    setFooterData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const updateSocialLink = (index, field, value) => {
    const updated = [...footerData.socialLinks];
    updated[index][field] = value;
    setFooterData((prev) => ({ ...prev, socialLinks: updated }));
  };

  const addSocialLink = () => {
    setFooterData((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { label: "", href: "", icon: "Facebook" },
      ],
    }));
  };

  const removeSocialLink = (index) => {
    setFooterData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const updateAboutLink = (index, field, value) => {
    const updated = [...footerData.aboutLinks];
    updated[index][field] = value;
    setFooterData((prev) => ({ ...prev, aboutLinks: updated }));
  };

  const addAboutLink = () => {
    setFooterData((prev) => ({
      ...prev,
      aboutLinks: [...prev.aboutLinks, { text: "", href: "" }],
    }));
  };

  const removeAboutLink = (index) => {
    setFooterData((prev) => ({
      ...prev,
      aboutLinks: prev.aboutLinks.filter((_, i) => i !== index),
    }));
  };

  const updateServiceLink = (index, field, value) => {
    const updated = [...footerData.serviceLinks];
    updated[index][field] = value;
    setFooterData((prev) => ({ ...prev, serviceLinks: updated }));
  };

  const addServiceLink = () => {
    setFooterData((prev) => ({
      ...prev,
      serviceLinks: [...prev.serviceLinks, { text: "", href: "" }],
    }));
  };

  const removeServiceLink = (index) => {
    setFooterData((prev) => ({
      ...prev,
      serviceLinks: prev.serviceLinks.filter((_, i) => i !== index),
    }));
  };

  const updateHelpfulLink = (index, field, value) => {
    const updated = [...footerData.helpfulLinks];
    updated[index][field] = value;
    setFooterData((prev) => ({ ...prev, helpfulLinks: updated }));
  };

  const addHelpfulLink = () => {
    setFooterData((prev) => ({
      ...prev,
      helpfulLinks: [
        ...prev.helpfulLinks,
        { text: "", href: "", hasIndicator: false },
      ],
    }));
  };

  const removeHelpfulLink = (index) => {
    setFooterData((prev) => ({
      ...prev,
      helpfulLinks: prev.helpfulLinks.filter((_, i) => i !== index),
    }));
  };

  const updateContactInfo = (index, field, value) => {
    const updated = [...footerData.contactInfo];
    updated[index][field] = value;
    setFooterData((prev) => ({ ...prev, contactInfo: updated }));
  };

  const addContactInfo = () => {
    setFooterData((prev) => ({
      ...prev,
      contactInfo: [
        ...prev.contactInfo,
        { text: "", icon: "Mail", isAddress: false },
      ],
    }));
  };

  const removeContactInfo = (index) => {
    setFooterData((prev) => ({
      ...prev,
      contactInfo: prev.contactInfo.filter((_, i) => i !== index),
    }));
  };

  const iconOptions = [
    "Facebook",
    "Instagram",
    "Twitter",
    "Github",
    "Dribbble",
    "Mail",
    "Phone",
    "MapPin",
    "Home",
    "User",
    "Settings",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading footer data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Footer CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage footer content and links
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={fetchFooterData} variant="outline" className="w-full sm:w-auto">
            Refresh
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Company Information */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <Input
              value={footerData.company.name}
              onChange={(e) => updateCompanyInfo("name", e.target.value)}
              placeholder="Company name"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <Input
              value={footerData.company.logo}
              onChange={(e) => updateCompanyInfo("logo", e.target.value)}
              placeholder="Logo image URL"
              className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Description
          </label>
          <Textarea
            value={footerData.company.description}
            onChange={(e) => updateCompanyInfo("description", e.target.value)}
            placeholder="Company description"
            rows={3}
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
            Social Links
          </h3>
          <Button onClick={addSocialLink} variant="outline" size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
        <div className="space-y-3">
          {footerData.socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex gap-3 items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <Input
                  value={link.label}
                  onChange={(e) =>
                    updateSocialLink(index, "label", e.target.value)
                  }
                  placeholder="Label (e.g., Facebook)"
                  className="mb-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                <Input
                  value={link.href}
                  onChange={(e) =>
                    updateSocialLink(index, "href", e.target.value)
                  }
                  placeholder="URL (e.g., https://facebook.com/...)"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <select
                value={link.icon}
                onChange={(e) =>
                  updateSocialLink(index, "icon", e.target.value)
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {iconOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <Button
                onClick={() => removeSocialLink(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* About Links */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
            About Links
          </h3>
          <Button onClick={addAboutLink} variant="outline" size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
        <div className="space-y-3">
          {footerData.aboutLinks.map((link, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                value={link.text}
                onChange={(e) => updateAboutLink(index, "text", e.target.value)}
                placeholder="Link text"
                className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                value={link.href}
                onChange={(e) => updateAboutLink(index, "href", e.target.value)}
                placeholder="URL"
                className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Button
                onClick={() => removeAboutLink(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Links */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
            Academics Links
          </h3>
          <Button onClick={addServiceLink} variant="outline" size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
        <div className="space-y-3">
          {footerData.serviceLinks.map((link, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                value={link.text}
                onChange={(e) =>
                  updateServiceLink(index, "text", e.target.value)
                }
                placeholder="Link text"
                className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                value={link.href}
                onChange={(e) =>
                  updateServiceLink(index, "href", e.target.value)
                }
                placeholder="URL"
                className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Button
                onClick={() => removeServiceLink(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Links */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
            Helpful Links
          </h3>
          <Button onClick={addHelpfulLink} variant="outline" size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
        <div className="space-y-3">
          {footerData.helpfulLinks.map((link, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                value={link.text}
                onChange={(e) =>
                  updateHelpfulLink(index, "text", e.target.value)
                }
                placeholder="Link text"
                className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                value={link.href}
                onChange={(e) =>
                  updateHelpfulLink(index, "href", e.target.value)
                }
                placeholder="URL"
                className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={link.hasIndicator}
                  onChange={(e) =>
                    updateHelpfulLink(index, "hasIndicator", e.target.checked)
                  }
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Has indicator
                </span>
              </label>
              <Button
                onClick={() => removeHelpfulLink(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
            Contact Information
          </h3>
          <Button onClick={addContactInfo} variant="outline" size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Info
          </Button>
        </div>
        <div className="space-y-3">
          {footerData.contactInfo.map((info, index) => (
            <div
              key={index}
              className="flex gap-3 items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <Input
                  value={info.text}
                  onChange={(e) =>
                    updateContactInfo(index, "text", e.target.value)
                  }
                  placeholder="Contact information"
                  className="mb-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <select
                value={info.icon}
                onChange={(e) =>
                  updateContactInfo(index, "icon", e.target.value)
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {iconOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={info.isAddress}
                  onChange={(e) =>
                    updateContactInfo(index, "isAddress", e.target.checked)
                  }
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Is address
                </span>
              </label>
              <Button
                onClick={() => removeContactInfo(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterCMS;
