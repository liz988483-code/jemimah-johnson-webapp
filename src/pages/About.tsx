import React from 'react'
import { APP_CONFIG } from '@/utils/constants'
import SectionTitle from '@/components/common/SectionTitle'
import { Eye, Target, Heart, Users, Award, Lightbulb } from 'lucide-react'

const About: React.FC = () => {
  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            About <span className="text-gradient">Us</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            {APP_CONFIG.name} is a financial solution center providing a range of accounting and bookkeeping services in Kenya.
          </p>
        </section>

        {/* About Us Content */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto space-y-6 text-secondary-700 leading-relaxed">
            <p className="text-lg">
              We believe as business owners concentrate on business growth and development they should entrust their non-core functions to professionals like us.
            </p>
            <p className="text-lg">
              We endeavor to understand the business of our client and the industry in which they operate, this enables us to give our clients the quality and timeliness of services they require.
            </p>
          </div>
        </section>

        {/* Vision, Mission, Core Values Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Core Values */}
            <div className="card">
              <div className="p-4 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4 text-center">
                Core Values
              </h3>
              <div className="space-y-4 text-secondary-700">
                <div>
                  <h4 className="font-semibold text-primary-600 mb-1">Professionalism</h4>
                  <p className="text-sm">Uphold integrity, confidentiality and adherence to international standards.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-600 mb-1">Efficiency</h4>
                  <p className="text-sm">Work with diligence and on time.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-600 mb-1">Teamwork</h4>
                  <p className="text-sm">Continuous engagement with the client to understand their needs.</p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="card">
              <div className="p-4 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Eye className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4 text-center">
                Vision
              </h3>
              <p className="text-secondary-700 text-center leading-relaxed">
                To be the leading accounting firm in provision of accurate, relevant and reliable accounting information in Kenya.
              </p>
            </div>

            {/* Mission */}
            <div className="card">
              <div className="p-4 bg-primary-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4 text-center">
                Mission
              </h3>
              <p className="text-secondary-700 text-center leading-relaxed">
                To partner with small businesses across Kenya and beyond to deliver financial peace of mind. Through an understanding of their financials, we enable small businesses and communities to grow. We accomplish this by leveraging technology to provide outsourced bookkeeping with personal customer relationships.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <SectionTitle
              title="Our Team"
              subtitle="Experienced professionals at your service"
            />
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <Users className="h-8 w-8 text-primary-600 flex-shrink-0 mt-1" />
              <p className="text-secondary-700 leading-relaxed">
                We have a team of experienced and diverse specialized professionals offering a wide range of accounting and bookkeeping services. We continue to attract, develop and retain a pool of qualified and experienced staff so as to maintain our competitive edge.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { icon: Award, title: 'Qualified', desc: 'Certified professionals' },
                { icon: Lightbulb, title: 'Experienced', desc: 'Industry expertise' },
                { icon: Users, title: 'Dedicated', desc: 'Client-focused team' }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="text-center p-4 bg-primary-50 rounded-xl">
                    <IconComponent className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-secondary-900">{item.title}</h4>
                    <p className="text-sm text-secondary-600">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
