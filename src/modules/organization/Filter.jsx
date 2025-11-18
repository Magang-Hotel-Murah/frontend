import React from "react";
import { BaseFilters } from '@common';

const Filter = ({
    searchTerm, 
    setSearchTerm,
    // filterType,
    // setFilterType,
    resultCount,
    totalCount
}) => {
    return (
        <BaseFilters
            searchConfig={{
                placeholder: "Cari divisi...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
            }}
            // selectFilters= {[
            //     {
            //         valueg: filterType,
            //         onChange: (e) => setFilterType(e.target.value),
            //         options: [
            //             { label: "Semua Tipe", value: "" },
            //             { label: "Utama", value: "main" },
            //             { label: "Sub Ruangan", value: "sub"},
            //         ],
            //     },
            // ]}
            resultCount={resultCount}
            totalCount={totalCount}
        />
    )
}

export default Filter;