import React from 'react';
import { Shield, Lock, Database, Cookie, UserCheck, Mail, FileText } from 'lucide-react';
import { NavbarL, Footer } from '@layout';
 
const PrivacyPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-sm text-gray-500 mt-1">Terakhir diperbarui: {lastUpdated}</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            MeetWise menghargai dan melindungi privasi setiap pengguna. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda dengan standar keamanan tertinggi.
          </p>
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-primary-900">Komitmen Keamanan Data</p>
              <p className="text-sm text-primary-700 mt-1">Data Anda dilindungi dengan enkripsi tingkat enterprise dan tidak akan dibagikan kepada pihak ketiga.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <p className="text-gray-700 mb-6">
            Dengan menggunakan layanan MeetWise, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.
          </p>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">1. Informasi yang Kami Kumpulkan</h2>
            </div>
            
            <div className="space-y-4 pl-7">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Informasi Perusahaan</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Nama perusahaan</li>
                  <li>• Alamat email domain perusahaan</li>
                  <li>• Informasi organisasi yang relevan</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Informasi Pengguna (Karyawan)</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Nama dan alamat email perusahaan</li>
                  <li>• Jabatan atau peran dalam perusahaan</li>
                  <li>• Data aktivitas terkait pembookingan ruangan meeting</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Informasi Teknis</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Alamat IP, jenis perangkat dan browser</li>
                  <li>• Log aktivitas sistem dan waktu akses</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">2. Penggunaan Informasi</h2>
            </div>
            
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">Informasi yang dikumpulkan digunakan untuk:</p>
              <ul className="space-y-1 text-gray-600 text-sm mb-4">
                <li>• Menyediakan dan mengelola layanan pembookingan ruangan meeting</li>
                <li>• Memastikan autentikasi dan keamanan akun Anda</li>
                <li>• Meningkatkan kualitas layanan dan pengalaman pengguna</li>
                <li>• Mengirimkan notifikasi sistem dan pembaruan penting</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-3 rounded">
                <p className="text-sm font-medium text-gray-900">Kami tidak menjual atau menyewakan data Anda kepada pihak ketiga.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">3. Keamanan Data</h2>
            </div>
            
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">Kami menerapkan langkah-langkah keamanan yang ketat:</p>
              <ul className="space-y-1 text-gray-600 text-sm mb-4">
                <li>• Enkripsi data saat transmisi dan penyimpanan</li>
                <li>• Pembatasan akses berbasis peran (role-based access control)</li>
                <li>• Pemantauan sistem secara berkala</li>
                <li>• Perlindungan terhadap akses tidak sah dan kebocoran data</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-primary-600 p-3 rounded">
                <p className="text-sm font-medium text-gray-900">Setiap perusahaan hanya dapat mengakses data miliknya sendiri.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">4. Penyimpanan dan Retensi Data</h2>
            </div>
            
            <div className="pl-7">
              <p className="text-gray-600 text-sm">
                Data pengguna disimpan selama masih diperlukan untuk menyediakan layanan atau selama diwajibkan oleh peraturan perundang-undangan. Apabila kerja sama dihentikan, data akan dihapus atau dianonimkan sesuai kebijakan kami.
              </p>
            </div>
          </div>

          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Cookie className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">5. Penggunaan Cookies</h2>
            </div>
            
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">Kami menggunakan cookies untuk:</p>
              <ul className="space-y-1 text-gray-600 text-sm mb-3">
                <li>• Menjaga sesi login pengguna</li>
                <li>• Meningkatkan performa dan keamanan aplikasi</li>
                <li>• Menganalisis penggunaan layanan secara anonim</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Anda dapat mengatur browser untuk menolak cookies, namun hal ini dapat memengaruhi fungsi tertentu.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">6. Hak Pengguna</h2>
            </div>
            
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-3">Anda memiliki hak untuk:</p>
              <ul className="space-y-1 text-gray-600 text-sm mb-3">
                <li>• Mengakses data pribadi Anda di sistem MeetWise</li>
                <li>• Memperbarui atau memperbaiki data yang tidak akurat</li>
                <li>• Meminta penghapusan data sesuai ketentuan yang berlaku</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Permintaan terkait hak pengguna dapat diajukan melalui kontak resmi kami.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">7. Perubahan Kebijakan Privasi</h2>
            </div>
            
            <div className="pl-7">
              <p className="text-gray-600 text-sm">
                MeetWise dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan ditampilkan pada halaman ini dan berlaku sejak tanggal diperbarui. Kami menyarankan untuk meninjau kebijakan ini secara berkala.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">8. Kontak Kami</h2>
            </div>
            
            <div className="pl-7">
              <p className="text-gray-600 text-sm mb-4">
                Apabila Anda memiliki pertanyaan atau permintaan terkait Kebijakan Privasi ini, silakan menghubungi kami:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">Email:</span>
                    <a href="mailto:support@meetwise.com" className="text-primary-600 hover:text-primary-700">
                      support@meetwise.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">Layanan:</span>
                    <span className="text-gray-700">MeetWise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-center text-gray-700 text-sm">
            Dengan menggunakan MeetWise, Anda menyatakan telah membaca, memahami, dan menyetujui Kebijakan Privasi ini.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;