import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const BoysFacultyCMS = ({ setSelected }) => {
  // Initialize with default 13 members
  const [data, setData] = useState({
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "Boys' Section Faculty",
      breadcrumb: "Home › Boys Faculty",
    },
    members: [
      {
        name: "Abdullah M Mardaie",
        role: "Administrator",
        avatar: "https://alt.tailus.io/images/team/member-one.webp",
        link: "mailto:amardaie@alrasheedacademy.org",
      },
      {
        name: "Walid Al Salahi",
        role: "Quran Teacher",
        avatar: "https://alt.tailus.io/images/team/member-two.webp",
        link: "mailto:aibrahim@alrasheedacademy.org",
      },
      {
        name: "Abdo M Fadhel",
        role: "Islamic Studies Teacher",
        avatar: "https://alt.tailus.io/images/team/member-three.webp",
        link: "mailto:afadhel@alrasheedacademy.org",
      },
      {
        name: "Mohamed A Mohamed",
        role: "Arabic Teacher",
        avatar: "https://alt.tailus.io/images/team/member-four.webp",
        link: "mailto:mmohamed@alrasheedacademy.org",
      },
      {
        name: "Yousif Ahmed",
        role: "Religious Teacher",
        avatar: "https://alt.tailus.io/images/team/member-five.webp",
        link: "mailto:yousifahmed@alrasheedacademy.org",
      },
      {
        name: "Yousif Fadhel",
        role: "Religious Teacher",
        avatar: "https://alt.tailus.io/images/team/member-one.webp",
        link: "mailto:yfadhel@alrasheedacademy.org",
      },
      {
        name: "Mohamed Al-Kalai",
        role: "GYM & Health Teacher",
        avatar: "https://alt.tailus.io/images/team/member-two.webp",
        link: "mailto:maalkalai@alrasheedacademy.org",
      },
      {
        name: "Rathwan G Ali",
        role: "ELA Teacher",
        avatar: "https://alt.tailus.io/images/team/member-three.webp",
        link: "mailto:rali@alrasheedacademy.org",
      },
      {
        name: "Magdi Ahmed",
        role: "Social Studies Teacher",
        avatar: "https://alt.tailus.io/images/team/member-four.webp",
        link: "mailto:mahmed@alrasheedacademy.org",
      },
      {
        name: "Nieal Alwan",
        role: "Science Teacher",
        avatar: "https://alt.tailus.io/images/team/member-five.webp",
        link: "mailto:nalwan@alrasheedacademy.org",
      },
      {
        name: "Hisham khelly",
        role: "Mathematics Teacher",
        avatar: "https://alt.tailus.io/images/team/member-one.webp",
        link: "mailto:hkhelly@alrasheedacademy.org",
      },
      {
        name: "Ahmed Mohamed",
        role: "Health/Gym Teacher",
        avatar: "https://alt.tailus.io/images/team/member-two.webp",
        link: "mailto:amohamed@alrasheedacademy.org",
      },
      {
        name: "Mohammad A Rahman",
        role: "Support Staff",
        avatar: "https://alt.tailus.io/images/team/member-three.webp",
        link: "mailto:mrahman@alrasheedacademy.org",
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
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/boys-faculty",
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const responseData = await res.json();
        console.log("Fetched Boys Faculty CMS data:", responseData);
        console.log("Members count:", responseData.members?.length || 0);

        // Update the entire data object at once
        const newData = {
          banner: {
            backgroundImage:
              responseData.banner?.backgroundImage || "/assets/hall.jpg",
            title: responseData.banner?.title || "Boys' Section Faculty",
            breadcrumb:
              responseData.banner?.breadcrumb || "Home › Boys Faculty",
          },
          members: Array.isArray(responseData.members)
            ? responseData.members
            : [],
        };

        console.log("Setting data with members:", newData.members);
        setData(newData);
      } else if (res.status === 404) {
        console.log("No Boys Faculty CMS found, using defaults");
      } else {
        console.error("Failed to fetch Boys Faculty CMS", res.status);
        toast.error("Failed to fetch Boys Faculty CMS");
      }
    } catch (err) {
      console.error("Error fetching Boys Faculty CMS", err);
      toast.error("Failed to fetch Boys Faculty CMS");
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
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/boys-faculty",
        {
          method: "PUT",
          headers,
          credentials: "include",
          body: JSON.stringify({ content: payload }),
        }
      );
      if (res.ok) {
        toast.success("Boys Faculty updated successfully!");
      } else {
        toast.error("Failed to update Boys Faculty CMS");
      }
    } catch (err) {
      console.error("Error saving Boys Faculty CMS", err);
      toast.error("Error saving Boys Faculty CMS");
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
    if (!file) return null;
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = {};
      if (storedToken) headers.Authorization = `Bearer ${storedToken}`;

      const res = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/upload",
        {
          method: "POST",
          headers,
          credentials: "include",
          body: formData,
        }
      );

      if (res.ok) {
        const data = await res.json();
        toast.success("Image uploaded successfully!");
        return data.imageUrl;
      } else {
        toast.error("Failed to upload image");
        return null;
      }
    } catch (err) {
      console.error("Error uploading image", err);
      toast.error("Error uploading image");
      return null;
    } finally {
      setUploadLoading(false);
    }
  };

  const handleMemberImageUpload = async (file, index) => {
    if (!file) return;
    const imageUrl = await handleImageUpload(file);
    if (imageUrl) {
      updateMember(index, "avatar", imageUrl);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Boys Faculty CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
            Edit boys section faculty page content and information
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
              Background Image URL
            </label>
            <Input
              value={data.banner.backgroundImage}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  banner: { ...prev.banner, backgroundImage: e.target.value },
                }))
              }
              className="text-sm"
            />
            <div className="flex gap-2 mt-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = await handleImageUpload(file);
                    if (imageUrl) {
                      setData((prev) => ({
                        ...prev,
                        banner: { ...prev.banner, backgroundImage: imageUrl },
                      }));
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadLoading}
                className="text-xs md:text-sm"
              >
                {uploadLoading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
            {data.banner.backgroundImage && (
              <img
                src={
                  data.banner.backgroundImage.startsWith("/uploads/")
                    ? `https://alrasheedacademyserver.onrender.com${data.banner.backgroundImage}`
                    : data.banner.backgroundImage
                }
                alt="banner preview"
                className="mt-2 h-16 md:h-24 w-full object-cover rounded-md border"
              />
            )}
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
            Faculty Members ({(data.members || []).length})
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
                  Avatar URL
                </label>
                <Input
                  value={member.avatar}
                  onChange={(e) => updateMember(idx, "avatar", e.target.value)}
                  className="text-sm"
                />
                <div className="flex gap-2 mt-2">
                  <input
                    type="file"
                    ref={(el) => (memberFileInputRefs.current[idx] = el)}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleMemberImageUpload(file, idx);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => memberFileInputRefs.current[idx]?.click()}
                    disabled={uploadLoading}
                    className="text-xs md:text-sm"
                  >
                    {uploadLoading ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>
                {member.avatar && (
                  <img
                    src={
                      member.avatar.startsWith("/uploads/")
                        ? `https://alrasheedacademyserver.onrender.com${member.avatar}`
                        : member.avatar
                    }
                    alt="avatar preview"
                    className="mt-2 h-16 md:h-24 w-16 md:w-24 object-cover rounded-md border"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email/Link
                </label>
                <Input
                  value={member.link}
                  onChange={(e) => updateMember(idx, "link", e.target.value)}
                  placeholder="mailto:email@example.com"
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

export default BoysFacultyCMS;
