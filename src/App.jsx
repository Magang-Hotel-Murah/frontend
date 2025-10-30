import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "@layouts";
import "./index.css";
import {
  Home,
  User,
  Setting,
  Booking,
  LandingPage,
  InviteUser,
  Room,
} from "@pages";
import {
  Login,
  Register,
  ForgotPassword,
  ActivateAccount,
  VerifyEmail,
} from "@auth";
import {
  useUser,
  useLogin,
  useLogout,
  useRegister,
  useForgotPassword,
} from "@hooks/auth";
import { Update } from "@rooms";
import { ProtectedRoute } from "@components/layout";

const App = () => {
  const { data: user } = useUser();

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: logout } = useLogout();
  const { mutateAsync: register } = useRegister();
  const { mutateAsync: forgotPassword } = useForgotPassword();

  const isAuthenticated = !!user;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />
          }
        />

        <Route
          path="/activate-account"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <ActivateAccount />
            )
          }
        />

        <Route
          path="/verify-email/:id/:hash"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <VerifyEmail />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Register onRegister={register} />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <ForgotPassword onForgotPassword={forgotPassword} />
            )
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <MainLayout user={user} onLogout={logout}>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/room"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["company_admin"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Room />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/room/edit/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["company_admin"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Update />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["super_admin", "company_admin", "employee"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Booking user={user} />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/invite-user"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["company_admin"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <InviteUser />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["super_admin", "company_admin"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <User />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={[
                "super_admin",
                "company_admin",
                "finance_officer",
                "employee",
                "support_staff",
              ]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Setting />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
