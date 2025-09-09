import React from 'react';
import { Users, Settings, BarChart3 } from 'lucide-react';

const Home = () => {
  const stats = [
    { title: 'Total Pengguna', value: '2,345', change: '+12%', color: 'text-blue-600' },
    { title: 'Revenue', value: 'Rp. 2.000.000,00', change: '+8%', color: 'text-green-600' },
    { title: 'Pesanan', value: '1,234', change: '-2%', color: 'text-red-600' },
    { title: 'Conversion', value: '3.2%', change: '+5%', color: 'text-purple-600' },
  ];

  return (
    <div>
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat Datang Admin</p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'created a new user account', time: '2 hours ago' },
              { user: 'Jane Smith', action: 'updated product inventory', time: '4 hours ago' },
              { user: 'Mike Johnson', action: 'processed 5 orders', time: '6 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Add User', icon: Users, color: 'bg-blue-500' },
              { title: 'View Reports', icon: BarChart3, color: 'bg-green-500' },
              { title: 'Settings', icon: Settings, color: 'bg-purple-500' },
              { title: 'Analytics', icon: BarChart3, color: 'bg-orange-500' },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;