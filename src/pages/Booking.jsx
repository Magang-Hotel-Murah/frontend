import React, { useState } from "react";
import { TabNavigation } from "@common";
import { Content, Create } from "@bookings";
import { Book, PlusCircle } from "lucide-react";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("reservation");

  const tabs = [
    { key: "reservation", label: "List", icon: Book },
    { key: "create", label: "Baru", icon: PlusCircle}
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "reservation":
        return <Content />;
      case "create":
        return <Create />;
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

export default Booking;
