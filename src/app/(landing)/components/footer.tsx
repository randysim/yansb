'use client';

import Link from "next/link";
import { Mail, Github, Instagram, YoutubeIcon, Heart } from "lucide-react";
import HealthCheck from "./health-check";

const navigationLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ]
  },
  {
    title: "Products",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Integrations", href: "/integrations" },
      { name: "API", href: "/api" },
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "Status", href: "/status" },
      { name: "Report Bug", href: "mailto:support@yansb.com" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ]
  }
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/randysim/yansb",
    icon: Github,
  },
  {
    name: "Instagram", 
    href: "https://www.instagram.com/randysimy",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@randysimy",
    icon: YoutubeIcon,
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground/20 text-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* System Status */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <span className="text-sm font-medium">System Status:</span>
                <HealthCheck />
              </div>
            </div>

            {/* Contact Email */}
            <div className="flex items-center gap-2 text-sm text-foreground/75 justify-center md:justify-start">
              <Mail className="w-4 h-4" />
              <a 
                href="#"
                className="hover:text-foreground transition-colors"
              >
                contact@acme.com
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          {navigationLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/75 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-foreground/75">
              <span>&copy; {new Date().getFullYear()} YANSB. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="w-4 h-4 text-red-500 hidden sm:inline" />
              <span className="hidden sm:inline">for everyone</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/75 hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
