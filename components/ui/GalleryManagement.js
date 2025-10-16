"use client";
import React, { useState, useEffect } from "react";
import { Image, Upload, Edit, Trash2 } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";

const GalleryManagement = ({ setSelected }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newImage, setNewImage] = useState({
    title: "",
    category: "Events",
    file: null,
    url: "",
    previewUrl: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Art", "Events", "Science Fair"];

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://alrasheedacademyserver.onrender.com/api/gallery?category=All`
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewImage({ ...newImage, file, previewUrl, url: "" });
    }
  };

  const handleAddImage = async () => {
    if (!newImage.title || (!newImage.file && !newImage.url)) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", newImage.title);
      formData.append("category", newImage.category);

      if (newImage.file) {
        formData.append("image", newImage.file);
      } else if (newImage.url) {
        // For URL uploads, we'll need to fetch the image and upload as file
        const response = await fetch(newImage.url);
        const blob = await response.blob();
        const file = new File([blob], `image-${Date.now()}.jpg`, {
          type: blob.type,
        });
        formData.append("image", file);
      }

      const response = await fetch(
        "https://alrasheedacademyserver.onrender.com/api/gallery/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setImages([result.image, ...images]);
        setNewImage({
          title: "",
          category: "Events",
          file: null,
          url: "",
          previewUrl: "",
        });
        setShowUploadModal(false);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await fetch(
        `https://alrasheedacademyserver.onrender.com/api/gallery/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setImages(images.filter((img) => img._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Gallery Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Upload and organize gallery images
            </p>
          </div>
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="group relative bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="aspect-square relative">
                <img
                  src={`https://alrasheedacademyserver.onrender.com${image.imageUrl}`}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/400x400/334155/e2e8f0?text=Image";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-red-500/20"
                      onClick={() => handleDeleteImage(image._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {image.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                    {image.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {image.uploadedAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No images found in{" "}
              {selectedCategory === "All" ? "gallery" : selectedCategory}
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 w-full max-w-md shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upload Image
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image Title
                </label>
                <Input
                  value={newImage.title}
                  onChange={(e) =>
                    setNewImage({ ...newImage, title: e.target.value })
                  }
                  placeholder="Enter image title"
                  className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newImage.category}
                  onChange={(e) =>
                    setNewImage({ ...newImage, category: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or Image URL
                </label>
                <Input
                  value={newImage.url}
                  onChange={(e) =>
                    setNewImage({
                      ...newImage,
                      url: e.target.value,
                      file: null,
                      previewUrl: e.target.value,
                    })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              {newImage.previewUrl && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview
                  </label>
                  <img
                    src={newImage.previewUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/400x200/334155/e2e8f0?text=Invalid+URL";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAddImage}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={
                  !newImage.title ||
                  (!newImage.file && !newImage.url) ||
                  uploading
                }
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(false)}
                className="flex-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
