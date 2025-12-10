import React, { useEffect, useState } from "react";
import { TabNavigation } from "@common";
import { Content } from "@requests";
import { GitPullRequestArrow } from "lucide-react";

const Request = ({ user }) => {
  const [activeTab, setActiveTab] = useState("request");

  const tabs =
    user?.role === "finance_officer"
      ? [{ key: "request", label: "List", icon: GitPullRequestArrow }]
      : [];

  const renderContent = () => {
    if (activeTab === "request") return <Content />;
    return null;
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
      </div>

      <div className="mt-5">
        {renderContent()}
      </div>
    </div>
  );
};

export default Request;
