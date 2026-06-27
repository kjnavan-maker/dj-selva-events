import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  MessageCircle,
  Music,
  Ticket,
  Users,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Camera,
  PlayCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";
const API_URL = "https://dj-selva-events.onrender.com/api";

function Home() {
  const headphones = useMemo(
    () => [
      "/headphone-1.png",
      "/headphone-2.png",
    ],
    []
  );

  const [activeHeadphone, setActiveHeadphone] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [galleryPreview, setGalleryPreview] = useState([]);

  useEffect(() => {
    headphones.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [headphones]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeadphone((prev) => (prev + 1) % headphones.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [headphones.length]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#home" || window.location.hash === "") {
        setActiveHeadphone((prev) => (prev + 1) % headphones.length);
      }
      setMobileMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [headphones.length]);

  const nextHeadphone = () => {
    setActiveHeadphone((prev) => (prev + 1) % headphones.length);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      setIsEventsLoading(true);

      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();

      if (data.success) {
        const upcomingEvents = (data.events || []).filter(
          (eventItem) =>
            eventItem.status === "Upcoming" || eventItem.status === "Active"
        );

        setEvents(upcomingEvents);
      }
    } catch (error) {
      console.error("Home events fetch error:", error);
    } finally {
      setIsEventsLoading(false);
    }
  };

  fetchEvents();
}, []);

