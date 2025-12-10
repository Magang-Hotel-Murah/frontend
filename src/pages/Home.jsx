import React, { useState } from "react";
import {
  Search,
  Calendar,
  Users,
  DoorOpen,
  Clock,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useGetRooms } from "@hooks/meeting-room";
import { useGetReservationAll } from "@hooks/reservation-meeting-room";
import { useDerivedReservation } from "@hooks/reservation-meeting-room";
import { Card, StatCard } from "@ui";

const Home = () => {
  const [search, setSearch] = useState("");

  const { data: meetingRooms, isLoading: isLoadingRooms } = useGetRooms();
  const { data: allReservations, isLoading: isLoadingAll } =
    useGetReservationAll();
  const {
    activeReservations,
    todayReservations,
    upcomingReservations,
    isLoading: isLoadingDerived,
  } = useDerivedReservation();

  const availableRooms =
    meetingRooms?.length - (activeReservations?.length || 0);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Ruang Meeting"
            value={meetingRooms?.length || 0}
            icon={DoorOpen}
            color="blue"
            isLoading={isLoadingRooms}
          />

          <StatCard
            title="Reservasi Aktif"
            value={activeReservations?.length || 0}
            icon={Activity}
            color="green"
            isLoading={isLoadingDerived}
          />

          <StatCard
            title="Ruangan Tersedia"
            value={availableRooms >= 0 ? availableRooms : 0}
            icon={Users}
            color="purple"
            isLoading={isLoadingRooms || isLoadingDerived}
          />

          <StatCard
            title="Total Reservasi"
            value={allReservations?.length || 0}
            icon={Calendar}
            color="orange"
            isLoading={isLoadingAll}
          />

          <StatCard
            title="Reservasi Hari Ini"
            value={todayReservations?.length || 0}
            icon={Clock}
            color="red"
            isLoading={isLoadingDerived}
          />

          <StatCard
            title="Reservasi Mendatang"
            value={upcomingReservations?.length || 0}
            icon={TrendingUp}
            color="indigo"
            isLoading={isLoadingDerived}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Aktivitas Terbaru
                </h2>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Reservasi baru dibuat
                    </p>
                    <p className="text-xs text-gray-500">
                      Meeting Room A - 10:00 - 12:00
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">5 menit lalu</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Reservasi disetujui
                    </p>
                    <p className="text-xs text-gray-500">
                      Meeting Room B - 14:00 - 16:00
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">15 menit lalu</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Reservasi dibatalkan
                    </p>
                    <p className="text-xs text-gray-500">
                      Meeting Room C - 13:00 - 15:00
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">1 jam lalu</span>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Lihat Semua Aktivitas →
              </button>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Pengumuman
                </h2>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
            </Card.Header>
            <Card.Body>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm font-medium text-blue-900">
                    Pemeliharaan Sistem
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Sistem akan menjalani pemeliharaan pada akhir pekan ini.
                  </p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                  <p className="text-sm font-medium text-green-900">
                    Fitur Baru
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Notifikasi otomatis telah diaktifkan untuk semua pengguna.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                  <p className="text-sm font-medium text-orange-900">
                    Renovasi Ruangan
                  </p>
                  <p className="text-xs text-orange-700 mt-1">
                    Meeting Room A akan direnovasi minggu depan.
                  </p>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Lihat Semua Pengumuman →
              </button>
            </Card.Footer>
          </Card>
        </div>

        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold text-gray-900">Aksi Cepat</h2>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  Buat Reservasi
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <DoorOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  Kelola Ruangan
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  Kelola Pengguna
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  Lihat Laporan
                </p>
              </button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
