import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import QRScanner from "./pages/QRScanner";
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import ManageEvents from "./pages/ManageEvents";
import ManageBookings from "./pages/ManageBookings";
import AdminReports from "./pages/AdminReports";

function ProtectedAdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("djAdminLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Pages */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedAdminRoute>
              <ManageEvents />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedAdminRoute>
              <ManageBookings />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedAdminRoute>
              <AdminReports />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/qr-scan"
          element={
            <ProtectedAdminRoute>
              <QRScanner />
            </ProtectedAdminRoute>
          }
        />

        {/* Wrong URL fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;