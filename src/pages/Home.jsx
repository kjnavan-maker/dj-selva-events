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
} from "lucide-react";

function Home() {
  const headphones = useMemo(
    () => [
      "/headphone-1.png",
      "/headphone-2.png",
      "/headphone-3.png",
      "/headphone-4.png",
    ],
    []
  );

  const [activeHeadphone, setActiveHeadphone] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              to="/booking"
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-black text-black transition hover:bg-cyan-300 sm:block"
            >
              Book Now
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
                ["Booking", "/booking"],
                ["Contact", "/contact"],
                ["Admin Login", "/admin-login"],
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
        className="relative flex min-h-screen items-center px-4 pb-12 pt-24 sm:px-5 sm:pb-14 lg:pt-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
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

            <h1 className="text-[3rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[5.7rem]">
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

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/booking"
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-cyan-300 sm:px-6 md:px-7 md:py-3.5 md:text-base"
              >
                Book an Event
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#featured-events"
                className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:px-6 md:px-7 md:py-3.5 md:text-base"
              >
                View Events
              </a>

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#22c55e] px-5 py-3 text-sm font-bold text-white transition hover:scale-105 sm:px-6 md:px-7 md:py-3.5 md:text-base"
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
            className="relative order-2"
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
                className={`absolute z-20 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)] ${item.className}`}
              >
                {item.note}
              </motion.div>
            ))}

            <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/10 to-purple-500/20 blur-3xl sm:-inset-12" />

            <div className="relative mx-auto flex h-[285px] w-[285px] items-center justify-center rounded-full border border-cyan-300/15 bg-white/[0.025] shadow-[0_0_90px_rgba(37,99,255,0.32)] backdrop-blur-2xl sm:h-[350px] sm:w-[350px] md:h-[430px] md:w-[430px] lg:h-[450px] lg:w-[450px]">
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
                  className="max-h-[225px] w-[235px] translate-x-1 translate-y-1 object-contain drop-shadow-[0_0_65px_rgba(34,211,238,0.55)] sm:max-h-[285px] sm:w-[300px] md:max-h-[360px] md:w-[370px] lg:max-h-[375px] lg:w-[385px]"
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

              <div className="absolute -bottom-4 flex items-end gap-1.5 md:-bottom-6">
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

            <div className="mx-auto mt-7 max-w-sm rounded-3xl border border-white/10 bg-black/35 p-4 text-center backdrop-blur-xl">
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
      <section id="highlights" className="px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Highlights
            </p>
            <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
              Built for unforgettable nights.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            <HighlightCard
              icon={<Users />}
              title="Live Events"
              text="Premium club nights, parties, weddings, and private celebrations."
            />

            <HighlightCard
              icon={<Ticket />}
              title="QR Ticket Booking"
              text="Modern digital ticketing concept with QR entry experience."
            />

            <HighlightCard
              icon={<ShieldCheck />}
              title="Professional Experience"
              text="Clean booking flow, trusted event presentation, and client-ready design."
            />
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section id="events" className="px-5 py-20 sm:px-6 sm:py-24">
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
            <ServiceCard title="Club Events" icon="🎧" />
            <ServiceCard title="Wedding DJ" icon="💍" />
            <ServiceCard title="Birthday Parties" icon="🎉" />
            <ServiceCard title="Private Shows" icon="✨" />
            <ServiceCard title="Corporate Events" icon="🏢" />
            <ServiceCard title="Campus Events" icon="🎓" />
            <ServiceCard title="Sound Setup" icon="🔊" />
            <ServiceCard title="Lighting Setup" icon="💡" />
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
            </div>

            <Link
              to="/booking"
              className="w-fit rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 font-bold text-white transition hover:bg-white hover:text-black"
            >
              Book Tickets
            </Link>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <EventCard
              title="Neon Night 2026"
              date="19 June 2026"
              venue="Jaffna"
              price="From Rs. 2,500"
              tag="Live Soon"
            />

            <EventCard
              title="Bass Drop Party"
              date="05 July 2026"
              venue="Colombo"
              price="From Rs. 3,000"
              tag="Booking Open"
            />

            <EventCard
              title="Glow Festival"
              date="22 August 2026"
              venue="Kandy"
              price="From Rs. 4,000"
              tag="Limited"
            />
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="px-5 py-20 sm:px-6 sm:py-24">
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
              Moments that move the crowd.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-4">
            <GalleryCard label="DJ Performance" />
            <GalleryCard label="Crowd Energy" />
            <GalleryCard label="Stage Lights" />
            <GalleryCard label="Private Event" />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-block rounded-full bg-white px-8 py-4 font-black text-black transition hover:bg-cyan-300"
            >
              View Full Gallery
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
            Contact DJ Selva for event bookings, ticket reservations, private
            shows, weddings, and premium celebrations.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-cyan-300 sm:px-9"
            >
              Book Now
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
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_0_35px_rgba(34,197,94,0.55)] transition hover:scale-110 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}

function HighlightCard({ icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:border-cyan-300/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.18)] sm:p-7"
    >
      <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300 transition group-hover:scale-110 group-hover:bg-cyan-300/20">
        {icon}
      </div>

      <h3 className="text-xl font-black sm:text-2xl">{title}</h3>
      <p className="mt-3 leading-relaxed text-white/60">{text}</p>
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

function EventCard({ title, date, venue, price, tag }) {
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.35),transparent_35%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-cyan-300/70 bg-black shadow-[0_0_45px_rgba(34,211,238,0.4)]"
        />
        <div className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-2 text-xs font-black text-cyan-300 backdrop-blur-xl">
          {tag}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black">{title}</h3>

        <div className="mt-5 space-y-3 text-sm text-white/65">
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