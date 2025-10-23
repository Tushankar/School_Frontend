import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CharacterCards() {
  const [characterCardsData, setCharacterCardsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacterCardsData();
  }, []);

  const fetchCharacterCardsData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/character-cards"
      );
      if (response.ok) {
        const data = await response.json();
        setCharacterCardsData(data);
      } else {
        console.error("Failed to fetch character cards data");
      }
    } catch (error) {
      console.error("Error fetching character cards data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="bgblue">
                  <div className="card">
                    <div className="text-center mb-4">
                      <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
                      <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!characterCardsData) {
    return (
      <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Failed to load character cards data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              {characterCardsData.mainTitle || "Our Core Values"}
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            {characterCardsData.subtitle ||
              "Building character, compassion, and community at ARA"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characterCardsData.cards &&
            characterCardsData.cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index === 0 ? -200 : index === 1 ? 0 : 200,
                  y: index === 1 ? 100 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 1,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.2,
                }}
                className="bgblue"
              >
                <div className="card">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                        {card.title}
                      </span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 mx-auto rounded-full"></div>
                  </div>
                  <p className="text-gray-200 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
