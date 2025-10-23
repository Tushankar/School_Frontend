'use client';

import React, { useState, useEffect, forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Copy,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from 'lucide-react';
import ContactSections from '../components/ui/contact-sections';
import ContactDemo from '../components/ui/contact-demo';
import NavBarOnly from '../components/NavBarOnly';
import Footer from '../components/Footer';
import Ticker from '../components/Ticker';

// Utility function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Button Component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variantStyles = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    };
    
    const sizeStyles = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    };
    
    return (
      <button
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// CopyButton Component
interface CopyButtonProps extends ButtonProps {
  text: string;
}

function CopyButton({
  className,
  variant = 'ghost',
  size = 'icon',
  text,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('disabled:opacity-100', className)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      disabled={copied || props.disabled}
      {...props}
    >
      <div
        className={cn(
          'transition-all',
          copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )}
      >
        <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
      </div>
      <div
        className={cn(
          'absolute transition-all',
          copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
        )}
      >
        <Copy aria-hidden="true" className="size-3.5" />
      </div>
    </Button>
  );
}

// BorderSeparator Component
function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b" />;
}

// Box Component
type ContactBox = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Box({
  title,
  description,
  className,
  children,
  icon: Icon,
  ...props
}: ContactBox) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between border-b md:border-r md:border-b-0',
        className,
      )}
      {...props}
    >
      <div className="bg-muted/40 flex items-center gap-x-3 border-b p-4">
        <Icon className="text-muted-foreground size-5" strokeWidth={1} />
        <h2 className="font-heading text-lg font-medium tracking-wider">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
      <div className="border-t p-4">
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

// Constants

