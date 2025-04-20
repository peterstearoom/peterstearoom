import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import WaiterScreen from './pages/WaiterScreen'
import KitchenView from './pages/KitchenView'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#f7f6f3] to-[#eae7de] font-sans text-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex justify-end gap-4 mb-8 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-green-700">Waiter</Link>
            <Link to="/kitchen" className="hover:text-green-700">Kitchen</Link>
            <Link to="/dashboard" className="hover:text-green-700">Admin Dashboard</Link>
          </nav>

          <Routes>
            <Route path="/" element={<WaiterScreen />} />
            <Route path="/kitchen" element={<KitchenView />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}


export default App
