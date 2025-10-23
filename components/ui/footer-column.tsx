import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Icon mapping for CMS data
const iconMap = {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Dribbble,
  Mail,
  Phone,
  MapPin,
};

export default function Footer4Col() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('https://alrasheedacademyserver.onrender.com/api/auth/cms/footer');
        if (response.ok) {
          const data = await response.json();
          setFooterData(data);
        } else {
          console.error('Failed to fetch footer data');
          // Fallback to default data if API fails
          setFooterData({
            company: {
              name: 'Al-Rasheed Academy',
              description: 'Excellence in Islamic Education. Accredited by New York State Education Department, providing quality K-12 education with Islamic values.',
              logo: '/logo.png'
            },
            socialLinks: [
              { label: 'Facebook', href: 'https://facebook.com/alrasheedacademy', icon: 'Facebook' },
              { label: 'Instagram', href: 'https://instagram.com/alrasheedacademy', icon: 'Instagram' },
              { label: 'Twitter', href: 'https://twitter.com/alrasheedacademy', icon: 'Twitter' },
              { label: 'GitHub', href: 'https://github.com/alrasheedacademy', icon: 'Github' },
              { label: 'Dribbble', href: 'https://dribbble.com/alrasheedacademy', icon: 'Dribbble' }
            ],
            aboutLinks: [
              { text: 'Our History', href: '/about/history' },
              { text: 'Faculty & Staff', href: '/about/faculty' },
              { text: 'Mission & Vision', href: '/about/mission' },
              { text: 'Careers', href: '/careers' }
            ],
            serviceLinks: [
              { text: 'Admission', href: '/admission' },
              { text: 'Learning Programs', href: '/learning' },
              { text: 'Accreditation', href: '/accreditation' },
              { text: 'Career Services', href: '/career' }
            ],
            helpfulLinks: [
              { text: 'FAQs', href: '/faqs' },
              { text: 'Student Support', href: '/support' },
              { text: 'Contact Us', href: '/contact', hasIndicator: true }
            ],
            contactInfo: [
              { text: 'info@alrasheedacademy.org', icon: 'Mail', isAddress: false },
              { text: '+1(716) 822-0440', icon: 'Phone', isAddress: false },
              { text: '3122 Abbott Road Orchard Park, New York 14127', icon: 'MapPin', isAddress: true }
            ]
          });
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Fallback to default data if API fails
        setFooterData({
          company: {
            name: 'Al-Rasheed Academy',
            description: 'Excellence in Islamic Education. Accredited by New York State Education Department, providing quality K-12 education with Islamic values.',
            logo: '/logo.png'
          },
          socialLinks: [
            { label: 'Facebook', href: 'https://facebook.com/alrasheedacademy', icon: 'Facebook' },
            { label: 'Instagram', href: 'https://instagram.com/alrasheedacademy', icon: 'Instagram' },
            { label: 'Twitter', href: 'https://twitter.com/alrasheedacademy', icon: 'Twitter' },
            { label: 'GitHub', href: 'https://github.com/alrasheedacademy', icon: 'Github' },
            { label: 'Dribbble', href: 'https://dribbble.com/alrasheedacademy', icon: 'Dribbble' }
          ],
          aboutLinks: [
            { text: 'Our History', href: '/about/history' },
            { text: 'Faculty & Staff', href: '/about/faculty' },
            { text: 'Mission & Vision', href: '/about/mission' },
            { text: 'Careers', href: '/careers' }
          ],
          serviceLinks: [
            { text: 'Admission', href: '/admission' },
            { text: 'Learning Programs', href: '/learning' },
            { text: 'Accreditation', href: '/accreditation' },
            { text: 'Career Services', href: '/career' }
          ],
          helpfulLinks: [
            { text: 'FAQs', href: '/faqs' },
            { text: 'Student Support', href: '/support' },
            { text: 'Contact Us', href: '/contact', hasIndicator: true }
          ],
          contactInfo: [
            { text: 'info@alrasheedacademy.org', icon: 'Mail', isAddress: false },
            { text: '+1(716) 822-0440', icon: 'Phone', isAddress: false },
            { text: '3122 Abbott Road Orchard Park, New York 14127', icon: 'MapPin', isAddress: true }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white mt-auto w-full rounded-t-xl">
        <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
          <div className="flex items-center justify-center">
            <div className="text-white/60">Loading footer...</div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white mt-auto w-full rounded-t-xl">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-primary flex justify-center gap-2 sm:justify-start">
              <div className="relative w-12 h-12">
                <img
                  src="https://www.alrasheedacademy.org/images/Untitled-1.png"
                  alt="Al-Rasheed Academy Logo"
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
              <span className="text-2xl font-semibold">
                {footerData.company?.name || 'Al-Rasheed Academy'}
              </span>
            </div>

            <p className="text-white/60 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {footerData.company?.description || 'Excellence in Islamic Education.'}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {footerData.socialLinks?.map(({ icon, label, href }) => {
                const IconComponent = iconMap[icon] || Facebook;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-primary hover:text-primary/80 transition"
                    >
                      <span className="sr-only">{label}</span>
                      <IconComponent className="size-6" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">About Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {footerData.aboutLinks?.map(({ text, href }) => (
                  <li key={text}>
                    <a className="text-white/70 transition" href={href}>
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Academics</p>
              <ul className="mt-8 space-y-4 text-sm">
                {footerData.serviceLinks?.map(({ text, href }) => (
                  <li key={text}>
                    <a className="text-white/70 transition" href={href}>
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Helpful Links</p>
              <ul className="mt-8 space-y-4 text-sm">
                {footerData.helpfulLinks?.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className={`${
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start'
                          : 'text-white/70 transition'
                      }`}
                    >
                      <span className="text-white/70 transition">{text}</span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                          <span className="bg-primary relative inline-flex size-2 rounded-full" />
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Contact Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {footerData.contactInfo?.map(({ icon, text, isAddress }) => {
                  const IconComponent = iconMap[icon] || Mail;
                  return (
                    <li key={text}>
                      <a
                        className="flex items-center justify-center gap-1.5 sm:justify-start"
                        href="#"
                      >
                        <IconComponent className="text-primary size-5 shrink-0 shadow-sm" />
                        {isAddress ? (
                          <address className="text-white/70 -mt-0.5 flex-1 not-italic transition">
                            {text}
                          </address>
                        ) : (
                          <span className="text-white/70 flex-1 transition">{text}</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="text-white/70 mt-4 text-sm transition sm:order-first sm:mt-0">
              &copy; 2025 {footerData.company?.name || 'Al-Rasheed Academy'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}