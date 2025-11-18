import React from "react";
import {
  InformationForm,
  ParticipantForm,
  DivisionPositionForm,
  RequestForm,
} from "@contentbooking";
import { Button } from "@ui";

const CreateForm = ({
  formData,
  handleSubmit,
  loading,
  rooms,
  addParticipant,
  removeParticipant,
  newParticipant,
  setNewParticipant,
  users,
  handleInputChange,
  divisions,
  positions,
  toggleDivision,
  togglePosition,
  handleRequestChange,
  addSnack,
  removeSnack,
  newSnack,
  setNewSnack,
  addEquipment,
  removeEquipment,
  newEquipment,
  setNewEquipment,
  onReset,
  errors,
}) => {
  return (
    <div className="mx-auto p-1">

      <div className="space-y-6">
        <InformationForm
          rooms={rooms}
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />

        <ParticipantForm
          addParticipant={addParticipant}
          removeParticipant={removeParticipant}
          newParticipant={newParticipant}
          setNewParticipant={setNewParticipant}
          users={users}
          formData={formData}
          errors={errors}
        />

        <DivisionPositionForm
          divisions={divisions}
          positions={positions}
          toggleDivision={toggleDivision}
          togglePosition={togglePosition}
          handleInputChange={handleInputChange}
          formData={formData}
          errors={errors}
        />

        <RequestForm
          handleRequestChange={handleRequestChange}
          addSnack={addSnack}
          removeSnack={removeSnack}
          newSnack={newSnack}
          setNewSnack={setNewSnack}
          addEquipment={addEquipment}
          removeEquipment={removeEquipment}
          newEquipment={newEquipment}
          setNewEquipment={setNewEquipment}
          formData={formData}
          errors={errors}
        />

        <div className="flex gap-4">
          <Button
            onClick={handleSubmit}
            size="medium"
            type="submit"
            variant="submit"
          >
            {loading ? "Menyimpan..." : "Buat Reservasi"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="medium"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
