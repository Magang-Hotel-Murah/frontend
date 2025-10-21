import React, { useState } from "react";
import { TabNavigation } from "@common";
import { Content } from "@invite";
import { UserPlus } from "lucide-react";

const InviteUser = () => {
  const [activeTab, setActiveTab] = useState("invite-user");

  const tabs = [
    { key: "invite-user", label: "Undang", icon: UserPlus },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "invite-user":
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

export default InviteUser;
