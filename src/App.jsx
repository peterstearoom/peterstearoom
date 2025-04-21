import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import WaiterScreen from './pages/WaiterScreen'
import KitchenView from './pages/KitchenView'
import AdminDashboard from './pages/AdminDashboard'
import './styles/custom.css'
import StatusBanner from './components/StatusBanner'
import PrintTemp from './pages/PrintTemp'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-tea-light to-tea font-sans text-gray-800">
        
        {/* 🌐 Online/Offline Indicator */}
        <StatusBanner />

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* 🧭 Centered Nav Buttons */}
          <nav className="flex justify-center flex-wrap gap-4 mb-8">
            <Link
              to="/"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow transition"
            >
              🧾 Waiter
            </Link>
            <Link
              to="/kitchen"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow transition"
            >
              👨‍🍳 Kitchen
            </Link>
            <Link
              to="/dashboard"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow transition"
            >
              📊 Admin Dashboard
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<WaiterScreen />} />
            <Route path="/kitchen" element={<KitchenView />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
	    <Route path="/print-temp" element={<PrintTemp />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
