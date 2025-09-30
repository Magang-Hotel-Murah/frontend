import React from "react";
import { BaseTable } from "@common";
import { Eye, MoreVertical } from "lucide-react";

const TransactionTable = ({
  transactions,
  loading,
  onUpdateStatus,
  onDelete,
  onViewDetail,
}) => {
  const formatCurrency = (amount, currency = "IDR") => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
      unpaid: "bg-amber-100 text-amber-800 border-amber-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };

    const displayStatus =
      status === "paid" ? "Paid" : status === "unpaid" ? "Unpaid" : "Failed";

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${
          statusConfig[status] || statusConfig.unpaid
        }`}
      >
        {displayStatus}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    if (!method)
      return (
        <span className="px-2 py-1 rounded-md text-xs font-medium border bg-gray-100 text-gray-800">
          -
        </span>
      );

    const methodConfig = {
      "Credit Card": "bg-purple-100 text-purple-800 border-purple-200",
      "Bank Transfer": "bg-blue-100 text-blue-800 border-blue-200",
      "E-Wallet": "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium border ${
          methodConfig[method] || "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        {method}
      </span>
    );
  };

  const columns = [
    {
      header: "ID Transaksi",
      render: (row) => (
        <div>
          <div className="font-mono text-sm font-medium text-slate-800">
            #{row.id.toString().padStart(4, "0")}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            HTL-{row.transactionable_id}
          </div>
        </div>
      ),
    },
    {
      header: "Hotel & Tamu",
      render: (row) => (
        <div>
          <div className="font-medium text-slate-800 text-sm">
            {row.hotel_name}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Tamu: {row.guest_name}
          </div>
        </div>
      ),
    },
    {
      header: "External ID",
      render: (row) => (
        <div className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md inline-block">
          {row.external_id}
        </div>
      ),
    },
    {
      header: "Jumlah",
      render: (row) => (
        <div>
          <div className="font-bold text-slate-800">
            {formatCurrency(row.amount, row.currency)}
          </div>
          <div className="text-xs text-slate-500 mt-1">{row.currency}</div>
        </div>
      ),
    },
    {
      header: "Metode Pembayaran",
      render: (row) => getPaymentMethodBadge(row.payment_method),
    },
    {
      header: "Status",
      render: (row) => (
        <div className="flex items-center gap-2">
          {getStatusBadge(row.payment_status)}
          <select
            value={row.payment_status}
            onChange={(e) => {
              e.stopPropagation();
              onUpdateStatus && onUpdateStatus(row.id, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            className="text-xs border border-slate-200 rounded px-1 py-0.5 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      ),
    },
    {
      header: "Tanggal",
      render: (row) => (
        <div>
          <div className="text-sm text-slate-800">
            {row.transaction_date
              ? new Date(row.transaction_date).toLocaleDateString("id-ID")
              : new Date(row.created_at).toLocaleDateString("id-ID")}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {new Date(row.created_at).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
    {
      header: "Aksi",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail && onViewDetail(row);
            }}
            className="p-1.5 hover:bg-primary-100 rounded-lg transition-colors duration-200"
            title="Lihat Detail"
          >
            <Eye className="w-4 h-4 text-primary-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(row.id);
            }}
            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200"
            title="Hapus Transaksi"
          >
            <MoreVertical className="w-4 h-4 text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <BaseTable
      columns={columns}
      data={transactions}
      loading={loading}
      isFullscreenLoading={true}
      emptyMessage="Coba ubah filter pencarian Anda"
      className="bg-white/70 backdrop-blur-sm rounded-2xl border-white/20"
    />
  );
};

export default TransactionTable;