import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Save,
  X,
  ImagePlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "https://dj-selva-events.onrender.com/api";

const emptyForm = {
  eventName: "",
  eventDate: "",
  eventTime: "",
  venue: "",
  city: "",
  capacity: 150,
  eventImage: "",
  normalPrice: 2500,
  vipPrice: 5000,
  couplePrice: 7000,
  backstagePrice: 12000,
  description: "",
  status: "Upcoming",
};

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingEventId, setEditingEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to load events");
        return;
      }

      setEvents(data.events || []);
    } catch (error) {
      console.error("Fetch events error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 800 * 1024) {
      alert("Image size must be below 800KB. Please compress the image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previous) => ({
        ...previous,
        eventImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((previous) => ({
      ...previous,
      eventImage: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const url = editingEventId
        ? `${API_URL}/events/${editingEventId}`
        : `${API_URL}/events`;

      const method = editingEventId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Event save failed");
        return;
      }

      alert(editingEventId ? "Event updated successfully" : "Event created successfully");

      setFormData(emptyForm);
      setEditingEventId(null);
      fetchEvents();
    } catch (error) {
      console.error("Save event error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (eventItem) => {
    setEditingEventId(eventItem.eventId);

    setFormData({
      eventName: eventItem.eventName || "",
      eventDate: eventItem.eventDate || "",
      eventTime: eventItem.eventTime || "",
      venue: eventItem.venue || "",
      city: eventItem.city || "",
      capacity: eventItem.capacity || 150,
      eventImage: eventItem.eventImage || "",
      normalPrice: eventItem.normalPrice || 2500,
      vipPrice: eventItem.vipPrice || 5000,
      couplePrice: eventItem.couplePrice || 7000,
      backstagePrice: eventItem.backstagePrice || 12000,
      description: eventItem.description || "",
      status: eventItem.status || "Upcoming",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Event delete failed");
        return;
      }

      alert("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Delete event error:", error);
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
            onClick={fetchEvents}
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
            Admin Events
          </p>

          <h1 className="text-4xl font-black sm:text-6xl">
            Manage Public Events.
          </h1>

          <p className="mt-4 max-w-2xl text-white/60">
            Create, update, and delete DJ Selva public ticket events. Upload
            event poster/photo to show on the website upcoming events section.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">
                {editingEventId ? "Update Event" : "Add Event"}
              </h2>

              {editingEventId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-full bg-red-400/10 p-3 text-red-300 transition hover:bg-red-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <Input label="Event Name" name="eventName" value={formData.eventName} onChange={handleChange} required />
            <Input label="Event Date" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} required />
            <Input label="Event Time" name="eventTime" type="time" value={formData.eventTime} onChange={handleChange} required />
            <Input label="Venue" name="venue" value={formData.venue} onChange={handleChange} required />
            <Input label="City" name="city" value={formData.city} onChange={handleChange} />

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-white/60">
                Event Image / Poster
              </span>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-black transition hover:bg-white">
                  <ImagePlus size={18} />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <p className="mt-3 text-center text-xs text-white/45">
                  Recommended: 16:9 image, below 800KB.
                </p>
              </div>
            </label>

            {formData.eventImage && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-300/20 bg-black/40">
                <img
                  src={formData.eventImage}
                  alt="Event Preview"
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

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} />
              <Input label="Normal Price" name="normalPrice" type="number" value={formData.normalPrice} onChange={handleChange} />
              <Input label="VIP Price" name="vipPrice" type="number" value={formData.vipPrice} onChange={handleChange} />
              <Input label="Couple Price" name="couplePrice" type="number" value={formData.couplePrice} onChange={handleChange} />
              <Input label="Backstage Price" name="backstagePrice" type="number" value={formData.backstagePrice} onChange={handleChange} />
            </div>

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
                <option>Upcoming</option>
                <option>Active</option>
                <option>Completed</option>
                <option>Cancelled</option>
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
              {editingEventId ? <Save size={20} /> : <Plus size={20} />}
              {editingEventId ? "Update Event" : "Create Event"}
            </button>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <h2 className="mb-6 text-2xl font-black">Event List</h2>

            {events.length === 0 && !isLoading && (
              <div className="rounded-[2rem] border border-orange-300/20 bg-orange-300/10 p-8 text-center">
                <Calendar className="mx-auto text-orange-300" size={48} />
                <h3 className="mt-4 text-2xl font-black text-orange-300">
                  No events created yet
                </h3>
                <p className="mt-3 text-white/60">
                  Admin add pannura events inga show aagum.
                </p>
              </div>
            )}

            <div className="grid gap-5">
              {events.map((eventItem) => (
                <div
                  key={eventItem._id || eventItem.eventId}
                  className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35"
                >
                  {eventItem.eventImage ? (
                    <img
                      src={eventItem.eventImage}
                      alt={eventItem.eventName}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/25">
                      <ImagePlus className="text-cyan-300/70" size={50} />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-cyan-300">
                          {eventItem.eventId}
                        </p>

                        <h3 className="mt-2 text-2xl font-black">
                          {eventItem.eventName}
                        </h3>

                        <div className="mt-4 grid gap-2 text-sm text-white/60 sm:grid-cols-2">
                          <Info icon={<Calendar size={16} />} text={eventItem.eventDate} />
                          <Info icon={<Clock size={16} />} text={eventItem.eventTime} />
                          <Info icon={<MapPin size={16} />} text={`${eventItem.venue}, ${eventItem.city || ""}`} />
                          <Info icon={<Users size={16} />} text={`Capacity: ${eventItem.capacity}`} />
                        </div>
                      </div>

                      <span className="rounded-full bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-300">
                        {eventItem.status}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                      <Price label="Normal" value={eventItem.normalPrice} />
                      <Price label="VIP" value={eventItem.vipPrice} />
                      <Price label="Couple" value={eventItem.couplePrice} />
                      <Price label="Backstage" value={eventItem.backstagePrice} />
                    </div>

                    {eventItem.description && (
                      <p className="mt-4 text-sm text-white/55">
                        {eventItem.description}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleEdit(eventItem)}
                        className="flex items-center gap-2 rounded-full bg-purple-400/10 px-5 py-3 text-sm font-black text-purple-300 transition hover:bg-purple-400 hover:text-white"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(eventItem.eventId)}
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

function Input({ label, name, value, onChange, type = "text", required = false }) {
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
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-cyan-300"
      />
    </label>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-cyan-300">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Price({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2 text-white/50">
        <Ticket size={15} />
        <span>{label}</span>
      </div>

      <p className="mt-2 font-black text-cyan-300">
        Rs. {Number(value || 0).toLocaleString()}
      </p>
    </div>
  );
}

export default ManageEvents;