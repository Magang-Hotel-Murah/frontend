export const API_ENDPOINTS = {
  MEETING_ROOMS: "/meeting-rooms",
  RESERVATIONS: "/meeting-room-reservations",
};

export const RESERVATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const STATUS_COLORS = {
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export const TABLE_CONFIG = {
  hotel: {
    prefix: "HTL",
    primaryField: {
      header: "Hotel & Tamu",
      mainField: "hotel_name",
      subField: "user_id",
      subLabel: "Tamu",
    },
  },
  flight: {
    prefix: "FLT",
    primaryField: {
      header: "Penerbangan & Penumpang",
      mainField: "flight_number",
      subField: "user_id",
      subLabel: "Penumpang",
    },
  },
  ppob: {
    prefix: "PPO",
    primaryField: {
      header: "Jenis & Pelanggan",
      mainField: "service_type",
      subField: "user_id",
      subLabel: "Pelanggan",
    },
  },
};

export const formatCurrency = (amount, currency = "IDR") => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const getStatusBadge = (status) => {
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

export const getPaymentMethodBadge = (method) => {
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
