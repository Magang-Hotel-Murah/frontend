import React, { useState } from "react";
import { NavbarMeeting } from "@components";
import { Reservation, MeetingRoom } from "@booking";

const Booking = () => {
  const [activeTab, setActiveTab] = React.useState("reservation");

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
        <NavbarMeeting activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Booking;
