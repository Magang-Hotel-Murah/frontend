import React, { useEffect, useState } from "react";
import { TabNavigation } from "@common";
import  Content from "./organization/Content";
import  Create  from './organization/Create';
import { Cast, PlusCircleIcon } from "lucide-react";

const Organization = () => {
  const [activeTab, setActiveTab] = useState(() => {
      const saved = localStorage.getItem("activeTab");
      if(saved === "organization" || saved === "create") {
        return saved;
      }
      return "organization";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const tabs = [
    { key: "organization", label: "List", icon: Cast },
    { key: "create", label: "Baru", icon: PlusCircleIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "organization":
        return <Content />;
      case "create":
        return <Create onSuccess={() => setActiveTab("organization")}/>;
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

export default Organization;
