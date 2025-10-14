import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { Footer } from "../components/layout";
import { NavbarL } from "@layout";
import { Button } from "@ui";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-slogan.png";

const LandingPage = () => {
  const navigate = useNavigate("");
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrolled, setScrolled] = useState();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Booking Mudah",
      description: "Pesan ruangan meeting hanya dalam beberapa klik",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Real-time",
      description: "Lihat ketersediaan ruangan secara langsung",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Kolaborasi Tim",
      description: "Koordinasi jadwal meeting dengan mudah",
    },
  ];

  const benefits = [
    "Hemat waktu dalam mengatur jadwal",
    "Tidak ada double booking",
    "Notifikasi otomatis",
    "Laporan dan statistik lengkap",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavbarL />

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div
          id="home"
          className="absolute top-20 left-10 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <img
                src={Logo}
                alt="slogan"
                width={500}
                height={500}
                className="mx-auto block"
              />
              <span className="bg-gradient-to-r from-primary-400 via-yellow-400 to-yellow-200 bg-clip-text text-transparent animate-gradient">
                Sistem Booking
              </span>
              <br />
              <span className="text-gray-700">Ruangan Meeting</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Kelola jadwal meeting dengan mudah, efisien, dan tanpa ribet.
              Semua dalam satu platform terintegrasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="gradient"
                size="large"
                onClick={() => navigate("/login")}
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="demo"
                size="large"
                onClick={() => navigate("#demo")}
              >
                Demo Gratis
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-6">
              {[
                { number: "500+", label: "Pengguna" },
                { number: "10K+", label: "Booking" },
                { number: "99%", label: "Kepuasan" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 to-primary-200 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-gray-600 text-lg">
              Semua yang Anda butuhkan dalam satu platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                  activeFeature === idx ? "ring-4 ring-primary-400/50" : ""
                }`}
                onMouseEnter={() => setActiveFeature(idx)}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary-600 group-hover:rotate-12 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Mengapa Memilih Kami?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Sistem booking ruangan yang dirancang untuk memudahkan pekerjaan
                Anda
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:translate-x-2 transition-all duration-300"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"></div>
              <div className="absolute inset-0 w-full h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary-400 to-yellow-400 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Siap Memulai?
            </h2>
            <p className="text-white text-lg mb-8">
              Bergabunglah karena ratusan perusahaan yang sudah mempercayai kami
            </p>
            <Button
              onClick={() => navigate("/register")}
              variant="started"
              size="large"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section id="about">
        <Footer />
      </section>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
