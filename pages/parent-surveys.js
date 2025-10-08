import Head from "next/head";
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Heart, Users, Shield, BookOpen, Building, MessageSquare } from 'lucide-react'
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";

export default function ParentSurveys() {
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    studentGrade: '',
    educationQuality: '',
    communication: '',
    safetyMeasures: '',
    activities: '',
    facilities: '',
    admissionsFees: '',
    suggestions: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Survey submitted:', formData)
    alert('Thank you for your feedback! Your survey has been submitted.')
  }

  return (
    <>
      <Head>
        <title>Parent Surveys - Al-Rasheed Academy</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <NavBarOnly />
      <Ticker />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        {/* Header Section */}
        <div className="relative text-center py-16 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&auto=format&fit=crop&q=90')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              <span className="text-black">Parent</span>{" "}
              <span className="text-black">Surveys</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-700 mt-6 max-w-3xl mx-auto font-medium">
              Share your experience and help us enhance your child's educational journey.
            </p>
          </div>
        </div>

        {/* Survey Form */}
        <div className="relative py-16 bg-purple-50">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/assets/studentExam.jpg')" }}></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Parent Information Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/20 backdrop-blur-md border border-white/30 hover:border-purple-200/50 transition-colors rounded-lg shadow-xl">
                  <div className="bg-purple-50/30 backdrop-blur-sm border-b border-white/20 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Heart className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold">Parent/Guardian Information</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/50"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          Relationship to Student <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/50"
                          required
                        >
                          <option value="">Select Relationship</option>
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="guardian">Guardian</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          Student's Grade <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentGrade"
                          value={formData.studentGrade}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/50"
                          placeholder="e.g., Grade 5, Pre-K"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Survey Questions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="bg-white/20 backdrop-blur-md border border-white/30 hover:border-pink-200/50 transition-colors rounded-lg shadow-xl">
                  <div className="bg-pink-50/30 backdrop-blur-sm border-b border-white/20 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-pink-600" />
                      </div>
                      <h3 className="text-xl font-semibold">Survey Questions</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        1. How satisfied are you with the quality of education? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="educationQuality"
                        value={formData.educationQuality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white/50"
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                        <option value="very-poor">Very Poor</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        2. How effective is communication from teachers and administration? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="communication"
                        value={formData.communication}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white/50"
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                        <option value="very-poor">Very Poor</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        3. How would you rate the safety & discipline measures? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="safetyMeasures"
                        value={formData.safetyMeasures}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white/50"
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                        <option value="very-poor">Very Poor</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        4. How satisfied are you with co-curricular and extra-curricular activities? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="activities"
                        value={formData.activities}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white/50"
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                        <option value="very-poor">Very Poor</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        5. How would you rate school facilities (transport, hygiene, campus)? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white/50"
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                        <option value="very-poor">Very Poor</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        6. How satisfied are you with admissions, fees, or grievance redressal? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="admissionsFees"
                        value={formData.admissionsFees}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white/50"
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                        <option value="very-poor">Very Poor</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        7. Suggestions for improvement (Optional)
                      </label>
                      <textarea
                        name="suggestions"
                        value={formData.suggestions}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-white/50"
                        placeholder="Please share any suggestions or comments to help us improve..."
                      />
                    </div>

                    <div className="text-center pt-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-all duration-300 shadow-lg"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Submit Survey
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}