import Head from "next/head";
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
  const canvasRef = useRef(null);

  const addSchool = () => {
    setSchools([...schools, { id: schools.length + 1 }]);
  };

  const addReference = () => {
    setReferences([...references, { id: references.length + 1 }]);
  };

  const clearSignature = () => {
    if (signatureMode === 'draw' && canvasRef.current) {
      canvasRef.current.clear();
    } else {
      setSignature('');
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

      <NavBarOnly />
      <Ticker />

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

            <form className="space-y-8 max-w-4xl">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender*</Label>
                    <select className="w-full p-2 border rounded" id="gender" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone*</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email*</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address*</Label>
                  <Input placeholder="Address Line 1" required />
                  <Input placeholder="Address Line 2" />
                  <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="City" required />
                    <Input placeholder="State" required />
                    <Input placeholder="Zip Code" required />
                  </div>
                </div>
              </div>

              {/* Job Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Job Information</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">What position are you applying for?</Label>
                    <Input id="position" />
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Upload or drag files here</p>
                  <p className="text-sm text-gray-500 mt-2">Please upload your resume in PDF or Word format</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  <Button type="button" variant="outline" className="mt-4">Choose File</Button>
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
                        <Label htmlFor={`schoolName${school.id}`}>Name of School*</Label>
                        <Input id={`schoolName${school.id}`} required />
                      </div>
                      <div>
                        <Label htmlFor={`schoolType${school.id}`}>Type of School*</Label>
                        <select className="w-full p-2 border rounded" id={`schoolType${school.id}`} required>
                          <option value="">Select Type</option>
                          <option value="high-school">High School</option>
                          <option value="college">College</option>
                          <option value="trade">Bus. or Trade School</option>
                          <option value="professional">Professional School</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Location of School</Label>
                      <Input placeholder="Address Line 1" />
                      <Input placeholder="Address Line 2" />
                      <div className="grid grid-cols-3 gap-4">
                        <Input placeholder="City" />
                        <Input placeholder="State" />
                        <Input placeholder="Zip Code" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`degree${school.id}`}>Degree Received</Label>
                        <Input id={`degree${school.id}`} />
                      </div>
                      <div>
                        <Label htmlFor={`major${school.id}`}>Major</Label>
                        <Input id={`major${school.id}`} />
                      </div>
                      <div>
                        <Label htmlFor={`yearsCompleted${school.id}`}>Number of Years Completed</Label>
                        <Input id={`yearsCompleted${school.id}`} type="number" />
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
                      <Input id="companyName" />
                    </div>
                    <div>
                      <Label htmlFor="companyPhone">Phone</Label>
                      <Input id="companyPhone" type="tel" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="position">What was your position / responsibilities?*</Label>
                    <Textarea id="position" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input placeholder="Address Line 1" />
                    <Input placeholder="Address Line 2" />
                    <div className="grid grid-cols-3 gap-4">
                      <Input placeholder="City" />
                      <Input placeholder="State" />
                      <Input placeholder="Zip Code" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workDuration">How long did you work there? (Years/Months)</Label>
                      <Input id="workDuration" />
                    </div>
                    <div>
                      <Label htmlFor="reasonLeaving">Reason for Leaving</Label>
                      <Input id="reasonLeaving" />
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
                        <Label htmlFor={`refFirstName${reference.id}`}>First Name</Label>
                        <Input id={`refFirstName${reference.id}`} />
                      </div>
                      <div>
                        <Label htmlFor={`refLastName${reference.id}`}>Last Name</Label>
                        <Input id={`refLastName${reference.id}`} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`refCompany${reference.id}`}>Company</Label>
                        <Input id={`refCompany${reference.id}`} />
                      </div>
                      <div>
                        <Label htmlFor={`refTitle${reference.id}`}>Title</Label>
                        <Input id={`refTitle${reference.id}`} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`refPhone${reference.id}`}>Phone</Label>
                        <Input id={`refPhone${reference.id}`} type="tel" />
                      </div>
                      <div>
                        <Label htmlFor={`refEmail${reference.id}`}>Email</Label>
                        <Input id={`refEmail${reference.id}`} type="email" />
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
                        if (!canvas.isDrawing) return;
                        const rect = canvas.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const ctx = canvas.getContext('2d');
                        ctx.lineTo(x, y);
                        ctx.stroke();
                      }}
                      onMouseUp={() => {
                        const canvas = canvasRef.current;
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
