import React, { useState } from "react";
import { NavbarTransaction } from "@components";
import { Hotel, Kereta, Pesawat, Topup } from "@transaksi";

const Transactions = () => {
  const [activeTab, setActiveTab] = React.useState("hotel");

  const renderContent = () => {
    switch (activeTab) {
      case "hotel":
        return <Hotel />;
      case "kereta":
        return <Kereta />;
      case "pesawat":
        return <Pesawat />;
      case "topup":
        return <Topup />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white overflow-hidden">
        <NavbarTransaction activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
