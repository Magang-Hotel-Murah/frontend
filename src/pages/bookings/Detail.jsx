import { Building2 } from "lucide-react";
import { Button, Card } from "@ui";
import { LoadingAlert, AlertStyles } from "@alert";
import { BaseModal } from "@common";
import {
  formatDateTime,
  formatTime,
  getStatusBooking,
} from "@utils";
import { useGetReservationById } from "@hooks/reservation-meeting-room/useGetReservationById";

const Detail = ({ reservations, onClose }) => {
  const { data: reservation, isLoading } = useGetReservationById(reservations?.id);

  if (isLoading || !reservations) {
    return (
      <>
        <AlertStyles />
        <LoadingAlert
          show={true}
          title="Memuat Data Reservasi..."
          message="Mohon tunggu, kami akan menampilkan data reservasi."
        />
      </>
    );
  }

  const data = reservation || reservations;
  console.log(data);
  const statusConfig = getStatusBooking(data?.status);
  const StatusIcon = statusConfig?.icon;

  return (
    <>
      <AlertStyles />

      <BaseModal
        isOpen={!!reservations}
        onClose={onClose}
        title="Detail Reservasi"
        icon={<Building2 className="w-5 h-5" />}
        footer={
          <Button variant="ghost" size="small" onClick={onClose}>
            Tutup
          </Button>
        }
      >
        <div className="p-4">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
                Informasi Perusahaan
              </p>
            </div>
            <p className="text-sm text-blue-900 font-semibold">
              {data?.company?.name || "Company Name"}
            </p>
          </Card>

          <div className="mt-6 mb-3 pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig?.bgLight} ${statusConfig?.textColor}`}
              >
                {StatusIcon && <StatusIcon className="w-3.5 h-3.5" />}
                {statusConfig?.label}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <DetailRow label="Tentang" value={data?.title || "Judul Reservasi"} />
            {data?.description && (
              <div className="pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600 block mb-1">Deskripsi</span>
                <p className="text-sm text-gray-900">{data.description}</p>
              </div>
            )}
            <DetailRow label="Dibuat Oleh" value={data?.user?.name || "User Name"} />
            <DetailRow label="Ruangan" value={data?.meeting_room?.name || "Meeting Room"} />
            <DetailRow label="Waktu Mulai" value={formatDateTime(data?.start_time)} />
            <DetailRow label="Waktu Selesai" value={formatDateTime(data?.end_time)} />
            <DetailRow
              label="Durasi"
              value={`${formatTime(data?.start_time)} - ${formatTime(data?.end_time)}`}
            />

            {data?.participant && (
              <div className="pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600 block mb-1">Peserta Rapat</span>
                <p className="text-sm text-gray-900">{data.participant}</p>
              </div>
            )}

            {data?.approved_by && (
              <DetailRow
                label="Disetujui Oleh"
                value={data.approved_by}
                valueClass="text-green-700"
              />
            )}

            {data?.rejection_reason && (
              <div className="pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600 block mb-1">Alasan Penolakan</span>
                <p className="text-sm text-red-700">{data.rejection_reason}</p>
              </div>
            )}
          </div>
        </div>
      </BaseModal>
    </>
  );
};

const DetailRow = ({ label, value, valueClass = "text-gray-900" }) => (
  <div className="pb-3 border-b border-gray-100">
    <div className="flex items-start justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-medium text-right ${valueClass}`}>{value}</span>
    </div>
  </div>
);

export default Detail;
