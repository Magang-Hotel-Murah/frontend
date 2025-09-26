import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Eye,
  Filter,
  XCircleIcon,
  ActivityIcon,
} from "lucide-react";
import axios from "axios";
import { Update, View } from "@users";
import { useNavigate } from "react-router-dom";
import { ConfirmationAlert, ToastAlert, AlertStyles } from "@alert";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [showConfirmActive, setShowConfirmActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "info", message: "" });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users?with_deleted=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Gagal Menampilkan Pengguna Hotel Murah", error);
    }
  };

  const handleOpenModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // PERBAIKAN 3: Perbaiki handleSuccess untuk update data yang benar
  const handleSuccess = (updatedUser) => {
    if (modalMode === "edit") {
      setUsers((prevUsers) =>
        prevUsers.map((user) => 
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      // Tampilkan toast notification
      showToastNotification("success", "User berhasil diperbarui!");
    }
  };

  const handleActiveClick = () => {
    setShowConfirmActive(true);
  };

  const handleConfirmActive = async (id) => {
    setIsActive(true);

    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // PERBAIKAN 4: Update state users dengan benar
        setUsers((prevUsers) => 
          prevUsers.map((user) => 
            user.id === id 
              ? { ...user, deleted_at: user.deleted_at ? null : new Date().toISOString() }
              : user
          )
        );
        
        setShowConfirmActive(false);
        setIsActive(false);
        showToastNotification("success", "Status user berhasil diubah!");

      } catch (error) {
        setIsActive(false);
        setShowConfirmActive(false);
        showToastNotification(
          "error",
          "Gagal mengubah status user. Silahkan coba lagi."
        );
      }
    }, 1500);
  };

  const showToastNotification = (type, message) => {
    setToastConfig({ type, message });
    setShowToast(true);
  };

  // PERBAIKAN 5: Perbaiki filter status
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "" || user.role === filterRole;
    
    const matchesStatus = (() => {
      if (filterStatus === "") return true;
      if (filterStatus === "active") return user.deleted_at === null;
      if (filterStatus === "non-active") return user.deleted_at !== null;
      return true;
    })();

    return matchesSearch && matchesRole && matchesStatus;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "user":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (deleted_at) => {
    if (deleted_at === null) {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <>
      <AlertStyles />
      <div className="space-y-6">
        <div className="flex justify-between items-center"></div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Semua Status</option>
              <option value="active">Active</option>
              <option value="non-active">Inactive</option>
            </select>
            <div className="flex items-center text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              {filteredUsers.length} dari {users.length} users
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Dibuat
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.deleted_at
                        )}`}
                      >
                        {user.deleted_at === null ? "Active" : "Non-active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal("view", user)}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal("edit", user)}
                          className="text-primary-500 hover:text-primary-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            handleActiveClick(true);
                          }}
                          className={`p-1 rounded ${
                            user.deleted_at === null
                              ? "text-green-600 hover:text-green-900"
                              : "text-red-600 hover:text-red-900"
                          }`}
                          title={
                            user.deleted_at === null ? "Active" : "Nonaktif"
                          }
                        >
                          {user.deleted_at === null ? (
                            <ActivityIcon className="w-4 h-4" />
                          ) : (
                            <XCircleIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Menampilkan {currentPage} dari {totalPages}
                </div>
                <div className="flex gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 text-sm border rounded-md ${
                        currentPage === i + 1
                          ? "bg-primary-600 text-white border-primary-600"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {isModalOpen && selectedUser && (
          <div>
            {modalMode === "edit" ? (
              <Update
                user={selectedUser}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
              />
            ) : (
              <View user={selectedUser} onClose={handleCloseModal} />
            )}
          </div>
        )}
      </div>

      <ConfirmationAlert
        show={showConfirmActive}
        onClose={() => setShowConfirmActive(false)}
        onConfirm={() => handleConfirmActive(selectedUser?.id)}
        title={
          selectedUser?.deleted_at === null
            ? "Yakin ingin menonaktifkan user?"
            : "Yakin ingin mengaktifkan user?"
        }
        message={
          selectedUser?.deleted_at === null
            ? "User akan dinonaktifkan untuk sementara!"
            : "User akan diaktifkan kembali!"
        }
        confirmText={
          selectedUser?.deleted_at === null ? "Ya, Nonaktifkan" : "Ya, Aktifkan"
        }
        cancelText="Batal"
        confirmColor={selectedUser?.deleted_at === null ? "red" : "green"}
        isLoading={isActive}
      />

      <ToastAlert
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastConfig.message}
        type={toastConfig.type}
        position="top-right"
        duration={3000}
      />
    </>
  );
};

export default Users;