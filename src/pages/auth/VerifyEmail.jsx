import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmail } from "@hooks/auth";

const VerifyEmail = () => {
  const { id, hash } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: verifyEmail } = useVerifyEmail();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Memverifikasi email Anda...");

  useEffect(() => {
    const verify = async () => {
      try {
        const expires = searchParams.get("expires");
        const signature = searchParams.get("signature");

        const response = await verifyEmail({
          id,
          hash,
          expires,
          signature,
        });

        if (response.success) {
          setStatus("success");
          setMessage(response.message || "Email berhasil diverifikasi!");
          
          setTimeout(() => {
            navigate("/login", { 
              state: { message: "Email terverifikasi! Silakan login." } 
            });
          }, 3000);
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          error.message || 
          "Link verifikasi tidak valid atau sudah kadaluarsa."
        );
      }
    };

    verify();
  }, [id, hash, searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Memverifikasi Email
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verifikasi Berhasil!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Anda akan diarahkan ke halaman login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verifikasi Gagal
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;