import React from "react";
import BaseFilters from "@common/BaseFilters";

const UserFilters = ({
  searchTerm,
  setSearchTerm,
  filterRole,
  setFilterRole,
  filterStatus,
  setFilterStatus,
  resultCount,
  totalCount,
}) => {
  return (
    <BaseFilters
      searchConfig={{
        placeholder: "Cari nama atau email...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
      }}
      selectFilters={[
        {
          value: filterRole,
          onChange: (e) => setFilterRole(e.target.value),
          options: [
            { label: "Semua Role", value: "" },
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ],
        },
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          options: [
            { label: "Semua Status", value: "" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "non-active" },
          ],
        },
      ]}
      resultCount={resultCount}
      totalCount={totalCount}
    />
  );
};

export default UserFilters;
