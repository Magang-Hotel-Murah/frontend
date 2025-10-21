import React from "react";
import BaseTable from "@common/BaseTable";
import { Eye, Edit, XCircleIcon, ActivityIcon } from "lucide-react";
import { getStatusActive, getRoleColor} from '@utils';

const Table = ({ users, onDetail, onEdit, onToggleStatus, loading }) => {

  const columns = [
    {
      header: "Nama & Email",
      render: (row) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      header: "Jabatan",
      render: (row) => {
        const roleMap = {
          company_admin: "HR",
          employee: "Karyawan",
          finance_officer: "Finance",
          support_staff: "Staff Pendukung",
        };

        const roleLabel = roleMap[row.role] || row.role;
        return (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
              row.role
            )}`}
          >
            {roleLabel}
          </span>
        );
      },
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusActive(
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
      header: "Aksi",
      headerClassName: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onDetail(row)}
            className="text-gray-600 hover:text-gray-900 p-1"
            title="Detail"
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

  return (
    <BaseTable
      columns={columns}
      data={users}
      loading={loading}
      isFullscreenLoading={true}
    />
  );
};

export default Table;
