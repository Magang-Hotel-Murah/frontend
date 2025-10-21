import React, { useState } from "react";
import { TabNavigation } from "@common";
import { Content } from "@bookings";
import { Building } from "lucide-react";

const Company = () => {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    { key: "company", label: "Perusaan", icon: Building },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "company":
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

export default Company;
