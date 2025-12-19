import React from 'react';
import { FileText, Shield, Users, Lock, AlertCircle, Scale, Mail } from 'lucide-react';

const ToS = () => {
  const lastUpdated = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sections = [
    {
      id: 1,
      icon: <FileText className="w-5 h-5 text-primary-600" />,
      title: "1. Definisi",
      content: [
        { term: "MeetWise", definition: "Platform SaaS untuk pembookingan dan pengelolaan ruangan meeting." },
        { term: "Perusahaan", definition: "Entitas bisnis atau organisasi yang menggunakan MeetWise." },
        { term: "Pengguna", definition: "Karyawan atau perwakilan resmi perusahaan yang memiliki akses ke MeetWise." },
        { term: "Layanan", definition: "Seluruh fitur dan sistem yang disediakan oleh MeetWise." }
      ]
    },
    {
      id: 2,
      icon: <Shield className="w-5 h-5 text-primary-600" />,
      title: "2. Ruang Lingkup Layanan",
      description: "MeetWise menyediakan layanan pembookingan ruangan meeting yang memungkinkan perusahaan untuk:",
      items: [
        "Mengelola data ruangan meeting",
        "Melakukan reservasi ruangan meeting",
        "Mengatur jadwal dan penggunaan ruangan",
        "Mengelola akses pengguna sesuai peran"
      ],
      note: "MeetWise beroperasi sebagai sistem multi-tenant, di mana setiap perusahaan memiliki lingkungan data yang terisolasi dan terpisah dari perusahaan lain."
    },
    {
      id: 3,
      icon: <Users className="w-5 h-5 text-primary-600" />,
      title: "3. Akun, Peran, dan Akses Pengguna",
      description: "MeetWise menerapkan sistem akses berbasis peran (role-based access control) untuk memastikan bahwa setiap pengguna hanya dapat mengakses fitur sesuai dengan peran yang diberikan oleh perusahaannya.",
      numbered: [
        "Akses ke MeetWise hanya diperbolehkan bagi pengguna yang terdaftar secara sah oleh perusahaannya.",
        "Setiap pengguna bertanggung jawab menjaga kerahasiaan kredensial akunnya.",
        "Aktivitas yang dilakukan melalui akun pengguna sepenuhnya menjadi tanggung jawab perusahaan dan/atau pengguna terkait.",
        "MeetWise berhak menangguhkan atau menghentikan akses akun apabila ditemukan penyalahgunaan, pelanggaran ketentuan, atau aktivitas yang berpotensi membahayakan keamanan sistem dan data."
      ]
    },
    {
      id: 4,
      icon: <AlertCircle className="w-5 h-5 text-primary-600" />,
      title: "4. Kewajiban Pengguna, Perusahaan, dan Pengelolaan Peran",
      numbered: [
        "Setiap perusahaan bertanggung jawab penuh atas penentuan, pengelolaan, dan pengawasan peran pengguna di dalam sistem MeetWise, termasuk namun tidak terbatas pada Company Admin, Employee, Finance Officer, dan Support Staff.",
        "Pengguna hanya diperkenankan mengakses fitur sesuai dengan peran yang diberikan.",
        "MeetWise tidak bertanggung jawab atas kesalahan operasional, keputusan internal perusahaan, atau penyalahgunaan fitur yang disebabkan oleh pengaturan peran yang tidak tepat."
      ],
      prohibited: {
        title: "Pengguna dan perusahaan dilarang untuk:",
        items: [
          "Menggunakan layanan untuk tujuan yang melanggar hukum",
          "Mengakses atau mencoba mengakses data perusahaan lain",
          "Melakukan manipulasi, perusakan, atau gangguan terhadap sistem MeetWise",
          "Mengunggah data yang bersifat berbahaya, ilegal, atau melanggar hak pihak lain"
        ]
      },
      note: "Perusahaan bertanggung jawab atas keakuratan data yang dimasukkan ke dalam sistem."
    },
    {
      id: 5,
      icon: <Lock className="w-5 h-5 text-primary-600" />,
      title: "5. Keamanan, Isolasi Data, dan Arsitektur Multi-Tenant",
      description: "MeetWise menerapkan mekanisme keamanan teknis dan organisasi yang dirancang untuk:",
      items: [
        "Melindungi data perusahaan dan pengguna",
        "Mencegah akses tidak sah",
        "Menjaga isolasi data antar perusahaan"
      ],
      note: "Meskipun MeetWise menerapkan langkah-langkah keamanan terbaik, pengguna memahami bahwa tidak ada sistem elektronik yang sepenuhnya bebas dari risiko."
    },
    {
      id: 6,
      icon: <Scale className="w-5 h-5 text-primary-600" />,
      title: "6. Kepatuhan dan Regulasi",
      description: "MeetWise dirancang untuk beroperasi sesuai dengan prinsip perlindungan data dan praktik keamanan informasi yang berlaku, termasuk:",
      items: [
        "Prinsip perlindungan data pribadi",
        "Praktik keamanan informasi yang sejalan dengan standar ISO/IEC 27001",
        "Kebijakan internal perusahaan pengguna"
      ],
      note: "MeetWise membantu perusahaan dalam pengelolaan data, namun tanggung jawab kepatuhan internal tetap berada pada masing-masing perusahaan pengguna."
    },
    {
      id: 7,
      icon: <FileText className="w-5 h-5 text-primary-600" />,
      title: "7. Hak Kekayaan Intelektual",
      description: "Seluruh hak kekayaan intelektual atas aplikasi, sistem, desain, dan konten MeetWise merupakan milik MeetWise. Pengguna tidak diperkenankan untuk menyalin, memodifikasi, mendistribusikan, atau mengeksploitasi bagian mana pun dari layanan tanpa izin tertulis."
    },
    {
      id: 8,
      icon: <AlertCircle className="w-5 h-5 text-primary-600" />,
      title: "8. Pembatasan Tanggung Jawab",
      description: "MeetWise disediakan dalam kondisi \"sebagaimana adanya\" (as is). MeetWise tidak bertanggung jawab atas:",
      items: [
        "Kerugian akibat gangguan sistem sementara",
        "Kehilangan data akibat faktor di luar kendali wajar",
        "Kesalahan penggunaan layanan oleh pengguna"
      ],
      note: "Dalam batas yang diizinkan oleh hukum, tanggung jawab MeetWise dibatasi pada penyediaan layanan sesuai fungsinya."
    },
    {
      id: 9,
      icon: <Shield className="w-5 h-5 text-primary-600" />,
      title: "9. Penghentian Layanan",
      description: "MeetWise berhak untuk:",
      items: [
        "Menangguhkan atau menghentikan layanan secara sementara atau permanen",
        "Mengakhiri akses perusahaan atau pengguna yang melanggar ketentuan"
      ],
      note: "Penghentian layanan tidak menghilangkan kewajiban yang telah timbul sebelum penghentian tersebut."
    },
    {
      id: 10,
      icon: <FileText className="w-5 h-5 text-primary-600" />,
      title: "10. Perubahan Ketentuan Layanan",
      description: "MeetWise dapat mengubah Ketentuan Layanan ini dari waktu ke waktu. Perubahan akan diumumkan melalui aplikasi atau situs resmi MeetWise dan berlaku sejak tanggal diperbarui."
    },
    {
      id: 11,
      icon: <Scale className="w-5 h-5 text-primary-600" />,
      title: "11. Hukum yang Berlaku",
      description: "Ketentuan Layanan ini diatur dan ditafsirkan berdasarkan hukum yang berlaku di Republik Indonesia."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-sm text-gray-500 mt-1">Terakhir diperbarui: {lastUpdated}</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Selamat datang di <span className="font-semibold">MeetWise</span>. Dokumen Terms of Service (Ketentuan Layanan) ini mengatur akses dan penggunaan aplikasi MeetWise sebagai platform Software as a Service (SaaS) untuk pembookingan ruangan meeting yang dapat digunakan oleh berbagai perusahaan.
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-primary-900 font-medium">
              Dengan mengakses atau menggunakan MeetWise, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan dalam dokumen ini. Apabila Anda tidak menyetujui ketentuan ini, Anda tidak diperkenankan menggunakan layanan MeetWise.
            </p>
          </div>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
            </div>

            <div className="pl-7 space-y-4">
              {/* Definitions */}
              {section.content && (
                <div className="space-y-3">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <span className="font-medium text-gray-900">{item.term}:</span>{' '}
                      <span className="text-gray-600 text-sm">{item.definition}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {section.description && (
                <p className="text-gray-600 text-sm">{section.description}</p>
              )}

              {/* Bullet Items */}
              {section.items && (
                <ul className="space-y-1 text-gray-600 text-sm">
                  {section.items.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              )}

              {/* Numbered Items */}
              {section.numbered && (
                <ol className="space-y-2 text-gray-600 text-sm list-decimal list-inside">
                  {section.numbered.map((item, idx) => (
                    <li key={idx} className="pl-2">{item}</li>
                  ))}
                </ol>
              )}

              {/* Prohibited Section */}
              {section.prohibited && (
                <div>
                  <p className="text-gray-900 font-medium text-sm mb-2">{section.prohibited.title}</p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    {section.prohibited.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Note/Highlight */}
              {section.note && (
                <div className="bg-gray-50 border-l-4 border-primary-600 p-3 rounded">
                  <p className="text-sm text-gray-700">{section.note}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">12. Kontak</h2>
          </div>
          
          <div className="pl-7">
            <p className="text-gray-600 text-sm mb-4">
              Apabila Anda memiliki pertanyaan terkait Ketentuan Layanan ini, silakan menghubungi:
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
                  <span className="font-medium text-gray-900">Nama Layanan:</span>
                  <span className="text-gray-700">MeetWise</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Agreement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-center text-gray-700 text-sm">
            Dengan menggunakan MeetWise, Anda menyatakan telah memahami dan menyetujui seluruh Ketentuan Layanan ini.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToS;