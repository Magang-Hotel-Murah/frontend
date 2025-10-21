import { useEffect, useState } from "react";
import { X, Building2, } from "lucide-react";
import { Button, Card } from "@ui";
import { LoadingAlert, AlertStyles } from "@alert";
import { formatDateTime, formatTime, getStatusBooking } from "@utils";
import { useReservations } from "@hooks";

const Detail = ({ reservations, onClose }) => {
  const { getReservationById } = useReservations();
  const [reservationData, setReservationData] = useState(null);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);

  useEffect(() => {
    if (!reservations) return;

    setShowLoadingAlert(true);
    const fetchReservation = async () => {
      try {
        const res = await getReservationById(reservations.id);
        setReservationData(res.data ?? res);

        setReservationData(reservations);
      } catch (err) {
        console.error("Gagal memuat data reservasi:", err);
      } finally {
        setShowLoadingAlert(false);
      }
    };

    fetchReservation();
  }, [reservations]);


  const data = reservationData || reservations;
  const statusConfig = getStatusBooking(data?.status);
  const StatusIcon = statusConfig.icon;

  return (
    <>
      <AlertStyles />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="absolute inset-0 bg-opacity-60 backdrop-blur-xl transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative w-full max-w-2xl shadow-lg max-h-screen overflow-y-auto">
          <Card className="overflow-hidden">
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Detail Reservasi
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded p-1 transition-all"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {data.companies?.name || "Company Name"}
                  </span>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bgLight} ${statusConfig.textColor}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Tentang</span>
                  <span className="text-sm font-medium text-gray-900 text-right max-w-xs">
                    {data.title || "Judul Reservasi"}
                  </span>
                </div>
              </div>

              {data.description && (
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600 block mb-1">
                    Deskripsi
                  </span>
                  <p className="text-sm text-gray-900">{data.description}</p>
                </div>
              )}

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Dibuat Oleh</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {data.user?.name || "User Name"}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Ruangan</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {data.meeting_room?.name || "Meeting Room"}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Waktu Mulai</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {formatDateTime(data.start_time)}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Waktu Selesai</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {formatDateTime(data.end_time)}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Durasi</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {formatTime(data.start_time)} - {formatTime(data.end_time)}
                  </span>
                </div>
              </div>

              {data.participant && (
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600 block mb-1">
                    Peserta Rapat
                  </span>
                  <p className="text-sm text-gray-900">{data.participant}</p>
                </div>
              )}

              {data.approved_by && (
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-600">
                      Disetujui Oleh
                    </span>
                    <span className="text-sm font-medium text-green-700 text-right">
                      {data.approved_by}
                    </span>
                  </div>
                </div>
              )}

              {data.rejection_reason && (
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600 block mb-1">
                    Alasan Penolakan
                  </span>
                  <p className="text-sm text-red-700">
                    {data.rejection_reason}
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <Button variant="ghost" size="small" onClick={onClose}>
                Tutup
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <LoadingAlert
        show={showLoadingAlert}
        title="Memuat Data Reservasi..."
        message="Mohon tunggu, kami akan menampilkan data reservasi."
      />
    </>
  );
};

export default Detail;
