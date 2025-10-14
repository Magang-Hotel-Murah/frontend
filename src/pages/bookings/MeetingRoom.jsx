  import React, { useState, useEffect } from "react";
  import { MapPin, Plus, Edit, Search, Filter, Trash2 } from "lucide-react";
  import api from "../../services/ApiService";
  import { Pagination } from "@common";
  import { RoomFilter, RoomTable } from '@contentroom';
  import { paginateData, filterBySearch } from "@utils";
  import { useReservations } from '@hooks';

  export const MeetingRoom = () => {
    const {rooms, loading, fetchRooms} = useReservations();
    
    const [searchTerm, setSearchTerm] = useState("");
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);


    const filteredRooms = filterBySearch(rooms, searchTerm, [
      "name", "description",
    ])

    const { currentData: currentRooms, totalPages } = paginateData(
        filteredRooms,
        currentPage,
        itemsPerPage
      );

    return (
      <div className="space-y-6">
        <div className="flex justify-end items-center">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Add Room
          </button>
        </div>

        <RoomFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          resultCount={filteredRooms.length}
          totalCount={rooms.length}
        />

        <RoomTable
          rooms={currentRooms}
          loading={loading}
          onEdit={(room) => console.log("Edit", room)}
          onDelete={(room) => console.log("Delete", room)}
        />

          {/* Pagination */}
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

  export default MeetingRoom;