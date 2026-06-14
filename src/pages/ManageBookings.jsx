import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Ticket,
  User,
  Calendar,
  QrCode,
  ShieldCheck,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function ManageBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to fetch bookings");
        return;
      }

      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const value = searchTerm.toLowerCase();

    return (
      booking.bookingId?.toLowerCase().includes(value) ||
      booking.name?.toLowerCase().includes(value) ||
      booking.phone?.toLowerCase().includes(value) ||
      booking.email?.toLowerCase().includes(value) ||
      booking.event?.toLowerCase().includes(value) ||
      booking.ticket?.toLowerCase().includes(value)
    );
  });

  const confirmPayment = async (bookingId) => {
    try {
      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/confirm-payment`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to confirm payment");
        return;
      }

      fetchBookings();
    } catch (error) {
      console.error("Confirm payment error:", error);
      alert("Backend connection failed.");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
        method: "PUT",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to cancel booking");
        return;
      }

      fetchBookings();
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert("Backend connection failed.");
    }
  };

  const deleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to delete booking");
        return;
      }

      fetchBookings();
    } catch (error) {
      console.error("Delete booking error:", error);
      alert("Backend connection failed.");
    }
  };

  const totalBookings = bookings.length;

  const paidBookings = bookings.filter(
    (booking) => booking.paymentStatus === "Paid"
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.paymentStatus === "Pending"
  ).length;

  const totalRevenue = bookings
    .filter((booking) => booking.paymentStatus === "Paid")
    .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white sm:px-6">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_55%,#000_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="mx-auto max-w-7xl">
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
                MANAGE BOOKINGS
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
            Booking Management
          </p>

          <h1 className="text-4xl font-black sm:text-5xl md:text-7xl">
            Manage customer bookings.
          </h1>

          <p className="mt-5 max-w-2xl text-white/60">
            Customer booking submit pannina booking inga automatically show
            aagum. Admin payment confirm / cancel / delete panna mudiyum.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox
            icon={<Ticket />}
            title="Total Bookings"
            value={totalBookings}
            text="All reservations"
            color="cyan"
          />

          <StatBox
            icon={<CheckCircle />}
            title="Paid"
            value={paidBookings}
            text="Confirmed payments"
            color="green"
          />

          <StatBox
            icon={<Clock />}
            title="Pending"
            value={pendingBookings}
            text="Need confirmation"
            color="orange"
          />

          <StatBox
            icon={<ShieldCheck />}
            title="Revenue"
            value={`Rs. ${totalRevenue.toLocaleString()}`}
            text="Paid bookings only"
            color="purple"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-4 transition focus-within:border-cyan-300/50">
              <Search className="text-cyan-300" size={20} />

              <input
                type="text"
                placeholder="Search by Booking ID, name, phone, email, event, or ticket type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
              />
            </div>

            <button
              onClick={fetchBookings}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-black text-white transition hover:bg-white hover:text-black"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center">
            <RefreshCw className="mx-auto animate-spin text-cyan-300" size={48} />
            <h3 className="mt-4 text-2xl font-black">Loading bookings...</h3>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-5">
              {filteredBookings.map((booking, index) => (
                <BookingCard
                  key={booking._id || booking.bookingId}
                  booking={booking}
                  index={index}
                  confirmPayment={confirmPayment}
                  cancelBooking={cancelBooking}
                  deleteBooking={deleteBooking}
                />
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center">
                <Search className="mx-auto text-white/30" size={48} />

                <h3 className="mt-4 text-2xl font-black">No bookings found</h3>

                <p className="mt-2 text-white/50">
                  Try searching another booking ID or customer name.
                </p>
              </div>
            )}
          </>
        )}

        <div className="h-16" />
      </div>
    </div>
  );
}

function BookingCard({
  booking,
  index,
  confirmPayment,
  cancelBooking,
  deleteBooking,
}) {
  const isPaid = booking.paymentStatus === "Paid";
  const isCancelled = booking.bookingStatus === "Cancelled";
  const isCheckedIn = booking.entryStatus === "Checked-in";

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_45px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition hover:border-cyan-300/30 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-300">
              {booking.bookingId}
            </span>

            <StatusBadge type={booking.paymentStatus} />
            <StatusBadge type={booking.bookingStatus} />
            <StatusBadge type={booking.entryStatus} />
          </div>

          <h2 className="text-2xl font-black">{booking.name}</h2>

          <div className="mt-4 grid gap-3 text-sm text-white/65 sm:grid-cols-2 lg:grid-cols-3">
            <InfoLine icon={<Phone size={16} />} text={booking.phone} />
            <InfoLine icon={<User size={16} />} text={booking.email} />
            <InfoLine icon={<Calendar size={16} />} text={booking.date} />
            <InfoLine icon={<Ticket size={16} />} text={booking.ticket} />
            <InfoLine
              icon={<User size={16} />}
              text={`${booking.quantity} ticket(s)`}
            />
            <InfoLine icon={<QrCode size={16} />} text={booking.event} />
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/55">
            <p>
              <span className="font-bold text-white/75">Venue:</span>{" "}
              {booking.venue || "Not provided"}
            </p>

            <p className="mt-2">
              <span className="font-bold text-white/75">Payment Method:</span>{" "}
              {booking.paymentMethod || "Not provided"}
            </p>

            {booking.notes && (
              <p className="mt-2">
                <span className="font-bold text-white/75">Notes:</span>{" "}
                {booking.notes}
              </p>
            )}
          </div>
        </div>

        <div className="w-full rounded-3xl border border-white/10 bg-black/35 p-5 sm:w-auto sm:min-w-[260px]">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/45">
            Amount
          </p>

          <h3 className="mt-2 text-3xl font-black text-cyan-300">
            Rs. {Number(booking.amount || 0).toLocaleString()}
          </h3>

          <div className="mt-5 space-y-3">
            {!isPaid && !isCancelled && (
              <button
                onClick={() => confirmPayment(booking.bookingId)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-black text-black transition hover:bg-cyan-300"
              >
                <CheckCircle size={18} />
                Confirm Payment
              </button>
            )}

            {!isCancelled && (
              <button
                onClick={() => cancelBooking(booking.bookingId)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-5 py-3 font-black text-red-300 transition hover:bg-red-400 hover:text-white"
              >
                <XCircle size={18} />
                Cancel Booking
              </button>
            )}

            <button
              onClick={() => deleteBooking(booking.bookingId)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-black text-white/80 transition hover:bg-white hover:text-black"
            >
              <Trash2 size={18} />
              Delete
            </button>

            {isCheckedIn && (
              <div className="rounded-2xl border border-purple-300/20 bg-purple-300/10 p-3 text-center text-sm font-black text-purple-300">
                Entry completed
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatBox({ icon, title, value, text, color }) {
  const colors = {
    cyan: "bg-cyan-300/10 text-cyan-300",
    green: "bg-green-300/10 text-green-300",
    orange: "bg-orange-300/10 text-orange-300",
    purple: "bg-purple-300/10 text-purple-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-sm font-bold text-white/50">{title}</p>
      <h3 className="mt-2 text-4xl font-black">{value}</h3>
      <p className="mt-2 text-sm text-white/45">{text}</p>
    </motion.div>
  );
}

function InfoLine({ icon, text }) {
  return (
    <p className="flex items-center gap-2 break-words">
      <span className="text-cyan-300">{icon}</span>
      {text || "Not provided"}
    </p>
  );
}

function StatusBadge({ type }) {
  let className = "bg-white/10 text-white/70";

  if (type === "Paid" || type === "Confirmed") {
    className = "bg-green-400/10 text-green-300";
  }

  if (type === "Pending") {
    className = "bg-orange-400/10 text-orange-300";
  }

  if (type === "Cancelled") {
    className = "bg-red-400/10 text-red-300";
  }

  if (type === "Checked-in") {
    className = "bg-purple-400/10 text-purple-300";
  }

  if (type === "Not Checked-in") {
    className = "bg-cyan-400/10 text-cyan-300";
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>
      {type}
    </span>
  );
}

export default ManageBookings;