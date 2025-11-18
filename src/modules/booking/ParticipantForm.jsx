import React from "react";
import { Users, X, Plus, User, Building2, Briefcase, Mail, Phone } from "lucide-react";
import { SearchableDropdown } from "@common";

const ParticipantForm = ({
  addParticipant,
  removeParticipant,
  newParticipant,
  setNewParticipant,
  formData,
  errors,
  users,
}) => {
  const employeeCount = formData.participants?.filter(p => p.user_id).length || 0;
  const guestCount = formData.participants?.filter(p => !p.user_id).length || 0;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center gap-2">
        <Users className="w-5 h-5" /> Peserta
      </h3>

      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setNewParticipant((prev) => ({ ...prev, type: "user" }))
            }
            className={`px-4 py-2 rounded-lg transition ${
              newParticipant.type === "user"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Karyawan
          </button>
          <button
            type="button"
            onClick={() =>
              setNewParticipant((prev) => ({ ...prev, type: "guest" }))
            }
            className={`px-4 py-2 rounded-lg transition ${
              newParticipant.type === "guest"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Tamu
          </button>
        </div>

        {newParticipant.type === "user" ? (
          <div className="flex gap-2">
            <SearchableDropdown
              users={users}
              value={newParticipant.user_id}
              onChange={(userId) =>
                setNewParticipant((prev) => ({
                  ...prev,
                  user_id: userId,
                }))
              }
              placeholder="Pilih Karyawan"
            />
            <button
              type="button"
              onClick={addParticipant}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={newParticipant.name || ""}
              onChange={(e) =>
                setNewParticipant((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newParticipant.email || ""}
              onChange={(e) =>
                setNewParticipant((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="Nomor WhatsApp"
              value={newParticipant.whatsapp_number || ""}
              onChange={(e) =>
                setNewParticipant((prev) => ({
                  ...prev,
                  whatsapp_number: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={addParticipant}
              className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Tambahkan Peserta
            </button>
          </div>
        )}
      </div>

      {/* Participant List */}
      {formData.participants && formData.participants.length > 0 && (
        <div className="space-y-3">
          {/* Summary Header */}
          <div className="flex items-center justify-between px-1">
            <h4 className="text-sm font-medium text-gray-700">Daftar Peserta</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{employeeCount} Karyawan</span>
              <span>•</span>
              <span>{guestCount} Tamu</span>
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-full font-semibold">
                {formData.participants.length} Total
              </span>
            </div>
          </div>

          {/* Participant Cards */}
          <div className="space-y-2">
            {formData.participants.map((p, idx) => {
              const user = users.find((u) => u.id === p.user_id);
              const isEmployee = p.user_id && user;

              return (
                <div
                  key={idx}
                  className={`
                    group relative flex items-start gap-3 p-3 rounded-lg border-l-4 transition-all
                    ${isEmployee 
                      ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >

                  <div className="flex-1 min-w-0">
                    {isEmployee ? (
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {user.division}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            {user.position}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium text-gray-900">{p.name}</div>
                        <div className="space-y-0.5 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Mail className="w-3 h-3" />
                            {p.email}
                          </div>
                          {p.whatsapp_number && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Phone className="w-3 h-3" />
                              {p.whatsapp_number}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeParticipant(idx)}
                    className="
                      flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                      text-gray-400 hover:text-red-600 hover:bg-red-100
                      transition-all opacity-0 group-hover:opacity-100
                    "
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantForm;