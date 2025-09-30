import React from "react";
import BaseTable from "@common/BaseTable";
import { Eye, Edit, XCircleIcon, ActivityIcon } from "lucide-react";

const UserTable = ({ users, onView, onEdit, onToggleStatus, loading }) => {
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "user":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (deleted_at) => {
    return deleted_at === null
      ? "bg-green-100 text-green-800"
      : "bg-gray-300 text-gray-800";
  };

  const columns = [
    {
      header: "User",
      render: (row) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      header: "Role",
      render: (row) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
            row.role
          )}`}
        >
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            row.deleted_at
          )}`}
        >
          {row.deleted_at === null ? "Active" : "Non-active"}
        </span>
      ),
    },
    {
      header: "Tanggal Dibuat",
      render: (row) => (
        <span className="text-sm text-gray-500">
          {new Date(row.created_at).toLocaleDateString("id-ID")}
        </span>
      ),
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onView(row)}
            className="text-gray-600 hover:text-gray-900 p-1"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(row)}
            className="text-primary-500 hover:text-primary-900 p-1"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleStatus(row)}
            className={`p-1 rounded ${
              row.deleted_at === null
                ? "text-green-600 hover:text-green-900"
                : "text-red-600 hover:text-red-900"
            }`}
            title={row.deleted_at === null ? "Active" : "Nonaktif"}
          >
            {row.deleted_at === null ? (
              <ActivityIcon className="w-4 h-4" />
            ) : (
              <XCircleIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      ),
    },
  ];

  return <BaseTable 
            columns={columns} 
            data={users}
            loading={loading}
            isFullscreenLoading={true}
          />;
};

export default UserTable;
