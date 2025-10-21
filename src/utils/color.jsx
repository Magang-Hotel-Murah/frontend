import React from "react";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

export const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "company_admin":
        return "bg-red-100 text-red-800";
      case "finance_officer":
        return "bg-yellow-100 text-yellow-800";
      case "support_staff":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

export  const getStatusActive = (deleted_at) => {
    return deleted_at === null
      ? "bg-green-100 text-green-800"
      : "bg-gray-300 text-gray-800";
  };

export const getStatusBooking = (status) => {
  const configs = {
    pending: {
      color: "bg-yellow-500",
      bgLight: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
      icon: AlertCircle,
      label: "Menunggu Persetujuan",
    },
    approved: {
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      icon: CheckCircle,
      label: "Disetujui",
    },
    rejected: {
      color: "bg-red-500",
      bgLight: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      icon: XCircle,
      label: "Ditolak",
    },
  };
  return (
    configs[status] || {
      color: "bg-gray-500",
      bgLight: "bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-200",
      icon: AlertCircle,
      label: status,
    }
  );
};

export const getRoleBadgeColor = (role) => {
  const colors = {
    company_admin: "bg-blue-100 text-blue-700 border-blue-200",
    finance_officer: "bg-green-100 text-green-700 border-green-200",
    employee: "bg-gray-100 text-gray-700 border-gray-200",
    support_staff: "bg-orange-100 text-orange-700 border-orange-200",
  };
  return colors[role] || "bg-gray-100 text-gray-700 border-gray-200";
};

export const formatRoleName = (role) => {
  return (
    role
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "-"
  );
};

export const getStatusTableBooking = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
