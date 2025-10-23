import React, { useEffect, useState } from "react";

const TeamSection = () => {
  const [data, setData] = useState({
    banner: {
      backgroundImage: "/assets/hall.jpg",
      title: "The Board Members",
      breadcrumb: "Home › Team",
    },
    members: [],
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://alrasheedacademyserver.onrender.com/api/auth/cms/team"
        );
        if (!mounted) return;
        if (res.ok) {
          const json = await res.json();
          setData((prev) => ({
            ...prev,
            banner: json.banner || prev.banner,
            members: Array.isArray(json.members) ? json.members : prev.members,
            loading: false,
          }));
        } else if (res.status === 404) {
          // use defaults already in state
          setData((prev) => ({ ...prev, loading: false }));
        } else {
          console.error("Failed to fetch team CMS", res.status);
          setData((prev) => ({ ...prev, loading: false }));
        }
      } catch (err) {
        console.error("Error fetching team CMS", err);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-16">
      <div
        className="h-56 rounded-lg bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${data.banner.backgroundImage})`,
        }}
      >
        <div className="bg-black/40 p-6 rounded">
          <h1 className="text-3xl font-semibold">{data.banner.title}</h1>
          <p className="text-sm mt-2">{data.banner.breadcrumb}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 px-4">
        {data.loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(data.members || []).map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-5 flex flex-col items-center text-center"
              >
                <img
                  src={m.avatar || "/assets/default-avatar.png"}
                  alt={m.name || "Member"}
                  className="w-28 h-28 rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.role}</p>
                {m.link && (
                  <a
                    href={m.link}
                    className="mt-3 text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Profile
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
