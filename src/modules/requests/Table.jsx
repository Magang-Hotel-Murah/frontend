import React from "react";
import { BaseTable } from "@common";
import {
  Users,
  Clock,
  Check,
  X,
  Trash2,
  Eye,
  DollarSign,
  Calendar,
} from "lucide-react";
import { formatDateTimeHour, formatCurrency } from "@utils";

const Table = ({
  user,
  meetingRequests,
  onApprove,
  onReject,
  onDelete,
  loading,
}) => {
  const isFinanceOfficer = user?.role === "finance_officer";

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: "bg-green-100 text-green-800",
      waiting_finance: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    const labels = {
      approved: "Disetujui",
      waiting_finance: "Menunggu Finance",
      rejected: "Ditolak",
    };
    return labels[status] || status;
  };

  const columns = [
    {
      header: "Judul Meeting",
      render: (row) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {row.reservation?.title || "-"}
            </div>
            <div className="text-sm text-gray-500">
              ID: {row.reservation?.id || "-"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Waktu Meeting",
      render: (row) => {
        if (!row.reservation?.start_time) return "-";
        const start = formatDateTimeHour(row.reservation.start_time);
        const end = formatDateTimeHour(row.reservation.end_time);
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {start.date}
              </div>
              <div className="text-sm text-gray-500">
                {start.time} - {end.time}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Dana",
      render: (row) => (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {formatCurrency(row.funds_amount)}
            </div>
            {row.funds_reason && (
              <div className="text-xs text-gray-500 max-w-xs truncate">
                {row.funds_reason}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Peralatan",
      render: (row) => (
        <div className="text-sm">
          {row.equipment && row.equipment.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {row.equipment.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
            row.status
          )}`}
        >
          {getStatusLabel(row.status)}
        </span>
      ),
    },
    {
      header: "Aksi",
      headerClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          {isFinanceOfficer && row.status === "waiting_finance" && (
            <>
              <button
                onClick={() => onApprove(row.id)}
                className="text-green-600 hover:text-green-900 p-1"
                title="Setujui"
                disabled={loading}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => onReject(row.id)}
                className="text-red-600 hover:text-red-900 p-1"
                title="Tolak"
                disabled={loading}
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={() => onDelete(row.id)}
            className="text-red-600 hover:text-red-900 p-1"
            title="Hapus"
            disabled={loading}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <BaseTable
      columns={columns}
      data={meetingRequests}
      loading={loading}
      isFullscreenLoading={true}
    />
  );
};

export default Table;