import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Music,
  Plus,
  Trash2,
  Edit,
  Ticket,
  Users,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";

function ManageEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "DJ Selva Mega Night 2026",
      date: "2026-06-27",
      time: "7:00 PM",
      venue: "Jaffna, Sri Lanka",
      normalPrice: 2500,
      vipPrice: 5000,
      couplePrice: 7000,
      backstagePrice: 12000,
      seats: 150,
      status: "Booking Open",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    normalPrice: "",
    vipPrice: "",
    couplePrice: "",
    backstagePrice: "",
    seats: "",
    status: "Booking Open",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
      venue: "",
      normalPrice: "",
      vipPrice: "",
      couplePrice: "",
      backstagePrice: "",
      seats: "",
      status: "Booking Open",
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setEvents(
        events.map((event) =>
          event.id === editingId
            ? {
                ...formData,
                id: editingId,
                normalPrice: Number(formData.normalPrice),
                vipPrice: Number(formData.vipPrice),
                couplePrice: Number(formData.couplePrice),
                backstagePrice: Number(formData.backstagePrice),
                seats: Number(formData.seats),
              }
            : event
        )
      );
    } else {
      const newEvent = {
        ...formData,
        id: Date.now(),
        normalPrice: Number(formData.normalPrice),
        vipPrice: Number(formData.vipPrice),
        couplePrice: Number(formData.couplePrice),
        backstagePrice: Number(formData.backstagePrice),
        seats: Number(formData.seats),
      };

      setEvents([newEvent, ...events]);
    }

    resetForm();
  };

  const handleEdit = (event) => {
    setEditingId(event.id);

    setFormData({
      name: event.name,
      date: event.date,
      time: event.time,
      venue: event.venue,
      normalPrice: event.normalPrice,
      vipPrice: event.vipPrice,
      couplePrice: event.couplePrice,
      backstagePrice: event.backstagePrice,
      seats: event.seats,
      status: event.status,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Top Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={18} />
            Back Dashboard
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
                MANAGE EVENTS
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Event Management
          </p>

          <h1 className="text-4xl font-black sm:text-5xl md:text-7xl">
            Manage DJ events.
          </h1>

          <p className="mt-5 max-w-2xl text-white/60">
            Add upcoming DJ events, update ticket prices, set venue details,
            control booking status, and manage available seats.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          {/* Add / Edit Form */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
              {editingId ? "Edit Event" : "Add Event"}
            </p>

            <h2 className="text-3xl font-black">
              {editingId ? "Update event details." : "Create new event."}
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <InputField
                icon={<Music size={18} />}
                label="Event Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="DJ Selva Mega Night 2026"
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<Calendar size={18} />}
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

                <InputField
                  icon={<Clock size={18} />}
                  label="Time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="7:00 PM"
                  required
                />
              </div>

              <InputField
                icon={<MapPin size={18} />}
                label="Venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Jaffna, Sri Lanka"
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<Ticket size={18} />}
                  label="Normal Price"
                  name="normalPrice"
                  type="number"
                  value={formData.normalPrice}
                  onChange={handleChange}
                  placeholder="2500"
                  required
                />

                <InputField
                  icon={<Ticket size={18} />}
                  label="VIP Price"
                  name="vipPrice"
                  type="number"
                  value={formData.vipPrice}
                  onChange={handleChange}
                  placeholder="5000"
                  required
                />

                <InputField
                  icon={<Ticket size={18} />}
                  label="Couple Price"
                  name="couplePrice"
                  type="number"
                  value={formData.couplePrice}
                  onChange={handleChange}
                  placeholder="7000"
                  required
                />

                <InputField
                  icon={<Ticket size={18} />}
                  label="Backstage Price"
                  name="backstagePrice"
                  type="number"
                  value={formData.backstagePrice}
                  onChange={handleChange}
                  placeholder="12000"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<Users size={18} />}
                  label="Total Seats"
                  name="seats"
                  type="number"
                  value={formData.seats}
                  onChange={handleChange}
                  placeholder="150"
                  required
                />

                <SelectField
                  label="Booking Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={["Booking Open", "Booking Closed", "Sold Out"]}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-4 font-black text-black transition hover:bg-cyan-300"
                >
                  {editingId ? <Save size={19} /> : <Plus size={19} />}
                  {editingId ? "Update Event" : "Add Event"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-6 py-4 font-bold text-white transition hover:bg-white hover:text-black"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Event List */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
                  Events
                </p>
                <h2 className="text-3xl font-black">Event List</h2>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-black text-cyan-300">
                {events.length} Events
              </span>
            </div>

            <div className="space-y-5">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="rounded-[2rem] border border-white/10 bg-black/35 p-5 transition hover:border-cyan-300/30"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 inline-flex rounded-full bg-green-400/10 px-4 py-2 text-xs font-black text-green-300">
                        {event.status}
                      </div>

                      <h3 className="text-2xl font-black">{event.name}</h3>

                      <div className="mt-4 grid gap-3 text-sm text-white/60 sm:grid-cols-2">
                        <p className="flex items-center gap-2">
                          <Calendar size={16} className="text-cyan-300" />
                          {formatDate(event.date)}
                        </p>

                        <p className="flex items-center gap-2">
                          <Clock size={16} className="text-purple-300" />
                          {event.time}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPin size={16} className="text-cyan-300" />
                          {event.venue}
                        </p>

                        <p className="flex items-center gap-2">
                          <Users size={16} className="text-purple-300" />
                          {event.seats} seats
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition hover:bg-cyan-300 hover:text-black"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10 text-red-300 transition hover:bg-red-400 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-4">
                    <PriceBox name="Normal" price={event.normalPrice} />
                    <PriceBox name="VIP" price={event.vipPrice} />
                    <PriceBox name="Couple" price={event.couplePrice} />
                    <PriceBox name="Backstage" price={event.backstagePrice} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-white/80">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition focus:border-cyan-300/50"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#020617]">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function PriceBox({ name, price }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-bold text-white/45">{name}</p>
      <h4 className="mt-1 font-black text-cyan-300">
        Rs. {Number(price).toLocaleString()}
      </h4>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default ManageEvents;