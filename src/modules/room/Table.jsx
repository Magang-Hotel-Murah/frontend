import React from "react";
import { Edit, Trash2, Database, MapPin, UsersRoundIcon } from "lucide-react";
import { BaseTable } from "@common";
import { getTypeColor } from '@utils';

const Table = ({ rooms, onDelete, onEdit, loading }) => {

  const columns = [
    {
      header: "Ruangan",
      render: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center mr-2">
            <Database className="h-4 w-4 text-primary-600" />
          </div>
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
  ];

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
