import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const AdministrationCMS = ({ setSelected }) => {
  // Initialize with default 3 members to show them immediately
  const [data, setData] = useState({
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "General Administration",
      breadcrumb: "Home › Administration",
    },
    members: [
      {
        name: "Anwar Al-Kalai",
        role: "School Principal",
        avatar:
          "https://www.alrasheedacademy.org/Admin/images/26a478f08fa3204098346fcbcdbfc2831758763720jpeg",
        link: "#",
      },
      {
        name: "Ahmed Nada",
        role: "Academic Director",
        avatar:
          "https://www.alrasheedacademy.org/Admin/images/289648f191687d568b74a00ccd76f3771758763603.png",
        link: "#",
      },
      {
        name: "Abdullah Mardaie",
        role: "Office Manager",
        avatar: "https://alt.tailus.io/images/team/member-three.webp",
        link: "#",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef(null);
  const memberFileInputRefs = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/administration",
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const responseData = await res.json();
        console.log("Fetched administration CMS data:", responseData);
        console.log("Members count:", responseData.members?.length || 0);

        // Update the entire data object at once
        const newData = {
          banner: {
            backgroundImage:
              responseData.banner?.backgroundImage || "/assets/hall.jpg",
            title: responseData.banner?.title || "General Administration",
            breadcrumb:
              responseData.banner?.breadcrumb || "Home › Administration",
          },
          members: Array.isArray(responseData.members)
            ? responseData.members
            : [],
        };

        console.log("Setting data with members:", newData.members);
        setData(newData);
      } else if (res.status === 404) {
        console.log("No administration CMS found, using defaults");
      } else {
        console.error("Failed to fetch administration CMS", res.status);
        toast.error("Failed to fetch Administration CMS");
      }
    } catch (err) {
      console.error("Error fetching administration CMS", err);
      toast.error("Failed to fetch Administration CMS");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        banner: {
          backgroundImage: data.banner.backgroundImage || "",
          title: data.banner.title || "",
          breadcrumb: data.banner.breadcrumb || "",
        },
        members: data.members.map((m) => ({
          name: m.name || "",
          role: m.role || "",
          avatar: m.avatar || "",
          link: m.link || "",
        })),
      };

      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = { "Content-Type": "application/json" };
      if (storedToken) headers.Authorization = `Bearer ${storedToken}`;

      const res = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/administration",
        {
          method: "PUT",
          headers,
          credentials: "include",
          body: JSON.stringify({ content: payload }),
        }
      );
      if (res.ok) {
        toast.success("Administration updated successfully!");
      } else {
        toast.error("Failed to update Administration CMS");
      }
    } catch (err) {
      console.error("Error saving administration CMS", err);
      toast.error("Error saving Administration CMS");
    } finally {
      setSaving(false);
    }
  };

  const updateMember = (index, field, value) => {
    setData((prev) => {
      const members = Array.isArray(prev.members) ? prev.members.slice() : [];
      members[index] = { ...(members[index] || {}), [field]: value };
      return { ...prev, members };
    });
  };

  const addMember = () =>
    setData((prev) => ({
      ...prev,
      members: [
        ...(prev.members || []),
        { name: "", role: "", avatar: "", link: "" },
      ],
    }));
  const removeMember = (index) =>
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));

  const moveMemberUp = (index) => {
    if (index <= 0) return;
    setData((prev) => {
      const members = prev.members ? [...prev.members] : [];
      const item = members.splice(index, 1)[0];
      members.splice(index - 1, 0, item);
      return { ...prev, members };
    });
  };

  const moveMemberDown = (index) => {
    setData((prev) => {
      const members = prev.members ? [...prev.members] : [];
      if (index >= members.length - 1) return prev;
      const item = members.splice(index, 1)[0];
      members.splice(index + 1, 0, item);
      return { ...prev, members };
    });
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/upload-image",
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined" ? localStorage.getItem("token") : ""
            }`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData((prev) => ({
          ...prev,
          banner: { ...prev.banner, backgroundImage: data.imageUrl },
        }));
        toast.success("Image uploaded successfully!");
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to upload image");
        // Revert to previous value on error
        setData((prev) => prev); // Keep current value
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image");
      // Revert to previous value on error
      setData((prev) => prev); // Keep current value
    } finally {
      setUploadLoading(false);
    }
  };

  const handleMemberImageUpload = async (file, memberIndex) => {
    if (!file) return;

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/upload-image",
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined" ? localStorage.getItem("token") : ""
            }`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        updateMember(memberIndex, "avatar", data.imageUrl);
        toast.success("Member image uploaded successfully!");
        // Clear the file input
        if (memberFileInputRefs.current[memberIndex]) {
          memberFileInputRefs.current[memberIndex].value = "";
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to upload member image");
      }
    } catch (error) {
      console.error("Member upload error:", error);
      toast.error("Error uploading member image");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Administration CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
            Edit administration page content and information
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
          <Button
            onClick={addMember}
            variant="outline"
            className="text-xs md:text-sm w-full sm:w-auto"
          >
            Add Member
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm w-full sm:w-auto"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-6 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
          Banner
        </h3>
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Background Image
            </label>
            <div className="space-y-2">
              <Input
                value={data.banner.backgroundImage}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    banner: { ...prev.banner, backgroundImage: e.target.value },
                  }))
                }
                placeholder="/assets/hall.jpg or https://example.com/image.jpg"
                className="text-sm"
              />
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                  className="hidden"
                  id="banner-image-upload"
                />
                <label
                  htmlFor="banner-image-upload"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm transition-colors"
                >
                  {uploadLoading ? "Uploading..." : "Upload Image"}
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  or enter URL above
                </span>
              </div>
              {data.banner.backgroundImage && (
                <div className="mt-2">
                  <img
                    src={
                      data.banner.backgroundImage.startsWith("/uploads/")
                        ? `https://alrasheedacademyserver.onrender.com${data.banner.backgroundImage}`
                        : data.banner.backgroundImage
                    }
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Title
            </label>
            <Input
              value={data.banner.title}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  banner: { ...prev.banner, title: e.target.value },
                }))
              }
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Breadcrumb
            </label>
            <Input
              value={data.banner.breadcrumb}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  banner: { ...prev.banner, breadcrumb: e.target.value },
                }))
              }
              className="text-sm"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 md:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 md:gap-2">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
            Board Members ({(data.members || []).length})
          </h3>
        </div>
        {loading && (
          <div className="text-center py-6 md:py-8 text-gray-500 text-sm md:text-base">
            Loading members...
          </div>
        )}
        {!loading && (data.members || []).length === 0 && (
          <div className="text-center py-6 md:py-8 text-gray-500 text-sm md:text-base">
            No members added yet. Click "Add Member" to get started.
          </div>
        )}
        {(data.members || []).map((member, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 md:mb-3">
              <h4 className="font-medium text-sm md:text-base">
                Member {idx + 1}
              </h4>
              <div className="flex items-center gap-1 md:gap-2">
                <Button
                  variant="ghost"
                  onClick={() => moveMemberUp(idx)}
                  title="Move up"
                  className="text-xs md:text-sm p-1 md:p-2"
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => moveMemberDown(idx)}
                  title="Move down"
                  className="text-xs md:text-sm p-1 md:p-2"
                >
                  ↓
                </Button>
                <Button
                  variant="outline"
                  onClick={() => removeMember(idx)}
                  className="text-xs md:text-sm w-full sm:w-auto"
                >
                  Remove
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  value={member.name}
                  onChange={(e) => updateMember(idx, "name", e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <Input
                  value={member.role}
                  onChange={(e) => updateMember(idx, "role", e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Avatar
                </label>
                <div className="space-y-2">
                  <Input
                    value={member.avatar}
                    onChange={(e) =>
                      updateMember(idx, "avatar", e.target.value)
                    }
                    placeholder="https://example.com/avatar.jpg"
                    className="text-sm"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      ref={(el) => (memberFileInputRefs.current[idx] = el)}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleMemberImageUpload(file, idx);
                        }
                      }}
                      className="hidden"
                      id={`member-avatar-upload-${idx}`}
                    />
                    <label
                      htmlFor={`member-avatar-upload-${idx}`}
                      className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm transition-colors"
                    >
                      {uploadLoading ? "Uploading..." : "Upload Avatar"}
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      or enter URL above
                    </span>
                  </div>
                  {member.avatar && (
                    <div className="mt-2">
                      <img
                        src={
                          member.avatar.startsWith("/uploads/")
                            ? `https://alrasheedacademyserver.onrender.com${member.avatar}`
                            : member.avatar
                        }
                        alt={`${member.name || "Member"} avatar preview`}
                        className="w-16 h-16 object-cover rounded-full border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profile Link
                </label>
                <Input
                  value={member.link}
                  onChange={(e) => updateMember(idx, "link", e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdministrationCMS;
