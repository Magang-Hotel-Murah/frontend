import React, { useState } from "react";
import { Pagination } from "@common";
import { Table, Filter } from "@contentbooking";
import { AlertStyles } from "@alert";
import { paginateData, filterBySearch } from "@utils";
import {
  useGetReservationByUserId,
  useUpdateReservation,
  useDeleteReservation,
} from "@hooks/reservation-meeting-room";
import { useGetRooms } from "@hooks/meeting-room";

export const Request = ({}) => {
  const { data: reservationByUser = [], isLoading: reservationLoading } =
    useGetReservationByUserId();
  const { data: rooms = [], isLoading: roomLoading } = useGetRooms();
  const { mutateAsync: deleteReservation } = useDeleteReservation();

  const loading = reservationLoading || roomLoading;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRoom, setFilterRoom] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredRequest = filterBySearch(reservations, searchTerm, [
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
        <Filter />

        <Table />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredRequest.length}
        />
      </div>
    </>
  );
};
