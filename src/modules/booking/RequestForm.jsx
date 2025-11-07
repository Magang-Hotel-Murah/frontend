import { BaseFormInput } from "@common";
import { Users, DollarSign, Coffee, Monitor, X, Plus } from "lucide-react";


const RequestForm = ({
  handleRequestChange,
  addSnack,
  removeSnack,
  newSnack,
  setNewSnack,
  addEquipment,
  removeEquipment,
  newEquipment,
  setNewEquipment,
  formData,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center gap-2">
        <DollarSign className="w-5 h-5" /> Request
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseFormInput
          type="number"
          name="funds_amount"
          label="Funds Amount"
          placeholder="250000"
          value={formData.request.funds_amount}
          onChange={handleRequestChange}
        />
        <BaseFormInput
          type="text"
          name="funds_reason"
          label="Funds Reason"
          placeholder="Snack & minuman"
          value={formData.request.funds_reason}
          onChange={handleRequestChange}
        />
      </div>

      <BaseFormInput
        type="tags"
        label={
          <span className="flex items-center gap-2">
            <Coffee className="w-4 h-4" /> Snacks
          </span>
        }
        placeholder="Add snack item"
        tags={formData.request.snacks}
        onAddTag={addSnack}
        onRemoveTag={removeSnack}
        tagInputValue={newSnack}
        onTagInputChange={(e) => setNewSnack(e.target.value)}
      />

      <BaseFormInput
        type="tags"
        label={
          <span className="flex items-center gap-2">
            <Monitor className="w-4 h-4" /> Equipment
          </span>
        }
        placeholder="Add equipment"
        tags={formData.request.equipment}
        onAddTag={addEquipment}
        onRemoveTag={removeEquipment}
        tagInputValue={newEquipment}
        onTagInputChange={(e) => setNewEquipment(e.target.value)}
      />
    </div>
  );
};

export default RequestForm;
