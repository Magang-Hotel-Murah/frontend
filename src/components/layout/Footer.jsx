import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, Send } from 'lucide-react';

export default function ModernFooter() {
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Terima kasih! Email ${email} telah terdaftar.`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="pl-40 pr-40 mx-auto px-2 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-orange-500 bg-clip-text text-transparent">
                MeetWise
              </h3>
              <p className="text-slate-400 mt-4 leading-relaxed">
                Membangun solusi digital yang inovatif untuk masa depan yang lebih baik.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300 hover:text-primary-400 transition-colors cursor-pointer">
                <Mail size={18} />
                <span className="text-sm">contact@meetwise.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 hover:text-primary-400 transition-colors cursor-pointer">
                <Phone size={18} />
                <span className="text-sm">+62 823 8900 0468</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 hover:text-primary-400 transition-colors cursor-pointer">
                <MapPin size={18} />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Tentang Kami', 'Layanan', 'Portfolio', 'Karir', 'Blog'].map((item) => (
                <li key={item}>
                  <button className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Layanan</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud Solutions', 'Consulting'].map((item) => (
                <li key={item}>
                  <button className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Dapatkan update terbaru tentang produk dan layanan kami.
            </p>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Anda"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-primary-500 to-orange-600 hover:from-primary-600 hover:to-orange-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
              >
                Subscribe
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              {[
                { Icon: Facebook, color: 'hover:text-blue-500' },
                { Icon: Twitter, color: 'hover:text-sky-400' },
                { Icon: Instagram, color: 'hover:text-pink-500' },
                { Icon: Linkedin, color: 'hover:text-blue-600' },
                { Icon: Github, color: 'hover:text-slate-400' }
              ].map(({ Icon, color }, idx) => (
                <button
                  key={idx}
                  className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 ${color} transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-slate-400 text-sm">
            © 2025 MeetWise. All rights reserved. Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}