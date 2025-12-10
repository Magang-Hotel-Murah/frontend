import React, { useEffect, useState } from "react";
import { TabNavigation } from "@common";
import { Content, Create } from "@rooms";
import { Book, PlusCircleIcon, Presentation } from "lucide-react";

const Room = ({ user }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("activeTab");

    if (saved === "room") return "room";
    if (saved === "create" && user?.role === "company_admin") return "create";

    return "room";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const tabs =
    user?.role === "company_admin"
      ? [
          { key: "room", label: "List", icon: Presentation },
          { key: "create", label: "Baru", icon: PlusCircleIcon },
        ]
      : [{ key: "room", label: "List", icon: Book}];

  const renderContent = () => {
    switch (activeTab) {
      case "room":
        return <Content user={user} />;
      case "create":
        return user?.role === "company_admin" ? (
          <Create onSuccess={() => setActiveTab("room")} />
        ) : null;
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

        <div className="mt-5">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Room;
