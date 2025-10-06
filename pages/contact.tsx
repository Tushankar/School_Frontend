'use client';

import React, { useState, forwardRef, ButtonHTMLAttributes } from 'react';
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
const APP_EMAIL = 'info@alrasheedacademy.org';
const APP_PHONE = '+1(716) 822-0440';
const APP_PHONE_2 = '+1(716) 822-0440';

// Main Contact Page Component
export default function ContactPage() {
  const socialLinks = [
    {
      icon: GithubIcon,
      href: 'https://github.com/sshahaider',
      label: 'GitHub',
    },
    {
      icon: TwitterIcon,
      href: 'https://twitter.com/sshahaider',
      label: 'Twitter',
    },
    {
      icon: LinkedinIcon,
      href: 'https://linkedin.com/in/sshahaider',
      label: 'LinkedIn',
    },
    {
      icon: InstagramIcon,
      href: 'https://instagram.com/sshahaider',
      label: 'Instagram',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBarOnly />
      <Ticker />
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
          <div className="flex grow flex-col justify-center px-4 md:px-6 pt-16 pb-16">
            <h1 className="text-4xl font-bold md:text-5xl">
              Contact Us
            </h1>
            <p className="text-muted-foreground mb-5 text-base">
              Contact the support team at Asme.
            </p>
          </div>
          <BorderSeparator />
          <div className="grid md:grid-cols-3">
            <Box
              icon={Mail}
              title="Email"
              description="We respond to all emails within 24 hours."
            >
              <a
                href={`mailto:${APP_EMAIL}`}
                className="font-mono text-base font-medium tracking-wide hover:underline"
              >
                {APP_EMAIL}
              </a>
              <CopyButton className="size-6" text={APP_EMAIL} />
            </Box>
            <Box
              icon={MapPin}
              title="Office"
              description="Drop by our office for a chat."
            >
              <span className="font-mono text-base font-medium tracking-wide">
                3122 Abbott Rd, Orchard Park, NY 14127
              </span>
            </Box>
            <Box
              icon={Phone}
              title="Phone"
              description="We're available Mon-Fri, 9am-5pm."
              className="border-b-0 md:border-r-0"
            >
              <div>
                <div className="flex items-center gap-x-2">
                  <a
                    href={`tel:${APP_PHONE}`}
                    className="block font-mono text-base font-medium tracking-wide hover:underline"
                  >
                    {APP_PHONE}
                  </a>
                  <CopyButton className="size-6" text={APP_PHONE} />
                </div>
                <div className="flex items-center gap-x-2">
                  <a
                    href={`tel:${APP_PHONE_2}`}
                    className="block font-mono text-base font-medium tracking-wide hover:underline"
                  >
                    {APP_PHONE_2}
                  </a>
                  <CopyButton className="size-6" text={APP_PHONE_2} />
                </div>
              </div>
            </Box>
          </div>
          <BorderSeparator />
          <div className="relative flex h-full min-h-[320px] items-center justify-center">
            <div
              className={cn(
                'z--10 absolute inset-0 size-full',
                'bg-[radial-gradient(color-mix(in_oklab,var(--foreground)30%,transparent)_1px,transparent_1px)]',
                'bg-[size:32px_32px]',
                '[mask-image:radial-gradient(ellipse_at_center,var(--background)_30%,transparent)]',
              )}
            />

            <div className="relative z-1 space-y-6">
              <h2 className="text-center text-3xl font-bold md:text-4xl mt-8">
                Find us online
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted/50 hover:bg-accent flex items-center gap-x-2 rounded-full border px-4 py-2"
                  >
                    <link.icon className="size-4" />
                    <span className="font-mono text-sm font-medium tracking-wide">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
              <ContactSections />
              <ContactDemo />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}