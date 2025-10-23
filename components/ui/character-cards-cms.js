import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Input } from "./input";
import { getToken } from "../../lib/auth";
import { Plus, Trash2, Eye } from "lucide-react";

const CharacterCardsCMS = ({ setSelected }) => {
  const [characterCardsData, setCharacterCardsData] = useState({
    mainTitle: "Our Core Values",
    subtitle: "Building character, compassion, and community at ARA",
    cards: [
      {
        id: "character",
        title: "Character",
        description:
          "Character development, a fundamental aspect of ARA's vision, is consciously refined through deliberate actions and activities within and beyond the classroom. This dedication is seamlessly integrated into our daily academic curriculum, aiming to impart not only subject matter expertise but also instill the virtues of honesty, compassion, and perseverance.",
      },
      {
        id: "compassion",
        title: "Compassion",
        description:
          "Compassion development, a fundamental aspect of ARA's vision, is consciously refined through deliberate actions and activities within and beyond the classroom. This dedication is seamlessly integrated into our daily academic curriculum, aiming to impart not only subject matter expertise but also instill the virtues of empathy, kindness, and understanding.",
      },
      {
        id: "community",
        title: "Community",
        description:
          "Emphasizing the community as an interdependent member encapsulates ARA's initiative to foster educational excellence and meaningful faith within a diverse and caring environment. aiming to impart not only subject matter expertise but also instill the virtues of empathy, kindness, and understanding as independent members of a larger community.",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCharacterCardsData();
  }, []);

  const fetchCharacterCardsData = async () => {
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/character-cards",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCharacterCardsData(data);
      } else {
        console.log("Using default character cards data");
      }
    } catch (error) {
      console.error("Error fetching character cards data:", error);
      toast.error("Failed to load character cards data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("You must be logged in to save changes");
        setSaving(false);
        return;
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/character-cards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(characterCardsData),
        }
      );

      if (response.ok) {
        toast.success("Character cards content updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save");
      }
    } catch (error) {
      console.error("Error saving character cards data:", error);
      toast.error(error.message || "Failed to save character cards content");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCharacterCardsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...characterCardsData.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setCharacterCardsData((prev) => ({
      ...prev,
      cards: newCards,
    }));
  };

  const handleAddCard = () => {
    setCharacterCardsData((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          id: `card-${Date.now()}`,
          title: "",
          description: "",
        },
      ],
    }));
  };

  const handleRemoveCard = (index) => {
    setCharacterCardsData((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading character cards content...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Character Cards CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage the character cards section content
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Title and Settings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Section Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Main Title
                </label>
                <Input
                  type="text"
                  value={characterCardsData.mainTitle}
                  onChange={(e) =>
                    handleInputChange("mainTitle", e.target.value)
                  }
                  placeholder="Enter main title"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subtitle
                </label>
                <Input
                  type="text"
                  value={characterCardsData.subtitle}
                  onChange={(e) =>
                    handleInputChange("subtitle", e.target.value)
                  }
                  placeholder="Enter subtitle"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Cards Management */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Card Management
              </h3>
              <Button
                onClick={handleAddCard}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Card
              </Button>
            </div>
            <div className="space-y-4">
              {characterCardsData.cards.map((card, index) => (
                <div
                  key={card.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Card {index + 1}
                    </h4>
                    <Button
                      onClick={() => handleRemoveCard(index)}
                      disabled={characterCardsData.cards.length <= 1}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Title
                      </label>
                      <Input
                        type="text"
                        value={card.title}
                        onChange={(e) =>
                          handleCardChange(index, "title", e.target.value)
                        }
                        placeholder="Enter card title"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Description
                      </label>
                      <textarea
                        value={card.description}
                        onChange={(e) =>
                          handleCardChange(index, "description", e.target.value)
                        }
                        placeholder="Enter card description"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-vertical"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Preview Section */}
      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900">
            Full Preview (Light Mode)
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            How the character cards section will appear on your homepage
          </p>
        </div>

        {/* Character Cards Preview */}
        <div className="p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                  {characterCardsData.mainTitle}
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                {characterCardsData.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {characterCardsData.cards.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold mb-2 text-white">
                      <span className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                        {card.title}
                      </span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 mx-auto rounded-full"></div>
                  </div>
                  <p className="text-white leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardsCMS;
