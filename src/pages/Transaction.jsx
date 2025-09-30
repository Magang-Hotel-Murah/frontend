import React, { useState } from "react";
import { TabNavigation } from "@common";
import { Hospitality, Kereta, Pesawat, Topup } from "@transaksi";
import { Hotel, Plane, Train, CreditCard } from 'lucide-react';


const Transactions = () => {
  const [activeTab, setActiveTab] = React.useState("hotel");

  const tabs = [
    { key: "hotel", label: "Hotel", icon: Hotel },
    { key: "pesawat", label: "Tiket Pesawat", icon: Plane },
    { key: "kereta", label: "Tiket Kereta", icon: Train },
    { key: "topup", label: "PPOB", icon: CreditCard },
  ];
  const renderContent = () => {
    switch (activeTab) {
      case "hotel":
        return <Hospitality />;
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
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
        />
        <div className="mt-5">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
