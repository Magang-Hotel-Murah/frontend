import React, { useState } from "react";
import { TabNavigation } from "@common";
import { Content } from "@rooms";
import { Presentation } from "lucide-react";

const Room = () => {
  const [activeTab, setActiveTab] = useState("room");

  const tabs = [
    { key: "room", label: "Ruangan", icon: Presentation },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "room":
        return <Content />;
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

export default Room;
