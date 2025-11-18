import React from "react";
import { Edit, Trash2, UsersRoundIcon, ListChecks, Building2 } from "lucide-react";
import { BaseTable } from "@common";

const Table = ({ divisions, onDelete, onEdit, loading }) => {
  const columns = [
    {
      header: "Divisi",
      render: (row) => (
        <div className="flex items-center">
            <div className="text-sm font-semibold text-gray-900">{row.name}</div>
        </div>
      ),
    },

    {
      header: "Jumlah Posisi",
      render: (row) => (
        <div className="flex items-center">
          <UsersRoundIcon className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-700">
            {row.positions?.length || 0} posisi
          </span>
        </div>
      ),
    },

    {
      header: "Daftar Posisi",
      render: (row) => {
        const positions = row.positions || [];
        return (
          <div className="flex flex-wrap gap-2">
            {positions.length > 0 ? (
              positions.map((pos) => (
                <span
                  key={pos.id}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
                >
                  <ListChecks className="w-3 h-3" />
                  {pos.name}
                </span>
              ))
            ) : (
              <span className="text-gray-400 italic text-sm">
                Tidak ada posisi
              </span>
            )}
          </div>
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
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
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
      data={divisions}
      loading={loading}
      isFullscreenLoading={true}
    />
  );
};

export default Table;
