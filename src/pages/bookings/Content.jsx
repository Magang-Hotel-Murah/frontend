import React, { use, useState } from "react";
import { Plus } from "lucide-react";
import { useReservations } from "@hooks";
import { CreateReservationModal } from "@ui";
import { Pagination } from "@common";
import { Table, Filter } from "@contentbooking";
import { AlertStyles } from "@alert";
import { paginateData, filterBySearch } from "@utils";
import { Detail } from "@bookings";

export const Content = () => {
  const {
    reservations,
    rooms,
    loading,
    createReservation,
    updateReservationStatus,
    deleteReservation,
  } = useReservations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleCreateReservation = async (newReservation) => {
    try {
      await createReservation(newReservation);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
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

      <div>
        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Booking Ruangan Meeting
          </button>
        </div>

        <br />

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

        <br />

        <Table
          reservations={currentReservations}
          onDetail={(reservations) => handleOpenModal("detail", reservations)}
          onApprove={(id) => updateReservationStatus(id, "approved")}
          onReject={(id) => updateReservationStatus(id, "rejected")}
          onDelete={deleteReservation}
          loading={loading}
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
        <CreateReservationModal
          showModal={showCreateModal}
          setShowModal={setShowCreateModal}
          rooms={rooms}
          onCreateReservation={handleCreateReservation}
        />
      </div>
    </>
  );
};

export default Content;
