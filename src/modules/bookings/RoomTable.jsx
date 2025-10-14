import React from "react";
import { MapPin, Edit, Trash2, Dice1 } from "lucide-react";
import { BaseTable } from "@common";

const RoomTable = ({ rooms, onDelete, onEdit, loading }) => {
  const columns = [
    {
      header: "Nama Ruangan",
      accessor: "name",
      Cell: ({ row }) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.original.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Deskripsi",
      accessor: "description",
      Cell: ({ value }) => (
        <div className="text-sm text-gray-900 max-w-xs truncate">{value}</div>
      ),
    },
    {
      header: "Aksi",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button
            className="text-blue-600 hover:text-blue-900 p-1"
            title="Edit"
            onClick={() => onEdit(row.original)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            className="text-red-600 hover:text-red-900 p-1"
            title="Delete"
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

export default RoomTable;