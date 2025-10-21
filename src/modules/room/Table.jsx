import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { BaseTable } from "@common";

const Table = ({ rooms, onDelete, onEdit, loading }) => {
  const getTypeColor = (type) => {
    const colors = {
      main: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200"
      },
      sub: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200"
      }
    };
    return colors[type] || colors.sub;
  };

  const columns = [
    {
      header: "Nama Ruangan",
      accessor: "name",
      Cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-900">
          {row.original.name}
        </div>
      ),
    },

    {
      header: "Fasilitas",
      accessor: "facilities",
      Cell: ({ row }) => {
        const facilities = row.original.facilities || [];
        
        return (
          <div className="text-sm text-gray-700">
            {Array.isArray(facilities) && facilities.length > 0 ? (
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
      Cell: ({ value }) => (
        <div className="text-sm font-medium text-gray-700">
          {value ? `${value} orang` : "-"}
        </div>
      ),
    },

    {
      header: "Lokasi",
      accessor: "location",
      Cell: ({ value }) => (
        <div className="text-sm font-medium text-gray-700">
          {value || "-"}
        </div>
      ),
    },

    {
      header: "Tipe",
      accessor: "type",
      Cell: ({ value }) => {
        const colors = getTypeColor(value);
        const label = value === "main" ? "Utama" : "Sub Ruangan";
        
        return (
          <span className={`inline-flex items-center ${colors.bg} ${colors.text} px-3 py-1.5 rounded-lg text-xs font-semibold border ${colors.border}`}>
            {label}
          </span>
        );
      },
    },

    {
      header: "Aksi",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button
            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-150 opacity-0 group-hover:opacity-100"
            title="Edit Ruangan"
            onClick={() => onEdit(row.original)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150 opacity-0 group-hover:opacity-100"
            title="Hapus Ruangan"
            onClick={() => onDelete(row.original)}
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