import React from "react";
import { Users, Calendar, Clock, Check, X, Trash2 } from "lucide-react";

export const ReservationCard = ({ reservation, onStatusUpdate, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID"),
      time: date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const startTime = formatDateTime(reservation.start_time);
  const endTime = formatDateTime(reservation.end_time);

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 mr-3">
              {reservation.room?.name}
            </h3>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                reservation.status
              )}`}
            >
              {reservation.status.charAt(0).toUpperCase() +
                reservation.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <div>
                <span className="font-medium">
                  {reservation.user?.name}
                </span>
                <br />
                <span className="text-gray-500">
                  {reservation.user?.division?.name}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{startTime.date}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>
                {startTime.time} - {endTime.time}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {reservation.status === "pending" && (
            <>
              <button
                onClick={() => onStatusUpdate(reservation.id, "approved")}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <Check className="h-3 w-3 mr-1" />
                Approve
              </button>
              <button
                onClick={() => onStatusUpdate(reservation.id, "rejected")}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <X className="h-3 w-3 mr-1" />
                Reject
              </button>
            </>
          )}
          <button
            onClick={() => onDelete(reservation.id)}
            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;