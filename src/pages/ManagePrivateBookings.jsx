import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Users,
  Clock,
  Wallet,
  MessageSquare,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  Music,
  User,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "https://dj-selva-events.onrender.com/api";

function ManagePrivateBookings() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/private-bookings`);
      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to fetch private booking requests");
        return;
      }

      setRequests(data.privateBookings || []);
    } catch (error) {
      console.error("Fetch private bookings error:", error);
      alert("Backend connection failed. Please check server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((request) => {
    const value = searchTerm.toLowerCase();

    return (
      request.requestId?.toLowerCase().includes(value) ||
      request.fullName?.toLowerCase().includes(value) ||
      request.phone?.toLowerCase().includes(value) ||
      request.email?.toLowerCase().includes(value) ||
      request.eventType?.toLowerCase().includes(value) ||
      request.eventLocation?.toLowerCase().includes(value) ||
      request.status?.toLowerCase().includes(value)
    );
  });

  const updateStatus = async (requestId, status) => {
    try {
      const response = await fetch(
        `${API_URL}/private-bookings/${requestId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to update status");
        return;
      }

      fetchRequests();
    } catch (error) {
      console.error("Update private booking status error:", error);
      alert("Backend connection failed.");
    }
  };

  const deleteRequest = async (requestId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this private booking request?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/private-bookings/${requestId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to delete request");
        return;
      }

      fetchRequests();
    } catch (error) {
      console.error("Delete private booking error:", error);
      alert("Backend connection failed.");
    }
  };

  const totalRequests = requests.length;
  const newRequests = requests.filter(
    (request) => request.status === "New Request"
  ).length;
  const contactedRequests = requests.filter(
    (request) => request.status === "Contacted"
  ).length;
  const confirmedRequests = requests.filter(
    (request) => request.status === "Confirmed"
  ).length;

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
                PRIVATE REQUESTS
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
            Private Event Bookings
          </p>

          <h1 className="text-4xl font-black sm:text-5xl md:text-7xl">
            Manage DJ service requests.
          </h1>

          <p className="mt-5 max-w-2xl text-white/60">
            Customers can request DJ Selva for weddings, birthdays, college
            events, hotel parties, and private functions. Admin can contact,
            confirm, reject, or complete each request.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox
            icon={<Music />}
            title="Total Requests"
            value={totalRequests}
            text="All private bookings"
            color="cyan"
          />

          <StatBox
            icon={<Clock />}
            title="New Requests"
            value={newRequests}
            text="Need follow-up"
            color="orange"
          />

          <StatBox
            icon={<Phone />}
            title="Contacted"
            value={contactedRequests}
            text="Customer contacted"
            color="purple"
          />

          <StatBox
            icon={<ShieldCheck />}
            title="Confirmed"
            value={confirmedRequests}
            text="Confirmed events"
            color="green"
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
                placeholder="Search by Request ID, name, phone, email, event type, location, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
              />
            </div>

            <button
              onClick={fetchRequests}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-black text-white transition hover:bg-white hover:text-black"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center">
            <RefreshCw className="mx-auto animate-spin text-cyan-300" size={48} />
            <h3 className="mt-4 text-2xl font-black">Loading requests...</h3>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-5">
              {filteredRequests.map((request, index) => (
                <PrivateRequestCard
                  key={request._id || request.requestId}
                  request={request}
                  index={index}
                  updateStatus={updateStatus}
                  deleteRequest={deleteRequest}
                />
              ))}
            </div>

            {filteredRequests.length === 0 && (
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center">
                <Search className="mx-auto text-white/30" size={48} />

                <h3 className="mt-4 text-2xl font-black">
                  No private requests found
                </h3>

                <p className="mt-2 text-white/50">
                  Try searching another request ID or customer name.
                </p>

                <Link
                  to="/private-booking"
                  className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-black text-black transition hover:bg-cyan-300"
                >
                  Create Test Request
                </Link>
              </div>
            )}
          </>
        )}

        <div className="h-16" />
      </div>
    </div>
  );
}

function PrivateRequestCard({
  request,
  index,
  updateStatus,
  deleteRequest,
}) {
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
              {request.requestId}
            </span>

            <StatusBadge status={request.status} />
          </div>

          <h2 className="text-2xl font-black">{request.fullName}</h2>

          <div className="mt-4 grid gap-3 text-sm text-white/65 sm:grid-cols-2 lg:grid-cols-3">
            <InfoLine icon={<Phone size={16} />} text={request.phone} />
            <InfoLine icon={<Mail size={16} />} text={request.email} />
            <InfoLine icon={<Music size={16} />} text={request.eventType} />
            <InfoLine icon={<Calendar size={16} />} text={request.eventDate} />
            <InfoLine
              icon={<Users size={16} />}
              text={`${request.expectedCrowd || 0} people`}
            />
            <InfoLine
              icon={<Clock size={16} />}
              text={request.requiredTime || "Time not provided"}
            />
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/55">
            <p>
              <span className="font-bold text-white/75">Location:</span>{" "}
              {request.eventLocation || "Not provided"}
            </p>

            <p className="mt-2">
              <span className="font-bold text-white/75">Budget:</span>{" "}
              {request.budget || "Not provided"}
            </p>

            {request.message && (
              <p className="mt-2">
                <span className="font-bold text-white/75">Message:</span>{" "}
                {request.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full rounded-3xl border border-white/10 bg-black/35 p-5 sm:w-auto sm:min-w-[280px]">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/45">
            Request Status
          </p>

          <h3 className="mt-2 text-2xl font-black text-cyan-300">
            {request.status}
          </h3>

          <div className="mt-5 space-y-3">
            <StatusButton
              label="Mark Contacted"
              status="Contacted"
              currentStatus={request.status}
              onClick={() => updateStatus(request.requestId, "Contacted")}
            />

            <StatusButton
              label="Confirm Event"
              status="Confirmed"
              currentStatus={request.status}
              onClick={() => updateStatus(request.requestId, "Confirmed")}
            />

            <StatusButton
              label="Reject Request"
              status="Rejected"
              currentStatus={request.status}
              onClick={() => updateStatus(request.requestId, "Rejected")}
            />

            <StatusButton
              label="Mark Completed"
              status="Completed"
              currentStatus={request.status}
              onClick={() => updateStatus(request.requestId, "Completed")}
            />

            <button
              onClick={() => deleteRequest(request.requestId)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-5 py-3 font-black text-red-300 transition hover:bg-red-400 hover:text-white"
            >
              <Trash2 size={18} />
              Delete Request
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatusButton({ label, status, currentStatus, onClick }) {
  const isActive = status === currentStatus;

  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-black transition disabled:cursor-not-allowed ${
        isActive
          ? "bg-cyan-300 text-black opacity-70"
          : "border border-white/10 bg-white/[0.04] text-white/80 hover:bg-white hover:text-black"
      }`}
    >
      <CheckCircle size={18} />
      {isActive ? `${label} ✓` : label}
    </button>
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

function StatusBadge({ status }) {
  let className = "bg-white/10 text-white/70";

  if (status === "New Request") {
    className = "bg-orange-400/10 text-orange-300";
  }

  if (status === "Contacted") {
    className = "bg-purple-400/10 text-purple-300";
  }

  if (status === "Confirmed") {
    className = "bg-green-400/10 text-green-300";
  }

  if (status === "Rejected") {
    className = "bg-red-400/10 text-red-300";
  }

  if (status === "Completed") {
    className = "bg-cyan-400/10 text-cyan-300";
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>
      {status || "New Request"}
    </span>
  );
}

export default ManagePrivateBookings;