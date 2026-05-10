import React from 'react'
import { APP_CONFIG } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react'

const Terms: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="section-padding">
      <div className="container-custom">
        <SectionTitle
          title="Terms of Service"
          subtitle="Terms and conditions for using our services"
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
                  Welcome to {APP_CONFIG.name}. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Scale className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">Services</h2>
                </div>
                <p className="text-secondary-700 mb-4">
                  {APP_CONFIG.name} provides the following services:
                </p>
                <ul className="list-disc list-inside text-secondary-700 space-y-2">
                  <li>Accounting and bookkeeping services</li>
                  <li>Payroll processing</li>
                  <li>Tax compliance and advisory</li>
                  <li>Business advisory services</li>
                  <li>Company registration services</li>
                  <li>Business name registration</li>
                </ul>
                <p className="text-secondary-700 mt-4">
                  We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
                </p>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">User Responsibilities</h2>
                </div>
                <p className="text-secondary-700 mb-4">
                  As a user of our services, you agree to:
                </p>
                <ul className="list-disc list-inside text-secondary-700 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not use our services for any illegal or unauthorized purpose</li>
                  <li>Provide all necessary documents and information in a timely manner</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Fees and Payment</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Service Fees</h3>
                    <p className="text-secondary-700">
                      Our service fees are outlined in our pricing packages. We reserve the right to modify our fees at any time. Any fee changes will be communicated to you in advance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Payment Terms</h3>
                    <p className="text-secondary-700">
                      Payment is due upon invoice unless otherwise agreed in writing. Late payments may incur interest charges and may result in suspension of services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Refund Policy</h3>
                    <p className="text-secondary-700">
                      Refunds are handled on a case-by-case basis. Please contact us directly to discuss any refund requests.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-secondary-900">Confidentiality</h2>
                </div>
                <p className="text-secondary-700 leading-relaxed">
                  We agree to maintain the confidentiality of all client information and financial data in accordance with professional accounting standards and applicable laws. We will not disclose your information to third parties except as required by law or with your explicit consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Limitation of Liability</h2>
                <p className="text-secondary-700 leading-relaxed">
                  {APP_CONFIG.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Termination</h2>
                <p className="text-secondary-700 leading-relaxed">
                  We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Governing Law</h2>
                <p className="text-secondary-700 leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of Kenya. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Changes to Terms</h2>
                <p className="text-secondary-700 leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new Terms of Service on this page. Your continued use of our services after such modifications constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Contact Information</h2>
                <p className="text-secondary-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
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

export default Terms
