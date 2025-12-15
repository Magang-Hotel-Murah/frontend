import React, { useEffect, useState } from "react";
import { TabNavigation } from "@common";
import { Content, Create, SearchRoom } from "@bookings";
import { Book, GitPullRequest, PlusCircle, SearchIcon } from "lucide-react";

const Booking = ({ user }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("activeTab");

    if (saved === "reservation") return "reservation";
    if (saved === "create") return "create";
    if (saved === "request" && user?.role === "employee") return "request";
    if (saved === "search" && user?.role === "employee") return "search";

    return "reservation";
  });

  const [searchState, setSearchState] = useState({
    searchParams: {
      date: '',
      startTime: '',
      endTime: '',
      participants_count: '',
      facilities: []
    },
    searchResults: [],
    message: ''
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const tabs =
    user?.role === "employee"
      ? [
          { key: "reservation", label: "List", icon: Book },
          { key: "create", label: "Baru", icon: PlusCircle },
          { key: "request", label: "Permintaan", icon: GitPullRequest },
          { key: "search", label: "Cari", icon: SearchIcon },
        ]
      : [
          { key: "reservation", label: "List", icon: Book },
          { key: "create", label: "Baru", icon: PlusCircle },
        ];

  const handleBookFromSearch = () => {
    setActiveTab("create");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "reservation":
        return <Content user={user} />;
      case "create":
        return user?.role === "employee" ? <Create /> : null;
      case "search":
        return (
          <SearchRoom
            state={searchState}
            setState={setSearchState}
            onBookRoom={handleBookFromSearch}
          />
        );      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white overflow-visible">
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
