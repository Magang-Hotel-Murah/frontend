import { useEffect, useState } from "react";
import { X, User, CheckCircle, XCircle } from "lucide-react";
import { Button, Card } from "@ui";
import { LoadingAlert, AlertStyles } from "@alert";
import { formatRoleName, getRoleBadgeColor } from "@utils";
import { useUser } from "@hooks";

const Detail = ({ user, onClose }) => {
  const { getUserById } = useUser();
  const [userData, setUserData] = useState(null);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);

  useEffect(() => {
    if (!user) return;

    setShowLoadingAlert(true);
    const fetchUser = async () => {
      try {
        const res = await getUserById(user.id);
        setUserData(res.data ?? res);
      } catch (err) {
        console.error("Gagal memuat data user:", err);
      } finally {
        setShowLoadingAlert(false);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <>
      <AlertStyles />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="absolute inset-0 backdrop-blur-xl transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative w-full max-w-2xl shadow-lg max-h-screen overflow-y-auto">
          <Card className="overflow-hidden">
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <h2 className="text-m font-bold text-gray-900">
                    Detail Pengguna
                  </h2>
                </div>
                <Button variant="ghost" size="small" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              {!userData ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                  <p className="mt-4 text-gray-600 text-center">
                    Memuat data user...
                  </p>
                </div>
              ) : (
                <>
                  {userData.company_id && (
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
                          {userData.company_id}
                        </span>
                      </p>
                    </Card>
                  )}

                  <div className="mt-7 mb-3 pb-3 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-600">Nama</span>
                      <span className="text-sm font-medium text-gray-900 text-right">
                        {userData.name}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-600">Email</span>
                      <span className="text-sm text-gray-900">
                        {userData.email}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-600">
                        Verifikasi Email
                      </span>
                      {userData.email_verified_at && (
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
                      {userData.email_verified_at ? (
                        <span className="text-sm text-gray-900">
                          {new Date(
                            userData.email_verified_at
                          ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
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
                          userData.role
                        )}`}
                      >
                        {formatRoleName(userData.role)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>

                      {userData.deleted_at ? (
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
                </>
              )}
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <Button variant="ghost" size="small" onClick={onClose}>
                Tutup
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <LoadingAlert
        show={showLoadingAlert}
        title="Memuat Data..."
        message="Mohon tunggu, kami sedang memuat data pengguna."
      />
    </>
  );
};

export default Detail;
