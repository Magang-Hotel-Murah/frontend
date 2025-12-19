import React from 'react';
import {
  ShieldCheck,
  Lock,
  Layers,
  UserCheck,
  KeyRound,
  Database,
  Activity,
  FileCheck,
  AlertTriangle,
  RefreshCw,
  Mail
} from 'lucide-react';
import { NavbarL, Footer } from '@layout';

const SecurityTrust = () => {
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
            <ShieldCheck className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Security & Trust
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Terakhir diperbarui: {lastUpdated}
              </p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Di MeetWise, keamanan bukan hanya fitur — melainkan fondasi utama
            layanan kami. Halaman ini menjelaskan bagaimana kami melindungi data
            perusahaan dan pengguna dalam lingkungan <em>SaaS</em> multi-tenant.
          </p>
        </div>

        {/* Highlight */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-primary-900">
                Security by Design
              </p>
              <p className="text-sm text-primary-700 mt-1">
                Keamanan dan privasi telah menjadi bagian inti dari perancangan
                sistem MeetWise sejak awal.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">

          {/* 1 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                1. Prinsip Keamanan Kami
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">
                MeetWise menerapkan prinsip <strong>Security by Design</strong> dan
                <strong> Privacy by Default</strong>.
              </p>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Kerahasiaan (Confidentiality)</li>
                <li>• Integritas (Integrity)</li>
                <li>• Ketersediaan (Availability)</li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                2. Arsitektur Multi-Tenant & Isolasi Data
              </h2>
            </div>
            <div className="pl-7">
              <ul className="space-y-1 text-gray-600 text-sm mb-3">
                <li>• Setiap perusahaan memiliki ruang data terisolasi</li>
                <li>• Data antar perusahaan tidak saling dapat diakses</li>
                <li>• Hak akses dibatasi secara ketat</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Isolasi diterapkan pada lapisan aplikasi, database, serta API dan
                autentikasi.
              </p>
            </div>
          </div>

          {/* 3 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                3. Kontrol Akses Berbasis Role (RBAC)
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">
                MeetWise menggunakan Role-Based Access Control (RBAC).
              </p>
              <ul className="space-y-1 text-gray-600 text-sm mb-3">
                <li>• Super Admin</li>
                <li>• Company Admin</li>
                <li>• Employee</li>
                <li>• Finance Officer</li>
                <li>• Support Staff</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Setiap role memiliki batasan fitur, hak akses, dan audit aktivitas
                yang dapat ditelusuri.
              </p>
            </div>
          </div>

          {/* 4 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                4. Autentikasi & Manajemen Akun
              </h2>
            </div>
            <div className="pl-7">
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Autentikasi berbasis email</li>
                <li>• Undangan resmi dari Company Admin</li>
                <li>• Aktivasi akun melalui tautan aman</li>
                <li>• Pengelolaan sesi login</li>
              </ul>
            </div>
          </div>

          {/* 5 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                5. Keamanan Data
              </h2>
            </div>
            <div className="pl-7">
              <ul className="space-y-1 text-gray-600 text-sm mb-3">
                <li>• Perlindungan dari akses tidak sah</li>
                <li>• Pencegahan kebocoran data</li>
                <li>• Menjaga keutuhan data</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Data ditransmisikan melalui koneksi aman (HTTPS) dan disimpan pada
                infrastruktur yang terlindungi.
              </p>
            </div>
          </div>

          {/* 6 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                6. Audit, Logging & Monitoring
              </h2>
            </div>
            <div className="pl-7">
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Pencatatan aktivitas penting sistem</li>
                <li>• Monitoring akses dan penggunaan</li>
                <li>• Deteksi aktivitas tidak wajar</li>
              </ul>
            </div>
          </div>

          {/* 7 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                7. Kepatuhan & Standar Keamanan
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm">
                MeetWise dirancang selaras dengan praktik keamanan informasi
                termasuk prinsip perlindungan data pribadi dan acuan ISO/IEC
                27001.
              </p>
            </div>
          </div>

          {/* 8 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                8. Tanggung Jawab Pengguna
              </h2>
            </div>
            <div className="pl-7">
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>• Menjaga kerahasiaan kredensial akun</li>
                <li>• Mengelola akses pengguna internal</li>
                <li>• Menonaktifkan akun yang tidak digunakan</li>
              </ul>
            </div>
          </div>

          {/* 9 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                9. Penanganan & Perubahan Keamanan
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm">
                MeetWise akan melakukan investigasi dan mitigasi apabila terjadi
                insiden keamanan serta memperbarui kebijakan ini sesuai
                peningkatan sistem.
              </p>
            </div>
          </div>

          {/* 10 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                10. Kontak Keamanan
              </h2>
            </div>
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">
                Jika Anda menemukan potensi kerentanan atau memiliki pertanyaan
                terkait keamanan:
              </p>
              <a
                href="mailto:security@meetwise.com"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                security@meetwise.com
              </a>
            </div>
          </div>

        </div>

        {/* Closing */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-center text-gray-700 text-sm">
            MeetWise dirancang untuk menjadi sistem yang aman, terisolasi, dan
            dapat dipercaya oleh perusahaan modern.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SecurityTrust;