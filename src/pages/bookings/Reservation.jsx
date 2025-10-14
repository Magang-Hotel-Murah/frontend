import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useReservations } from "@hooks";
import { CreateReservationModal } from "@ui";
import { Pagination } from "@common";
import { ReservationTable, ReservationFilter } from "@contentroom";
import { AlertStyles } from "@alert";
import { paginateData, filterBySearch } from "@utils";

export const Reservation = () => {
  const {
    reservations,
    rooms,
    loading,
    createReservation,
    updateReservationStatus,
    deleteReservation,
  } = useReservations();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRoom, setFilterRoom] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const handleCreateReservation = async (newReservation) => {
    try {
      await createReservation(newReservation);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

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

        <ReservationFilter
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

        <ReservationTable
          reservations={currentReservations}
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

export default Reservation;
