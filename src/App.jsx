import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import WaiterScreen from './pages/WaiterScreen'
import KitchenView from './pages/KitchenView'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-50 min-h-screen">
        <nav className="flex gap-4 mb-6 justify-end">
          <Link to="/" className="text-blue-600 hover:underline">Waiter</Link>
          <Link to="/kitchen" className="text-blue-600 hover:underline">Kitchen</Link>
          <Link to="/dashboard" className="text-blue-600 font-semibold hover:underline">Admin Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<WaiterScreen />} />
          <Route path="/kitchen" element={<KitchenView />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
