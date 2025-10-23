import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Plus, Trash2, Edit, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";

const SupplyListCMS = () => {
  const [cmsData, setCmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const colorOptions = [
    { name: "pink", label: "Pink" },
    { name: "indigo", label: "Indigo" },
    { name: "green", label: "Green" },
    { name: "yellow", label: "Yellow" },
    { name: "purple", label: "Purple" },
    { name: "teal", label: "Teal" },
    { name: "red", label: "Red" },
    { name: "gray", label: "Gray" },
  ];

  useEffect(() => {
    fetchSupplyListData();
  }, []);

  const fetchSupplyListData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/supply-list"
      );
      if (response.ok) {
        const data = await response.json();
        setCmsData(data);
      } else {
        toast.error("Failed to fetch supply list data");
      }
    } catch (err) {
      console.error("Failed to fetch supply list data", err);
      toast.error("Failed to fetch supply list data");
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
        "https://alrasheedacademyserver.onrender.com/api/auth/cms/supply-list",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
          body: JSON.stringify(cmsData),
        }
      );
      if (response.ok) {
        toast.success("Supply list updated successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to update supply list");
      }
    } catch (err) {
      console.error("Error updating supply list", err);
      toast.error("Error updating supply list");
    } finally {
      setSaving(false);
    }
  };

  const updateGrade = (index, field, value) => {
    const updatedData = [...cmsData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setCmsData(updatedData);
  };

  const addGrade = () => {
    const newGrade = {
      grade: "New Grade",
      color: "gray",
      items: [],
    };
    setCmsData([...cmsData, newGrade]);
  };

  const removeGrade = (index) => {
    const updatedData = cmsData.filter((_, i) => i !== index);
    setCmsData(updatedData);
  };

  const addItem = (gradeIndex) => {
    const updatedData = [...cmsData];
    updatedData[gradeIndex].items.push("");
    setCmsData(updatedData);
    setEditingItem({
      gradeIndex,
      itemIndex: updatedData[gradeIndex].items.length - 1,
    });
  };

  const updateItem = (gradeIndex, itemIndex, value) => {
    const updatedData = [...cmsData];
    updatedData[gradeIndex].items[itemIndex] = value;
    setCmsData(updatedData);
  };

  const removeItem = (gradeIndex, itemIndex) => {
    const updatedData = [...cmsData];
    updatedData[gradeIndex].items = updatedData[gradeIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setCmsData(updatedData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading supply list data...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Supply List CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Edit school supply lists for all grades
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={addGrade}
            variant="outline"
            className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Grade
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {cmsData.map((gradeData, gradeIndex) => (
          <Card
            key={gradeIndex}
            className="border border-gray-200 dark:border-gray-800"
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Badge
                    variant="secondary"
                    className={`bg-${gradeData.color}-100 text-${gradeData.color}-800`}
                  >
                    {gradeData.color}
                  </Badge>
                  {editingGrade === gradeIndex ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                      <Input
                        value={gradeData.grade}
                        onChange={(e) =>
                          updateGrade(gradeIndex, "grade", e.target.value)
                        }
                        className="text-lg font-semibold w-full sm:w-48 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
                      <select
                        value={gradeData.color}
                        onChange={(e) =>
                          updateGrade(gradeIndex, "color", e.target.value)
                        }
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full sm:w-auto"
                      >
                        {colorOptions.map((color) => (
                          <option key={color.name} value={color.name}>
                            {color.label}
                          </option>
                        ))}
                      </select>
                      <Button
                        size="sm"
                        onClick={() => setEditingGrade(null)}
                        className="h-8 w-full sm:w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <CardTitle className="text-lg md:text-xl">
                        {gradeData.grade}
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingGrade(gradeIndex)}
                        className="h-8 w-full sm:w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeGrade(gradeIndex)}
                  className="h-8 w-full sm:w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm md:text-base">
                    Supply Items ({gradeData.items.length})
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addItem(gradeIndex)}
                    className="flex items-center gap-1 w-full sm:w-auto"
                  >
                    <Plus className="h-3 w-3" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {gradeData.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded"
                    >
                      {editingItem?.gradeIndex === gradeIndex &&
                      editingItem?.itemIndex === itemIndex ? (
                        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <Input
                            value={item}
                            onChange={(e) =>
                              updateItem(gradeIndex, itemIndex, e.target.value)
                            }
                            className="flex-1 w-full"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => setEditingItem(null)}
                            className="h-8 w-full sm:w-8 p-0"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                            {itemIndex + 1}. {item}
                          </span>
                          <div className="flex gap-1 w-full sm:w-auto">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setEditingItem({ gradeIndex, itemIndex })
                              }
                              className="h-8 w-8 p-0 flex-1 sm:flex-none"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem(gradeIndex, itemIndex)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 flex-1 sm:flex-none"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupplyListCMS;
