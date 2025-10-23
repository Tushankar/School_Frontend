import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  GraduationCap,
  BookOpen,
  Users,
  Building,
  MessageSquare,
} from "lucide-react";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import { toast } from "sonner";

export default function StudentSurveys() {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
    teachingQuality: "",
    academicSupport: "",
    campusFacilities: "",
    activities: "",
    grievanceMechanisms: "",
    learningEnvironment: "",
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
      const response = await fetch(
        "http://localhost:4000/api/surveys/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you for your feedback!", {
          description: "Your survey has been submitted successfully.",
          duration: 4000,
        });
        setFormData({
          name: "",
          grade: "",
          section: "",
          teachingQuality: "",
          academicSupport: "",
          campusFacilities: "",
          activities: "",
          grievanceMechanisms: "",
          learningEnvironment: "",
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

  return (
    <>
      <Head>
        <title>Student Surveys - Al-Rasheed Academy</title>
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

      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
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
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/30"></div>
          <div className="relative z-10">
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-black">Student</span>{" "}
              <span className="text-black">Surveys</span>
            </motion.h1>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full"
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
              Share your academic experience and help us improve your learning
              environment.
            </motion.p>
          </div>
        </motion.div>

        {/* Survey Form */}
        <div className="relative py-16 bg-emerald-50">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/assets/science.jpeg')" }}
          ></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Information Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/20 backdrop-blur-md border border-white/30 hover:border-emerald-200/50 transition-colors rounded-lg shadow-xl">
                  <div className="bg-emerald-50/30 backdrop-blur-sm border-b border-white/20 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        Student Information
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
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/50"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          Grade <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/50"
                          required
                        >
                          <option value="">Select Grade</option>
                          <option value="pre-k">Pre-K</option>
                          <option value="kindergarten">Kindergarten</option>
                          <option value="1">Grade 1</option>
                          <option value="2">Grade 2</option>
                          <option value="3">Grade 3</option>
                          <option value="4">Grade 4</option>
                          <option value="5">Grade 5</option>
                          <option value="6">Grade 6</option>
                          <option value="7">Grade 7</option>
                          <option value="8">Grade 8</option>
                          <option value="9">Grade 9</option>
                          <option value="10">Grade 10</option>
                          <option value="11">Grade 11</option>
                          <option value="12">Grade 12</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          Section <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="section"
                          value={formData.section}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white/50"
                          required
                        >
                          <option value="">Select Section</option>
                          <option value="k3">K-3 Section</option>
                          <option value="boys">Boys Section</option>
                          <option value="girls">Girls Section</option>
                        </select>
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
                <div className="bg-white/20 backdrop-blur-md border border-white/30 hover:border-teal-200/50 transition-colors rounded-lg shadow-xl">
                  <div className="bg-teal-50/30 backdrop-blur-sm border-b border-white/20 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-teal-600" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        Survey Questions
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        1. How would you rate the quality and clarity of
                        teaching? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="teachingQuality"
                        value={formData.teachingQuality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/50"
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
                        2. How available is academic support & mentoring?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="academicSupport"
                        value={formData.academicSupport}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/50"
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
                        3. How would you rate campus facilities (labs, library,
                        internet, classrooms)?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="campusFacilities"
                        value={formData.campusFacilities}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/50"
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
                        4. How satisfied are you with co-curricular and
                        extracurricular opportunities?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="activities"
                        value={formData.activities}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/50"
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
                        5. How effective are grievance mechanisms &
                        inclusiveness? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="grievanceMechanisms"
                        value={formData.grievanceMechanisms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/50"
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
                        6. Overall satisfaction with your learning environment?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="learningEnvironment"
                        value={formData.learningEnvironment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/50"
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
                        7. Suggestions for improvements (Optional)
                      </label>
                      <textarea
                        name="suggestions"
                        value={formData.suggestions}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white/50"
                        placeholder="Please share any suggestions or comments to help us improve..."
                      />
                    </div>

                    <div className="text-center pt-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-all duration-300 shadow-lg"
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
