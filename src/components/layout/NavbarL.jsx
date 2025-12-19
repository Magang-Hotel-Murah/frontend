import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@ui";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NavbarL = () => {
  const navigate = useNavigate("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Fitur", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Help Center", href: "#helpcenter"}
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img src={Logo} alt="meetwise" height={50} width={50} />
            <span className="text-2xl font-bold bg-primary-500 bg-clip-text text-transparent">
              MeetWise
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => navigate("/login")}
              variant="ghost"
              size="small"
            >
              Masuk
            </Button>
            <Button
              onClick={() => navigate("/register")}
              variant="primary"
              size="small"
            >
              Daftar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 space-y-2 px-4">
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                size="small"
                className="w-full"
              >
                Masuk
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="primary"
                size="small"
                className="w-full"
              >
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarL;
