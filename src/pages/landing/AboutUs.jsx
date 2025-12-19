import React from "react";
import {
  Info,
  Building2,
  Layers,
  ShieldCheck,
  Users,
  Target,
  Flag,
  Handshake,
} from "lucide-react";
import { NavbarL, Footer } from "@layout";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-25">
      <NavbarL />
      
      <div className="max-w-4xl mx-auto pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
              <p className="text-sm text-gray-500 mt-1">Tentang MeetWise</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            <strong>MeetWise</strong> adalah platform{" "}
            <em>Software as a Service (SaaS)</em> yang membantu perusahaan
            mengelola pembookingan ruangan meeting secara
            <strong> terstruktur, aman, dan efisien</strong>.
          </p>
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Handshake className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-primary-900">
                Kolaborasi yang Lebih Baik
              </p>
              <p className="text-sm text-primary-700 mt-1">
                MeetWise membantu perusahaan menciptakan transparansi,
                efisiensi, dan kontrol dalam penggunaan ruang meeting.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                1. Latar Belakang
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">
                Banyak perusahaan masih menghadapi tantangan dalam pengelolaan
                ruangan meeting, seperti:
              </p>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Jadwal meeting yang saling bentrok</li>
                <li>• Kurangnya transparansi penggunaan ruangan</li>
                <li>• Proses persetujuan yang tidak terdokumentasi</li>
                <li>• Minimnya kontrol operasional dan anggaran</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                2. Apa yang Kami Bangun
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">
                MeetWise dikembangkan sebagai aplikasi{" "}
                <strong>multi-tenant SaaS</strong>
                dengan isolasi data yang ketat antar perusahaan.
              </p>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Pembookingan ruangan meeting terpusat</li>
                <li>• Role-based access (Admin, Employee, Finance, Support)</li>
                <li>• Proses persetujuan anggaran yang transparan</li>
                <li>• Monitoring jadwal dan kesiapan ruangan</li>
                <li>• Sistem yang aman dan skalabel</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                3. Keamanan & Kepercayaan
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">
                Keamanan data perusahaan dan karyawan adalah prioritas utama
                kami.
              </p>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Isolasi data antar perusahaan</li>
                <li>• Kontrol akses berbasis peran</li>
                <li>• Perlindungan data pengguna</li>
                <li>• Praktik keamanan sesuai standar industri</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                4. Untuk Siapa MeetWise
              </h2>
            </div>
            <div className="pl-7">
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Perusahaan skala kecil hingga menengah</li>
                <li>• Tim HR, operasional, dan manajemen</li>
                <li>• Organisasi yang membutuhkan kontrol ruang meeting</li>
                <li>
                  • Perusahaan yang mengutamakan efisiensi dan akuntabilitas
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">5. Visi</h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm">
                Menjadi platform pembookingan ruangan meeting yang
                <strong> andal, aman, dan mudah digunakan</strong>, mendukung
                kolaborasi perusahaan di tingkat nasional maupun global.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">6. Misi</h2>
            </div>
            <div className="pl-7">
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Menyederhanakan pengelolaan ruangan meeting</li>
                <li>• Menyediakan sistem yang aman dan terpercaya</li>
                <li>• Mendukung efisiensi dan transparansi operasional</li>
                <li>• Mengembangkan produk yang siap berkembang</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-center text-gray-700 text-sm">
            <strong>MeetWise</strong> bukan hanya aplikasi, tetapi
            <strong> mitra digital</strong> bagi perusahaan dalam mengelola
            ruang kolaborasi.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
