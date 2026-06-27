import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ImagePlus,
  PlayCircle,
  Video,
  Camera,
  RefreshCw,
  X,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "https://dj-selva-events.onrender.com/api";

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/gallery/active`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to load gallery");
        return;
      }

      setGalleryItems(data.galleryItems || []);
    } catch (error) {
      console.error("Gallery fetch error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const categories = [
    "All",
    "DJ Performance",
    "Crowd Energy",
    "Stage Lights",
    "Wedding Event",
    "Birthday Party",
    "Private Event",
    "Corporate Event",
    "Campus Event",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>

          <button
            onClick={fetchGalleryItems}
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
          className="mb-10 text-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Gallery
          </p>

          <h1 className="text-4xl font-black sm:text-5xl md:text-7xl">
            Moments that move the crowd.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            DJ Selva event photos, crowd moments, stage lights, wedding DJ
            moments, and video highlights.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-3 text-sm font-black transition ${
                selectedCategory === category
                  ? "bg-cyan-300 text-black"
                  : "border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
            <RefreshCw className="mx-auto animate-spin text-cyan-300" size={48} />
            <h3 className="mt-4 text-2xl font-black text-cyan-300">
              Loading gallery...
            </h3>
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="rounded-[2rem] border border-orange-300/20 bg-orange-300/10 p-8 text-center">
            <ImagePlus className="mx-auto text-orange-300" size={54} />

            <h3 className="mt-4 text-2xl font-black text-orange-300">
              No gallery items found
            </h3>

            <p className="mt-3 text-white/60">
              Admin upload pannura active photos/videos inga show aagum.
            </p>
          </div>
        )}

        {!isLoading && filteredItems.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={item._id || item.galleryId}
                item={item}
                index={index}
                onOpen={() => setSelectedItem(item)}
              />
            ))}
          </div>
        )}

        <div className="h-16" />
      </div>

      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

function GalleryCard({ item, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_0_45px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:border-cyan-300/40"
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/30">
        {item.imageData ? (
          <img
            src={item.imageData}
            alt={item.title}
            className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle className="text-cyan-300" size={72} />
          </div>
        )}

        {item.mediaType === "Video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_0_35px_rgba(255,255,255,0.35)]">
              <PlayCircle size={38} />
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b101c] via-[#0b101c]/30 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-2 text-xs font-black text-cyan-300 backdrop-blur-xl">
          {item.mediaType}
        </div>

        <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
          {item.mediaType === "Photo" ? (
            <Camera size={20} />
          ) : (
            <Video size={20} />
          )}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            {item.category}
          </p>

          <h3 className="mt-1 text-2xl font-black text-white">
            {item.title}
          </h3>
        </div>
      </div>

      <div className="p-5">
        {item.description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-white/60">
            {item.description}
          </p>
        ) : (
          <p className="text-sm text-white/40">
            Click to view this gallery item.
          </p>
        )}
      </div>
    </motion.div>
  );
}

function GalleryModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b101c] shadow-[0_0_70px_rgba(0,0,0,0.6)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/80 text-white shadow-lg transition hover:bg-white hover:text-black"
        >
          <X size={24} />
        </button>

        {item.mediaType === "Photo" ? (
          <div className="flex h-[55vh] items-center justify-center bg-black">
            {item.imageData ? (
              <img
                src={item.imageData}
                alt={item.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <ImagePlus className="text-cyan-300" size={80} />
            )}
          </div>
        ) : (
          <div className="relative h-[55vh] overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/25">
            {item.imageData && (
              <img
                src={item.imageData}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
            )}

            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b101c] via-[#0b101c]/30 to-transparent" />

            <div className="relative z-10 flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-black shadow-[0_0_45px_rgba(255,255,255,0.35)]">
                  <PlayCircle size={55} />
                </div>

                <h3 className="mt-6 text-3xl font-black sm:text-4xl">
                  Video Highlight
                </h3>

                <p className="mt-3 text-white/70">
                  Click below to open video in a new tab.
                </p>

                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-cyan-300"
                >
                  Open Video
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
            {item.category}
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            {item.title}
          </h2>

          {item.description && (
            <p className="mt-4 leading-relaxed text-white/60">
              {item.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-300">
              {item.mediaType}
            </span>

            <span className="rounded-full bg-green-300/10 px-4 py-2 text-sm font-black text-green-300">
              Active
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Gallery;