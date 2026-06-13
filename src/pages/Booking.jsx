import { useRef, useState } from "react";
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

function Booking() {
  const ticketRef = useRef(null);

  const ticketPrices = {
    "Normal Ticket": 2500,
    "VIP Ticket": 5000,
    "Couple Ticket": 7000,
    "Backstage Pass": 12000,
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    event: "DJ Selva Mega Night 2026",
    eventDate: "27 June 2026",
    venue: "Jaffna, Sri Lanka",
    ticketType: "Normal Ticket",
    quantity: 1,
    paymentMethod: "Cash / Bank Transfer",
    notes: "",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const selectedPrice = ticketPrices[formData.ticketType];
  const totalAmount = selectedPrice * Number(formData.quantity || 1);

  const generateBookingId = () => {
    return `DJS-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const generateQrText = (booking) => {
    return `${booking.id} | ${booking.name} | ${booking.event} | ${booking.ticket} | ${booking.quantity} ticket(s) | Rs. ${booking.amount}`;
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

  const saveBookingToLocalStorage = (booking) => {
    const oldBookings =
      JSON.parse(localStorage.getItem("djSelvaBookings")) || [];

    const updatedBookings = [booking, ...oldBookings];

    localStorage.setItem("djSelvaBookings", JSON.stringify(updatedBookings));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const booking = {
      id: generateBookingId(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      event: formData.event,
      date: formData.eventDate,
      venue: formData.venue,
      ticket: formData.ticketType,
      quantity: Number(formData.quantity),
      amount: totalAmount,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      paymentStatus: "Pending",
      bookingStatus: "Pending",
      entryStatus: "Not Checked-in",
      createdAt: new Date().toISOString(),
    };

    saveBookingToLocalStorage(booking);
    setConfirmedBooking(booking);
    setBookingConfirmed(true);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
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
      link.download = `${confirmedBooking.id}-ticket.png`;
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
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
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
                  BOOKING
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Ticket */}
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

              {/* Scroll-friendly Ticket Details */}
              <div className="mt-10 rounded-[1.8rem] border border-white/10 bg-black/40 p-5 sm:p-7">
                <TicketRow label="Booking ID" value={confirmedBooking.id} />
                <TicketRow label="Name" value={confirmedBooking.name} />
                <TicketRow label="Phone" value={confirmedBooking.phone} />
                <TicketRow label="Email" value={confirmedBooking.email} />
                <TicketRow label="Event" value={confirmedBooking.event} />
                <TicketRow label="Date" value={confirmedBooking.date} />
                <TicketRow label="Venue" value={confirmedBooking.venue} />
                <TicketRow label="Ticket" value={confirmedBooking.ticket} />
                <TicketRow
                  label="Quantity"
                  value={confirmedBooking.quantity}
                />
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

              {/* QR Area */}
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

            {/* Buttons outside downloadable ticket */}
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
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
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
                BOOKING
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          {/* Left Content */}
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
              Fill the booking form and reserve your ticket. After submission,
              you can download your QR ticket confirmation.
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <h2 className="text-2xl font-black">Ticket Prices</h2>

              <div className="mt-6 space-y-4">
                <PriceLine name="Normal Ticket" price="Rs. 2,500" />
                <PriceLine name="VIP Ticket" price="Rs. 5,000" />
                <PriceLine name="Couple Ticket" price="Rs. 7,000" />
                <PriceLine name="Backstage Pass" price="Rs. 12,000" />
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

          {/* Booking Form */}
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
                name="event"
                value={formData.event}
                onChange={handleChange}
                options={[
                  "DJ Selva Mega Night 2026",
                  "Bass Drop Party",
                  "Glow Festival",
                ]}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  icon={<Calendar size={18} />}
                  label="Event Date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  placeholder="27 June 2026"
                  required
                />

                <InputField
                  icon={<MapPin size={18} />}
                  label="Venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Jaffna, Sri Lanka"
                  required
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

              {/* Total Box */}
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
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-cyan-300"
              >
                Reserve Ticket
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