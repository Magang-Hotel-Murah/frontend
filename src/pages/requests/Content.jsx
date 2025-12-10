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

export const Content = ({ user }) => {
  const { data: meetingRequestsData, isLoading: requestLoading } =
    useGetMeetingRequests();
  const { mutateAsync: deleteRequest } = useDeleteMeetingRequest();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateRequestStatus();

  // Backend response structure: { data: [...], message, period, count }
  const meetingRequests = meetingRequestsData?.data || [];
  
  console.log("Meeting Requests Data:", meetingRequestsData);
  console.log("Meeting Requests Array:", meetingRequests);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmReject, setShowConfirmReject] = useState(false);
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
    setShowConfirmReject(true);
  };

  const handleConfirmReject = () => {
    if (!rejectionReason.trim()) {
      showToastNotification("error", "Alasan penolakan harus diisi");
      return;
    }

    updateStatus(
      {
        id: selectedRequest.id,
        status: "rejected",
        rejection_reason: rejectionReason,
      },
      {
        onSuccess: () => {
          showToastNotification("success", "Request berhasil ditolak");
          setShowConfirmReject(false);
          setRejectionReason("");
          setSelectedRequest(null);
        },
        onError: () => {
          showToastNotification("error", "Gagal menolak request");
        },
      }
    );
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

      {/* Confirmation Reject with Reason */}
      {showConfirmReject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Tolak Request</h3>
            <p className="text-gray-600 mb-4">
              Masukkan alasan penolakan request ini:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 min-h-[100px]"
              placeholder="Tuliskan alasan penolakan..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowConfirmReject(false);
                  setRejectionReason("");
                  setSelectedRequest(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isUpdating}
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={isUpdating || !rejectionReason.trim()}
              >
                {isUpdating ? "Menolak..." : "Tolak Request"}
              </button>
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