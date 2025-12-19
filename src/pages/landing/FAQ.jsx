import React from 'react';
import {
  HelpCircle,
  Info,
  Users,
  CalendarCheck,
  Shield,
  Settings,
  LifeBuoy,
  UserX,
  FileText,
  Mail
} from 'lucide-react';
import { NavbarL, Footer } from '@layout';

const FAQ = () => {
  const lastUpdated = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Terakhir diperbarui: {lastUpdated}
              </p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Halaman ini berisi pertanyaan yang paling sering diajukan terkait
            penggunaan MeetWise sebagai platform <em>SaaS</em> untuk pembookingan
            dan pengelolaan ruangan meeting.
          </p>
        </div>

        {/* Highlight */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-primary-900">
                Informasi Pengguna
              </p>
              <p className="text-sm text-primary-700 mt-1">
                FAQ ini membantu Anda memahami fitur, peran pengguna, dan
                kebijakan penggunaan MeetWise.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">

          {/* 1 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                1. Pertanyaan Umum
              </h2>
            </div>
            <div className="pl-7 space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900">Apa itu MeetWise?</p>
                <p>
                  MeetWise adalah aplikasi SaaS untuk pembookingan dan
                  pengelolaan ruangan meeting dengan sistem multi-tenant dan
                  isolasi data antar perusahaan.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Siapa saja yang dapat menggunakan MeetWise?
                </p>
                <p>
                  MeetWise dapat digunakan oleh perusahaan dari berbagai skala,
                  mulai dari perusahaan kecil hingga enterprise.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Apakah MeetWise bisa digunakan oleh lebih dari satu perusahaan?
                </p>
                <p>
                  Ya. Setiap perusahaan memiliki data yang terpisah dan tidak
                  dapat diakses oleh perusahaan lain.
                </p>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                2. Akun & Role Pengguna
              </h2>
            </div>
            <div className="pl-7 space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900">
                  Apa saja role yang tersedia?
                </p>
                <ul className="list-disc ml-5">
                  <li>Super Admin</li>
                  <li>Company Admin</li>
                  <li>Employee</li>
                  <li>Finance Officer</li>
                  <li>Support Staff</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Siapa yang dapat mendaftarkan perusahaan?
                </p>
                <p>
                  Pendaftaran awal dilakukan melalui email pertama yang
                  otomatis menjadi Company Admin.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Apakah Employee bisa mendaftar sendiri?
                </p>
                <p>
                  Tidak. Akun Employee hanya dapat dibuat melalui undangan resmi
                  dari Company Admin.
                </p>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CalendarCheck className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                3. Booking & Penggunaan Ruangan
              </h2>
            </div>
            <div className="pl-7 space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900">
                  Bagaimana cara booking ruangan?
                </p>
                <p>
                  Employee memilih ruangan, tanggal, dan waktu meeting lalu
                  mengajukan permintaan sesuai kebijakan perusahaan.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Apakah semua booking langsung disetujui?
                </p>
                <p>
                  Tidak selalu. Booking tertentu dapat memerlukan persetujuan
                  Finance Officer atau Company Admin.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Apakah booking bisa dibatalkan?
                </p>
                <p>
                  Ya. Booking dapat diubah atau dibatalkan selama meeting belum
                  dimulai dan sesuai kebijakan perusahaan.
                </p>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                4. Keamanan & Privasi
              </h2>
            </div>
            <div className="pl-7 space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-900">
                  Bagaimana keamanan data dijaga?
                </p>
                <p>
                  MeetWise menggunakan isolasi data, kontrol akses berbasis role,
                  dan mekanisme keamanan sistem.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Apakah data bisa diakses perusahaan lain?
                </p>
                <p>
                  Tidak. Setiap perusahaan memiliki ruang data yang terisolasi.
                </p>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                5. Teknis & Integrasi
              </h2>
            </div>
            <div className="pl-7 space-y-4 text-sm text-gray-600">
              <p>
                MeetWise dapat diakses melalui browser modern tanpa instalasi.
                Integrasi dan aplikasi mobile dapat tersedia sesuai roadmap
                pengembangan.
              </p>
            </div>
          </div>

          {/* 6 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <LifeBuoy className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                6. Dukungan & Bantuan
              </h2>
            </div>
            <div className="pl-7 text-sm text-gray-600">
              <p>
                Dukungan tersedia melalui Company Admin dan dokumentasi resmi
                MeetWise berupa User Guide untuk setiap role.
              </p>
            </div>
          </div>

          {/* 7 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserX className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                7. Akun & Penghentian Layanan
              </h2>
            </div>
            <div className="pl-7 text-sm text-gray-600">
              <p>
                Company Admin dapat menonaktifkan akun pengguna. Jika perusahaan
                berhenti menggunakan MeetWise, data akan dikelola sesuai Terms
                of Service.
              </p>
            </div>
          </div>

          {/* 8 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                8. Informasi Lainnya
              </h2>
            </div>
            <div className="pl-7 text-sm text-gray-600">
              <p>
                Kebijakan resmi MeetWise tersedia di halaman Privacy Policy,
                Terms of Service, dan Security & Trust.
              </p>
            </div>
          </div>

        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-center text-gray-700 text-sm mb-2">
            Jika Anda memiliki pertanyaan lain yang belum tercantum:
          </p>
          <div className="flex justify-center items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-primary-600" />
            <a
              href="mailto:support@meetwise.com"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              support@meetwise.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