useEffect(() => {
  const fetchGalleryPreview = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery/active`);
      const data = await response.json();

      if (data.success) {
        setGalleryPreview((data.galleryItems || []).slice(0, 6));
      }
    } catch (error) {
      console.error("Home gallery preview fetch error:", error);
    }
  };

  fetchGalleryPreview();
}, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] text-white">
      {/* Premium Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_18%,rgba(37,99,255,0.24),transparent_34%),radial-gradient(circle_at_82%_68%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000000_100%)]" />

        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />

        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[25%] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl sm:h-56 sm:w-56"
        />

        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[18%] right-[10%] h-44 w-44 rounded-full bg-purple-500/10 blur-3xl sm:h-64 sm:w-64"
        />
      </div>

      {/* Navbar */}
      <nav className="fixed left-0 top-0 z-50 w-full px-3 py-3 sm:px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/60 px-3 py-2 shadow-[0_0_35px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-4 sm:py-2.5">
          <a href="#home" className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-cyan-300/25 bg-black shadow-[0_0_24px_rgba(34,211,238,0.22)] sm:h-12 sm:w-12">
              <img
                src="/dj-selva-logo.png"
                alt="DJ Selva Logo"
                className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              />
            </div>

            <div>
              <h1 className="text-base font-black leading-none sm:text-lg">
                DJ Selva
              </h1>
              <p className="mt-1 text-[9px] tracking-[0.28em] text-cyan-300 sm:text-[10px] sm:tracking-[0.32em]">
                EVENTS
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-white/70 lg:flex">
            <a href="#home" className="transition hover:text-cyan-300">
              Home
            </a>

            <a href="#highlights" className="transition hover:text-cyan-300">
              Highlights
            </a>

            <a
              href="#featured-events"
              className="transition hover:text-cyan-300"
            >
              Events
            </a>

            <a href="#services" className="transition hover:text-cyan-300">
              Services
            </a>

            <Link to="/gallery" className="transition hover:text-cyan-300">
              Gallery
            </Link>

            <Link to="/contact" className="transition hover:text-cyan-300">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/private-booking"
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-black text-black transition hover:bg-cyan-300 sm:block"
            >
              Book DJ Selva
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white hover:text-black lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-black/90 p-5 shadow-[0_0_35px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-2 text-sm font-bold text-white/80">
              {[
                ["Home", "#home"],
                ["Highlights", "#highlights"],
                ["Events", "#featured-events"],
                ["Services", "#services"],
                ["Gallery", "/gallery"],
                ["Book Ticket", "/booking"],
                ["Book DJ Selva", "/private-booking"],
                ["Contact", "/contact"],
              ].map(([label, href]) =>
                href.startsWith("/") ? (
                  <Link
                    key={href}
                    to={href}
                    onClick={closeMobileMenu}
                    className="rounded-2xl px-4 py-3 transition hover:bg-white/10 hover:text-cyan-300"
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className="rounded-2xl px-4 py-3 transition hover:bg-white/10 hover:text-cyan-300"
                  >
                    {label}
                  </a>
                )
              )}

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#22c55e] px-4 py-3 font-black text-white"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
  id="home"
  className="relative px-4 pb-16 pt-24 sm:px-5 sm:pb-24 sm:pt-28 lg:flex lg:min-h-screen lg:items-center lg:pt-28"
>
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="order-1 text-center lg:pl-8 lg:text-left xl:pl-10"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-cyan-200 backdrop-blur-xl md:text-sm"
            >
              <Sparkles size={15} />
              Sri Lanka’s Premium DJ Experience
            </motion.div>

            <h1 className="text-[2.45rem] font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl md:text-7xl lg:text-[4.8rem] xl:text-[5.4rem]">
              Feel the
              <br />
              Beat.
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Own the
                <br />
                Night.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base md:text-lg lg:mx-0">
              Premium DJ nights, private events, weddings, club parties, and
              unforgettable live music experiences with DJ Selva.
            </p>

            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Link
                to="/booking"className="group flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-black sm:px-6 md:px-7 md:py-3.5 md:text-base"
                
              >
                Book Event Ticket
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/private-booking"
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-black sm:w-auto sm:px-6 md:px-7 md:py-3.5 md:text-base"
              >
                Book DJ Selva
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#featured-events"className="w-full rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-center text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:w-auto sm:px-6 md:px-7 md:py-3.5 md:text-base"
                
              >
                View Events
              </a>

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#22c55e] px-5 py-3 text-sm font-bold text-white transition hover:scale-105 sm:w-auto sm:px-6 md:px-7 md:py-3.5 md:text-base"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right 3D Headphone Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.84, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative order-2 -mt-2 sm:mt-0"
          >
            {[
              {
                note: "♪",
                className:
                  "left-8 top-4 text-2xl text-cyan-300 sm:left-10 sm:top-8 sm:text-3xl",
                duration: 4,
                delay: 0,
                x: 10,
                y: -20,
              },
              {
                note: "♫",
                className:
                  "right-10 top-14 text-3xl text-purple-300 sm:right-16 sm:top-20 sm:text-4xl",
                duration: 5,
                delay: 0.8,
                x: -12,
                y: -28,
              },
              {
                note: "♬",
                className:
                  "bottom-24 left-10 text-2xl text-blue-300 sm:bottom-28 sm:left-20",
                duration: 4.5,
                delay: 1.2,
                x: 14,
                y: -18,
              },
              {
                note: "♩",
                className:
                  "bottom-16 right-14 text-2xl text-cyan-200 sm:bottom-20 sm:right-24 sm:text-3xl",
                duration: 5.5,
                delay: 1.6,
                x: -10,
                y: -22,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, item.y, 0],
                  x: [0, item.x, 0],
                  opacity: [0.15, 0.9, 0.15],
                  rotate: [0, 8, 0, -8, 0],
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                className={`absolute z-20 hidden drop-shadow-[0_0_20px_rgba(34,211,238,0.7)] sm:block ${item.className}`}
              >
                {item.note}
              </motion.div>
            ))}

            <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/10 to-purple-500/20 blur-3xl sm:-inset-12" />

            <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center rounded-full border border-cyan-300/15 bg-white/[0.025] shadow-[0_0_55px_rgba(37,99,255,0.22)] backdrop-blur-2xl sm:h-[350px] sm:w-[350px] md:h-[430px] md:w-[430px] lg:h-[450px] lg:w-[450px]">
              <motion.div
                animate={{ scale: [1, 1.04, 1], rotate: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-5 rounded-full border border-cyan-300/10"
              />

              <motion.div
                animate={{ scale: [1, 1.06, 1], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-14 rounded-full border border-blue-400/15"
              />

              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-24 rounded-full border border-purple-400/20"
              />

              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl sm:h-64 sm:w-64 md:h-72 md:w-72"
              />

              <motion.div
                key={activeHeadphone}
                initial={{
                  opacity: 0,
                  scale: 0.72,
                  rotateY: -45,
                  rotateX: 8,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: [0, 14, 0, -14, 0],
                  rotateX: [0, 5, 0, -5, 0],
                  rotateZ: [0, 2, 0, -2, 0],
                  y: [0, -14, 0],
                }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.45 },
                  rotateY: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateX: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateZ: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  y: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative z-20 flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]"
              >
                <img
                  src={headphones[activeHeadphone]}
                  alt={`3D Headphone ${activeHeadphone + 1}`}
                  className="max-h-[175px] w-[185px] translate-x-1 translate-y-1 object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.4)] sm:max-h-[285px] sm:w-[300px] md:max-h-[360px] md:w-[370px] lg:max-h-[375px] lg:w-[385px]"
                />
              </motion.div>

              <div className="absolute bottom-7 z-30 flex gap-2 sm:bottom-8">
                {headphones.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveHeadphone(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeHeadphone === index
                        ? "w-8 bg-cyan-300"
                        : "w-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Show headphone ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextHeadphone}
                className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:right-4"
                aria-label="Next headphone"
              >
                <ArrowRight size={19} />
              </button>

              <div className="absolute -bottom-4 hidden items-end gap-1.5 sm:flex md:-bottom-6">
                {[34, 56, 76, 48, 92, 66, 40, 74, 54, 84, 44].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [`${h - 16}px`, `${h}px`, `${h - 7}px`],
                      }}
                      transition={{
                        duration: 1.15 + i * 0.08,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-2 rounded-full bg-gradient-to-t from-purple-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.38)] sm:w-2.5"
                    />
                  )
                )}
              </div>
            </div>

            <div className="mx-auto mt-3 max-w-xs rounded-3xl border border-white/10 bg-black/35 p-3 text-center backdrop-blur-xl sm:max-w-sm sm:p-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                Premium Sound
              </p>
              <h3 className="mt-1 text-lg font-black sm:text-xl">
                3D DJ Experience
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
<SectionWrapper id="highlights">
  <SectionHeading
    label="Highlights"
    title="Built for unforgettable nights."
    text="A clean event experience with live shows, QR ticket booking, and professional event presentation."
  />

  <div className="grid gap-5 md:grid-cols-3">
    <HighlightImageCard
      image="/highlight-live-event.jpg"
      icon={<Users size={24} />}
      title="Live Events"
      text="Premium club nights, parties, weddings, and private celebrations with powerful sound and lights."
    />

    <HighlightImageCard
      image="/highlight-qr-booking.jpg"
      icon={<Ticket size={24} />}
      title="QR Ticket Booking"
      text="Customers can reserve tickets online and use QR ticket verification for smooth event entry."
    />

    <HighlightImageCard
      image="/highlight-professional.jpg"
      icon={<ShieldCheck size={24} />}
      title="Professional Experience"
      text="Clean booking flow, trusted event presentation, and client-ready service experience."
    />
  </div>
</SectionWrapper>




      {/* Event Section */}
      <section id="events" >className="px-4 py-14 sm:px-6 sm:py-20"
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-8 md:p-12"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
                Next Event
              </p>

              <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
                Neon Night 2026
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
                A premium DJ night experience with cinematic lights, energetic
                beats, and unforgettable crowd moments.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoPill icon={<Calendar />} text="19 June 2026" />
                <InfoPill icon={<MapPin />} text="Jaffna, Sri Lanka" />
                <InfoPill icon={<Ticket />} text="Normal / VIP / Couple" />
                <InfoPill icon={<Music />} text="Live DJ Performance" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-[0_0_50px_rgba(0,0,0,0.35)] sm:p-7">
              <h3 className="text-2xl font-black">Ticket Categories</h3>

              <div className="mt-6 space-y-4">
                <TicketRow name="Normal Ticket" price="Rs. 2,500" />
                <TicketRow name="VIP Ticket" price="Rs. 5,000" />
                <TicketRow name="Couple Ticket" price="Rs. 7,000" />
                <TicketRow name="Backstage Pass" price="Rs. 12,000" />
              </div>

              <Link
                to="/booking"
                className="mt-7 block rounded-full bg-white py-4 text-center font-black text-black transition hover:bg-cyan-300"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Services
            </p>
            <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
              DJ services for every celebration.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/60">
              From club nights to weddings and private events, DJ Selva delivers
              a premium music experience for every crowd.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  <ServiceImageCard
    image="/service-club-events.jpg"
    title="Club Events"
    text="High-energy DJ nights with crowd interaction and premium sound."
  />

  <ServiceImageCard
    image="/service-wedding-dj.jpg"
    title="Wedding DJ"
    text="Elegant wedding music setup for receptions and family celebrations."
  />

  <ServiceImageCard
    image="/service-birthday-party.jpg"
    title="Birthday Parties"
    text="Fun party music, lights, and custom playlists for every age group."
  />

  <ServiceImageCard
    image="/service-private-show.jpg"
    title="Private Shows"
    text="Private DJ performance for house parties and special celebrations."
  />

  <ServiceImageCard
    image="/service-corporate-event.jpg"
    title="Corporate Events"
    text="Professional music and sound setup for company functions."
  />

  <ServiceImageCard
    image="/service-campus-event.jpg"
    title="Campus Events"
    text="Energetic DJ setup for college, school, and youth events."
  />

  <ServiceImageCard
    image="/service-sound-setup.jpg"
    title="Sound Setup"
    text="Clear and powerful sound system setup for indoor and outdoor events."
  />

  <ServiceImageCard
    image="/service-lighting-setup.jpg"
    title="Lighting Setup"
    text="Colorful stage lighting to create a premium event atmosphere."
  />
</div>

          <div className="mt-10 text-center">
            <Link
              to="/private-booking"
              className="inline-block rounded-full bg-cyan-300 px-8 py-4 font-black text-black transition hover:bg-white"
            >
              Book DJ Selva for Your Event
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
<section id="featured-events" className="px-5 py-20 sm:px-6 sm:py-24">
  <div className="mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
    >
      <div>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
          Upcoming Events
        </p>

        <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
          Feel the next beat live.
        </h2>

        <p className="mt-5 max-w-2xl text-white/60">Upcoming DJ Selva public events will appear here with posters, dates, venues, and ticket details.
          
        </p>
      </div>

      <Link
        to="/booking"
        className="w-fit rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 font-bold text-white transition hover:bg-white hover:text-black"
      >
        Book Tickets
      </Link>
    </motion.div>

    {isEventsLoading && (
      <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
        <Calendar className="mx-auto animate-pulse text-cyan-300" size={48} />
        <h3 className="mt-4 text-2xl font-black text-cyan-300">
          Loading events...
        </h3>
      </div>
    )}

    {!isEventsLoading && events.length === 0 && (
  <div className="rounded-[2rem] border border-orange-300/20 bg-orange-300/10 p-8 text-center">
    <Calendar className="mx-auto text-orange-300" size={48} />

    <h3 className="mt-4 text-2xl font-black text-orange-300">
      No upcoming events
    </h3>

    <p className="mt-3 text-white/60">
      New DJ Selva public events will be updated soon. Stay tuned for upcoming shows.
    </p>

    <Link
      to="/booking"
      className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-black text-black transition hover:bg-cyan-300"
    >
      Book DJ Selva
    </Link>
  </div>
)}

    {!isEventsLoading && events.length > 0 && (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((eventItem) => (
          <EventCard
            key={eventItem._id || eventItem.eventId}
            image={eventItem.eventImage}
            title={eventItem.eventName}
            date={eventItem.eventDate}
            venue={`${eventItem.venue || ""}${eventItem.city ? `, ${eventItem.city}` : ""}`}
            price={`From Rs. ${Number(eventItem.normalPrice || 0).toLocaleString()}`}
            tag={eventItem.status}
          />
        ))}
      </div>
    )}
  </div>
</section>

      {/* Gallery Preview */}
<section id="gallery-preview" className="px-5 py-20 sm:px-6 sm:py-24">
  <div className="mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="mb-12 text-center"
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
        Gallery
      </p>

      <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
        Real moments. Real energy.
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-white/60">
        Latest DJ Selva photos and video highlights uploaded by admin.
      </p>
    </motion.div>

    {galleryPreview.length === 0 ? (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-2xl">
        <Camera className="mx-auto text-cyan-300" size={52} />

        <h3 className="mt-4 text-2xl font-black">No gallery items yet</h3>

        <p className="mt-3 text-white/60">
          Admin upload pannura active photos/videos inga show aagum.
        </p>
      </div>
    ) : (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryPreview.map((item, index) => (
          <HomeGalleryCard
            key={item._id || item.galleryId}
            item={item}
            index={index}
          />
        ))}
      </div>
    )}

    <div className="mt-10 text-center">
      <Link
        to="/gallery"
        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-black text-black transition hover:bg-cyan-300"
      >
        View Full Gallery
        <ArrowRight size={20} />
      </Link>
    </div>
  </div>
</section>

      {/* Booking CTA */}
      <section id="booking" className="px-5 py-20 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Booking
          </p>

          <h2 className="text-3xl font-black sm:text-4xl md:text-7xl">
            Ready to own the night?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg">
            Book tickets for DJ Selva’s public events or book DJ Selva for your
            private events, weddings, parties, and premium celebrations.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/booking"
              className="rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-cyan-300 sm:px-9"
            >
              Book Event Ticket
            </Link>

            <Link
              to="/private-booking"
              className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-7 py-4 font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-black sm:px-9"
            >
              Book DJ Selva
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-white/15 bg-white/[0.05] px-7 py-4 font-bold text-white transition hover:bg-white hover:text-black sm:px-9"
            >
              Contact Details
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-5 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-black/45 p-8 text-center backdrop-blur-2xl"
        >
          <h3 className="text-2xl font-black">DJ Selva Events</h3>
          <p className="mt-3 text-sm text-white/60 sm:text-base">
            Jaffna, Sri Lanka | +94 77 123 4567 | hello@djselva.lk
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-cyan-300"
            >
              Contact Page
            </Link>

            <Link
              to="/admin-login"
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white/70 transition hover:bg-white hover:text-black"
            >
              Admin Login
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.08, 1],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_0_35px_rgba(34,197,94,0.55)] transition hover:scale-110 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      </motion.a>
    </div>
  );
}

function HighlightImageCard({ image, icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_0_45px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:border-cyan-300/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.16)]"
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/25 sm:h-56">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b101c] via-[#0b101c]/35 to-transparent" />

        <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-black/60 text-cyan-300 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.18)]">
          {icon}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">
            DJ Selva
          </p>
          <h3 className="mt-1 text-2xl font-black text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <p className="leading-relaxed text-white/60">{text}</p>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm font-bold text-white/45">
            Premium Feature
          </span>

          <span className="rounded-full bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-300">
            View
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SectionWrapper({ id, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 px-5 py-14 sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionHeading({ label, title, text, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className={`mb-10 ${
        align === "center"
          ? "mx-auto max-w-4xl text-center"
          : "max-w-3xl text-left"
      }`}
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
        {label}
      </p>

      <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {text && (
        <p
          className={`mt-4 text-base leading-relaxed text-white/60 sm:text-lg ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {text}
        </p>
      )}
    </motion.div>
  );
}

