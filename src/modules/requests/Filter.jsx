import React from "react";
import { BaseFilters } from "@common";

const Filter = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  totalCount,
  resultCount   
}) => {
  return (
    <BaseFilters
      searchConfig={{
        placeholder: "Cari judul meeting...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
      }}
      selectFilters={[
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          options: [
            { label: "Semua Status", value: "" },
            { label: "Menunggu Persetujuan", value: "waiting_finance" },
            { label: "Disetujui", value: "approved" },
            { label: "Ditolak", value: "rejected" },
          ],
        },
      ]}
      resultCount={resultCount}
      totalCount={totalCount}
    />
  );
};

export default Filter;
