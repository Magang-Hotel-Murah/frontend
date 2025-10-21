import React from "react";
import BaseFilters from "@common/BaseFilters";

const Filter = ({
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
            { label: "HR", value: "company_admin" },
            { label: "Finance", value: "finance_officer"},
            { label: "Karyawan", value: "employee" },
            { label: "Staff Pendukung", value: "support_staff"},

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

export default Filter;
