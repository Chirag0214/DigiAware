// Footer.jsx
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp, IconBrandYoutube } from '@tabler/icons-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 py-6 font-[Raleway,Montserrat,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-20">
        {/* Company Info */}
        <div className='md:col-span-2 px-10'>
          <div className='flex items-center gap-5'>
            <img className='size-20 rounded-full' src="/logo.png" alt="Digi Aware logo" />
            <h2 className="text-2xl font-bold mb-3">Digi Aware</h2>
          </div>
          <p className="text-sm text-center mt-2">
            Empowering digital awareness and safety for everyone. Stay informed, stay secure.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-300">Home</a></li>
            <li><a href="/browse-article" className="hover:text-blue-300">Article</a></li>
            <li><a href="/browse-news" className="hover:text-blue-300">News</a></li>
            <li><a href="/contact" className="hover:text-blue-300">Contact</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>📍 Lucknow, India</li>
            <li>📞 +91-98765-43210</li>
            <li>✉️ digiaware@gmail.com</li>
          </ul>
        </div>
        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a href="#" className="hover:text-blue-300"><IconBrandFacebook /></a>
            <a href="#" className="hover:text-blue-300"><IconBrandYoutube /></a>
            <a href="#" className="hover:text-blue-300"><IconBrandInstagram /></a>
            <a href="#" className="hover:text-blue-300"><IconBrandWhatsapp /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xlg mt-8">&copy; {new Date().getFullYear()} Digi Aware. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
