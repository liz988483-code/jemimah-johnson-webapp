import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import CompanyRegistration from './pages/CompanyRegistration'
import Accounting from './pages/Accounting'
import Taxation from './pages/taxation'
import Advisory from './pages/Advisory'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import ProtectedRoute from '../admin/ProtectedRoute'
import AdminLayout from '../admin/AdminLayout'
import Dashboard from '../admin/Dashboard'
import Clients from '../admin/Clients'
import Inquiries from '../admin/Inquiries'
import Packages from '../admin/Packages'
import QuoteResponses from '../admin/QuoteResponses' // ← ADD THIS IMPORT
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
          <Route path="accounting" element={<Accounting />} />
          <Route path="taxation" element={<Taxation />} />
          <Route path="advisory" element={<Advisory />} />
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
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/clients" element={<Clients />} />
          <Route path="/admin/inquiries" element={<Inquiries />} />
          <Route path="/admin/packages" element={<Packages />} />
          <Route path="/admin/quotes" element={<QuoteResponses />} /> {/* ← ADD THIS ROUTE */}
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App