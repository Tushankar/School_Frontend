"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function GirlsFacultyCMS({ setSelected }) {
  const defaultMembers = [
    {
      name: "Razan Abdulgalil",
      role: "Admin Asst",
      avatar: "https://alt.tailus.io/images/team/member-one.webp",
      link: "mailto:rabdulgalil@alrasheedacademy.org",
    },
    {
      name: "Muna Abdulla",
      role: "Teacher",
      avatar: "https://alt.tailus.io/images/team/member-two.webp",
      link: "mailto:mabdulla@alrasheedacademy.org",
    },
    {
      name: "Yasmeen Fadel",
      role: "Religious Teacher",
      avatar: "https://alt.tailus.io/images/team/member-three.webp",
      link: "mailto:yasmeen_fadel@alrasheedacademy.org",
    },
    {
      name: "Loula Ali",
      role: "Religious Teacher",
      avatar: "https://alt.tailus.io/images/team/member-four.webp",
      link: "mailto:lali@alrasheedacademy.org",
    },
    {
      name: "Nora Mohamed",
      role: "Teacher",
      avatar: "https://alt.tailus.io/images/team/member-five.webp",
      link: "mailto:noramohamed@alrasheedacademy.org",
    },
    {
      name: "Hudda Al-Kalai",
      role: "4th & 5th Grade Teacher",
      avatar: "https://alt.tailus.io/images/team/member-one.webp",
      link: "mailto:halkalai@alrasheedacademy.org",
    },
    {
      name: "Kemah Freeman",
      role: "Social Studies Teacher",
      avatar: "https://alt.tailus.io/images/team/member-two.webp",
      link: "mailto:kfreeman@alrasheedacademy.org",
    },
    {
      name: "Aseel Fadhil",
      role: "Science Teacher",
      avatar: "https://alt.tailus.io/images/team/member-three.webp",
      link: "mailto:afadhil@alrasheedacademy.org",
    },
    {
      name: "Zayba Yasin",
      role: "Mathematics Teacher",
      avatar: "https://alt.tailus.io/images/team/member-four.webp",
      link: "mailto:zyasin@alrasheedacademy.org",
    },
    {
      name: "Fatima Mohamed",
      role: "Mathematics Teacher",
      avatar: "https://alt.tailus.io/images/team/member-five.webp",
      link: "mailto:ffaadel@alrasheedacademy.org",
    },
    {
      name: "Kawlah A Al-Kalai",
      role: "ELA Teacher",
      avatar: "https://alt.tailus.io/images/team/member-one.webp",
      link: "mailto:kalkalai@alrasheedacademy.org",
    },
    {
      name: "Amira Mohamed",
      role: "Health/Gym Teacher",
      avatar: "https://alt.tailus.io/images/team/member-two.webp",
      link: "mailto:amiramohamed@alrasheedacademy.org",
    },
    {
      name: "Asma Nashwan",
      role: "Teacher",
      avatar: "https://alt.tailus.io/images/team/member-three.webp",
      link: "mailto:anashwan@alrasheedacademy.org",
    },
    {
      name: "Raheq Abdulla",
      role: "Islamic Studies Teacher",
      avatar: "https://alt.tailus.io/images/team/member-four.webp",
      link: "mailto:Sali@alrasheedacademy.org",
    },
  ];

  const [data, setData] = useState({
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "Girls' Section Faculty",
      breadcrumb: "Home › Girls Faculty",
    },
    members: defaultMembers,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:4000/api/auth/cms/girls-faculty",
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const responseData = await res.json();
        console.log("Fetched Girls Faculty CMS data:", responseData);
        console.log("Members count:", responseData.members?.length || 0);

        // Update the entire data object at once
        const newData = {
          banner: {
            backgroundImage:
              responseData.banner?.backgroundImage || "/assets/hall.jpg",
            title: responseData.banner?.title || "Girls' Section Faculty",
            breadcrumb:
              responseData.banner?.breadcrumb || "Home › Girls Faculty",
          },
          members: Array.isArray(responseData.members)
            ? responseData.members
            : [],
        };

        console.log("Setting data with members:", newData.members);
        setData(newData);
      } else if (res.status === 404) {
        console.log("No Girls Faculty CMS found, using defaults");
      } else {
        console.error("Failed to fetch Girls Faculty CMS", res.status);
        toast.error("Failed to fetch Girls Faculty CMS");
      }
    } catch (err) {
      console.error("Error fetching Girls Faculty CMS", err);
      toast.error("Failed to fetch Girls Faculty CMS");
    } finally {
      setLoading(false);
    }
  };

  const updateMember = (index, field, value) => {
    setData((prev) => {
      const members = [...prev.members];
      members[index] = { ...members[index], [field]: value };
      return { ...prev, members };
    });
  };

  const addMember = () => {
    setData((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          name: "New Member",
          role: "Teacher",
          avatar: "https://alt.tailus.io/images/team/member-one.webp",
          link: "mailto:teacher@alrasheedacademy.org",
        },
      ],
    }));
  };

  const removeMember = (index) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const moveMemberUp = (index) => {
    if (index <= 0) return;
    setData((prev) => {
      const members = [...prev.members];
      [members[index - 1], members[index]] = [
        members[index],
        members[index - 1],
      ];
      return { ...prev, members };
    });
  };

  const moveMemberDown = (index) => {
    if (index >= data.members.length - 1) return;
    setData((prev) => {
      const members = [...prev.members];
      [members[index], members[index + 1]] = [
        members[index + 1],
        members[index],
      ];
      return { ...prev, members };
    });
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
        "http://localhost:4000/api/auth/cms/girls-faculty",
        {
          method: "PUT",
          headers,
          credentials: "include",
          body: JSON.stringify({ content: payload }),
        }
      );
      if (res.ok) {
        toast.success("Girls Faculty updated successfully!");
      } else {
        toast.error("Failed to update Girls Faculty");
      }
    } catch (err) {
      console.error("Error saving Girls Faculty", err);
      toast.error("Error saving Girls Faculty");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 md:py-8 text-gray-500 dark:text-gray-400 text-sm md:text-base">
        Loading members...
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Girls Faculty CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
            Edit girls section faculty page content and information
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
          <div className="text-center py-6 md:py-8 text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Loading members...
          </div>
        )}
        {!loading && (data.members || []).length === 0 && (
          <div className="text-center py-6 md:py-8 text-gray-500 dark:text-gray-400 text-sm md:text-base">
            No members added yet. Click "Add Member" to get started.
          </div>
        )}
        {(data.members || []).map((member, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-3 md:p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 md:mb-4">
              <h4 className="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">
                Member {idx + 1}
              </h4>
              <div className="flex gap-1 md:gap-2 flex-wrap">
                {idx > 0 && (
                  <Button
                    onClick={() => moveMemberUp(idx)}
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm"
                  >
                    ↑ Up
                  </Button>
                )}
                {idx < data.members.length - 1 && (
                  <Button
                    onClick={() => moveMemberDown(idx)}
                    variant="outline"
                    size="sm"
                    className="text-xs md:text-sm"
                  >
                    Down ↓
                  </Button>
                )}
                <Button
                  onClick={() => removeMember(idx)}
                  variant="destructive"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  Remove
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Name
                </label>
                <Input
                  value={member.name}
                  onChange={(e) => updateMember(idx, "name", e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Role
                </label>
                <Input
                  value={member.role}
                  onChange={(e) => updateMember(idx, "role", e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            <div className="mb-2 md:mb-4">
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Avatar URL
              </label>
              <Input
                value={member.avatar}
                onChange={(e) => updateMember(idx, "avatar", e.target.value)}
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Email Link (mailto:...)
              </label>
              <Input
                value={member.link}
                onChange={(e) => updateMember(idx, "link", e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
