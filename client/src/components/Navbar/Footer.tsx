import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail, 
  Copyright 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Upload Resume', path: '/upload' },
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' }
  ];

  const socialLinks = [
    { icon: Twitter, url: 'https://twitter.com', name: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: Github, url: 'https://github.com', name: 'GitHub' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-blue-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">InterviewAI</h3>
          <p className="text-gray-300 mb-4">
            Revolutionizing recruitment with AI-powered interview intelligence.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail size={18} className="text-blue-400" />
              <a 
                href="mailto:support@interviewai.com" 
                className="text-gray-300 hover:text-white"
              >
                support@interviewai.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-white/10 text-center">
        <p className="flex justify-center items-center space-x-2 text-gray-400">
          <Copyright size={16} />
          <span>{currentYear} InterviewAI. All Rights Reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;