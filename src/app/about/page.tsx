'use client'

import Image from 'next/image'
import { Briefcase, Mail, MapPin, GraduationCap } from 'lucide-react'

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About ODA
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering African students and professionals by connecting them with life-changing opportunities worldwide.
          </p>
        </div>

        {/* Our Team Section */}
        <div className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet the People Behind Our Mission
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:gap-16">
            {/* Founder & CEO Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://sigmawire.net/i/03/K0Mfh3.jpg"
                      alt="John Obure - CEO & Founder"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">John Obure</h3>
                    <p className="mt-1 text-lg font-medium text-blue-600">Founder & CEO</p>
                    <div className="mt-4 space-y-2">
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                        Leadership & Strategy
                      </p>
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <GraduationCap className="h-5 w-5 mr-2 text-gray-400" />
                        Education Technology
                      </p>
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                        Africa
                      </p>
                    </div>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                      Dedicated to bridging the gap between African talent and global opportunities. 
                      Leading ODA's mission to create accessible pathways for education and professional growth across the continent.
                    </p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        <Mail className="h-5 w-5 mr-2" />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Managing Director Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://sigmawire.net/i/03/h5KfSM.png"
                      alt="Uwimana Chantal - Managing Director"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">Uwimana Chantal</h3>
                    <p className="mt-1 text-lg font-medium text-blue-600">Managing Director</p>
                    <div className="mt-4 space-y-2">
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                        Operations & Management
                      </p>
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <GraduationCap className="h-5 w-5 mr-2 text-gray-400" />
                        Strategic Planning
                      </p>
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                        East Africa
                      </p>
                    </div>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                      Experienced leader driving operational excellence and strategic growth. 
                      Passionate about creating sustainable educational opportunities and fostering partnerships across Africa.
                    </p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        <Mail className="h-5 w-5 mr-2" />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations Manager Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://sigmawire.net/i/03/vgSJYw.jpg"
                      alt="Nyandwi Fidele - Operations Manager & Opportunities Researcher"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">Nyandwi Fidele</h3>
                    <p className="mt-1 text-lg font-medium text-blue-600">Operations Manager & Opportunities Researcher</p>
                    <div className="mt-4 space-y-2">
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                        Operations Management
                      </p>
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <GraduationCap className="h-5 w-5 mr-2 text-gray-400" />
                        Research & Analysis
                      </p>
                      <p className="flex items-center justify-center md:justify-start text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                        Africa
                      </p>
                    </div>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                      Dedicated professional focused on identifying and researching valuable opportunities across Africa. 
                      Skilled in operations management and opportunity analysis to support African talent development.
                    </p>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        <Mail className="h-5 w-5 mr-2" />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Values Section */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading platform connecting African talent with global educational and professional opportunities, 
                fostering a new generation of leaders and innovators across the continent.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span>Accessibility - Making opportunities available to all</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span>Excellence - Maintaining high standards in everything we do</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span>Innovation - Continuously improving our platform and services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 