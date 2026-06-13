import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
  Calendar,
  Music,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "Wedding DJ",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                CONTACT
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
            <MessageCircle size={15} />
            Get In Touch
          </div>

          <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl">
            Let’s create
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              your next vibe.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Contact DJ Selva for weddings, club nights, private parties,
            corporate events, sound setup, lighting setup, and premium DJ shows.
          </p>
        </motion.section>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 max-w-3xl rounded-[2rem] border border-green-300/20 bg-green-300/10 p-6 text-center"
          >
            <CheckCircle className="mx-auto text-green-300" size={48} />
            <h2 className="mt-4 text-2xl font-black">Message Submitted</h2>
            <p className="mt-2 text-white/60">
              Thank you! DJ Selva team will contact you soon.
            </p>
          </motion.div>
        )}

        <div className="grid gap-8 py-10 lg:grid-cols-[1fr_0.8fr]">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Contact Form
            </p>

            <h2 className="text-3xl font-black sm:text-5xl">
              Send your event request.
            </h2>

            <p className="mt-4 text-white/60">
              Fill this form and our team will contact you with availability,
              pricing, and booking confirmation.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  icon={<User size={18} />}
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />

                <InputField
                  icon={<Phone size={18} />}
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+94 77 123 4567"
                  required
                />

                <InputField
                  icon={<Mail size={18} />}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />

                <SelectField
                  icon={<Music size={18} />}
                  label="Event Type"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  options={[
                    "Wedding DJ",
                    "Club Event",
                    "Birthday Party",
                    "Private Party",
                    "Corporate Event",
                    "Campus Event",
                    "Sound & Lighting Setup",
                  ]}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/80">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event date, venue, audience size, and requirements..."
                  rows="5"
                  required
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-black text-black transition hover:bg-cyan-300"
              >
                Submit Request
                <Send size={19} />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6">
            <InfoBox
              icon={<Phone />}
              title="Call / WhatsApp"
              text="+94 77 123 4567"
              button="Chat on WhatsApp"
              link="https://wa.me/94771234567"
            />

            <InfoBox
              icon={<Mail />}
              title="Email"
              text="hello@djselva.lk"
              button="Send Email"
              link="mailto:hello@djselva.lk"
            />

            <InfoBox
              icon={<MapPin />}
              title="Location"
              text="Jaffna, Sri Lanka"
              button="View Location"
              link="#"
            />

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 shadow-[0_0_45px_rgba(34,211,238,0.12)] backdrop-blur-2xl"
            >
              <Calendar className="text-cyan-300" size={42} />
              <h3 className="mt-5 text-2xl font-black">Available For</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Weddings",
                  "Club Nights",
                  "Private Parties",
                  "Campus Events",
                  "Corporate Events",
                  "Sound Setup",
                  "Lighting Setup",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-bold text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="pb-16 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-12"
          >
            <MessageCircle className="mx-auto text-cyan-300" size={48} />

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
              Fast Response
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Need quick booking confirmation?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/60">
              For urgent bookings, WhatsApp is the fastest way to contact DJ
              Selva team.
            </p>

            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#22c55e] px-10 py-4 font-black text-white transition hover:scale-105"
            >
              <MessageCircle />
              Chat on WhatsApp
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-white/80">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 transition focus-within:border-cyan-300/50">
        <span className="text-cyan-300">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
        />
      </div>
    </div>
  );
}

function SelectField({ icon, label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-white/80">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 transition focus-within:border-cyan-300/50">
        <span className="text-cyan-300">{icon}</span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-white outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#020617]">
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function InfoBox({ icon, title, text, button, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>

      <h3 className="mt-5 text-2xl font-black">{title}</h3>
      <p className="mt-2 text-white/60">{text}</p>

      <a
        href={link}
        target={link.startsWith("http") ? "_blank" : undefined}
        rel={link.startsWith("http") ? "noreferrer" : undefined}
        className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-cyan-300"
      >
        {button}
      </a>
    </motion.div>
  );
}

export default Contact;