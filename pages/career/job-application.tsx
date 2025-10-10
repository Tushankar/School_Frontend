import Head from "next/head";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import NavBarOnly from "../../components/NavBarOnly";
import Footer from "../../components/Footer";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import Ticker from "../../components/Ticker";

import React, { useState, useRef } from 'react';
import { Facebook, Twitter, Linkedin, Upload, Plus, Pen, Type, Trash2 } from 'lucide-react';

const Sidebar = () => {
  const profiles = [
    { id: 1, top: '18%', left: '55%', size: 'w-16 h-16', img: 'https://i.pravatar.cc/150?img=12' },
    { id: 2, top: '32%', left: '32%', size: 'w-20 h-20', img: 'https://i.pravatar.cc/150?img=45' },
    { id: 3, top: '48%', left: '85%', size: 'w-16 h-16', img: 'https://i.pravatar.cc/150?img=47' },
    { id: 4, top: '56%', left: '42%', size: 'w-20 h-20', img: 'https://i.pravatar.cc/150?img=44' },
    { id: 5, top: '68%', left: '8%', size: 'w-14 h-14', img: 'https://i.pravatar.cc/150?img=9' },
    { id: 6, top: '72%', left: '70%', size: 'w-16 h-16', img: 'https://i.pravatar.cc/150?img=43' },
    { id: 7, top: '88%', left: '68%', size: 'w-20 h-20', img: 'https://i.pravatar.cc/150?img=32' },
  ];

  return (
    <div className="bg-gray-50 relative overflow-hidden h-full"> 
      {/* Curved lines background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 800 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 400 -200 Q 200 100 100 400 Q 50 550 50 700 Q 50 850 100 1000" 
                stroke="#e5e7eb" 
                strokeWidth="2" 
                fill="none"/>
          <path d="M 500 -200 Q 300 150 220 450 Q 180 600 180 750 Q 180 900 230 1050" 
                stroke="#e5e7eb" 
                strokeWidth="2" 
                fill="none"/>
          <path d="M 600 -100 Q 450 200 380 500 Q 350 650 350 800 Q 350 950 400 1100" 
                stroke="#e5e7eb" 
                strokeWidth="2" 
                fill="none"/>
          <path d="M 700 0 Q 600 250 550 550 Q 530 700 530 850 Q 530 1000 580 1150" 
                stroke="#e5e7eb" 
                strokeWidth="2" 
                fill="none"/>
          <path d="M 800 100 Q 750 300 720 600 Q 710 750 710 900 Q 710 1050 760 1200" 
                stroke="#e5e7eb" 
                strokeWidth="2" 
                fill="none"/>
        </svg>
      </div>

      {/* Profile images positioned along curves */}
      <div className="absolute inset-0">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`absolute ${profile.size} rounded-full overflow-hidden border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2`}
            style={{ top: profile.top, left: profile.left }}
          >
            <img 
              src={profile.img} 
              alt={`Profile ${profile.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Footer social links */}
      <div className="absolute top-6 left-6 z-20 space-y-3">
        <a href="#" className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
          <Facebook className="w-5 h-5" fill="currentColor" />
          <span className="font-medium">@UntitledUI</span>
        </a>
        <a href="#" className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
          <Twitter className="w-5 h-5" fill="currentColor" />
          <span className="font-medium">@UntitledUI</span>
        </a>
        <a href="#" className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
          <Linkedin className="w-5 h-5" fill="currentColor" />
          <span className="font-medium">@UntitledUI</span>
        </a>
      </div>
    </div>
  );
};

export default function JobApplication() {
  const [schools, setSchools] = useState([{ id: 1 }]);
  const [references, setReferences] = useState([{ id: 1 }]);
  const [signatureMode, setSignatureMode] = useState('draw');
  const [signature, setSignature] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const addSchool = () => {
    setSchools([...schools, { id: schools.length + 1 }]);
  };

  const addReference = () => {
    setReferences([...references, { id: references.length + 1 }]);
  };

  const clearSignature = () => {
    if (signatureMode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      setSignature('');
    }
  };

  const initCanvas = (canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  React.useEffect(() => {
    if (canvasRef.current && signatureMode === 'draw') {
      initCanvas(canvasRef.current);
    }
  }, [signatureMode]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value;
      }
    });
    
    // Basic validation
    const requiredFields: Record<string, string> = {
      firstName: 'First Name',
      lastName: 'Last Name',
      gender: 'Gender',
      phone: 'Phone',
      email: 'Email',
      address1: 'Address Line 1',
      city: 'City',
      state: 'State',
      zipCode: 'Zip Code',
      position: 'Position',
      workAuth: 'Work Authorization',
      felony: 'Felony Conviction'
    };
    
    const missing: string[] = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!data[field] || data[field].trim() === '') {
        missing.push(label);
      }
    }
    
    if (missing.length > 0) {
      toast.error("Missing Required Fields", {
        description: `Please fill in: ${missing.join(", ")}`,
        duration: 5000,
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address",
        duration: 3000,
      });
      return;
    }
    
    const loadingToast = toast.loading("Submitting your application...", {
      description: "Please wait while we process your application",
    });
    
    try {
      const apiFormData = new FormData();
      
      // Add all basic form fields
      Object.keys(data).forEach(key => {
        apiFormData.append(key, data[key]);
      });
      
      // Collect education data from all schools
      const schoolsData = [];
      schools.forEach((school, index) => {
        const schoolData = {
          schoolName: e.currentTarget[`schoolName_${index}`]?.value || '',
          schoolType: e.currentTarget[`schoolType_${index}`]?.value || '',
          location: e.currentTarget[`location_${index}`]?.value || '',
          addressLine1: e.currentTarget[`schoolAddress1_${index}`]?.value || '',
          addressLine2: e.currentTarget[`schoolAddress2_${index}`]?.value || '',
          city: e.currentTarget[`schoolCity_${index}`]?.value || '',
          state: e.currentTarget[`schoolState_${index}`]?.value || '',
          zipCode: e.currentTarget[`schoolZip_${index}`]?.value || '',
          degree: e.currentTarget[`degree_${index}`]?.value || '',
          major: e.currentTarget[`major_${index}`]?.value || '',
          yearsCompleted: e.currentTarget[`years_${index}`]?.value || '',
        };
        schoolsData.push(schoolData);
      });
      apiFormData.append('schools', JSON.stringify(schoolsData));
      console.log('Schools data collected:', schoolsData);
      
      // Collect work experience data
      const workExperience = [];
      const companyName = data.companyName || '';
      const companyPhone = data.companyPhone || '';
      const workPosition = data.workPosition || '';
      
      // Only add work experience if at least company name or position is filled
      if (companyName || workPosition) {
        // Split position into position and responsibilities (form has them combined)
        const workData = {
          company: companyName,
          phone: companyPhone,
          position: workPosition.split('/')[0]?.trim() || workPosition,
          responsibilities: workPosition.split('/')[1]?.trim() || '',
          addressLine1: data.workAddress1 || '',
          addressLine2: data.workAddress2 || '',
          city: data.workCity || '',
          state: data.workState || '',
          zipCode: data.workZip || '',
          duration: data.workDuration || '',
          reasonForLeaving: data.reasonLeaving || '',
          contactForRef: data.contactRef ? data.contactRef.charAt(0).toUpperCase() + data.contactRef.slice(1) : '',
        };
        workExperience.push(workData);
      }
      apiFormData.append('workExperience', JSON.stringify(workExperience));
      console.log('Work experience data collected:', workExperience);
      
      // Collect references data from all references
      const referencesData = [];
      references.forEach((ref, index) => {
        const refData = {
          firstName: e.currentTarget[`refFirstName_${index}`]?.value || '',
          lastName: e.currentTarget[`refLastName_${index}`]?.value || '',
          company: e.currentTarget[`refCompany_${index}`]?.value || '',
          title: e.currentTarget[`refTitle_${index}`]?.value || '',
          phone: e.currentTarget[`refPhone_${index}`]?.value || '',
          email: e.currentTarget[`refEmail_${index}`]?.value || '',
        };
        referencesData.push(refData);
      });
      apiFormData.append('references', JSON.stringify(referencesData));
      console.log('References data collected:', referencesData);
      
      // Add signature (canvas converted to data URL for now)
      if (signatureMode === 'draw' && canvasRef.current) {
        const canvas = canvasRef.current;
        const signatureDataUrl = canvas.toDataURL('image/png');
        apiFormData.append('signatureDataUrl', signatureDataUrl);
        console.log('Signature canvas captured');
      } else if (signature) {
        apiFormData.append('signatureText', signature);
        console.log('Signature text:', signature);
      }
      
      // Add resume file if selected
      if (resumeFile) {
        apiFormData.append('resume', resumeFile);
      }
      
      // Submit to API
      const response = await fetch('http://localhost:4000/api/job-applications', {
        method: 'POST',
        body: apiFormData,
      });
      
      const result = await response.json();
      
      toast.dismiss(loadingToast);
      
      if (result.success) {
        toast.success("Application Submitted!", {
          description: "Thank you! We will contact you soon.",
          duration: 5000,
        });
        
        // Reset form after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Submission Failed", {
          description: result.message || "Failed to submit application",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error submitting application:", error);
      toast.error("Network Error", {
        description: "Unable to connect to server. Please try again.",
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Job Application - Al-Rasheed Academy</title>
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </Head>

      <Toaster position="top-right" richColors closeButton />
      <NavBarOnly />
      <Ticker />

      {/* Banner Section */}
      <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/hall.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl font-light tracking-wide"
          >
            Job Application
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            Home › Career › Job Application
          </motion.p>
        </div>
      </div>

      <main className="flex h-screen bg-white">
        <div className="w-[25%]">
          <Sidebar />
        </div>
        <div className="w-[75%] p-4 h-full bg-gray-50 border-l-[12px] border-white overflow-y-auto hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="w-full h-full">
            <div className="mb-6">
              <div className="flex items-center">
                <div className="relative w-32 h-32 mr-4 flex-shrink-0">
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-1.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-2.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/qqdd.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/48999.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/1333.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-13.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-12.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-6.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/qqq.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-9.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/7788.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-11.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-10.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                  <img
                    src="https://www.alrasheedacademy.org/images/qw.png"
                    alt=""
                    className="absolute w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold leading-tight">Al-Rasheed Academy Employment Application</h1>
                  <p className="text-lg text-gray-600 mt-1">3122 Abbott Road Orchard Park, NY 14127</p>
                </div>
              </div>
            </div>

            <form className="space-y-8 max-w-4xl" onSubmit={handleFormSubmit}>
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender*</Label>
                    <select className="w-full p-2 border rounded" id="gender" name="gender" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone*</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email*</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address*</Label>
                  <Input name="address1" placeholder="Address Line 1" required />
                  <Input name="address2" placeholder="Address Line 2" />
                  <div className="grid grid-cols-3 gap-4">
                    <Input name="city" placeholder="City" required />
                    <Input name="state" placeholder="State" required />
                    <Input name="zipCode" placeholder="Zip Code" required />
                  </div>
                </div>
              </div>

              {/* Job Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Job Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">What position are you applying for?*</Label>
                    <Input id="position" name="position" required />
                  </div>
                  <div>
                    <Label htmlFor="hourlyPay">Desired Hourly Pay</Label>
                    <Input id="hourlyPay" type="number" step="0.01" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="startDate">Date you can start</Label>
                  <Input id="startDate" type="date" />
                </div>

                <div className="space-y-2">
                  <Label>Are you authorized to work in the US?*</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="workAuth" value="yes" required />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="workAuth" value="no" required />
                      No
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Have you ever been convicted of a felony?*</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="felony" value="yes" required />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="felony" value="no" required />
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Resume</h2>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                      if (validTypes.includes(file.type)) {
                        setResumeFile(file);
                      } else {
                        alert('Please upload only PDF or Word documents');
                      }
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Upload or drag files here</p>
                  <p className="text-sm text-gray-500 mt-2">Please upload your resume in PDF or Word format</p>
                  {resumeFile && (
                    <p className="text-sm text-green-600 font-medium mt-2">
                      ✓ Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    name="resume"
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFile(e.target.files[0]);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose File
                  </Button>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Education</h2>
                
                {schools.map((school, index) => (
                  <div key={school.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">School {index + 1}</h3>
                      {schools.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSchools(schools.filter(s => s.id !== school.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`schoolName_${index}`}>Name of School*</Label>
                        <Input id={`schoolName_${index}`} name={`schoolName_${index}`} required />
                      </div>
                      <div>
                        <Label htmlFor={`schoolType_${index}`}>Type of School*</Label>
                        <select className="w-full p-2 border rounded" id={`schoolType_${index}`} name={`schoolType_${index}`} required>
                          <option value="">Select Type</option>
                          <option value="High School">High School</option>
                          <option value="College">College</option>
                          <option value="Bus. or Trade School">Bus. or Trade School</option>
                          <option value="Professional School">Professional School</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Location of School</Label>
                      <Input name={`location_${index}`} placeholder="Location/City" />
                      <Input name={`schoolAddress1_${index}`} placeholder="Address Line 1" />
                      <Input name={`schoolAddress2_${index}`} placeholder="Address Line 2" />
                      <div className="grid grid-cols-3 gap-4">
                        <Input name={`schoolCity_${index}`} placeholder="City" />
                        <Input name={`schoolState_${index}`} placeholder="State" />
                        <Input name={`schoolZip_${index}`} placeholder="Zip Code" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`degree_${index}`}>Degree Received</Label>
                        <Input id={`degree_${index}`} name={`degree_${index}`} />
                      </div>
                      <div>
                        <Label htmlFor={`major_${index}`}>Major</Label>
                        <Input id={`major_${index}`} name={`major_${index}`} />
                      </div>
                      <div>
                        <Label htmlFor={`years_${index}`}>Number of Years Completed</Label>
                        <Input id={`years_${index}`} name={`years_${index}`} type="number" />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addSchool}>
                  <Plus className="h-4 w-4" />
                  Add School
                </Button>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" name="companyName" />
                    </div>
                    <div>
                      <Label htmlFor="companyPhone">Phone</Label>
                      <Input id="companyPhone" name="companyPhone" type="tel" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="workPosition">What was your position / responsibilities?*</Label>
                    <Textarea id="workPosition" name="workPosition" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input name="workAddress1" placeholder="Address Line 1" />
                    <Input name="workAddress2" placeholder="Address Line 2" />
                    <div className="grid grid-cols-3 gap-4">
                      <Input name="workCity" placeholder="City" />
                      <Input name="workState" placeholder="State" />
                      <Input name="workZip" placeholder="Zip Code" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workDuration">How long did you work there? (Years/Months)</Label>
                      <Input id="workDuration" name="workDuration" />
                    </div>
                    <div>
                      <Label htmlFor="reasonLeaving">Reason for Leaving</Label>
                      <Input id="reasonLeaving" name="reasonLeaving" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>May we contact this place for reference?*</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="contactRef" value="yes" required />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="contactRef" value="no" required />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Do you want to add additional work Experience?*</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="addWork" value="yes" required />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="addWork" value="no" required />
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">References</h2>
                
                {references.map((reference, index) => (
                  <div key={reference.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Reference {index + 1}</h3>
                      {references.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => setReferences(references.filter(r => r.id !== reference.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`refFirstName_${index}`}>First Name</Label>
                        <Input id={`refFirstName_${index}`} name={`refFirstName_${index}`} />
                      </div>
                      <div>
                        <Label htmlFor={`refLastName_${index}`}>Last Name</Label>
                        <Input id={`refLastName_${index}`} name={`refLastName_${index}`} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`refCompany_${index}`}>Company</Label>
                        <Input id={`refCompany_${index}`} name={`refCompany_${index}`} />
                      </div>
                      <div>
                        <Label htmlFor={`refTitle_${index}`}>Title</Label>
                        <Input id={`refTitle_${index}`} name={`refTitle_${index}`} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`refPhone_${index}`}>Phone</Label>
                        <Input id={`refPhone_${index}`} name={`refPhone_${index}`} type="tel" />
                      </div>
                      <div>
                        <Label htmlFor={`refEmail_${index}`}>Email</Label>
                        <Input id={`refEmail_${index}`} name={`refEmail_${index}`} type="email" />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addReference}>
                  <Plus className="h-4 w-4" />
                  Add Reference
                </Button>
              </div>

              {/* Signature */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Signature</h2>
                
                <div className="flex gap-2 mb-4">
                  <Button 
                    type="button" 
                    variant={signatureMode === 'draw' ? 'default' : 'outline'}
                    onClick={() => setSignatureMode('draw')}
                    className="flex items-center gap-2"
                  >
                    <Pen className="h-4 w-4" />
                    Draw
                  </Button>
                  <Button 
                    type="button" 
                    variant={signatureMode === 'type' ? 'default' : 'outline'}
                    onClick={() => setSignatureMode('type')}
                    className="flex items-center gap-2"
                  >
                    <Type className="h-4 w-4" />
                    Type
                  </Button>
                  <Button type="button" variant="outline" onClick={clearSignature}>
                    Clear
                  </Button>
                </div>

                {signatureMode === 'draw' ? (
                  <div className="border rounded-lg bg-white">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={200}
                      className="w-full h-48 cursor-crosshair"
                      onMouseDown={(e) => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;
                        const rect = canvas.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const ctx = canvas.getContext('2d');
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        canvas.isDrawing = true;
                      }}
                      onMouseMove={(e) => {
                        const canvas = canvasRef.current;
                        if (!canvas || !canvas.isDrawing) return;
                        const rect = canvas.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const ctx = canvas.getContext('2d');
                        ctx.lineTo(x, y);
                        ctx.stroke();
                      }}
                      onMouseUp={() => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;
                        canvas.isDrawing = false;
                      }}
                      onMouseLeave={() => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;
                        canvas.isDrawing = false;
                      }}
                    />
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-white">
                    <Input
                      placeholder="Type your signature here"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="text-2xl font-script border-none shadow-none p-0"
                      style={{ fontFamily: 'cursive' }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-6 pb-20">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Submit Application
                </Button>
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
