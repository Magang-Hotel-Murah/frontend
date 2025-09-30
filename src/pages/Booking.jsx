import React, { useState } from "react";
import { TabNavigation } from "@common";
import { Reservation, MeetingRoom } from "@booking";
import { Calendar, Presentation } from "lucide-react";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("reservation");

  const tabs = [
    { key: "reservation", label: "Reservasi", icon: Calendar },
    { key: "meeting-room", label: "Ruang Meeting", icon: Presentation },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "reservation":
        return <Reservation />;
      case "meeting-room":
        return <MeetingRoom />;
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
