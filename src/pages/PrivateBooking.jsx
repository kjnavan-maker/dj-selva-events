import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Music,
  Phone,
  Users,
  Wallet,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";
const API_URL = "https://dj-selva-events.onrender.com/api";

function PrivateBooking() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "Birthday Party",
    eventDate: "",
    eventLocation: "",
    expectedCrowd: "",
    requiredTime: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRequest, setConfirmedRequest] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/private-bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          eventLocation: formData.eventLocation,
          expectedCrowd: Number(formData.expectedCrowd) || 0,
          requiredTime: formData.requiredTime,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Private booking request failed");
        return;
      }

      setConfirmedRequest(data.privateBooking);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Private booking error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedRequest) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
        <Background />

        <div className="mx-auto max-w-5xl">
          <TopBar />

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mx-auto rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_0_55px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-10"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-300/10 text-green-300 shadow-[0_0_50px_rgba(134,239,172,0.15)]">
              <CheckCircle size={48} />
            </div>

            <p className="mt-8 text-sm font-black uppercase tracking-[0.4em] text-green-300">
              Request Submitted
            </p>

            <h1 className="mt-5 text-4xl font-black sm:text-6xl">
              DJ Selva booking request received.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-white/60">
              DJ Selva team will contact you soon to discuss your event details,
              availability, pricing and confirmation.
            </p>

            <div className="mx-auto mt-8 max-w-3xl rounded-[1.8rem] border border-white/10 bg-black/35 p-5 text-left sm:p-7">
              <DetailRow label="Request ID" value={confirmedRequest.requestId} />
              <DetailRow label="Name" value={confirmedRequest.fullName} />
              <DetailRow label="Phone" value={confirmedRequest.phone} />
              <DetailRow label="Email" value={confirmedRequest.email} />
              <DetailRow label="Event Type" value={confirmedRequest.eventType} />
              <DetailRow label="Event Date" value={confirmedRequest.eventDate} />
              <DetailRow
                label="Location"
                value={confirmedRequest.eventLocation}
              />
              <DetailRow
                label="Expected Crowd"
                value={confirmedRequest.expectedCrowd}
              />
              <DetailRow
                label="Required Time"
                value={confirmedRequest.requiredTime || "Not provided"}
              />
              <DetailRow
                label="Budget"
                value={confirmedRequest.budget || "Not provided"}
              />
              <DetailRow label="Status" value={confirmedRequest.status} />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setConfirmedRequest(null)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 font-black text-white transition hover:bg-white hover:text-black"
              >
                Submit Another Request
              </button>

              <Link
                to="/"
                className="rounded-full bg-cyan-300 px-7 py-4 font-black text-black transition hover:bg-white"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      <Background />

      <div className="mx-auto max-w-7xl">
        <TopBar />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-8 lg:h-fit"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Private Event Booking
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
              Book DJ Selva for your event.
            </h1>

            <p className="mt-5 max-w-2xl text-white/60">
              Weddings, birthdays, college events, hotel parties, private DJ
              nights and corporate events. Submit your request and DJ Selva team
              will contact you for confirmation.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <h2 className="text-2xl font-black">Suitable For</h2>

              <div className="mt-6 space-y-4">
                <ServiceLine title="Wedding Functions" />
                <ServiceLine title="Birthday Parties" />
                <ServiceLine title="College Events" />
                <ServiceLine title="Hotel / Club Nights" />
                <ServiceLine title="Corporate Events" />
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 backdrop-blur-2xl">
              <h3 className="flex items-center gap-2 text-xl font-black text-cyan-300">
                <CheckCircle size={22} />
                Booking Flow
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/65">
                <p>1. Customer submits private event request.</p>
                <p>2. DJ Selva team contacts customer.</p>
                <p>3. Date, venue, budget and timing confirmed.</p>
                <p>4. Admin updates request status.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
              Request Form
            </p>

            <h2 className="text-3xl font-black">Event Details</h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <InputField
                icon={<User size={18} />}
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<Phone size={18} />}
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0771234567"
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
                  required
                />
              </div>

              <SelectField
                icon={<Music size={18} />}
                label="Event Type"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                options={[
                  "Birthday Party",
                  "Wedding Function",
                  "College Event",
                  "Hotel / Club Night",
                  "Corporate Event",
                  "Private DJ Night",
                  "Other Event",
                ]}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<Calendar size={18} />}
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />

                <InputField
                  icon={<Users size={18} />}
                  label="Expected Crowd"
                  name="expectedCrowd"
                  type="number"
                  min="1"
                  value={formData.expectedCrowd}
                  onChange={handleChange}
                  placeholder="150"
                />
              </div>

              <InputField
                icon={<MapPin size={18} />}
                label="Event Location"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                placeholder="Hall / Hotel / City"
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<Clock size={18} />}
                  label="Required Time"
                  name="requiredTime"
                  value={formData.requiredTime}
                  onChange={handleChange}
                  placeholder="7.00 PM - 11.00 PM"
                />

                <InputField
                  icon={<Wallet size={18} />}
                  label="Budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Rs. 50,000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/80">
                  Message / Special Request
                </label>

                <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 transition focus-within:border-cyan-300/50">
                  <span className="pt-1 text-cyan-300">
                    <MessageSquare size={18} />
                  </span>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event..."
                    rows="4"
                    className="w-full resize-none bg-transparent text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting Request..." : "Submit Event Request"}
                <Music size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />
    </div>
  );
}

function TopBar() {
  return (
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
            PRIVATE BOOKING
          </p>
        </div>
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
  min,
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
          min={min}
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

function ServiceLine({ title }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/35 p-4">
      <span className="font-bold text-white/70">{title}</span>
      <CheckCircle size={18} className="text-cyan-300" />
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/10 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-bold text-white/45">{label}</span>
      <span className="font-black text-white sm:text-right">{value}</span>
    </div>
  );
}

export default PrivateBooking;