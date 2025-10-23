import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const TeamCMS = ({ setSelected }) => {
  const [teamData, setTeamData] = useState({
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "The Board Members",
      breadcrumb: "Home › Team",
    },
    members: [
      {
        name: "Taha Omar",
        role: "Chairman",
        avatar: "https://alt.tailus.io/images/team/member-one.webp",
        link: "#",
      },
      {
        name: "Shukry Elbaneh",
        role: "Treasurer",
        avatar: "https://alt.tailus.io/images/team/member-two.webp",
        link: "#",
      },
      {
        name: "Mohamed A. Mohamed",
        role: "Secretary",
        avatar: "https://alt.tailus.io/images/team/member-three.webp",
        link: "#",
      },
      {
        name: "Anwar Al-Kalai",
        role: "Board Advisor",
        avatar: "https://alt.tailus.io/images/team/member-four.webp",
        link: "#",
      },
      {
        name: "Fadl Faadel",
        role: "Fundraising Director",
        avatar: "https://alt.tailus.io/images/team/member-five.webp",
        link: "#",
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/cms/team", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        // Basic sanitize
        if (data.banner) {
          setTeamData((prev) => ({
            ...prev,
            banner: {
              backgroundImage:
                data.banner.backgroundImage || prev.banner.backgroundImage,
              title: data.banner.title || prev.banner.title,
              breadcrumb: data.banner.breadcrumb || prev.banner.breadcrumb,
            },
          }));
        }
        if (Array.isArray(data.members)) {
          setTeamData((prev) => ({ ...prev, members: data.members }));
        }
      } else if (res.status === 404) {
        console.log("No CMS data found for team, using defaults");
      } else {
        console.error("Failed to fetch team CMS", res.status);
      }
    } catch (err) {
      console.error("Error fetching team CMS", err);
      toast.error("Failed to fetch Team CMS");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToSave = {
        banner: {
          backgroundImage: teamData.banner.backgroundImage || "",
          title: teamData.banner.title || "",
          breadcrumb: teamData.banner.breadcrumb || "",
        },
        members: teamData.members.map((m) => ({
          name: m.name || "",
          role: m.role || "",
          avatar: m.avatar || "",
          link: m.link || "",
        })),
      };

      // Include Authorization header fallback in case auth cookie isn't sent
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = {
        "Content-Type": "application/json",
      };
      if (storedToken) headers.Authorization = `Bearer ${storedToken}`;

      const res = await fetch("http://localhost:4000/api/auth/cms/team", {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify({ content: dataToSave }),
      });
      if (res.ok) {
        toast.success("Team updated successfully!");
      } else {
        toast.error("Failed to update Team CMS");
      }
    } catch (err) {
      console.error("Error saving team CMS", err);
      toast.error("Error saving Team CMS");
    } finally {
      setLoading(false);
    }
  };

  const updateMember = (index, field, value) => {
    setTeamData((prev) => {
      const members = Array.isArray(prev.members) ? prev.members.slice() : [];
      members[index] = { ...(members[index] || {}), [field]: value };
      return { ...prev, members };
    });
  };

  const addMember = () => {
    setTeamData((prev) => ({
      ...prev,
      members: [...prev.members, { name: "", role: "", avatar: "", link: "" }],
    }));
  };

  const removeMember = (index) => {
    setTeamData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Team / Board Members CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-1">
            Edit the team board members section
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
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
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
              value={teamData.banner.backgroundImage}
              onChange={(e) =>
                setTeamData((prev) => ({
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
              value={teamData.banner.title}
              onChange={(e) =>
                setTeamData((prev) => ({
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
              value={teamData.banner.breadcrumb}
              onChange={(e) =>
                setTeamData((prev) => ({
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
        {teamData.members.map((member, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 md:mb-3">
              <h4 className="font-medium text-sm md:text-base">
                Member {idx + 1}
              </h4>
              <Button
                variant="outline"
                onClick={() => removeMember(idx)}
                className="text-xs md:text-sm w-full sm:w-auto"
              >
                Remove
              </Button>
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

export default TeamCMS;
