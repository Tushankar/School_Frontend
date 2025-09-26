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

const data = {
  facebookLink: 'https://facebook.com/alrasheedacademy',
  instaLink: 'https://instagram.com/alrasheedacademy',
  twitterLink: 'https://twitter.com/alrasheedacademy',
  githubLink: 'https://github.com/alrasheedacademy',
  dribbbleLink: 'https://dribbble.com/alrasheedacademy',
  services: {
    admission: '/admission',
    learning: '/learning',
    accreditation: '/accreditation',
    career: '/career',
  },
  about: {
    history: '/about/history',
    faculty: '/about/faculty',
    mission: '/about/mission',
    careers: '/careers',
  },
  help: {
    faqs: '/faqs',
    support: '/support',
    contact: '/contact',
  },
  contact: {
    email: 'info@alrasheedacademy.org',
    phone: '+1(716) 822-0440',
    address: '3122 Abbott Road Orchard Park, New York 14127',
  },
  company: {
    name: 'Al-Rasheed Academy',
    description:
      'Excellence in Islamic Education. Accredited by New York State Education Department, providing quality K-12 education with Islamic values.',
    logo: '/logo.png',
  },
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: data.facebookLink },
  { icon: Instagram, label: 'Instagram', href: data.instaLink },
  { icon: Twitter, label: 'Twitter', href: data.twitterLink },
  { icon: Github, label: 'GitHub', href: data.githubLink },
  { icon: Dribbble, label: 'Dribbble', href: data.dribbbleLink },
];

const aboutLinks = [
  { text: 'Our History', href: data.about.history },
  { text: 'Faculty & Staff', href: data.about.faculty },
  { text: 'Mission & Vision', href: data.about.mission },
  { text: 'Careers', href: data.about.careers },
];

const serviceLinks = [
  { text: 'Admission', href: data.services.admission },
  { text: 'Learning Programs', href: data.services.learning },
  { text: 'Accreditation', href: data.services.accreditation },
  { text: 'Career Services', href: data.services.career },
];

const helpfulLinks = [
  { text: 'FAQs', href: data.help.faqs },
  { text: 'Student Support', href: data.help.support },
  { text: 'Contact Us', href: data.help.contact, hasIndicator: true },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer4Col() {
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
                {data.company.name}
              </span>
            </div>

            <p className="text-foreground/50 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-primary hover:text-primary/80 transition"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">About Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-secondary-foreground/70 transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Academics</p>
              <ul className="mt-8 space-y-4 text-sm">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-secondary-foreground/70 transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Helpful Links</p>
              <ul className="mt-8 space-y-4 text-sm">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className={`${
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start'
                          : 'text-secondary-foreground/70 transition'
                      }`}
                    >
                      <span className="text-secondary-foreground/70 transition">
                        {text}
                      </span>
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
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href="#"
                    >
                      <Icon className="text-primary size-5 shrink-0 shadow-sm" />
                      {isAddress ? (
                        <address className="text-secondary-foreground/70 -mt-0.5 flex-1 not-italic transition">
                          {text}
                        </address>
                      ) : (
                        <span className="text-secondary-foreground/70 flex-1 transition">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="text-secondary-foreground/70 mt-4 text-sm transition sm:order-first sm:mt-0">
              &copy; 2025 {data.company.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}