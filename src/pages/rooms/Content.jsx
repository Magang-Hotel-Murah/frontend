import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Pagination } from "@common";
import { Filter, Table } from "@contentroom";
import { paginateData, filterBySearch } from "@utils";
import { useRooms } from "@hooks";
import { Button } from "@ui";

export const Content = () => {
  const { rooms, loading, fetchRooms } = useRooms();

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredRooms = filterBySearch(rooms, searchTerm, [
    "name",
    "location",
    "facilities",
  ]);

  const { currentData: currentRooms, totalPages } = paginateData(
    filteredRooms,
    currentPage,
    itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="mt-5 flex justify-end items-center">
        <Button variant="primary" size="small">
          <Plus className="h-5 w-5 mr-2" />
          Buat Ruangan Baru
        </Button>
      </div>

      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultCount={filteredRooms.length}
        totalCount={rooms.length}
      />

      <Table
        rooms={currentRooms}
        loading={loading}
        onEdit={(room) => console.log("Edit", room)}
        onDelete={(room) => console.log("Delete", room)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredRooms.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Content;
