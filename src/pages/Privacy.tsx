import React from 'react'
import { APP_CONFIG } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import { Shield, Eye, Lock, Cookie, FileText } from 'lucide-react'

const Privacy: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Privacy Policy"
          subtitle="Your privacy is important to us"
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-secondary-600 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">Introduction</h2>
                </div>
                <p className="text-secondary-700 leading-relaxed">
                  {APP_CONFIG.name} ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">Information We Collect</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Personal Information</h3>
                    <p className="text-secondary-700">
                      We may collect personal information that you voluntarily provide to us when you fill out forms, including:
                    </p>
                    <ul className="list-disc list-inside text-secondary-700 mt-2 space-y-1">
                      <li>Name and contact information (email, phone)</li>
                      <li>Company information</li>
                      <li>Service inquiries and requests</li>
                      <li>Business registration details</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Automatically Collected Information</h3>
                    <p className="text-secondary-700">
                      We may automatically collect certain information when you visit our website, including:
                    </p>
                    <ul className="list-disc list-inside text-secondary-700 mt-2 space-y-1">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Referring website</li>
                      <li>Time and date of visit</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">How We Use Your Information</h2>
                </div>
                <p className="text-secondary-700 mb-4">
                  We use the information we collect in the following ways:
                </p>
                <ul className="list-disc list-inside text-secondary-700 space-y-2">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process your inquiries and service requests</li>
                  <li>To send you technical notices and support messages</li>
                  <li>To respond to your comments and questions</li>
                  <li>To monitor and analyze trends, usage, and activities</li>
                  <li>To detect, prevent, and address technical issues</li>
                </ul>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">Data Security</h2>
                </div>
                <p className="text-secondary-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Cookie className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">Cookies</h2>
                </div>
                <p className="text-secondary-700 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Your Rights</h2>
                <p className="text-secondary-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-secondary-700 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your personal information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Contact Us</h2>
                <p className="text-secondary-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-secondary-50 rounded-lg p-4 space-y-2">
                  <p className="text-secondary-700">
                    <strong>Email:</strong> {APP_CONFIG.contact.email}
                  </p>
                  <p className="text-secondary-700">
                    <strong>Phone:</strong> {APP_CONFIG.contact.phone}
                  </p>
                  <p className="text-secondary-700">
                    <strong>Address:</strong> {APP_CONFIG.contact.address}, {APP_CONFIG.contact.city}
                  </p>
                </div>
              </section>

              <div className="border-t border-secondary-200 pt-6 mt-8">
                <p className="text-sm text-secondary-600">
                  © {currentYear} {APP_CONFIG.name}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