// Main Contact Page Component
export default function ContactPage() {
  const [cmsData, setCmsData] = useState({
    title: "Contact Us",
    description: "Contact the support team at Al-Rasheed Academy.",
    email: "info@alrasheedacademy.org",
    address: "3122 Abbott Rd, Orchard Park, NY 14127",
    phone1: "+1(716) 822-0440",
    phone2: "+1(716) 822-0440",
    socialHeading: "Find us online",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/sshahaider" },
      { label: "Twitter", href: "https://twitter.com/sshahaider" },
      { label: "LinkedIn", href: "https://linkedin.com/in/sshahaider" },
      { label: "Instagram", href: "https://instagram.com/sshahaider" },
    ],
  });

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch("https://alrasheedacademyserver.onrender.com/api/auth/cms/contact");
        if (response.ok) {
          const data = await response.json();
          setCmsData(data);
        }
      } catch (err) {
        console.error("Failed to fetch CMS data", err);
      }
    };
    fetchCmsData();
  }, []);

  const socialLinks = cmsData.socialLinks.map(link => ({
    icon: link.label === "GitHub" ? GithubIcon : link.label === "Twitter" ? TwitterIcon : link.label === "LinkedIn" ? LinkedinIcon : InstagramIcon,
    href: link.href,
    label: link.label,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-4 text-sm"
          >
            Home › Contact
          </motion.p>
        </div>
      </div>

      <div className="min-h-screen w-full">
        <div className="mx-auto h-full max-w-6xl lg:border-x">
          <div
            aria-hidden
            className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
          >
            <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsl(var(--foreground)/.06)_0,hsla(0,0%,55%,.02)_50%,hsl(var(--foreground)/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--foreground)/.04)_0,hsl(var(--foreground)/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--foreground)/.04)_0,hsl(var(--foreground)/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex grow flex-col justify-center px-4 md:px-6 pt-16 pb-8"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <style dangerouslySetInnerHTML={{
                  __html: `
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
                  `
                }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-1.png" alt="" className="absolute w-full h-full object-contain slide-left" style={{ animationDelay: "200ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-2.png" alt="" className="absolute w-full h-full object-contain slide-left" style={{ animationDelay: "400ms" }} />
                <img src="https://www.alrasheedacademy.org/images/qqdd.png" alt="" className="absolute w-full h-full object-contain slide-left" style={{ animationDelay: "600ms" }} />
                <img src="https://www.alrasheedacademy.org/images/48999.png" alt="" className="absolute w-full h-full object-contain slide-left" style={{ animationDelay: "800ms", animationDuration: "1000ms" }} />
                <img src="https://www.alrasheedacademy.org/images/1333.png" alt="" className="absolute w-full h-full object-contain slide-right" style={{ animationDelay: "300ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-13.png" alt="" className="absolute w-full h-full object-contain slide-right" style={{ animationDelay: "500ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-12.png" alt="" className="absolute w-full h-full object-contain slide-right" style={{ animationDelay: "700ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-6.png" alt="" className="absolute w-full h-full object-contain slide-right" style={{ animationDelay: "900ms" }} />
                <img src="https://www.alrasheedacademy.org/images/qqq.png" alt="" className="absolute w-full h-full object-contain slide-top" style={{ animationDelay: "400ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-9.png" alt="" className="absolute w-full h-full object-contain slide-top" style={{ animationDelay: "600ms" }} />
                <img src="https://www.alrasheedacademy.org/images/7788.png" alt="" className="absolute w-full h-full object-contain slide-top" style={{ animationDelay: "800ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-11.png" alt="" className="absolute w-full h-full object-contain slide-bottom" style={{ animationDelay: "500ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-10.png" alt="" className="absolute w-full h-full object-contain slide-bottom" style={{ animationDelay: "700ms" }} />
                <img src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png" alt="" className="absolute w-full h-full object-contain slide-bottom" style={{ animationDelay: "900ms" }} />
                <img src="https://www.alrasheedacademy.org/images/qw.png" alt="" className="absolute w-full h-full object-contain slide-bottom" style={{ animationDelay: "1100ms" }} />
              </div>
              <div>
                <h1 className="text-4xl font-bold md:text-5xl">
                  {cmsData.title}
                </h1>
                <p className="text-muted-foreground mb-5 text-base">
                  {cmsData.description}
                </p>
              </div>
            </div>
          </motion.div>
          <BorderSeparator />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Box
                icon={Mail}
                title="Email"
                description="We respond to all emails within 24 hours."
              >
                <a
                  href={`mailto:${cmsData.email}`}
                  className="font-mono text-base font-medium tracking-wide hover:underline"
                >
                  {cmsData.email}
                </a>
                <CopyButton className="size-6" text={cmsData.email} />
              </Box>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Box
                icon={MapPin}
                title="Office"
                description="Drop by our office for a chat."
              >
                <span className="font-mono text-base font-medium tracking-wide">
                  {cmsData.address}
                </span>
              </Box>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Box
                icon={Phone}
                title="Phone"
                description="We're available Mon-Fri, 9am-5pm."
                className="border-b-0 md:border-r-0"
              >
                <div>
                  <div className="flex items-center gap-x-2">
                    <a
                      href={`tel:${cmsData.phone1}`}
                      className="block font-mono text-base font-medium tracking-wide hover:underline"
                    >
                      {cmsData.phone1}
                    </a>
                    <CopyButton className="size-6" text={cmsData.phone1} />
                  </div>
                  <div className="flex items-center gap-x-2">
                    <a
                      href={`tel:${cmsData.phone2}`}
                      className="block font-mono text-base font-medium tracking-wide hover:underline"
                    >
                      {cmsData.phone2}
                    </a>
                    <CopyButton className="size-6" text={cmsData.phone2} />
                  </div>
                </div>
              </Box>
            </motion.div>
          </motion.div>
          <BorderSeparator />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex h-full min-h-[320px] items-center justify-center"
          >
            <div
              className={cn(
                'z--10 absolute inset-0 size-full',
                'bg-[radial-gradient(color-mix(in_oklab,var(--foreground)30%,transparent)_1px,transparent_1px)]',
                'bg-[size:32px_32px]',
                '[mask-image:radial-gradient(ellipse_at_center,var(--background)_30%,transparent)]',
              )}
            />

            <div className="relative z-1 space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center text-3xl font-bold md:text-4xl mt-8"
              >
                {cmsData.socialHeading}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-8"
              >
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted/50 hover:bg-accent flex items-center gap-x-2 rounded-full border px-4 py-2"
                  >
                    <link.icon className="size-4" />
                    <span className="font-mono text-sm font-medium tracking-wide">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
              <ContactSections />
              <ContactDemo />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}