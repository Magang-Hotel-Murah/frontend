import { useEffect, useState } from "react";
import { User, CheckCircle, XCircle } from "lucide-react";
import { Button, Card } from "@ui";
import { LoadingAlert, AlertStyles } from "@alert";
import { formatRoleName, getRoleBadgeColor } from "@utils";
import { useGetUserById } from "@hooks/user/useGetUserById";
import { BaseModal } from "@common";

const Detail = ({ user, onClose }) => {
  const { data: userData, isLoading } = useGetUserById(user?.id);

  if (isLoading || !user) {
    return (
      <>
        <AlertStyles />
        <LoadingAlert
          show={true}
          title="Memuat Data Pengguna..."
          message="Mohon tunggu, kami sedang memuat detail pengguna."
        />
      </>
    );
  }

  const data = userData || user;

  return (
    <>
      <AlertStyles />

      <BaseModal
        isOpen={!!user}
        onClose={onClose}
        title="Detail Pengguna"
        icon={<User className="w-5 h-5" />}
        footer={
          <Button variant="ghost" size="small" onClick={onClose}>
            Tutup
          </Button>
        }
      >
        <div className="p-4">
              {data?.company_id && (
                <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
                      Informasi Perusahaan
                    </p>
                  </div>
                  <p className="text-sm text-amber-900">
                    Company ID:{" "}
                    <span className="font-mono font-semibold">
                      {data?.company_id}
                    </span>
                  </p>
                </Card>
              )}

              <div className="mt-7 mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Nama</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    {data?.name}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="text-sm text-gray-900">
                    {data?.email}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">
                    Verifikasi Email
                  </span>
                  {data?.email_verified_at && (
                    <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-200">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-600">
                    Terverifikasi Sejak
                  </span>
                  {data?.email_verified_at ? (
                    <span className="text-sm text-gray-900">
                      {new Date(data?.email_verified_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  ) : (
                    <span className="text-sm text-red-500 italic">
                      Belum diverifikasi
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role</span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                      data?.role
                    )}`}
                  >
                    {formatRoleName(data?.role)}
                  </span>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>

                  {data?.deleted_at ? (
                    <div className="flex items-center gap-1 text-sm font-semibold text-red-600">
                      <XCircle className="w-4 h-4" />
                      <span>Non-Aktif</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Aktif</span>
                    </div>
                  )}
                </div>
              </div>
        </div>
      </BaseModal>
    </>
  );
};

export default Detail;
