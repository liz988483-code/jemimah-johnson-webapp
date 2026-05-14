import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: 'admin@jemimahjohnson.com',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-lg">
            JJ
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">JEMIMAH JOHNSTONE & ASSOCIATES</h1>
            <p className="text-xs text-yellow-500 font-semibold">YOUR FINANCIAL SOLUTION PARTNER</p>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-gray-900 transition">Home</a>
          <a href="#" className="hover:text-gray-900 transition">Services</a>
          <a href="#" className="hover:text-gray-900 transition">Company Registration</a>
          <a href="#" className="hover:text-gray-900 transition">About</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Create Your Account</h2>
            <p className="text-center text-gray-500 mb-8">Register to track your registration status</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition bg-gray-50"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition"
                />
              </div>

              {/* Password with Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click the eye icon to show/hide your password
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mt-8"
              >
                Create Account
                <span>→</span>
              </button>

              {/* Sign In Link */}
              <p className="text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <a href="#" className="text-yellow-500 font-semibold hover:text-yellow-600 transition">
                  Sign in here
                </a>
              </p>
            </form>
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Your information is secure and will be used only for registration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
