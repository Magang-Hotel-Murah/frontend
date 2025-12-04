import { Card } from "@ui";
const StatCard = ({ title, value, icon: Icon, color = "blue", isLoading }) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    indigo: "bg-indigo-500",
  };

  return (
    <Card>
      <Card.Body className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          )}
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;