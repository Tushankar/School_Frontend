import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star, Users, BookOpen, MessageSquare } from "lucide-react";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import { toast } from "sonner";

export default function StaffSurveys() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    workplaceEnvironment: "",
    trainingOpportunities: "",
    managementSupport: "",
    teachingResources: "",
    communication: "",
    suggestions: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/surveys/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you for your feedback!", {
          description: "Your survey has been submitted successfully.",
          duration: 4000,
        });
        setFormData({
          name: "",
          role: "",
          department: "",
          workplaceEnvironment: "",
          trainingOpportunities: "",
          managementSupport: "",
          teachingResources: "",
          communication: "",
          suggestions: "",
        });
      } else {
        toast.error("Submission Failed", {
          description: data.message || "Unknown error occurred",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Error submitting survey", {
        description: "Please try again later.",
        duration: 4000,
      });
    }
  };

  const surveyTopics = [
    {
      icon: Users,
      title: "Workplace Environment",
      description:
        "Share your thoughts on the overall work atmosphere and culture",
    },
    {
      icon: BookOpen,
      title: "Training & Development",
      description: "Evaluate professional development opportunities available",
    },
    {
      icon: Star,
      title: "Management Support",
      description: "Rate the support and guidance from leadership",
    },
    {
      icon: MessageSquare,
      title: "Communication",
      description: "Assess inter-departmental communication and collaboration",
    },
  ];

  return (
    <>
      <Head>
        <title>Staff Surveys - Al-Rasheed Academy</title>
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

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header Section */}
        <motion.div
          className="relative text-center py-16 overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/assets/hall.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-blue-900/30"></div>
          <div className="relative z-10">
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-black">Staff</span>{" "}
              <span className="text-black">Surveys</span>
            </motion.h1>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.p
              className="text-xl text-gray-700 mt-6 max-w-3xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Your voice matters. Help us improve our workplace environment and
              educational excellence.
            </motion.p>
          </div>
        </motion.div>

        {/* Survey Form */}
        <div className="relative py-16 bg-gray-50">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/assets/science.jpeg')" }}
          ></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/20 backdrop-blur-md border border-white/30 hover:border-blue-200/50 transition-colors rounded-lg shadow-xl">
                  <div className="bg-blue-50/30 backdrop-blur-sm border-b border-white/20 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        Personal Information
                      </h3>
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
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/50"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          Role/Position <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/50"
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="teacher">Teacher</option>
                          <option value="administrator">Administrator</option>
                          <option value="support-staff">Support Staff</option>
                          <option value="counselor">Counselor</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/50"
                          placeholder="e.g., K-3, Boys Section, Girls Section"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Survey Questions Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white/20 backdrop-blur-md border border-white/30 hover:border-green-200/50 transition-colors rounded-lg shadow-xl">
                  <div className="bg-green-50/30 backdrop-blur-sm border-b border-white/20 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        Survey Questions
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        1. How satisfied are you with the workplace environment?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="workplaceEnvironment"
                        value={formData.workplaceEnvironment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white/50"
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
                        2. How would you rate the training & professional
                        development opportunities?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="trainingOpportunities"
                        value={formData.trainingOpportunities}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white/50"
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
                        3. How supportive is the management/leadership team?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="managementSupport"
                        value={formData.managementSupport}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white/50"
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
                        4. How adequate are the teaching resources &
                        infrastructure? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="teachingResources"
                        value={formData.teachingResources}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white/50"
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
                        5. How effective is communication & collaboration among
                        departments? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="communication"
                        value={formData.communication}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        6. Suggestions for improvement (Optional)
                      </label>
                      <textarea
                        name="suggestions"
                        value={formData.suggestions}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white/50"
                        placeholder="Please share any suggestions or comments to help us improve..."
                      />
                    </div>

                    <div className="text-center pt-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-all duration-300 shadow-lg"
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
  );
}
