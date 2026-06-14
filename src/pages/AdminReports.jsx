import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  DollarSign,
  PieChart,
  Ticket,
  Users,
  XCircle,
  QrCode,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function AdminReports() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to load report data");
        return;
      }

      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Reports fetch error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const reportData = useMemo(() => {
    const totalBookings = bookings.length;

    const paidBookings = bookings.filter(
      (booking) => booking.paymentStatus === "Paid"
    ).length;

    const pendingBookings = bookings.filter(
      (booking) => booking.paymentStatus === "Pending"
    ).length;

    const cancelledBookings = bookings.filter(
      (booking) => booking.bookingStatus === "Cancelled"
    ).length;

    const checkedInCount = bookings.filter(
      (booking) => booking.entryStatus === "Checked-in"
    ).length;

    const totalRevenue = bookings
      .filter((booking) => booking.paymentStatus === "Paid")
      .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

    const ticketTypes = [
      "Normal Ticket",
      "VIP Ticket",
      "Couple Ticket",
      "Backstage Pass",
    ];

    const ticketSummary = ticketTypes.map((type) => {
      const typeBookings = bookings.filter((booking) => booking.ticket === type);

      const sold = typeBookings.reduce(
        (sum, booking) => sum + Number(booking.quantity || 0),
        0
      );

      const revenue = typeBookings
        .filter((booking) => booking.paymentStatus === "Paid")
        .reduce((sum, booking) => sum + Number(booking.amount || 0), 0);

      return {
        type,
        sold,
        revenue,
      };
    });

    const totalSold = ticketSummary.reduce(
      (sum, item) => sum + Number(item.sold || 0),
      0
    );

    const maxSold = Math.max(...ticketSummary.map((item) => item.sold), 1);

    return {
      totalBookings,
      paidBookings,
      pendingBookings,
      cancelledBookings,
      checkedInCount,
      totalRevenue,
      ticketSummary,
      totalSold,
      maxSold,
    };
  }, [bookings]);

  const exportReport = () => {
    const reportText = `
DJ Selva Events - Sales Report
--------------------------------
Total Bookings: ${reportData.totalBookings}
Paid Bookings: ${reportData.paidBookings}
Pending Bookings: ${reportData.pendingBookings}
Cancelled Bookings: ${reportData.cancelledBookings}
Checked-in Customers: ${reportData.checkedInCount}
Total Revenue: Rs. ${reportData.totalRevenue.toLocaleString()}

Ticket Summary:
${reportData.ticketSummary
  .map(
    (item) =>
      `${item.type}: ${item.sold} sold | Rs. ${item.revenue.toLocaleString()} revenue`
  )
  .join("\n")}

Recent Bookings:
${bookings
  .slice(0, 10)
  .map(
    (booking) =>
      `${booking.bookingId} | ${booking.name} | ${booking.ticket} | Rs. ${Number(
        booking.amount || 0
      ).toLocaleString()} | ${booking.paymentStatus} | ${booking.entryStatus}`
  )
  .join("\n")}
`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dj-selva-sales-report.txt";
    link.click();

    URL.revokeObjectURL(url);
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
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-300 hover:text-black sm:px-5"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <img
              src="/dj-selva-logo.png"
              alt="DJ Selva Logo"
              className="h-12 w-12 rounded-full object-contain"
            />

            <div>
              <h2 className="font-black leading-none">DJ Selva</h2>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-cyan-300">
                REPORTS
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
            Reports & Analytics
          </p>

          <h1 className="text-4xl font-black sm:text-5xl md:text-7xl">
            Event sales report.
          </h1>

          <p className="mt-5 max-w-2xl text-white/60">
            Customer bookings, paid payments, pending payments, checked-in
            tickets, and revenue automatically calculate from MongoDB database.
          </p>
        </motion.div>

        {isLoading && (
          <div className="mb-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-5 text-center">
            <RefreshCw className="mx-auto animate-spin text-cyan-300" size={34} />
            <p className="mt-3 font-black text-cyan-300">
              Loading report data...
            </p>
          </div>
        )}

        {/* Main Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ReportStat
            icon={<DollarSign />}
            title="Total Revenue"
            value={`Rs. ${reportData.totalRevenue.toLocaleString()}`}
            text="Paid bookings only"
            color="green"
          />

          <ReportStat
            icon={<Ticket />}
            title="Tickets Sold"
            value={reportData.totalSold}
            text="All ticket quantities"
            color="cyan"
          />

          <ReportStat
            icon={<CheckCircle />}
            title="Paid Bookings"
            value={reportData.paidBookings}
            text="Payment confirmed"
            color="purple"
          />

          <ReportStat
            icon={<Clock />}
            title="Pending"
            value={reportData.pendingBookings}
            text="Need confirmation"
            color="orange"
          />
        </div>

        {/* Empty State */}
        {bookings.length === 0 && !isLoading && (
          <div className="mt-8 rounded-[2rem] border border-orange-300/20 bg-orange-300/10 p-8 text-center">
            <Ticket className="mx-auto text-orange-300" size={52} />
            <h2 className="mt-4 text-2xl font-black text-orange-300">
              No booking data found
            </h2>
            <p className="mt-3 text-white/60">
              First customer booking create pannunga. Then reports automatic ah
              update aagum.
            </p>

            <Link
              to="/booking"
              className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-black text-black transition hover:bg-cyan-300"
            >
              Create Test Booking
            </Link>
          </div>
        )}

        {/* Event Summary */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-purple-300">
              Event Summary
            </p>

            <h2 className="text-3xl font-black">DJ Selva Mega Night 2026</h2>

            <div className="mt-7 space-y-4">
              <SummaryLine
                icon={<Calendar size={18} />}
                label="Event Date"
                value="27 June 2026"
              />

              <SummaryLine
                icon={<Users size={18} />}
                label="Total Bookings"
                value={`${reportData.totalBookings} Bookings`}
              />

              <SummaryLine
                icon={<Ticket size={18} />}
                label="Tickets Sold"
                value={`${reportData.totalSold} Tickets`}
              />

              <SummaryLine
                icon={<CheckCircle size={18} />}
                label="Checked-in"
                value={`${reportData.checkedInCount} Customers`}
              />

              <SummaryLine
                icon={<XCircle size={18} />}
                label="Cancelled"
                value={`${reportData.cancelledBookings} Bookings`}
              />
            </div>

            <button
              onClick={exportReport}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-black transition hover:bg-cyan-300"
            >
              <Download size={19} />
              Export Report
            </button>
          </motion.div>

          {/* Ticket Sales */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                  Ticket Sales
                </p>

                <h2 className="text-3xl font-black">Category Performance</h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                <BarChart3 size={30} />
              </div>
            </div>

            <div className="space-y-6">
              {reportData.ticketSummary.map((item, index) => (
                <TicketBar
                  key={item.type}
                  item={item}
                  index={index}
                  maxSold={reportData.maxSold}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Revenue Cards */}
        <section className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-8 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
                Revenue Breakdown
              </p>

              <h2 className="text-3xl font-black sm:text-5xl">
                Ticket category revenue.
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/70">
              <PieChart size={18} className="text-cyan-300" />
              Live Analytics
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-4">
            {reportData.ticketSummary.map((item, index) => (
              <RevenueCard key={item.type} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* Recent Bookings */}
        <section className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">
              Recent Bookings
            </p>

            <h2 className="text-3xl font-black">Latest booking records</h2>

            <div className="mt-6 space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking._id || booking.bookingId}
                  className="grid gap-4 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm md:grid-cols-[1fr_1fr_1fr_0.7fr]"
                >
                  <div>
                    <p className="font-black">{booking.name || "No Name"}</p>
                    <p className="mt-1 text-cyan-300">
                      {booking.bookingId || "No Booking ID"}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-white/70">
                      {booking.ticket || "No Ticket"}
                    </p>
                    <p className="mt-1 text-white/45">
                      Qty: {booking.quantity || 0}
                    </p>
                  </div>

                  <div>
                    <p className="font-black text-cyan-300">
                      Rs. {Number(booking.amount || 0).toLocaleString()}
                    </p>
                    <p className="mt-1 text-white/45">
                      {booking.paymentStatus || "Pending"}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-purple-300">
                      {booking.entryStatus || "Not Checked-in"}
                    </p>
                  </div>
                </div>
              ))}

              {bookings.length === 0 && !isLoading && (
                <p className="text-white/50">No recent bookings available.</p>
              )}
            </div>
          </motion.div>
        </section>

        <div className="h-16" />
      </div>
    </div>
  );
}

function ReportStat({ icon, title, value, text, color }) {
  const colors = {
    cyan: "bg-cyan-300/10 text-cyan-300",
    green: "bg-green-300/10 text-green-300",
    purple: "bg-purple-300/10 text-purple-300",
    orange: "bg-orange-300/10 text-orange-300",
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
      <h3 className="mt-2 text-3xl font-black sm:text-4xl">{value}</h3>
      <p className="mt-2 text-sm text-white/45">{text}</p>
    </motion.div>
  );
}

function SummaryLine({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0">
      <div className="flex items-center gap-3 text-white/55">
        <span className="text-cyan-300">{icon}</span>
        <span className="font-bold">{label}</span>
      </div>

      <span className="text-right font-black text-white">{value}</span>
    </div>
  );
}

function TicketBar({ item, index, maxSold }) {
  const width = maxSold > 0 ? Math.round((item.sold / maxSold) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-black">{item.type}</h3>
          <p className="text-sm text-white/45">
            Revenue Rs. {Number(item.revenue || 0).toLocaleString()}
          </p>
        </div>

        <p className="font-black text-cyan-300">{item.sold} sold</p>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
        />
      </div>
    </div>
  );
}

function RevenueCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-2xl transition hover:border-cyan-300/30"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
        <QrCode size={28} />
      </div>

      <h3 className="text-xl font-black">{item.type}</h3>

      <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-white/40">
        Revenue
      </p>

      <h4 className="mt-2 text-3xl font-black text-cyan-300">
        Rs. {Number(item.revenue || 0).toLocaleString()}
      </h4>

      <p className="mt-3 text-white/55">{item.sold} tickets sold</p>
    </motion.div>
  );
}

export default AdminReports;