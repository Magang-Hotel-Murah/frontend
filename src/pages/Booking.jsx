import React, { useEffect, useState } from "react";
import { TabNavigation } from "@common";
import { Content, Create } from "@bookings";
import { Book, PlusCircle } from "lucide-react";

const Booking = ({ user }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("activeTab");
    if (saved === "reservation" || saved === "create") {
      return saved;
    }
    return "reservation";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const tabs =
    user?.role === "employee"
      ? [
          { key: "reservation", label: "List", icon: Book },
          { key: "create", label: "Baru", icon: PlusCircle },
        ]
      : [
          { key: "reservation", label: "List", icon: Book },
        ];

  const renderContent = () => {
    switch (activeTab) {
      case "reservation":
        return <Content user={user} />;
      case "create":
        return user?.role === "employee" ? <Create /> : null;
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

export default Booking;
