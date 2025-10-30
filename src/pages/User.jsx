import React, { useEffect, useState } from "react";
import { TabNavigation } from "@common";
import { Content } from "@users";
import { Users } from "lucide-react";

const User = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("activeTab");
    if(saved === "user") {
      return saved
    }
    return "user";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab])

  const tabs = [
    { key: "user", label: "List", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "user":
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

export default User;