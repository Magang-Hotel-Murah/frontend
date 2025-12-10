import { use, useState } from "react";
import { Pagination } from "@common";
import { Filter, Table } from "@contentroom";
import { paginateData, filterBySearch } from "@utils";
import { useDeleteRoom } from "@hooks/meeting-room/useDeleteRoom";
import { useGetRooms } from '@hooks/meeting-room/useGetRooms';
import { ConfirmationAlert, ToastAlert, AlertStyles } from "@alert";
import { useNavigate } from "react-router-dom";

export const Content = ({ user }) => {
  const { data: rooms = [], isLoading } = useGetRooms();
  const { mutateAsync: deleteRoom } = useDeleteRoom();
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
      showToastNotification("success", "Ruangan berhasil dihapus");
    } catch {
      showToastNotification("error", "Gagal menghapus ruangan");
    } finally {
      setIsDelete(false);
      setShowConfirmDelete(false);
    }
  };

  const showToastNotification = (type, message) => {
    setToastConfig({ type, message });
    setShowToast(true);
  };

  const filteredRooms = filterBySearch(rooms, searchTerm, [
    "name",
    "facilities",
    "capacity",
  ]).filter((rooms) => {
    const matchesType = filterType === "" || rooms.type === filterType;

    return matchesType;
  });

  const { currentData: currentRooms, totalPages } = paginateData(
    filteredRooms,
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
          resultCount={filteredRooms.length}
          totalCount={rooms.length}
        />

        <Table
          rooms={currentRooms}
          loading={isLoading}
          user={user}
          onEdit={(room) => handleEdit("edit", room)}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredRooms.length}
          onPageChange={setCurrentPage}
        />
      </div>

      <ConfirmationAlert
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={() => handleConfirmDelete(selectedRoom?.id)}
        title="Yakin ingin menghapus ruangan"
        message="Ruangan yang dihapus tidak bisa dikembalikan"
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
