import React, { useState } from "react";
import { Table, Filter } from "@contentuser";
import { Update, Detail} from "@users"
import { ConfirmationAlert, ToastAlert, AlertStyles } from "@alert";
import { paginateData, filterBySearch } from "@utils";
import { Pagination } from "@common";
import { useUser } from "@hooks";

const Content = () => {
  const { users, loading, updateUser, toggleUserStatus } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [showConfirmActive, setShowConfirmActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "info", message: "" });
  const [isActive, setIsActive] = useState(false);

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

  const handleSuccess = (updatedUser) => {
    if (modalMode === "edit") {
      updateUser(updatedUser);
      showToastNotification("success", "User berhasil diperbarui!");
      handleCloseModal();
    }
  };

  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    setShowConfirmActive(true);
  };

  const handleConfirmActive = async (id) => {
    setIsActive(true);
    try {
      await toggleUserStatus(id);
      showToastNotification("success", "Status user berhasil diubah!");
    } catch {
      showToastNotification("error", "Gagal mengubah status user");
    } finally {
      setIsActive(false);
      setShowConfirmActive(false);
    }
  };

  const showToastNotification = (type, message) => {
    setToastConfig({ type, message });
    setShowToast(true);
  };

  const filteredUsers = filterBySearch(users, searchTerm, [
    "name",
    "email",
  ]).filter((users) => {
    const matchesRole = filterRole === "" || users.role === filterRole;
    const matchesStatus =
      filterStatus === ""
        ? true
        : filterStatus === "active"
        ? users.deleted_at === null
        : users.deleted_at !== null;

    return matchesRole && matchesStatus;
  });

  const { currentData: currentUsers, totalPages } = paginateData(
    filteredUsers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <AlertStyles />

      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        resultCount={filteredUsers?.length || 0}
        totalCount={users?.length || 0}
      />

      <br />
      <Table
        users={currentUsers}
        onDetail={(user) => handleOpenModal("detail", user)}
        onEdit={(u) => handleOpenModal("edit", u)}
        onToggleStatus={handleToggleStatus}
        loading={loading}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredUsers.length}
      />

      {isModalOpen && selectedUser && (
        <>
          {modalMode === "detail" && (
            <Detail user={selectedUser} onClose={handleCloseModal} />
          )}
          {modalMode === "edit" && (
            <Update
              user={selectedUser}
              onClose={handleCloseModal}
              onSuccess={handleSuccess}
            />
          )}
        </>
      )}

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

export default Content;
