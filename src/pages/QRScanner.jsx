import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  QrCode,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Calendar,
  Ticket,
  MapPin,
  ShieldCheck,
  Clock,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function QRScanner() {
  const [bookingId, setBookingId] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    const searchId = bookingId.trim().toUpperCase();

    if (!searchId) {
      setMessage("Please enter booking ID.");
      setScanResult(null);
      return;
    }

    try {
      setIsVerifying(true);
      setMessage("");
      setScanResult(null);

      const response = await fetch(`${API_URL}/bookings/${searchId}`);
      const data = await response.json();

      if (!data.success) {
        setScanResult(null);
        setMessage(data.message || "Invalid Booking ID. Ticket not found.");
        return;
      }

      const foundBooking = data.booking;
      setScanResult(foundBooking);

      if (foundBooking.bookingStatus === "Cancelled") {
        setMessage("This booking has been cancelled.");
        return;
      }

      if (foundBooking.paymentStatus !== "Paid") {
        setMessage("Payment is still pending. Entry not allowed.");
        return;
      }

      if (foundBooking.bookingStatus !== "Confirmed") {
        setMessage("Booking is not confirmed yet.");
        return;
      }

      if (foundBooking.entryStatus === "Checked-in") {
        setMessage("This ticket is already checked-in.");
        return;
      }

      setMessage("Valid ticket. Entry allowed.");
    } catch (error) {
      console.error("Verify ticket error:", error);
      setScanResult(null);
      setMessage("Backend connection failed. Please check server.");
    } finally {
      setIsVerifying(false);
    }
  };

  const markCheckedIn = async () => {
    if (!scanResult) return;

    try {
      setIsCheckingIn(true);

      const response = await fetch(
        `${API_URL}/bookings/${scanResult.bookingId}/check-in`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!data.success) {
        setMessage(data.message || "Check-in failed.");
        return;
      }

      setScanResult(data.booking);
      setMessage("Entry marked successfully. Customer checked-in.");
    } catch (error) {
      console.error("Check-in error:", error);
      setMessage("Backend connection failed. Please check server.");
    } finally {
      setIsCheckingIn(false);
    }
  };

  const clearScan = () => {
    setBookingId("");
    setScanResult(null);
    setMessage("");
  };

  const canCheckIn =
    scanResult &&
    scanResult.paymentStatus === "Paid" &&
    scanResult.bookingStatus === "Confirmed" &&
    scanResult.entryStatus !== "Checked-in";

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
                QR ENTRY SCAN
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
            Ticket Verification
          </p>

          <h1 className="text-4xl font-black sm:text-5xl md:text-7xl">
            Scan and verify entry.
          </h1>

          <p className="mt-5 max-w-2xl text-white/60">
            Enter customer Booking ID from QR ticket. System will verify payment,
            booking confirmation, and entry status from MongoDB database.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          {/* Scanner Box */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-300 shadow-[0_0_55px_rgba(34,211,238,0.2)]">
              <QrCode size={48} />
            </div>

            <h2 className="mt-6 text-center text-3xl font-black">
              QR Ticket Scanner
            </h2>

            <p className="mt-3 text-center text-white/55">
              Demo version: type Booking ID from customer QR ticket.
            </p>

            {/* Fake Scan Animation */}
            <div className="relative mx-auto mt-8 flex h-64 max-w-sm items-center justify-center overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-black/45">
              <div className="absolute inset-6 rounded-2xl border border-white/10" />

              <motion.div
                animate={{ y: [-90, 90, -90] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-1 w-[80%] rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.9)]"
              />

              <QrCode size={110} className="text-white/15" />
            </div>

            <form onSubmit={handleVerify} className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-4 transition focus-within:border-cyan-300/50">
                <Search className="text-cyan-300" size={20} />

                <input
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="Enter Booking ID e.g. DJS-568208"
                  className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isVerifying ? "Verifying..." : "Verify Ticket"}
                {isVerifying ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <ShieldCheck size={20} />
                )}
              </button>

              <button
                type="button"
                onClick={clearScan}
                className="flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 font-black text-white transition hover:bg-white hover:text-black"
              >
                Clear
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/55">
              <p className="font-bold text-white/80">Test Flow:</p>
              <p className="mt-2">
                First booking page la ticket reserve pannunga. Then admin
                bookings page la payment confirm pannunga. Finally inga Booking
                ID verify pannunga.
              </p>
            </div>
          </motion.div>

          {/* Result Box */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
              Verification Result
            </p>

            <h2 className="text-3xl font-black">Ticket Status</h2>

            {message && (
              <div
                className={`mt-6 rounded-2xl border p-4 ${getMessageBoxClass(
                  message
                )}`}
              >
                <div className="flex items-center gap-3">
                  {getMessageIcon(message)}
                  <p className="font-black">{message}</p>
                </div>
              </div>
            )}

            {!scanResult && (
              <div className="mt-10 rounded-[2rem] border border-white/10 bg-black/35 p-8 text-center">
                <QrCode className="mx-auto text-white/25" size={70} />
                <h3 className="mt-5 text-2xl font-black">No ticket scanned</h3>
                <p className="mt-3 text-white/50">
                  Enter Booking ID and click Verify Ticket.
                </p>
              </div>
            )}

            {scanResult && (
              <div className="mt-8">
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-6">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <StatusBadge status={scanResult.paymentStatus} />
                    <StatusBadge status={scanResult.bookingStatus} />
                    <StatusBadge status={scanResult.entryStatus} />
                  </div>

                  <h3 className="text-3xl font-black">{scanResult.name}</h3>

                  <p className="mt-2 font-black text-cyan-300">
                    {scanResult.bookingId}
                  </p>

                  <div className="mt-6 grid gap-4 text-sm text-white/65 sm:grid-cols-2">
                    <InfoLine
                      icon={<Phone size={17} />}
                      label="Phone"
                      value={scanResult.phone}
                    />
                    <InfoLine
                      icon={<User size={17} />}
                      label="Email"
                      value={scanResult.email}
                    />
                    <InfoLine
                      icon={<Calendar size={17} />}
                      label="Date"
                      value={scanResult.date}
                    />
                    <InfoLine
                      icon={<MapPin size={17} />}
                      label="Venue"
                      value={scanResult.venue}
                    />
                    <InfoLine
                      icon={<Ticket size={17} />}
                      label="Ticket"
                      value={scanResult.ticket}
                    />
                    <InfoLine
                      icon={<QrCode size={17} />}
                      label="Event"
                      value={scanResult.event}
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                      Amount
                    </p>
                    <h4 className="mt-2 text-3xl font-black">
                      Rs. {Number(scanResult.amount || 0).toLocaleString()}
                    </h4>
                  </div>

                  {canCheckIn && (
                    <button
                      onClick={markCheckedIn}
                      disabled={isCheckingIn}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-green-300 px-6 py-4 font-black text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isCheckingIn ? "Checking-in..." : "Mark as Checked-in"}
                      {isCheckingIn ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <CheckCircle size={20} />
                      )}
                    </button>
                  )}

                  {scanResult.entryStatus === "Checked-in" && (
                    <div className="mt-6 rounded-2xl border border-purple-300/20 bg-purple-300/10 p-4 text-center font-black text-purple-300">
                      Customer already checked-in.
                    </div>
                  )}

                  {scanResult.paymentStatus !== "Paid" && (
                    <div className="mt-6 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-4 text-center font-black text-orange-300">
                      Payment pending. Entry not allowed.
                    </div>
                  )}

                  {scanResult.bookingStatus === "Cancelled" && (
                    <div className="mt-6 rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-center font-black text-red-300">
                      Booking cancelled. Entry not allowed.
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}

function InfoLine({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-2 flex items-center gap-2 text-cyan-300">
        {icon}
        <span className="text-xs font-black uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>

      <p className="break-words font-bold text-white">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  let className = "bg-white/10 text-white/70";

  if (status === "Paid" || status === "Confirmed") {
    className = "bg-green-400/10 text-green-300";
  }

  if (status === "Pending") {
    className = "bg-orange-400/10 text-orange-300";
  }

  if (status === "Cancelled") {
    className = "bg-red-400/10 text-red-300";
  }

  if (status === "Checked-in") {
    className = "bg-purple-400/10 text-purple-300";
  }

  if (status === "Not Checked-in") {
    className = "bg-cyan-400/10 text-cyan-300";
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>
      {status}
    </span>
  );
}

function getMessageBoxClass(message) {
  if (message.includes("Valid") || message.includes("successfully")) {
    return "border-green-300/20 bg-green-300/10 text-green-300";
  }

  if (message.includes("pending") || message.includes("not confirmed")) {
    return "border-orange-300/20 bg-orange-300/10 text-orange-300";
  }

  if (
    message.includes("Invalid") ||
    message.includes("cancelled") ||
    message.includes("already") ||
    message.includes("failed")
  ) {
    return "border-red-300/20 bg-red-300/10 text-red-300";
  }

  return "border-white/10 bg-white/[0.04] text-white";
}

function getMessageIcon(message) {
  if (message.includes("Valid") || message.includes("successfully")) {
    return <CheckCircle size={22} />;
  }

  if (message.includes("pending") || message.includes("not confirmed")) {
    return <AlertCircle size={22} />;
  }

  if (
    message.includes("Invalid") ||
    message.includes("cancelled") ||
    message.includes("already") ||
    message.includes("failed")
  ) {
    return <XCircle size={22} />;
  }

  return <Clock size={22} />;
}

export default QRScanner;