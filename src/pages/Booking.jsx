import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Download,
  Edit,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Ticket,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";


const API_URL = "https://dj-selva-events.onrender.com/api";

function Booking() {
  const ticketRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventId: "",
    ticketType: "Normal Ticket",
    quantity: 1,
    paymentMethod: "Cash / Bank Transfer",
    notes: "",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticketPrices = {
    "Normal Ticket": Number(selectedEvent?.normalPrice || 0),
    "VIP Ticket": Number(selectedEvent?.vipPrice || 0),
    "Couple Ticket": Number(selectedEvent?.couplePrice || 0),
    "Backstage Pass": Number(selectedEvent?.backstagePrice || 0),
  };

  const selectedPrice = ticketPrices[formData.ticketType] || 0;
  const totalAmount = selectedPrice * Number(formData.quantity || 1);

  const fetchEvents = async () => {
    try {
      setIsLoadingEvents(true);

      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to load events");
        return;
      }

      const activeEvents = (data.events || []).filter(
        (eventItem) =>
          eventItem.status === "Upcoming" || eventItem.status === "Active"
      );

      setEvents(activeEvents);

      if (activeEvents.length > 0) {
        setSelectedEvent(activeEvents[0]);
        setFormData((previous) => ({
          ...previous,
          eventId: activeEvents[0].eventId,
        }));
      }
    } catch (error) {
      console.error("Event fetch error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const generateQrText = (booking) => {
    return `${booking.bookingId} | ${booking.name} | ${booking.event} | ${booking.ticket} | ${booking.quantity} ticket(s) | Rs. ${booking.amount}`;
  };

  const createQRCodeUrl = (booking) => {
    const qrText = generateQrText(booking);

    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      qrText
    )}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const eventItem = events.find((item) => item.eventId === eventId);

    setSelectedEvent(eventItem || null);

    setFormData((previous) => ({
      ...previous,
      eventId,
      ticketType: "Normal Ticket",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent) {
      alert("Please select an event");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          event: selectedEvent.eventName,
          date: selectedEvent.eventDate,
          venue: `${selectedEvent.venue || ""}${
            selectedEvent.city ? `, ${selectedEvent.city}` : ""
          }`,
          ticket: formData.ticketType,
          quantity: Number(formData.quantity),
          amount: Number(totalAmount),
          paymentMethod: formData.paymentMethod,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Booking failed");
        return;
      }

      setConfirmedBooking(data.booking);
      setBookingConfirmed(true);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      console.error("Booking API error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBooking = () => {
    setBookingConfirmed(false);
    setConfirmedBooking(null);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#030712",
        scale: 2,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `${confirmedBooking.bookingId}-ticket.png`;
      link.click();
    } catch (error) {
      alert("Ticket download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (bookingConfirmed && confirmedBooking) {
    const qrUrl = createQRCodeUrl(confirmedBooking);

    return (
      <div className="min-h-screen overflow-x-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
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

            <div className="flex items-center gap-3">
              <img
                src="/dj-selva-logo.png"
                alt="DJ Selva Logo"
                className="h-12 w-12 rounded-full object-contain"
              />

              <div>
                <h2 className="font-black leading-none">DJ Selva</h2>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-cyan-300">
                  BOOKING
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl"
          >
            <div
              ref={ticketRef}
              className="rounded-[2rem] border border-white/10 bg-[#0b101c] p-5 shadow-[0_0_65px_rgba(0,0,0,0.45)] sm:rounded-[2.5rem] sm:p-8 md:p-12"
            >
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-300 shadow-[0_0_55px_rgba(34,211,238,0.2)]">
                  <QrCode size={46} />
                </div>

                <p className="mt-8 text-sm font-black uppercase tracking-[0.5em] text-cyan-300">
                  Booking Confirmed
                </p>

                <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
                  Your ticket is reserved.
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
                  This is a booking confirmation preview. DJ Selva team will
                  contact you soon to verify the payment and issue the final QR
                  ticket.
                </p>
              </div>

              <div className="mt-10 rounded-[1.8rem] border border-white/10 bg-black/40 p-5 sm:p-7">
                <TicketRow label="Booking ID" value={confirmedBooking.bookingId} />
                <TicketRow label="Name" value={confirmedBooking.name} />
                <TicketRow label="Phone" value={confirmedBooking.phone} />
                <TicketRow label="Email" value={confirmedBooking.email} />
                <TicketRow label="Event" value={confirmedBooking.event} />
                <TicketRow label="Date" value={confirmedBooking.date} />
                <TicketRow label="Venue" value={confirmedBooking.venue} />
                <TicketRow label="Ticket" value={confirmedBooking.ticket} />
                <TicketRow label="Quantity" value={confirmedBooking.quantity} />
                <TicketRow
                  label="Payment Method"
                  value={confirmedBooking.paymentMethod}
                />
                <TicketRow
                  label="Payment Status"
                  value={confirmedBooking.paymentStatus}
                />
                <TicketRow
                  label="Booking Status"
                  value={confirmedBooking.bookingStatus}
                />
                <TicketRow
                  label="Total"
                  value={`Rs. ${Number(
                    confirmedBooking.amount
                  ).toLocaleString()}`}
                  highlight
                />
              </div>

              <div className="mt-10 flex flex-col items-center">
                <div className="rounded-[1.5rem] bg-white p-5 shadow-[0_0_45px_rgba(255,255,255,0.08)]">
                  <img
                    src={qrUrl}
                    alt="Booking QR Code"
                    className="h-56 w-56 object-contain"
                    crossOrigin="anonymous"
                  />
                </div>

                <p className="mt-5 max-w-lg text-center text-sm leading-relaxed text-white/50">
                  QR code contains your Booking ID and ticket details. Please
                  show this ticket at the event entrance.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <button
                onClick={downloadTicket}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-4 font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download size={19} />
                {isDownloading ? "Downloading..." : "Download Ticket"}
              </button>

              <button
                onClick={handleEditBooking}
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-white transition hover:bg-white hover:text-black"
              >
                <Edit size={19} />
                Edit Booking
              </button>

              <Link
                to="/"
                className="flex items-center justify-center rounded-full bg-white px-6 py-4 font-black text-black transition hover:bg-cyan-300"
              >
                Back to Home
              </Link>
            </div>

            <div className="h-20" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
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

          <div className="flex items-center gap-3">
            <img
              src="/dj-selva-logo.png"
              alt="DJ Selva Logo"
              className="h-12 w-12 rounded-full object-contain"
            />

            <div>
              <h2 className="font-black leading-none">DJ Selva</h2>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-cyan-300">
                BOOKING
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-8 lg:h-fit"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
              Ticket Booking
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
              Reserve your event ticket.
            </h1>

            <p className="mt-5 max-w-2xl text-white/60">
              Select an event created by admin, choose ticket type, and reserve
              your ticket.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <h2 className="text-2xl font-black">Ticket Prices</h2>

              <div className="mt-6 space-y-4">
                <PriceLine
                  name="Normal Ticket"
                  price={`Rs. ${Number(
                    selectedEvent?.normalPrice || 0
                  ).toLocaleString()}`}
                />
                <PriceLine
                  name="VIP Ticket"
                  price={`Rs. ${Number(
                    selectedEvent?.vipPrice || 0
                  ).toLocaleString()}`}
                />
                <PriceLine
                  name="Couple Ticket"
                  price={`Rs. ${Number(
                    selectedEvent?.couplePrice || 0
                  ).toLocaleString()}`}
                />
                <PriceLine
                  name="Backstage Pass"
                  price={`Rs. ${Number(
                    selectedEvent?.backstagePrice || 0
                  ).toLocaleString()}`}
                />
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 backdrop-blur-2xl">
              <h3 className="flex items-center gap-2 text-xl font-black text-cyan-300">
                <CheckCircle size={22} />
                Booking Flow
              </h3>

              <div className="mt-5 space-y-3 text-sm text-white/65">
                <p>1. Customer fill booking form.</p>
                <p>2. QR ticket confirmation download pannalaam.</p>
                <p>3. Admin payment verify pannuvaar.</p>
                <p>4. Event day QR scan pannitu entry confirm pannuvanga.</p>
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
              Booking Form
            </p>

            <h2 className="text-3xl font-black">Customer Details</h2>

            {isLoadingEvents && (
              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-300">
                Loading events...
              </div>
            )}

            {!isLoadingEvents && events.length === 0 && (
              <div className="mt-6 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-4 text-sm font-bold text-orange-300">
                No active events available. Admin must create an event first.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <InputField
                icon={<User size={18} />}
                label="Full Name"
                name="name"
                value={formData.name}
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
                icon={<Calendar size={18} />}
                label="Select Event"
                name="eventId"
                value={formData.eventId}
                onChange={handleEventChange}
                options={events.map((eventItem) => ({
                  value: eventItem.eventId,
                  label: `${eventItem.eventName} - ${eventItem.eventDate}`,
                }))}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <DisplayField
                  icon={<Calendar size={18} />}
                  label="Event Date"
                  value={selectedEvent?.eventDate || "Select event"}
                />

                <DisplayField
                  icon={<MapPin size={18} />}
                  label="Venue"
                  value={
                    selectedEvent
                      ? `${selectedEvent.venue}${
                          selectedEvent.city ? `, ${selectedEvent.city}` : ""
                        }`
                      : "Select event"
                  }
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  icon={<Ticket size={18} />}
                  label="Ticket Type"
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleChange}
                  options={[
                    "Normal Ticket",
                    "VIP Ticket",
                    "Couple Ticket",
                    "Backstage Pass",
                  ]}
                />

                <InputField
                  icon={<Ticket size={18} />}
                  label="Quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="1"
                  required
                />
              </div>

              <SelectField
                icon={<CheckCircle size={18} />}
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                options={[
                  "Cash / Bank Transfer",
                  "Bank Transfer",
                  "Cash Payment",
                  "Online Payment",
                ]}
              />

              <div>
                <label className="mb-2 block text-sm font-bold text-white/80">
                  Notes / Special Request
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Optional message..."
                  rows="4"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50"
                />
              </div>

              <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                      Total Amount
                    </p>
                    <h3 className="mt-2 text-3xl font-black">
                      Rs. {totalAmount.toLocaleString()}
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/35 text-cyan-300">
                    <Ticket size={28} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoadingEvents || events.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Saving Booking..." : "Reserve Ticket"}
                <Ticket size={20} />
              </button>
            </form>
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

function DisplayField({ icon, label, value }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-white/80">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
        <span className="text-cyan-300">{icon}</span>
        <span className="text-white/80">{value}</span>
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
          {options.map((option) => {
            const valueText = typeof option === "string" ? option : option.value;
            const labelText = typeof option === "string" ? option : option.label;

            return (
              <option key={valueText} value={valueText} className="bg-[#020617]">
                {labelText}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

function PriceLine({ name, price }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/35 p-4">
      <span className="font-bold text-white/70">{name}</span>
      <span className="font-black text-cyan-300">{price}</span>
    </div>
  );
}

function TicketRow({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/10 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-bold text-white/45">{label}</span>
      <span
        className={`font-black ${
          highlight ? "text-2xl text-cyan-300" : "text-white"
        } sm:text-right`}
      >
        {value}
      </span>
    </div>
  );
}

export default Booking;