import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import WaiterScreen from './pages/WaiterScreen'
import KitchenView from './pages/KitchenView'
import AdminDashboard from './pages/AdminDashboard'
import PrintTemp from './pages/PrintTemp'
import BookingsPage from './pages/BookingsPage'
import BookingsCalendar from './components/BookingsCalendar' // ✅ NEW
import './styles/custom.css'
import FloatingCart from './components/FloatingCart'
import StatusBanner from './components/StatusBanner'
import OrderCart from './components/OrderCart'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-tea-light to-tea font-sans text-gray-800">

        {/* 🌐 Online/Offline Indicator - Hidden on Print */}
        <div className="no-print">
          <StatusBanner />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">

          {/* 🧭 Nav Buttons - Hidden on Print */}
          <nav className="nav-buttons no-print">
            <Link to="/" className="nav-btn">📋 Waiter</Link>
            <Link to="/kitchen" className="nav-btn">👨‍🍳 Kitchen</Link>
            <Link to="/dashboard" className="nav-btn">📊 Admin Dashboard</Link>
            <Link to="/bookings" className="nav-btn">📅 Bookings</Link>
          </nav>

          <Routes>
            <Route path="/" element={<WaiterScreen />} />
            <Route path="/kitchen" element={<KitchenView />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/print-temp" element={<PrintTemp />} />
            <Route path="/calendar" element={<BookingsCalendar />} />
            <Route
              path="/bookings"
              element={
                <>
                  <BookingsPage />
                  <BookingsCalendar /> {/* ✅ Show live calendar view */}
                </>
              }
            />
          </Routes>
        </div>
<FloatingCart />
      </div>
    </Router>
  )
}

export default App
