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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-3 pb-3 border-b-2 border-green-100">
        <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Permintaan Tambahan
          </h3>
          <p className="text-xs text-gray-500">
            Dana, konsumsi, dan peralatan yang dibutuhkan
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-5">
        {/* Funds Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-700">Dana Operasional</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseFormInput
              type="number"
              name="funds_amount"
              label="Jumlah Dana"
              placeholder="250000"
              value={formData.request.funds_amount}
              onChange={handleRequestChange}
            />
            <BaseFormInput
              type="text"
              name="funds_reason"
              label="Keperluan Dana"
              placeholder="e.g., Snack & minuman"
              value={formData.request.funds_reason}
              onChange={handleRequestChange}
            />
          </div>
        </div>

        {/* Snacks Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Coffee className="w-4 h-4 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-700">Konsumsi</h4>
          </div>
          
          <BaseFormInput
            type="tags"
            label="Daftar Snack & Minuman"
            placeholder="Tambahkan item konsumsi..."
            tags={formData.request.snacks}
            onAddTag={addSnack}
            onRemoveTag={removeSnack}
            tagInputValue={newSnack}
            onTagInputChange={(e) => setNewSnack(e.target.value)}
          />
        </div>

        {/* Equipment Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Monitor className="w-4 h-4 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-700">Peralatan</h4>
          </div>
          
          <BaseFormInput
            type="tags"
            label="Daftar Peralatan"
            placeholder="Tambahkan peralatan yang dibutuhkan..."
            tags={formData.request.equipment}
            onAddTag={addEquipment}
            onRemoveTag={removeEquipment}
            tagInputValue={newEquipment}
            onTagInputChange={(e) => setNewEquipment(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestForm;