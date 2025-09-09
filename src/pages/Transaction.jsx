import React, { useState } from "react";
import { NavbarBooking } from "@components";
import { Hotel, Kereta, Pesawat, Topup } from "@transaksi";

const Transactions = () => {
  const [activeTab, setActiveTab] = React.useState("hotel");

  const renderContent = () => {
    switch (activeTab) {
      case "hotel":
        return <Hotel />;
        break;
      case "kereta":
        return <Kereta />;
        break;
      case "pesawat":
        return <Pesawat />;
        break;
      case "topup":
        return <Topup />;
        break;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white overflow-hidden">
        <NavbarBooking activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
