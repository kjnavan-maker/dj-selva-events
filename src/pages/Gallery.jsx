import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  Image,
  MessageCircle,
  PlayCircle,
  Sparkles,
  Music,
} from "lucide-react";
import { Link } from "react-router-dom";

function Gallery() {
  const galleryItems = [
    {
      title: "DJ Performance",
      category: "Live Show",
      type: "photo",
    },
    {
      title: "Crowd Energy",
      category: "Party Moment",
      type: "photo",
    },
    {
      title: "Stage Lighting",
      category: "Lighting Setup",
      type: "photo",
    },
    {
      title: "Private Event",
      category: "Premium Event",
      type: "photo",
    },
    {
      title: "Club Night",
      category: "Night Party",
      type: "video",
    },
    {
      title: "Wedding DJ",
      category: "Wedding Event",
      type: "photo",
    },
    {
      title: "Sound Setup",
      category: "Audio System",
      type: "photo",
    },
    {
      title: "Festival Vibes",
      category: "Outdoor Event",
      type: "video",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_12%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_82%_75%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Top Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>

          <div className="flex items-center gap-3">
            <img
              src="/dj-selva-logo.png"
              alt="DJ Selva Logo"
              className="h-12 w-12 rounded-full object-contain"
            />
            <div>
              <h2 className="font-black leading-none">DJ Selva</h2>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-cyan-300">
                GALLERY
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="py-10 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            <Sparkles size={15} />
            Event Moments
          </div>

          <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
            Moments that
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              move the crowd.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Explore premium DJ performances, crowd energy, stage lighting,
            private celebrations, and unforgettable event highlights.
          </p>
        </motion.section>

        {/* Featured Gallery Hero */}
        <section className="py-10">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_65px_rgba(34,211,238,0.12)] backdrop-blur-2xl sm:p-7"
          >
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.35),transparent_36%)]" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute h-72 w-72 rounded-full border-[36px] border-cyan-300/60 bg-black shadow-[0_0_70px_rgba(34,211,238,0.45)]"
              />

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-96 w-96 rounded-full border border-purple-300/25"
              />

              <div className="relative z-10 px-5 text-center">
                <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
                  DJ Selva Live
                </p>
                <h2 className="mt-4 text-5xl font-black sm:text-6xl">
                  PREMIUM
                </h2>
                <h3 className="text-4xl font-black text-cyan-300 sm:text-5xl">
                  EVENT VIBES
                </h3>
              </div>

              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 7, 0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-10 top-10 text-4xl text-cyan-300"
              >
                ♪
              </motion.div>

              <motion.div
                animate={{ y: [0, -18, 0], rotate: [0, -7, 0, 7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity }}
                className="absolute bottom-12 right-12 text-5xl text-purple-300"
              >
                ♫
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
                Gallery Collection
              </p>
              <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
                Latest event highlights.
              </h2>
            </div>

            <Link
              to="/booking"
              className="w-fit rounded-full bg-white px-7 py-3 font-black text-black transition hover:bg-cyan-300"
            >
              Book an Event
            </Link>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <GalleryItem key={index} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* Video Preview */}
        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <VideoPreview
              title="Live DJ Night"
              text="High-energy performance with lights, crowd interaction, and premium sound experience."
            />

            <VideoPreview
              title="Wedding DJ Moment"
              text="Elegant music setup for weddings, engagement events, and family celebrations."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-12"
          >
            <Music className="mx-auto text-cyan-300" size={48} />

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
              Your Event Next
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Want your event in our gallery?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/60">
              Book DJ Selva for your next event and create premium memories with
              professional music, sound, lights, and unforgettable crowd energy.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="rounded-full bg-white px-9 py-4 font-black text-black transition hover:bg-cyan-300"
              >
                Book Now
              </Link>

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#22c55e] px-9 py-4 font-black text-white transition hover:scale-105"
              >
                <MessageCircle />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function GalleryItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-purple-600/25 shadow-[0_0_40px_rgba(0,0,0,0.25)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.28),transparent_36%)] transition duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/25" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 18 + index,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] border-cyan-300/45 bg-black/70 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
      />

      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/50 text-cyan-300 backdrop-blur-xl">
        {item.type === "video" ? <PlayCircle /> : <Image />}
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
          {item.category}
        </p>
        <h3 className="mt-1 text-xl font-black">{item.title}</h3>
      </div>
    </motion.div>
  );
}

function VideoPreview({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.65 }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_0_45px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
    >
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/30">
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl"
        />

        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-[0_0_45px_rgba(34,211,238,0.35)]">
          <PlayCircle size={42} />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="mt-3 leading-relaxed text-white/60">{text}</p>
      </div>
    </motion.div>
  );
}

export default Gallery;