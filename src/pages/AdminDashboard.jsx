import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  QrCode,
  Ticket,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Music,
  Eye,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to load dashboard data");
        return;
      }

      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const dashboardData = useMemo(() => {
    const totalBookings = bookings.length;

    const paidBookings = bookings.filter(
      (booking) => booking.paymentStatus === "Paid"
    ).length;

    const pendingBookings = bookings.filter(
      (booking) => booking.paymentStatus === "Pending"
    ).length;

    const checkedInBookings = bookings.filter(
      (booking) => booking.entryStatus === "Checked-in"
    ).length;

    const totalRevenue = bookings
      .filter((booking) => booking.paymentStatus === "Paid")
      .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

    const recentBookings = bookings.slice(0, 5);

    return {
      totalBookings,
      paidBookings,
      pendingBookings,
      checkedInBookings,
      totalRevenue,
      recentBookings,
    };
  }, [bookings]);

  const handleLogout = () => {
    localStorage.removeItem("djAdminLoggedIn");
    window.location.href = "/admin-login";
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
            to="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-black sm:px-5"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-black text-red-300 transition hover:bg-red-400 hover:text-white sm:px-5"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <img
              src="/dj-selva-logo.png"
              alt="DJ Selva Logo"
              className="h-12 w-12 rounded-full object-contain"
            />

            <div className="hidden sm:block">
              <h2 className="font-black leading-none">DJ Selva</h2>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-cyan-300">
                ADMIN PANEL
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
            Dashboard
          </p>

          <h1 className="text-4xl font-black sm:text-5xl md:text-7xl">
            Event Control Center.
          </h1>

          <p className="mt-5 max-w-2xl text-white/60">
            Customer bookings, payment status, QR check-in, and revenue summary
            automatically update from MongoDB database.
          </p>
        </motion.div>

        {isLoading && (
          <div className="mb-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-5 text-center">
            <RefreshCw className="mx-auto animate-spin text-cyan-300" size={34} />
            <p className="mt-3 font-black text-cyan-300">
              Loading dashboard data...
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Calendar />}
            title="Total Events"
            value="01"
            subtitle="Active event"
            color="cyan"
          />

          <StatCard
            icon={<Ticket />}
            title="Total Bookings"
            value={dashboardData.totalBookings}
            subtitle="All reservations"
            color="purple"
          />

          <StatCard
            icon={<DollarSign />}
            title="Revenue"
            value={`Rs. ${dashboardData.totalRevenue.toLocaleString()}`}
            subtitle="Paid bookings only"
            color="green"
          />

          <StatCard
            icon={<Clock />}
            title="Pending"
            value={dashboardData.pendingBookings}
            subtitle="Need confirmation"
            color="orange"
          />
        </div>

        {/* Extra Stats */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MiniStat
            icon={<CheckCircle />}
            title="Paid Bookings"
            value={dashboardData.paidBookings}
          />

          <MiniStat
            icon={<QrCode />}
            title="Checked-in"
            value={dashboardData.checkedInBookings}
          />

          <MiniStat
            icon={<AlertCircle />}
            title="Pending Payments"
            value={dashboardData.pendingBookings}
          />
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-purple-300">
                  Bookings
                </p>

                <h2 className="text-2xl font-black sm:text-3xl">
                  Recent Bookings
                </h2>
              </div>

              <Link
                to="/admin/bookings"
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 transition hover:bg-white hover:text-black"
              >
                View All
              </Link>
            </div>

            {dashboardData.recentBookings.length === 0 && !isLoading && (
              <div className="rounded-[2rem] border border-orange-300/20 bg-orange-300/10 p-8 text-center">
                <Ticket className="mx-auto text-orange-300" size={48} />

                <h3 className="mt-4 text-2xl font-black text-orange-300">
                  No bookings yet
                </h3>

                <p className="mt-3 text-white/60">
                  Customer booking create pannina inga show aagum.
                </p>

                <Link
                  to="/booking"
                  className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-black text-black transition hover:bg-cyan-300"
                >
                  Create Test Booking
                </Link>
              </div>
            )}

            {dashboardData.recentBookings.length > 0 && (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-hidden rounded-3xl border border-white/10 md:block">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-black/45 text-sm text-white/50">
                      <tr>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Booking ID</th>
                        <th className="p-4">Event</th>
                        <th className="p-4">Ticket</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dashboardData.recentBookings.map((booking, index) => (
                        <tr
                          key={booking._id || booking.bookingId || index}
                          className="border-t border-white/10 text-sm transition hover:bg-white/[0.03]"
                        >
                          <td className="p-4">
                            <p className="font-black">
                              {booking.name || "No Name"}
                            </p>
                            <p className="mt-1 text-white/45">
                              {booking.phone || "No Phone"}
                            </p>
                          </td>

                          <td className="p-4 font-black text-cyan-300">
                            {booking.bookingId || "No ID"}
                          </td>

                          <td className="p-4 text-white/70">
                            {booking.event || "No Event"}
                          </td>

                          <td className="p-4 text-white/70">
                            {booking.ticket || "No Ticket"}
                          </td>

                          <td className="p-4 font-black text-cyan-300">
                            Rs. {Number(booking.amount || 0).toLocaleString()}
                          </td>

                          <td className="p-4">
                            <StatusBadge status={booking.paymentStatus} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Booking Cards */}
                <div className="space-y-4 md:hidden">
                  {dashboardData.recentBookings.map((booking, index) => (
                    <div
                      key={booking._id || booking.bookingId || index}
                      className="rounded-3xl border border-white/10 bg-black/35 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-black">
                            {booking.name || "No Name"}
                          </h3>
                          <p className="mt-1 text-sm text-cyan-300">
                            {booking.bookingId || "No Booking ID"}
                          </p>
                          <p className="mt-1 text-sm text-white/45">
                            {booking.phone || "No Phone"}
                          </p>
                        </div>

                        <StatusBadge status={booking.paymentStatus} />
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-white/65">
                        <p>{booking.event || "No Event"}</p>
                        <p>{booking.ticket || "No Ticket"}</p>
                        <p className="font-black text-cyan-300">
                          Rs. {Number(booking.amount || 0).toLocaleString()}
                        </p>
                        <p className="text-purple-300">
                          {booking.entryStatus || "Not Checked-in"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Right Side */}
          <div className="space-y-8">
            {/* QR Scan */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 shadow-[0_0_45px_rgba(34,211,238,0.15)] backdrop-blur-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/45 text-cyan-300">
                <QrCode size={34} />
              </div>

              <h2 className="mt-6 text-3xl font-black">QR Entry Scan</h2>

              <p className="mt-3 text-white/60">
                Scan customer QR tickets at the entrance and verify booking
                status instantly.
              </p>

              <Link
                to="/qr-scan"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-black transition hover:bg-cyan-300"
              >
                Open Scanner
                <QrCode size={20} />
              </Link>
            </motion.div>

            {/* Ticket Categories */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-purple-300">
                Tickets
              </p>

              <h2 className="text-2xl font-black">Categories</h2>

              <div className="mt-6 space-y-4">
                <TicketCategory bookings={bookings} name="Normal Ticket" />
                <TicketCategory bookings={bookings} name="VIP Ticket" />
                <TicketCategory bookings={bookings} name="Couple Ticket" />
                <TicketCategory bookings={bookings} name="Backstage Pass" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Link to="/admin/events">
            <ActionCard
              icon={<Music />}
              title="Manage Events"
              text="Add, update, or remove DJ events."
            />
          </Link>

          <Link to="/admin/bookings">
            <ActionCard
              icon={<Users />}
              title="Manage Bookings"
              text="View, confirm, or cancel customer bookings."
            />
          </Link>

          <Link to="/admin/reports">
            <ActionCard
              icon={<Eye />}
              title="Reports"
              text="Check sales and payment status."
            />
          </Link>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  const colors = {
    cyan: "text-cyan-300 bg-cyan-300/10",
    purple: "text-purple-300 bg-purple-300/10",
    green: "text-green-300 bg-green-300/10",
    orange: "text-orange-300 bg-orange-300/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-sm font-bold text-white/50">{title}</p>
      <h3 className="mt-2 text-4xl font-black">{value}</h3>
      <p className="mt-2 text-sm text-white/45">{subtitle}</p>
    </motion.div>
  );
}

function MiniStat({ icon, title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div>
        <p className="text-sm font-bold text-white/50">{title}</p>
        <h3 className="mt-1 text-3xl font-black">{value}</h3>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  let className = "bg-orange-400/10 text-orange-300";
  let icon = <AlertCircle size={13} />;

  if (status === "Paid") {
    className = "bg-green-400/10 text-green-300";
    icon = <CheckCircle size={13} />;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${className}`}
    >
      {icon}
      {status || "Pending"}
    </span>
  );
}

function TicketCategory({ bookings, name }) {
  const sold = bookings
    .filter((booking) => booking.ticket === name)
    .reduce((sum, booking) => sum + Number(booking.quantity || 0), 0);

  const total = 150;
  const percentage = Math.min(Math.round((sold / total) * 100), 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-bold text-white/75">{name}</span>
        <span className="font-black text-cyan-300">
          {sold}/{total}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-purple-400"
        />
      </div>
    </div>
  );
}

function ActionCard({ icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.6 }}
      className="h-full rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>

      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 text-white/55">{text}</p>
    </motion.div>
  );
}

export default AdminDashboard;