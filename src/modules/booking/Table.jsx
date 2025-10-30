import React from "react";
import { BaseTable } from "@common";
import {
  Users,
  Clock,
  Check,
  X,
  Trash2,
  Eye,
  Database,
} from "lucide-react";
import { formatDateTimeHour, getStatusTableBooking } from "@utils";

const Table = ({
  user,
  reservations,
  onDetail,
  onApprove,
  onReject,
  onDelete,
  loading,
}) => {
  const isAdmin = user?.role === "company_admin";
  const isEmployee = user?.role === "employee";

  const columns = [
    {
      header: "Ruangan",
      render: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <Database className="h-4 w-4 text-primary-600" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              {row.room?.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Karyawan",
      render: (row) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 text-gray-400 mr-2" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {row.user?.name}
            </div>
            <div className="text-sm text-gray-500">
              {row.user?.division?.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Mulai - Berakhir",
      render: (row) => {
        const start = formatDateTimeHour(row.start_time);
        const end = formatDateTimeHour(row.end_time);
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
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusTableBooking(
            row.status
          )}`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Aksi",
      headerClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          {isAdmin && (
            <>
              {row.status === "pending" && (
                <>
                  <button
                    onClick={() => onApprove(row.id)}
                    className="text-green-600 hover:text-green-900 p-1"
                    title="Approve"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onReject(row.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Reject"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                onClick={() => onDetail(row)}
                className="text-gray-600 hover:text-gray-900 p-1"
                title="Detail"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => onDelete(row.id)}
                className="text-red-600 hover:text-red-900 p-1"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}

          {/* EMPLOYEE: hanya tombol detail */}
          {isEmployee && (
            <button
              onClick={() => onDetail(row)}
              className="text-gray-600 hover:text-gray-900 p-1"
              title="Detail"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <BaseTable
      columns={columns}
      data={reservations}
      loading={loading}
      isFullscreenLoading={true}
    />
  );
};

export default Table;
