import React from "react";

export default function CharacterCards() {
  const cards = [
    {
      title: "Character",
      description:
        "Character development, a fundamental aspect of ARA's vision, is consciously refined through deliberate actions and activities within and beyond the classroom. This dedication is seamlessly integrated into our daily academic curriculum, aiming to impart not only subject matter expertise but also instill the virtues of honesty, compassion, and perseverance.",
    },
    {
      title: "Compassion",
      description:
        "Compassion development, a fundamental aspect of ARA's vision, is consciously refined through deliberate actions and activities within and beyond the classroom. This dedication is seamlessly integrated into our daily academic curriculum, aiming to impart not only subject matter expertise but also instill the virtues of empathy, kindness, and understanding. ",
    },
    {
      title: "Community",
      description:
        "Emphasizing the community as an interdependent member encapsulates ARA's initiative to foster educational excellence and meaningful faith within a diverse and caring environment. aiming to impart not only subject matter expertise but also instill the virtues of empathy, kindness, and understanding as independent members of a larger community.",
    },
  ];

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              Our Core Values
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Building character, compassion, and community at ARA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bgblue">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
