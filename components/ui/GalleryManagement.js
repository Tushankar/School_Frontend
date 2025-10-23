"use client";
import React, { useState, useEffect } from "react";
import { Image, Upload, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
        `http://localhost:4000/api/gallery?category=All`
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
    if (!newImage.title || (!newImage.file && !newImage.url)) {
      toast.error("Missing Information", {
        description:
          "Please provide a title and either select a file or enter an image URL.",
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", newImage.title);
      formData.append("category", newImage.category);

      if (newImage.file) {
        formData.append("image", newImage.file);
      } else if (newImage.url) {
        // For URL uploads, we'll need to fetch the image and upload as file
        try {
          // Validate URL format
          const url = new URL(newImage.url);

          // Fetch image with timeout and proper error handling
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

          const imageResponse = await fetch(newImage.url, {
            signal: controller.signal,
            mode: "cors",
            cache: "no-cache",
          });

          clearTimeout(timeoutId);

          if (!imageResponse.ok) {
            throw new Error(
              `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`
            );
          }

          const blob = await imageResponse.blob();

          // Check if it's actually an image
          if (!blob.type.startsWith("image/")) {
            throw new Error("The URL does not point to a valid image file");
          }

          const file = new File([blob], `image-${Date.now()}.jpg`, {
            type: blob.type,
          });
          formData.append("image", file);
        } catch (urlError) {
          if (urlError.name === "AbortError") {
            toast.error("Request Timeout", {
              description:
                "Image fetch timed out. Please try a different URL or upload the file directly.",
            });
          } else if (urlError.message.includes("Failed to fetch")) {
            toast.error("CORS Restriction", {
              description:
                "Cannot access the image URL. This may be due to CORS restrictions. Please download the image and upload it directly instead.",
            });
          } else {
            toast.error("URL Fetch Error", {
              description: `Error fetching image from URL: ${urlError.message}`,
            });
          }
          setUploading(false);
          return;
        }
      }

      const response = await fetch("http://localhost:4000/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

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
        toast.success("Success!", {
          description: "Image uploaded successfully!",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error("Upload Failed", {
          description: errorData.message || response.statusText,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Upload Error", {
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setImages(images.filter((img) => img._id !== id));
        toast.success("Deleted", {
          description: "Image deleted successfully!",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error("Delete Failed", {
          description: errorData.message || "Failed to delete image",
        });
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Delete Error", {
        description: "An error occurred while deleting the image",
      });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Gallery Management
            </h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Upload and organize gallery images
            </p>
          </div>
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-xs md:text-base"
          >
            <Upload className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
            Upload Image
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-all duration-200 ${
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
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="group relative bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="aspect-square relative">
                <img
                  src={`http://localhost:4000${image.imageUrl}`}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/400x400/334155/e2e8f0?text=Image";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-1 md:gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20 h-8 w-8 md:h-9 md:w-9 p-0"
                    >
                      <Edit className="h-3 md:h-4 w-3 md:w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-red-500/20 h-8 w-8 md:h-9 md:w-9 p-0"
                      onClick={() => handleDeleteImage(image._id)}
                    >
                      <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-2 md:p-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate text-xs md:text-sm">
                  {image.title}
                </h3>
                <div className="flex items-center justify-between mt-1 md:mt-2 gap-1">
                  <span className="text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full truncate">
                    {image.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {image.uploadedAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <Image className="h-8 md:h-12 w-8 md:w-12 text-gray-400 mx-auto mb-2 md:mb-4" />
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              No images found in{" "}
              {selectedCategory === "All" ? "gallery" : selectedCategory}
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-3 md:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 w-full max-w-md shadow-xl backdrop-blur-sm max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 md:mb-6 gap-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upload Image
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Image Title
                </label>
                <Input
                  value={newImage.title}
                  onChange={(e) =>
                    setNewImage({ ...newImage, title: e.target.value })
                  }
                  placeholder="Enter image title"
                  className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-xs md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Category
                </label>
                <select
                  value={newImage.category}
                  onChange={(e) =>
                    setNewImage({ ...newImage, category: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-xs md:text-base"
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
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                  Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 file:mr-2 md:file:mr-4 file:py-1 md:file:py-2 file:px-2 md:file:px-4 file:rounded-full file:border-0 file:text-xs md:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
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
                  className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-xs md:text-base"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1">
                  Note: Some URLs may not work due to CORS restrictions. If URL
                  upload fails, please download the image and upload the file
                  directly.
                </p>
              </div>

              {newImage.previewUrl && (
                <div className="mt-3 md:mt-4">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    Preview
                  </label>
                  <img
                    src={newImage.previewUrl}
                    alt="Preview"
                    className="w-full h-24 md:h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/400x200/334155/e2e8f0?text=Invalid+URL";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
              <Button
                onClick={handleAddImage}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs md:text-base"
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
                className="flex-1 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs md:text-base"
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
