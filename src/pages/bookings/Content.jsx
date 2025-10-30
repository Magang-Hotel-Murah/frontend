import React, { useState } from "react";
import { Pagination } from "@common";
import { Table, Filter } from "@contentbooking";
import { AlertStyles } from "@alert";
import { paginateData, filterBySearch } from "@utils";
import { Detail } from "@bookings";
import { useGetReservations } from "@hooks/reservation-meeting-room/useGetReservations";
import { useGetRooms } from "@hooks/meeting-room/useGetRooms";
import { useDeleteReservation } from "@hooks/reservation-meeting-room/useDeleteReservation";
import { useUpdateReservationStatus } from "@hooks/reservation-meeting-room/useUpdateReservationStatus";

export const Content = ({ user }) => {
  const { data: reservations = [], isLoading: reservationLoading } =
    useGetReservations();
  const { data: rooms = [], isLoading: roomLoading } = useGetRooms();
  const { mutateAsync: deleteReservation } = useDeleteReservation();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateReservationStatus();

  const loading = updateStatus.isPending || reservationLoading || roomLoading;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRoom, setFilterRoom] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleOpenModal = (mode, reservation = null) => {
    setModalMode(mode);
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedReservation(null);
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id, status) => {
    updateStatus({ id, status });
  };

  const filteredReservations = filterBySearch(reservations, searchTerm, [
    "user.name",
    "room.name",
    "user.division.name",
    "meeting_room_id",
  ]).filter((reservation) => {
    const matchesStatus =
      filterStatus === "" || reservation.status === filterStatus;
    const matchesRoom =
      filterRoom === "" ||
      reservation.meeting_room_id.toString() === filterRoom;

    return matchesStatus && matchesRoom;
  });

  const { currentData: currentReservations, totalPages } = paginateData(
    filteredReservations,
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
          setFilterRoom={setFilterRoom}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          resultCount={filteredReservations.length}
          totalCount={reservations.length}
          rooms={rooms}
        />

        <Table
          user={user}
          reservations={currentReservations}
          onDetail={(reservations) => handleOpenModal("detail", reservations)}
          onApprove={(id) => handleUpdateStatus(id, "approved")}
          onReject={(id) => handleUpdateStatus(id, "rejected")}
          onDelete={deleteReservation}
          loading={loading || isUpdating}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredReservations.length}
        />

        {isModalOpen && selectedReservation && (
          <>
            {modalMode === "detail" && (
              <Detail
                reservations={selectedReservation}
                onClose={handleCloseModal}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Content;
