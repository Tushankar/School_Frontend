"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Ticker from '../Ticker';
import {
Bus, Shield, AlertTriangle, Phone, Mail,
CheckCircle, XCircle, AlertCircle, Users, Clock,
FileText, Printer, Loader2
} from 'lucide-react';

// Custom Hook for Scroll Animation
const useScrollAnimation = () => {
const [isVisible, setIsVisible] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
const observer = new IntersectionObserver(
([entry]) => {
if (entry.isIntersecting) {
setIsVisible(true);
observer.unobserve(entry.target);
}
},
{
threshold: 0.1,
rootMargin: '0px 0px -50px 0px',
}
);

if (ref.current) {
  observer.observe(ref.current);
}

return () => {
  if (ref.current) {
    observer.unobserve(ref.current);
  }
};
}, []);

return [ref, isVisible] as const;
};

// Animated Section Component with Multiple Effects
const AnimatedSection = ({ children, delay = 0, animation = 'fadeUp' }) => {
const [ref, isVisible] = useScrollAnimation();

const animations = {
fadeUp: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
},
fadeDown: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
},
fadeLeft: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'translateX(0)' : 'translateX(-80px)',
},
fadeRight: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'translateX(0)' : 'translateX(80px)',
},
scale: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'scale(1)' : 'scale(0.85)',
},
rotate: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-5deg) scale(0.9)',
},
flip: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'rotateY(0deg)' : 'rotateY(90deg)',
},
bounce: {
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
},
};

return (
<div
ref={ref}
style={{
...animations[animation],
transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s',
willChange: 'transform, opacity',
}}
>
{children}
</div>
);
};

// Staggered List Animation Component
const StaggeredList = ({ children, delay = 0 }) => {
const [ref, isVisible] = useScrollAnimation();

return (
<div ref={ref}>
{React.Children.map(children, (child, index) => (
<div
style={{
opacity: isVisible ? 1 : 0,
transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + index * 0.1}s',
}}
>
{child}
</div>
))}
</div>
);
};

const BusPolicy = () => {
const contentRef = useRef(null);
const [headerVisible, setHeaderVisible] = useState(false);
const [cmsData, setCmsData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  setTimeout(() => setHeaderVisible(true), 100);
}, []);

