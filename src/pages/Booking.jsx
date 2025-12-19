import React, { useEffect, useState } from "react";
import { TabNavigation } from "@common";
import { Content, Create, SearchRoom } from "@bookings";
import { Book, PlusCircle, SearchIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const Booking = ({ user }) => {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("activeTab");

    if (saved === "reservation") return "reservation";
    if (saved === "create") return "create";
    if (saved === "search") return "search";

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

    const handleBookFromSearch = () => {
    setActiveTab("create");
  };

  useEffect(() => {
    if (state?.tab){
      setActiveTab(state.tab);
    }
  }, [state]);

  const tabs = [
    { key: "reservation", label: "List", icon: Book },
    { key: "create", label: "Baru", icon: PlusCircle },
    { key: "search", label: "Cari", icon: SearchIcon },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "reservation":
        return <Content user={user} />;
      case "create":
        return <Create />;
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
