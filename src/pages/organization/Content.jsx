import { useState } from "react";
import { Pagination } from "@common";
import { Filter, Table } from "@contentorganization";
import { paginateData, filterBySearch } from "@utils";
import { useGetDivisions, useDeleteDivision } from "@hooks/division";
import { ConfirmationAlert, ToastAlert, AlertStyles } from "@alert";
import { useNavigate } from "react-router-dom";

export const Content = () => {
  const { data: divisions = [], isLoading } = useGetDivisions();
  const { mutateAsync: deleteRoom } = useDeleteDivision();
  const navigate = useNavigate("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "info", message: "" });
  const [isDelete, setIsDelete] = useState(false);

  const handleEdit = (mode, room = null) => {
    navigate(`/room/edit/${room.id}`);
  };

  const handleDelete = (room) => {
    setSelectedRoom(room);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async (id) => {
    setIsDelete(true);
    try {
      await deleteRoom(id);
      showToastNotification("success", "Divisi berhasil dihapus");
    } catch {
      showToastNotification("error", "Gagal menghapus divisi");
    } finally {
      setIsDelete(false);
      setShowConfirmDelete(false);
    }
  };

  const showToastNotification = (type, message) => {
    setToastConfig({ type, message });
    setShowToast(true);
  };

  const filteredDivisions = filterBySearch(divisions, searchTerm, [
    "name",
  ]).filter((divisions) => {
    const matchesType = filterType === "" || divisions.type === filterType;

    return matchesType;
  });

  const { currentData: currentDivisions, totalPages } = paginateData(
    filteredDivisions,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <AlertStyles />
      <div className="space-y-6">
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilterType={setFilterType}
          resultCount={filteredDivisions.length}
          totalCount={divisions.length}
        />

        <Table
          divisions={currentDivisions}
          loading={isLoading}
          onEdit={(organization) => handleEdit("edit", organization)}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredDivisions.length}
          onPageChange={setCurrentPage}
        />
      </div>

      <ConfirmationAlert
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={() => handleConfirmDelete(selectedRoom?.id)}
        title="Yakin ingin menghapus divisi"
        message="Divisi yang dihapus tidak bisa dikembalikan"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isLoading={isDelete}
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