useEffect(() => {
  const fetchBusPolicyData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/cms/bus-policy");
      if (response.ok) {
        const data = await response.json();
        setCmsData(data);
      } else {
        setError("Failed to load bus policy information");
      }
    } catch (err) {
      console.error("Error fetching bus policy data:", err);
      setError("Failed to load bus policy information");
    } finally {
      setLoading(false);
    }
  };

  fetchBusPolicyData();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bus policy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff)' }}>
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <div className="text-red-600 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Content</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff)' }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #0d9488 0%, rgba(13, 148, 136, 0) 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, rgba(59, 130, 246, 0) 70%)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Sticky Action Buttons with Advanced Animations */}
      <div className="fixed top-4 right-4 z-50 flex gap-3 no-print">
      </div>

      {/* PDF Content - Full Width */}
      <div ref={contentRef} className="w-full relative">
        {/* Use the same banner/logo layout as the Contact page for visual consistency */}
        
        <Ticker />

        <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/hall.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center text-white max-w-6xl w-full px-6">
            <div className="flex items-center justify-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <style dangerouslySetInnerHTML={{ __html: `
                      @keyframes slideInFromLeft {
                        0% { opacity: 0; transform: translateX(-100%); }
                        100% { opacity: 1; transform: translateX(0); }
                      }
                      @keyframes slideInFromRight {
                        0% { opacity: 0; transform: translateX(100%); }
                        100% { opacity: 1; transform: translateX(0); }
                      }
                      @keyframes slideInFromTop {
                        0% { opacity: 0; transform: translateY(-100%); }
                        100% { opacity: 1; transform: translateY(0); }
                      }
                      @keyframes slideInFromBottom {
                        0% { opacity: 0; transform: translateY(100%); }
                        100% { opacity: 1; transform: translateY(0); }
                      }
                      .slide-left {
                        animation: slideInFromLeft 1500ms ease-in-out;
                        animation-fill-mode: both;
                      }
                      .slide-right {
                        animation: slideInFromRight 1500ms ease-in-out;
                        animation-fill-mode: both;
                      }
                      .slide-top {
                        animation: slideInFromTop 1500ms ease-in-out;
                        animation-fill-mode: both;
                      }
                      .slide-bottom {
                        animation: slideInFromBottom 1500ms ease-in-out;
                        animation-fill-mode: both;
                      }
                      .delay-200 { animation-delay: 200ms; }
                      .delay-400 { animation-delay: 400ms; }
                      .delay-600 { animation-delay: 600ms; }
                      .delay-800 { animation-delay: 800ms; }
                      .delay-1000 { animation-delay: 1000ms; }
                      .delay-1200 { animation-delay: 1200ms; }
                      .delay-1400 { animation-delay: 1400ms; }
                    ` }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-1.png" alt="" className="absolute w-full h-full object-contain slide-left delay-200" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-2.png" alt="" className="absolute w-full h-full object-contain slide-left delay-400" />
                <img src="https://www.alrasheedacademy.org/images/qqdd.png" alt="" className="absolute w-full h-full object-contain slide-left delay-600" />
                <img src="https://www.alrasheedacademy.org/images/48999.png" alt="" className="absolute w-full h-full object-contain slide-left delay-800" style={{ animationDuration: '1000ms' }} />
                <img src="https://www.alrasheedacademy.org/images/1333.png" alt="" className="absolute w-full h-full object-contain slide-right delay-300" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-13.png" alt="" className="absolute w-full h-full object-contain slide-right delay-500" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-12.png" alt="" className="absolute w-full h-full object-contain slide-right delay-700" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-6.png" alt="" className="absolute w-full h-full object-contain slide-right delay-900" />
                <img src="https://www.alrasheedacademy.org/images/qqq.png" alt="" className="absolute w-full h-full object-contain slide-top delay-400" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-9.png" alt="" className="absolute w-full h-full object-contain slide-top delay-600" />
                <img src="https://www.alrasheedacademy.org/images/7788.png" alt="" className="absolute w-full h-full object-contain slide-top delay-800" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-11.png" alt="" className="absolute w-full h-full object-contain slide-bottom delay-500" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-10.png" alt="" className="absolute w-full h-full object-contain slide-bottom delay-700" />
                <img src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png" alt="" className="absolute w-full h-full object-contain slide-bottom delay-900" />
                <img src="https://www.alrasheedacademy.org/images/qw.png" alt="" className="absolute w-full h-full object-contain slide-bottom delay-1100" />
              </div>
              <div>
                <motion.h1
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className="text-4xl md:text-5xl font-bold"
                >
                  {cmsData?.banner?.title || 'Bus Transportation Policy'}
                </motion.h1>
                <motion.p
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                  className="mt-2 text-sm text-yellow-300"
                >
                  {cmsData?.banner?.subtitle || 'Home › Admission › Bus Policy'}
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the animated visual content continues exactly as before... */}
        {/* I'll keep it short here but include the full sections in actual implementation */}
        
        <div className="w-full px-8 py-12">
          <AnimatedSection animation="rotate">
            <div 
              className="bg-white rounded-2xl shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden" 
              style={{ borderTop: '4px solid #14b8a6' }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to right, rgba(20, 184, 166, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)' }}
              />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div 
                  className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-500" 
                  style={{ backgroundColor: '#ccfbf1' }}
                >
                  <Bus className="w-8 h-8 group-hover:animate-bounce" style={{ color: '#0d9488' }} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold" style={{ color: '#1e293b' }}>{cmsData?.hero?.title || 'Bus Transportation Policy'}</h2>
                  <p className="mt-1" style={{ color: '#4b5563' }}>{cmsData?.hero?.subtitle || 'Safety Guidelines & Regulations'}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Purpose Section with Flip Animation */}
          <AnimatedSection animation="flip" delay={0.1}>
            <div 
              className="rounded-xl p-8 mb-8 hover:shadow-xl transition-all duration-500" 
              style={{ 
                background: 'linear-gradient(135deg, #f0fdfa 0%, #eff6ff 100%)',
                borderLeft: '4px solid #14b8a6' 
              }}
            >
              <div className="flex items-start gap-4">
                <Shield 
                  className="w-6 h-6 mt-1 flex-shrink-0" 
                  style={{ 
                    color: '#0d9488',
                    animation: 'wiggle 2s ease-in-out infinite',
                  }} 
                />
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#1e293b' }}>Purpose & Mission</h3>
                  <p className="leading-relaxed text-lg" style={{ color: '#374151' }}>
                    {cmsData?.hero?.description || 'Safe and reliable transportation is essential to student success at Al-Rasheed Academy. This policy ensures the safety, security, and well-being of all students utilizing school bus services while fostering a positive and respectful transportation environment.'}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Section I with Staggered List Items */}
          <AnimatedSection animation="fadeLeft" delay={0.2}>
            <div 
              className="bg-white rounded-xl shadow-lg mb-8 p-8 hover:shadow-2xl transition-all duration-500" 
              style={{ borderLeft: '4px solid #3b82f6' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="p-3 rounded-xl hover:rotate-12 transition-transform duration-500" 
                  style={{ backgroundColor: '#dbeafe' }}
                >
                  <FileText className="w-6 h-6" style={{ color: '#2563eb' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#1e293b' }}>{cmsData?.section1?.title || 'I. General Transportation Guidelines'}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: '#1e293b' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: '#16a34a' }} />
                    {cmsData?.section1?.eligibility?.title || 'Eligibility for Bus Service'}
                  </h4>
                  <StaggeredList delay={0.3}>
                    {(cmsData?.section1?.eligibility?.items || [
                      "Bus transportation available to students residing beyond 1 mile from campus",
                      "Service provided on established routes with designated stops",
                      "Transportation is a privilege, not a right, and may be revoked for policy violations"
                    ]).map((item, index) => (
                      <li key={index} className="ml-7 text-base hover:translate-x-2 transition-transform duration-300" style={{ color: '#374151' }}>
                        {item}
                      </li>
                    ))}
                  </StaggeredList>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: '#1e293b' }}>
                    <Clock className="w-5 h-5 animate-spin-slow" style={{ color: '#d97706' }} />
                    {cmsData?.section1?.busStopSafety?.title || 'Bus Stop Safety'}
                  </h4>
                  <StaggeredList delay={0.5}>
                    {(cmsData?.section1?.busStopSafety?.items || [
                      "Arrive at designated stops 5 minutes before scheduled pickup",
                      "Wait at least 10 feet away from the roadway",
                      "Never approach bus until it comes to complete stop and driver signals",
                      "Cross streets only at designated crosswalks with driver supervision"
                    ]).map((item, index) => (
                      <li key={index} className="ml-7 text-base hover:translate-x-2 transition-transform duration-300" style={{ color: '#374151' }}>
                        {item}
                      </li>
                    ))}
                  </StaggeredList>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Section II with Enhanced Card Animations */}
          <AnimatedSection animation="fadeRight" delay={0.15}>
            <div 
              className="bg-white rounded-xl shadow-lg mb-8 p-8 hover:shadow-2xl transition-all duration-500" 
              style={{ borderLeft: '4px solid #a855f7' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="p-3 rounded-xl hover:scale-110 transition-transform duration-500" 
                  style={{ backgroundColor: '#f3e8ff' }}
                >
                  <Users className="w-6 h-6 hover:rotate-12 transition-transform" style={{ color: '#9333ea' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#1e293b' }}>{cmsData?.section2?.title || 'II. Student Conduct & Behavior Expectations'}</h3>
              </div>

              <div className="space-y-6">
                {/* Boarding & Departure Procedures */}
                <div>
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: '#1e293b' }}>
                    <Bus className="w-5 h-5" style={{ color: '#2563eb' }} />
                    {cmsData?.section2?.boardingProcedures?.title || 'Boarding & Departure Procedures'}
                  </h4>
                  <StaggeredList delay={0.2}>
                    {(cmsData?.section2?.boardingProcedures?.items || [
                      "Board in an orderly manner - no pushing, running, or crowding",
                      "Take your seat immediately and remain seated while bus is in motion",
                      "Keep aisles clear at all times",
                      "Exit from front to back when arriving at destination",
                      "Follow driver instructions at all times"
                    ]).map((item, index) => (
                      <li key={index} className="ml-7 text-base hover:translate-x-2 transition-transform duration-300" style={{ color: '#374151' }}>
                        {item}
                      </li>
                    ))}
                  </StaggeredList>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3" style={{ color: '#1e293b' }}>On-Bus Behavior Standards</h4>
                  <p className="mb-3" style={{ color: '#374151' }}>{cmsData?.section2?.behaviorStandards?.description || 'Students are expected to:'}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(cmsData?.section2?.behaviorStandards?.items || [
                      'Speak in quiet, respectful tones',
                      'Keep hands and feet to yourself',
                      'Remain seated facing forward',
                      'Keep the bus clean',
                      'No eating, drinking, or chewing gum',
                      'Respect all students and staff'
                    ]).map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-4 rounded-lg border hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer" 
                        style={{ 
                          backgroundColor: '#f0fdf4', 
                          borderColor: '#bbf7d0',
                          transitionDelay: `${idx * 0.05}s`,
                        }}
                      >
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 animate-pulse-slow" style={{ color: '#16a34a' }} />
                        <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: '#1e293b' }}>
                    <XCircle className="w-5 h-5 animate-pulse" style={{ color: '#dc2626' }} />
                    Prohibited Items & Actions
                  </h4>
                  <p className="mb-3" style={{ color: '#374151' }}>{cmsData?.section2?.prohibitedItems?.description || 'The following are NOT permitted on school buses:'}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(cmsData?.section2?.prohibitedItems?.items || [
                      'Weapons, drugs, alcohol, tobacco products, or vaping devices',
                      'Glass containers, sharp objects, or hazardous materials',
                      'Pets or animals (except service animals)',
                      'Large items blocking aisles or emergency exits',
                      'Electronic devices at excessive volume',
                      'Opening windows without driver permission',
                      'Throwing objects inside or outside the bus',
                      'Vandalism or defacing bus property'
                    ]).map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2 p-3 rounded-lg border hover:scale-105 transition-all duration-300" 
                        style={{ 
                          backgroundColor: '#fef2f2', 
                          borderColor: '#fecaca',
                          transitionDelay: `${idx * 0.05}s`,
                        }}
                      >
                        <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#dc2626' }} />
                        <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Section III with Bounce Animation */}
          <AnimatedSection animation="bounce" delay={0.2}>
            <div 
              className="bg-white rounded-xl shadow-lg mb-8 p-8 hover:shadow-2xl transition-all duration-500" 
              style={{ borderLeft: '4px solid #ef4444' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="p-3 rounded-xl hover:scale-110 transition-transform duration-500" 
                  style={{ backgroundColor: '#fee2e2' }}
                >
                  <Shield className="w-6 h-6 hover:rotate-12 transition-transform" style={{ color: '#dc2626' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#1e293b' }}>{cmsData?.section3?.title || 'III. Safety Procedures'}</h3>
              </div>

              <div className="space-y-6">
                <div 
                  className="border-l-4 p-6 rounded-r-lg hover:scale-105 transition-all duration-500" 
                  style={{ 
                    backgroundColor: '#fffbeb', 
                    borderColor: '#f59e0b' 
                  }}
                >
                  <div className="flex items-start gap-4">
                    <AlertTriangle 
                      className="w-6 h-6 mt-1 flex-shrink-0" 
                      style={{ 
                        color: '#d97706',
                        animation: 'shake 2s ease-in-out infinite',
                      }} 
                    />
                    <div>
                      <h4 className="font-bold text-lg mb-2" style={{ color: '#1e293b' }}>{cmsData?.section3?.dangerZone?.title || '10-Foot Danger Zone'}</h4>
                      <p className="mb-3" style={{ color: '#374151' }}>
                        {cmsData?.section3?.dangerZone?.description || 'Students must understand the danger zone surrounding all sides of the bus:'}
                      </p>
                      <StaggeredList delay={0.4}>
                        {(cmsData?.section3?.dangerZone?.items || [
                          "Never walk behind the bus",
                          "Always walk 10 feet in front when crossing",
                          "Make eye contact with driver before crossing"
                        ]).map((item, index) => (
                          <li key={index} className="ml-4 hover:translate-x-2 transition-transform duration-300" style={{ color: '#374151' }}>
                            {item}
                          </li>
                        ))}
                      </StaggeredList>
                    </div>
                  </div>
                </div>

                {/* Emergency Evacuation */}
                <div 
                  className="border-l-4 p-6 rounded-r-lg hover:scale-105 transition-all duration-500" 
                  style={{ 
                    backgroundColor: '#fef3c7', 
                    borderColor: '#f59e0b' 
                  }}
                >
                  <div className="flex items-start gap-4">
                    <Shield 
                      className="w-6 h-6 mt-1 flex-shrink-0" 
                      style={{ 
                        color: '#d97706',
                        animation: 'pulse 2s ease-in-out infinite',
                      }} 
                    />
                    <div>
                      <h4 className="font-bold text-lg mb-2" style={{ color: '#1e293b' }}>{cmsData?.section3?.emergencyEvacuation?.title || 'Emergency Evacuation'}</h4>
                      <StaggeredList delay={0.4}>
                        {(cmsData?.section3?.emergencyEvacuation?.items || [
                          "All students receive annual bus evacuation training",
                          "Emergency exits are clearly marked",
                          "Students must follow driver instructions during emergencies",
                          "Practice drills conducted at least once per school year"
                        ]).map((item, index) => (
                          <li key={index} className="ml-4 hover:translate-x-2 transition-transform duration-300" style={{ color: '#374151' }}>
                            {item}
                          </li>
                        ))}
                      </StaggeredList>
                    </div>
                  </div>
                </div>

                {/* Special Accommodations */}
                <div 
                  className="border-l-4 p-6 rounded-r-lg hover:scale-105 transition-all duration-500" 
                  style={{ 
                    backgroundColor: '#e0f2fe', 
                    borderColor: '#0ea5e9' 
                  }}
                >
                  <div className="flex items-start gap-4">
                    <Users 
                      className="w-6 h-6 mt-1 flex-shrink-0" 
                      style={{ 
                        color: '#0ea5e9',
                        animation: 'bounce 2s ease-in-out infinite',
                      }} 
                    />
                    <div>
                      <h4 className="font-bold text-lg mb-2" style={{ color: '#1e293b' }}>{cmsData?.section3?.specialAccommodations?.title || 'Special Accommodations'}</h4>
                      <StaggeredList delay={0.4}>
                        {(cmsData?.section3?.specialAccommodations?.items || [
                          "Students with disabilities receive appropriate accommodations",
                          "English language learners receive translated safety materials",
                          "Parents may request special seating arrangements for medical reasons"
                        ]).map((item, index) => (
                          <li key={index} className="ml-4 hover:translate-x-2 transition-transform duration-300" style={{ color: '#374151' }}>
                            {item}
                          </li>
                        ))}
                      </StaggeredList>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Information with Pulse and Glow Effect */}
          <AnimatedSection animation="scale" delay={0.1}>
            <div 
              className="rounded-2xl shadow-xl p-8 text-white mb-8 relative overflow-hidden group" 
              style={{ 
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                   style={{ animation: 'shimmer 3s infinite' }} />
              
              <h3 className="text-2xl font-bold mb-6 text-center relative z-10">{cmsData?.contact?.title || 'Contact Transportation Department'}</h3>
              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {[
                  { icon: Phone, title: 'Phone', line1: cmsData?.contact?.phone || '(716) 123-4567', line2: cmsData?.contact?.phoneNote || 'Emergency: Available 24/7' },
                  { icon: Mail, title: 'Email', line1: cmsData?.contact?.email || 'transport@alrasheedacademy.org', line2: null },
                  { icon: Clock, title: 'Office Hours', line1: 'Monday-Friday', line2: cmsData?.contact?.officeHours || '7:30 AM - 4:00 PM' }
                ].map((contact, idx) => {
                  const IconComponent = contact.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-4 hover:scale-105 transition-all duration-300 cursor-pointer"
                      style={{
                        opacity: 0,
                        animation: `fadeInUp 0.6s ease-out forwards ${0.2 + idx * 0.1}s`,
                      }}
                    >
                      <div 
                        className="p-3 rounded-lg hover:rotate-12 transition-transform duration-500" 
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{contact.title}</h4>
                        <p style={{ color: '#ccfbf1' }}>{contact.line1}</p>
                        {contact.line2 && <p className="text-sm" style={{ color: '#ccfbf1' }}>{contact.line2}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Footer with Wave Animation */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div 
              className="text-center py-6 border-t relative overflow-hidden" 
              style={{ color: '#4b5563', borderColor: '#e5e7eb' }}
            >
              <div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000"
                style={{ background: 'linear-gradient(to right, rgba(20, 184, 166, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)' }}
              />
              <p className="mb-2 font-semibold relative z-10">{cmsData?.footer?.effectiveDate || 'Policy Effective Date: Fall 2025'} | {cmsData?.footer?.lastRevised || 'Last Revised: October 2025'} | {cmsData?.footer?.nextReview || 'Next Review: August 2026'}</p>
              <p className="font-bold text-lg relative z-10" style={{ color: '#1e293b' }}>{cmsData?.footer?.copyright || 'ARA ©2012 All rights reserved.'}</p>
              <p className="text-sm mt-2 relative z-10" style={{ color: '#6b7280' }}>{cmsData?.footer?.subtitle || 'K-12 Schools - Recognized by New York State Education Department'}</p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(251, 191, 36, 0); }
          100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0); }
        }
        
        @keyframes text-glow {
          from { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
          to { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(251, 191, 36, 0.6); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BusPolicy;