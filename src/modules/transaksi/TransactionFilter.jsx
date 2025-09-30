import React from "react";
import { BaseFilters } from "@common";

const TransactionFilter = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPaymentMethod,
  setFilterPaymentMethod,
  totalCount,
  resultCount   
}) => {
  const paymentMethods = ["credit_card", "bank_transfer", "e-wallet", "paypal", "qris"];

  return (
    <BaseFilters
      searchConfig={{
        placeholder: "Cari transaksi...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
      }}
      selectFilters={[
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          options: [
            { label: "Semua Status", value: "" },
            { label: "Unpaid", value: "unpaid" },
            { label: "Paid", value: "paid" },
            { label: "Failed", value: "failed" },
          ],
        },
        {
            value: filterPaymentMethod,
            onChange: (e) => setFilterPaymentMethod(e.target.value),
            options: [{ label: "Semua Metode Pembayaran", value: "" }].concat(
                paymentMethods.map((method) => ({
                  label: method,
                  value: method,
                }))
            ),
        },
      ]}
      resultCount={resultCount}
      totalCount={totalCount}
    />
  );
};

export default TransactionFilter;
