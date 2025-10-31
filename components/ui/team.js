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

  const [refreshing, setRefreshing] = useState(false);

  const getFullImageUrl = (imageUrl) => {
    if (imageUrl && imageUrl.startsWith("/uploads/")) {
      return `https://alrasheedacademyserver.onrender.com${imageUrl}`;
    }
    return imageUrl;
  };

  const fetchData = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const res = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/team"
      );
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
    } finally {
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let intervalId;

    // Initial fetch
    fetchData();

    // Poll for updates every 30 seconds
    intervalId = setInterval(() => fetchData(), 30000);

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleRefresh = () => {
    fetchData(true);
  };

  return (
    <section className="py-16">
      {/* Refresh Button */}
      <div className="max-w-6xl mx-auto px-4 mb-4 flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2"
        >
          {refreshing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Refreshing...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </>
          )}
        </button>
      </div>

      <div
        className="h-56 rounded-lg bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${getFullImageUrl(
            data.banner.backgroundImage
          )})`,
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
                  src={
                    getFullImageUrl(m.avatar) || "/assets/default-avatar.png"
                  }
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
