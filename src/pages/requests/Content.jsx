import { useState } from "react";
import { Pagination } from "@common";
import { Filter, Table } from "@contentrequest";
import { paginateData, filterBySearch } from "@utils";
import {
  useGetMeetingRequests,
  useDeleteMeetingRequest,
  useUpdateRequestStatus,
} from "@hooks/meeting-request";
import { ConfirmationAlert, ToastAlert, AlertStyles } from "@alert";
import { set } from "react-hook-form";

export const Content = ({ user }) => {
  const { data: meetingRequestsData, isLoading: requestLoading } =
    useGetMeetingRequests();
  const { mutateAsync: deleteRequest } = useDeleteMeetingRequest();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateRequestStatus();

  const meetingRequests = meetingRequestsData?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "info", message: "" });
  const [isDelete, setIsDelete] = useState(false);

  const loading = isUpdating || requestLoading;

  const handleApprove = (id) => {
    updateStatus(
      { id, status: "approved" },
      {
        onSuccess: () => {
          showToastNotification("success", "Request berhasil disetujui");
        },
        onError: () => {
          showToastNotification("error", "Gagal menyetujui request");
        },
      }
    );
  };

  const handleRejectClick = (id) => {
    setSelectedRequest({ id });
    setShowRejectModal(true);
  };

  const handleConfirmReject = () => {
    const trimmedReason = rejectionReason.trim();
    if (!trimmedReason || trimmedReason.length < 10) {
      showToastNotification("error", "Alasan penolakan harus diisi");
      return;
    }

    // Logging untuk debug
    console.log("Rejecting request with data:", {
      id: selectedRequest.id,
      status: "rejected",
      rejection_reason: trimmedReason,
    });

    updateStatus(
      {
        id: selectedRequest.id,
        status: "rejected",
        rejection_reason: rejectionReason.trim(),
      },
      {
        onSuccess: (response) => {
          console.log("Reject success:", response);
          showToastNotification("success", "Request berhasil ditolak");
          handleCloseRejectModal();
        },
        onError: (error) => {
          console.error("Reject error:", error);
          const errorMessage = error?.response?.data?.message || 
                             error?.message || 
                             "Gagal menolak request";
          showToastNotification("error", errorMessage);
        },
      }
    );
  };

  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
    setRejectionReason("");
    setSelectedRequest(null);
  };

  const handleDeleteClick = (id) => {
    setSelectedRequest({ id });
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    setIsDelete(true);
    try {
      await deleteRequest(selectedRequest.id);
      showToastNotification("success", "Request berhasil dihapus");
    } catch {
      showToastNotification("error", "Gagal menghapus request");
    } finally {
      setIsDelete(false);
      setShowConfirmDelete(false);
      setSelectedRequest(null);
    }
  };

  const showToastNotification = (type, message) => {
    setToastConfig({ type, message });
    setShowToast(true);
  };

  const filteredRequests = filterBySearch(meetingRequests, searchTerm, [
    "reservation.title",
    "funds_reason",
  ]).filter((request) => {
    const matchesStatus = filterStatus === "" || request.status === filterStatus;
    return matchesStatus;
  });

  const { currentData: currentRequests, totalPages } = paginateData(
    filteredRequests,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <AlertStyles />
      <div className="space-y-6">
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          resultCount={filteredRequests.length}
          totalCount={meetingRequests.length}
        />

        <Table
          meetingRequests={currentRequests}
          loading={loading}
          user={user}
          onApprove={handleApprove}
          onReject={handleRejectClick}
          onDelete={handleDeleteClick}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredRequests.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Confirmation Delete */}
      <ConfirmationAlert
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Yakin ingin menghapus request?"
        message="Request yang dihapus tidak bisa dikembalikan"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isLoading={isDelete}
      />

      {/* Modal Reject with Reason Input */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tolak Request Meeting
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Silakan masukkan alasan penolakan request ini. Alasan akan dikirimkan kepada pemohon.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  onBlur={(e) => setRejectionReason(e.target.value.trim())}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Contoh: Dana yang diminta melebihi budget yang tersedia untuk bulan ini..."
                  rows={4}
                  disabled={isUpdating}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimal 10 karakter
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseRejectModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdating}
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdating || !rejectionReason.trim() || rejectionReason.trim().length < 10}
                >
                  {isUpdating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menolak...
                    </span>
                  ) : (
                    "Tolak Request"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastAlert
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastConfig.message}
        type={toastConfig.type}
        position="top-right"
        duration={3000}
      />
    </>
  );
};

export default Content;