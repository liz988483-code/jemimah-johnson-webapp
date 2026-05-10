import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import CompanyRegistration from './pages/CompanyRegistration'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Login from '../admin/Login'
import ProtectedRoute from '../admin/ProtectedRoute'
import Dashboard from '../admin/Dashboard'
import Clients from '../admin/Clients'
import Inquiries from '../admin/Inquiries'
import Packages from '../admin/Packages'
import ClientLogin from './pages/ClientLogin'
import ClientRegister from './pages/ClientRegister'
import ClientDashboard from './pages/ClientDashboard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="company-registration" element={<CompanyRegistration />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="login" element={<ClientLogin />} />
          <Route path="register" element={<ClientRegister />} />
          <Route path="dashboard" element={<ClientDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="inquiries" element={<Inquiries />} />
                  <Route path="packages" element={<Packages />} />
                  <Route index element={<Dashboard />} />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
