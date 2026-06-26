import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ImagePlus,
  Video,
  Trash2,
  Edit,
  RefreshCw,
  Save,
  X,
  Plus,
  Eye,
  EyeOff,
  PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const emptyForm = {
  title: "",
  category: "DJ Performance",
  mediaType: "Photo",
  imageData: "",
  videoUrl: "",
  description: "",
  status: "Active",
};

function ManageGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to load gallery items");
        return;
      }

      setGalleryItems(data.galleryItems || []);
    } catch (error) {
      console.error("Fetch gallery error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,

      // Photo select pannina video URL clear aagum
      ...(name === "mediaType" && value === "Photo" ? { videoUrl: "" } : {}),
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 900 * 1024) {
      alert("Image size must be below 900KB. Please compress the image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previous) => ({
        ...previous,
        imageData: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((previous) => ({
      ...previous,
      imageData: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter title");
      return;
    }

    if (formData.mediaType === "Photo" && !formData.imageData) {
      alert("Please upload a photo");
      return;
    }

    if (formData.mediaType === "Video" && !formData.videoUrl.trim()) {
      alert("Please enter video URL");
      return;
    }

    if (formData.mediaType === "Video" && !formData.imageData) {
      alert("Please upload a video thumbnail image");
      return;
    }

    try {
      setIsLoading(true);

      const url = editingGalleryId
        ? `${API_URL}/gallery/${editingGalleryId}`
        : `${API_URL}/gallery`;

      const method = editingGalleryId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Gallery item save failed");
        return;
      }

      alert(
        editingGalleryId
          ? "Gallery item updated successfully"
          : "Gallery item uploaded successfully"
      );

      setFormData(emptyForm);
      setEditingGalleryId(null);
      fetchGalleryItems();
    } catch (error) {
      console.error("Save gallery error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingGalleryId(item.galleryId);

    setFormData({
      title: item.title || "",
      category: item.category || "DJ Performance",
      mediaType: item.mediaType || "Photo",
      imageData: item.imageData || "",
      videoUrl: item.videoUrl || "",
      description: item.description || "",
      status: item.status || "Active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingGalleryId(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (galleryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/gallery/${galleryId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Gallery item delete failed");
        return;
      }

      alert("Gallery item deleted successfully");
      fetchGalleryItems();
    } catch (error) {
      console.error("Delete gallery error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] px-5 py-8 text-white sm:px-6">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.2),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_60%,#000_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={18} />
            Back Dashboard
          </Link>

          <button
            onClick={fetchGalleryItems}
            type="button"
            className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-black"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Admin Gallery
          </p>

          <h1 className="text-4xl font-black sm:text-6xl">
            Manage Gallery.
          </h1>

          <p className="mt-4 max-w-2xl text-white/60">
            Upload photos and add video links with thumbnail images. Active
            items will show on the public gallery page.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">
                {editingGalleryId ? "Update Item" : "Upload Item"}
              </h2>

              {editingGalleryId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-full bg-red-400/10 p-3 text-red-300 transition hover:bg-red-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-white/60">
                Category
              </span>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-300"
              >
                <option>DJ Performance</option>
                <option>Crowd Energy</option>
                <option>Stage Lights</option>
                <option>Wedding Event</option>
                <option>Birthday Party</option>
                <option>Private Event</option>
                <option>Corporate Event</option>
                <option>Campus Event</option>
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-white/60">
                Media Type
              </span>

              <select
                name="mediaType"
                value={formData.mediaType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-300"
              >
                <option>Photo</option>
                <option>Video</option>
              </select>
            </label>

            {(formData.mediaType === "Photo" ||
              formData.mediaType === "Video") && (
              <>
                <label className="mt-4 block">
                  <span className="mb-2 block text-sm font-bold text-white/60">
                    {formData.mediaType === "Photo"
                      ? "Upload Photo"
                      : "Upload Video Thumbnail"}
                  </span>

                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-black transition hover:bg-white">
                      <ImagePlus size={18} />
                      {formData.mediaType === "Photo"
                        ? "Choose Photo"
                        : "Choose Thumbnail"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    <p className="mt-3 text-center text-xs text-white/45">
                      Recommended: 16:9 image, below 900KB.
                    </p>
                  </div>
                </label>

                {formData.imageData && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-300/20 bg-black/40">
                    <img
                      src={formData.imageData}
                      alt="Gallery Preview"
                      className="h-44 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="w-full bg-red-400/10 px-4 py-3 text-sm font-black text-red-300 transition hover:bg-red-400 hover:text-white"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </>
            )}

            {formData.mediaType === "Video" && (
              <Input
                label="Video URL"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="YouTube / Google Drive / Facebook video URL"
                required
              />
            )}

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-white/60">
                Status
              </span>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-300"
              >
                <option>Active</option>
                <option>Hidden</option>
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-white/60">
                Description
              </span>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-300"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-black transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {editingGalleryId ? <Save size={20} /> : <Plus size={20} />}
              {editingGalleryId ? "Update Item" : "Upload Item"}
            </button>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <h2 className="mb-6 text-2xl font-black">Gallery List</h2>

            {galleryItems.length === 0 && !isLoading && (
              <div className="rounded-[2rem] border border-orange-300/20 bg-orange-300/10 p-8 text-center">
                <ImagePlus className="mx-auto text-orange-300" size={48} />

                <h3 className="mt-4 text-2xl font-black text-orange-300">
                  No gallery items yet
                </h3>

                <p className="mt-3 text-white/60">
                  Admin upload pannura photos/videos inga show aagum.
                </p>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {galleryItems.map((item) => (
                <div
                  key={item._id || item.galleryId}
                  className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35"
                >
                  {item.imageData ? (
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.imageData}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />

                      {item.mediaType === "Video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
                            <PlayCircle size={36} />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <EmptyMedia
                      icon={
                        item.mediaType === "Photo" ? (
                          <ImagePlus size={46} />
                        ) : (
                          <PlayCircle size={54} />
                        )
                      }
                    />
                  )}

                  <div className="p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-300">
                        {item.mediaType}
                      </span>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-black ${
                          item.status === "Active"
                            ? "bg-green-300/10 text-green-300"
                            : "bg-orange-300/10 text-orange-300"
                        }`}
                      >
                        {item.status === "Active" ? (
                          <span className="inline-flex items-center gap-1">
                            <Eye size={13} /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <EyeOff size={13} /> Hidden
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-300">
                      {item.galleryId}
                    </p>

                    <h3 className="mt-2 text-2xl font-black">{item.title}</h3>

                    <p className="mt-2 text-sm text-cyan-300">
                      {item.category}
                    </p>

                    {item.description && (
                      <p className="mt-3 text-sm leading-relaxed text-white/55">
                        {item.description}
                      </p>
                    )}

                    {item.mediaType === "Video" && item.videoUrl && (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-black"
                      >
                        <Video size={16} />
                        Open Video
                      </a>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-2 rounded-full bg-purple-400/10 px-5 py-3 text-sm font-black text-purple-300 transition hover:bg-purple-400 hover:text-white"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.galleryId)}
                        className="flex items-center gap-2 rounded-full bg-red-400/10 px-5 py-3 text-sm font-black text-red-300 transition hover:bg-red-400 hover:text-white"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-bold text-white/60">
        {label}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan-300"
      />
    </label>
  );
}

function EmptyMedia({ icon }) {
  return (
    <div className="flex h-52 items-center justify-center bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/25 text-cyan-300/70">
      {icon}
    </div>
  );
}

export default ManageGallery;