function InfoPill({ icon, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-white/75 transition hover:border-cyan-300/30"
    >
      <span className="text-cyan-300">{icon}</span>
      <span className="font-semibold">{text}</span>
    </motion.div>
  );
}

function TicketRow({ name, price }) {
  return (
    <motion.div
      whileHover={{ x: 6, scale: 1.02 }}
      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30"
    >
      <span className="font-bold text-white/85">{name}</span>
      <span className="font-black text-cyan-300">{price}</span>
    </motion.div>
  );
}

function ServiceCard({ icon, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:border-cyan-300/40"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/10 text-3xl transition group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-black">{title}</h3>
    </motion.div>
  );
}

function ServiceImageCard({ image, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -7, scale: 1.02 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:border-cyan-300/40"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/25">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b101c] via-[#0b101c]/40 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            DJ Service
          </p>
          <h3 className="mt-1 text-xl font-black text-white">{title}</h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-relaxed text-white/60">{text}</p>
      </div>
    </motion.div>
  );
}

function EventCard({ image, title, date, venue, price, tag }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_0_45px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:border-cyan-300/40"
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/30">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.35),transparent_35%)]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-cyan-300/70 bg-black shadow-[0_0_45px_rgba(34,211,238,0.4)]"
            />
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b101c] via-[#0b101c]/35 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-2 text-xs font-black text-cyan-300 backdrop-blur-xl">
          {tag}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            DJ Selva Event
          </p>
          <h3 className="mt-1 text-2xl font-black text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 text-sm text-white/65">
          <p className="flex items-center gap-2">
            <Calendar size={16} className="text-cyan-300" />
            {date}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-purple-300" />
            {venue}
          </p>

          <p className="flex items-center gap-2">
            <Ticket size={16} className="text-cyan-300" />
            {price}
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            to="/booking"
            className="flex-1 rounded-full bg-white px-4 py-3 text-center text-sm font-black text-black transition hover:bg-cyan-300"
          >
            Book
          </Link>

          <Link
            to="/event-details"
            className="flex-1 rounded-full border border-white/10 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-white hover:text-black"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function HomeGalleryCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_0_45px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:border-cyan-300/40"
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/30 sm:h-60">
        {item.imageData ? (
          <img
            src={item.imageData}
            alt={item.title}
            className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle className="text-cyan-300" size={70} />
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

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            {item.category}
          </p>

          <h3 className="mt-1 text-2xl font-black text-white">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

function GalleryCard({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative h-72 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-purple-600/25 shadow-[0_0_40px_rgba(0,0,0,0.25)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.28),transparent_36%)] transition group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
          Gallery
        </p>
        <h3 className="mt-1 text-xl font-black">{label}</h3>
      </div>
    </motion.div>
  );
}

export default Home;