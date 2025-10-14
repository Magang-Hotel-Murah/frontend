import React from "react";
import { BaseFilters } from '@common';

const RoomFilter = ({
    searchTerm, 
    setSearchTerm,
    resultCount,
    totalCount
}) => {
    return (
        <BaseFilters
            searchConfig={{
                placeholder: "Cari nama ruangan atau deskripsi...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
            }}
            resultCount={resultCount}
            totalCount={totalCount}
        />
    )
}

export default RoomFilter;