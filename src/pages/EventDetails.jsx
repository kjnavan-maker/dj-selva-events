import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Music,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

function EventDetails() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_82%_75%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
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
                EVENT DETAILS
              </p>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="grid items-center gap-10 py-8 lg:grid-cols-[1fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
              <Sparkles size={15} />
              Live Soon
            </div>

            <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
              Neon Night
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                2026
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              A premium DJ night experience with cinematic lights, high-energy
              beats, crowd interaction, and unforgettable party moments powered
              by DJ Selva.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<Calendar />} label="Date" value="19 June 2026" />
              <InfoCard icon={<Clock />} label="Time" value="7:00 PM onwards" />
              <InfoCard icon={<MapPin />} label="Venue" value="Jaffna, Sri Lanka" />
              <InfoCard icon={<Music />} label="Music" value="DJ Live Performance" />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="rounded-full bg-white px-8 py-4 font-black text-black transition hover:bg-cyan-300"
              >
                Book Tickets
              </Link>

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#22c55e] px-8 py-4 font-black text-white transition hover:scale-105"
              >
                <MessageCircle />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Event Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 35 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_70px_rgba(34,211,238,0.18)] backdrop-blur-2xl">
              <div className="relative flex h-[430px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.35),transparent_35%)]" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute h-56 w-56 rounded-full border-[32px] border-cyan-300/70 bg-black shadow-[0_0_60px_rgba(34,211,238,0.5)]"
                />

                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-80 w-80 rounded-full border border-purple-300/20"
                />

                <div className="relative z-10 text-center">
                  <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
                    DJ Selva Presents
                  </p>
                  <h2 className="mt-4 text-5xl font-black">NEON</h2>
                  <h3 className="text-4xl font-black text-cyan-300">NIGHT</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Ticket Prices */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Tickets
            </p>
            <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
              Choose your experience.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-4">
            <PriceCard name="Normal" price="Rs. 2,500" />
            <PriceCard name="VIP" price="Rs. 5,000" popular />
            <PriceCard name="Couple" price="Rs. 7,000" />
            <PriceCard name="Backstage" price="Rs. 12,000" />
          </div>
        </section>

        {/* Details Grid */}
        <section className="grid gap-8 pb-20 lg:grid-cols-3">
          <DetailCard
            icon={<Users />}
            title="Crowd Experience"
            text="Designed for party lovers, music fans, and premium night event audiences."
          />

          <DetailCard
            icon={<Music />}
            title="Music Style"
            text="EDM, Sinhala, Tamil, Bollywood, commercial hits, and custom event mixes."
          />

          <DetailCard
            icon={<ShieldCheck />}
            title="Event Rules"
            text="Valid ticket required. Entry confirmation will be verified using QR ticket scanning."
          />
        </section>

        {/* Final CTA */}
        <section className="pb-16">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-12"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
              Limited Seats
            </p>
            <h2 className="text-3xl font-black sm:text-5xl">
              Book early. Own the night.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/60">
              Ticket availability is limited. Reserve your spot now and our team
              will contact you for confirmation.
            </p>

            <Link
              to="/booking"
              className="mt-8 inline-block rounded-full bg-white px-10 py-4 font-black text-black transition hover:bg-cyan-300"
            >
              Reserve Ticket
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>
      <p className="text-sm font-bold text-white/45">{label}</p>
      <h3 className="mt-1 font-black text-white">{value}</h3>
    </motion.div>
  );
}

function PriceCard({ name, price, popular }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-[2rem] border p-6 text-center backdrop-blur-2xl transition ${
        popular
          ? "border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_45px_rgba(34,211,238,0.18)]"
          : "border-white/10 bg-white/[0.045] hover:border-cyan-300/30"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-black">
          POPULAR
        </div>
      )}

      <Ticket className="mx-auto text-cyan-300" size={34} />
      <h3 className="mt-5 text-2xl font-black">{name}</h3>
      <p className="mt-3 text-3xl font-black text-cyan-300">{price}</p>

      <Link
        to="/booking"
        className="mt-6 block rounded-full bg-white px-5 py-3 font-black text-black transition hover:bg-cyan-300"
      >
        Book
      </Link>
    </motion.div>
  );
}

function DetailCard({ icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.6 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 leading-relaxed text-white/60">{text}</p>
    </motion.div>
  );
}

export default EventDetails;