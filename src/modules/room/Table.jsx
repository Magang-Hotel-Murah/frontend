import React from "react";
import { Edit, Trash2, MapPin, UsersRoundIcon, ImageOff } from "lucide-react";
import { BaseTable } from "@common";
import { getTypeColor } from "@utils";

const Table = ({ user, rooms, onDelete, onEdit, loading }) => {
  const isAdmin = user?.role === "company_admin";
  const isEmployee = user?.role === "employee";
  const isFinance = user?.role === "finance_officer";

  const baseColumns = [
    {
      header: "Foto",

      render: (row) => (
        <div className="flex-items-center justify-center">
          {row.images && row.images.length > 0 ? (
            <img
              src={row.images[0]}
              alt={row.name}
              className="h-14 w-14 rounded-lg object-cover"
            />
          ) : (
            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
              <ImageOff className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Ruangan",
      render: (row) => (
        <div className="flex items-center">
          <div className="text-sm font-semibold text-gray-900">{row.name}</div>
        </div>
      ),
    },

    {
      header: "Fasilitas",
      accessor: "facilities",

      render: (row) => {
        const facilities = row.facilities;
        return (
          <div className="text-sm text-gray-700">
            {facilities && facilities.length > 0 ? (
              <span>{facilities.join(", ")}</span>
            ) : (
              <span className="text-gray-400 italic">Tidak ada fasilitas</span>
            )}
          </div>
        );
      },
    },

    {
      header: "Kapasitas",
      accessor: "capacity",
      render: (row) => (
        <div className="flex items-center">
          <UsersRoundIcon className="w-4 h-4 text-gray-400 mr-2" />
          <div className="text-sm font-medium text-gray-700">
            {row.capacity ? `${row.capacity} Peserta` : "-"}
          </div>
        </div>
      ),
    },

    {
      header: "Lokasi",
      accessor: "location",
      render: (row) => (
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <div className="text-sm font-medium text-gray-700">
            {row.location || "-"}
          </div>
        </div>
      ),
    },

    {
      header: "Tipe",
      accessor: "type",
      render: (row) => {
        const type = row.type;
        const colors = getTypeColor(type);
        const label = type === "main" ? "Utama" : "Sub Ruangan";

        return (
          <span
            className={`inline-flex ${colors.bg} ${colors.text} px-2 py-1 rounded-full text-xs font-semibold`}
          >
            {label}
          </span>
        );
      },
    },
  ];

  const columns = isAdmin
    ? [
        ...baseColumns,
        {
          header: "Aksi",
          headerClassName: "text-right",
          render: (row) => (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onEdit(row)}
                className="p-2 text-primary-500 hover:text-primary-900"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(row)}
                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ),
        },
      ]
    : baseColumns;

  return (
    <BaseTable
      columns={columns}
      data={rooms}
      loading={loading}
      isFullscreenLoading={true}
    />
  );
};

export default Table;
