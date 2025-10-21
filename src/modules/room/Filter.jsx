import React from "react";
import { BaseFilters } from '@common';

const Filter = ({
    searchTerm, 
    setSearchTerm,
    resultCount,
    totalCount
}) => {
    return (
        <BaseFilters
            searchConfig={{
                placeholder: "Cari nama ruangan...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
            }}
            resultCount={resultCount}
            totalCount={totalCount}
        />
    )
}

export default Filter;