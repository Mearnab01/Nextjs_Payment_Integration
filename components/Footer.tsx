import React from "react";
import Link from "next/link";
import {
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-gray-900 to-black border-t border-gray-700/30 mt-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 left-1/4 opacity-10">
        <Sparkles size={80} className="text-cyan-400" />
      </div>
      <div className="absolute bottom-10 right-1/4 opacity-10">
        <Sparkles size={60} className="text-purple-400" />
      </div>

      {/* Gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                CourseFlow
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Elevate your skills with premium courses. Learn from industry
              experts and advance your career.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Github, label: "GitHub" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 p-2 rounded-full bg-gray-800 hover:bg-cyan-900/30 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              Quick Links
              <span className="ml-2 text-cyan-400">
                <ArrowRight size={16} />
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/courses", text: "Browse Courses" },
                { href: "/pro", text: "Pro Membership" },
                { href: "/instructors", text: "For Instructors" },
                { href: "/blog", text: "Blog" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              Support
              <span className="ml-2 text-cyan-400">
                <ArrowRight size={16} />
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/help", text: "Help Center" },
                { href: "/faq", text: "FAQ" },
                { href: "/contact", text: "Contact Us" },
                { href: "/privacy", text: "Privacy Policy" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              Stay Updated
              <span className="ml-2 text-cyan-400">
                <Mail size={18} />
              </span>
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest courses and updates.
            </p>
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center group"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Responsive layout */}
        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm flex items-center">
            Made with{" "}
            <Heart className="h-4 w-4 mx-1 text-rose-500 fill-current animate-pulse" />{" "}
            by Arnab Nath
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CourseFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
