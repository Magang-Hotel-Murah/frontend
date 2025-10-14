import React from "react";
import { BaseFilters } from "@common";

const ReservationFilter = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterRoom,
  setFilterRoom,
  rooms,
  totalCount,
  resultCount   
}) => {
  return (
    <BaseFilters
      searchConfig={{
        placeholder: "Cari nama, ruangan atau divisi...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
      }}
      selectFilters={[
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          options: [
            { label: "Semua Status", value: "" },
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ],
        },
        {
            value: filterRoom,
            onChange: (e) => setFilterRoom(e.target.value),
            options: [{ label: "Semua Ruangan", value: "" }].concat(
                (rooms || []).map((room) => ({
                    label: room.name,
                    value: room.id.toString(),
                }))
            ),
        },
      ]}
      resultCount={resultCount}
      totalCount={totalCount}
    />
  );
};

export default ReservationFilter;
