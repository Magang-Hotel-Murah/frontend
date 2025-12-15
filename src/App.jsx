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
  Organization,
  Display,
  Request,
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
  const { data: user, isLoading, isError } = useUser();

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: logout } = useLogout();
  const { mutateAsync: register } = useRegister();
  const { mutateAsync: forgotPassword } = useForgotPassword();

  const isAuthenticated = !!user && !isError;

  const getDefaultRoute = (user) => {
    if (!user) return "/";
    if (user.role === "employee") return "/booking";
    return "/home";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute(user)} replace />
            ) : (
              <LandingPage />
            )
          }
        />

        <Route path="/meeting-display/:companyCode" element={<Display/>} />


        <Route
          path="/activate-account"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute(user)} replace />
            ) : (
              <ActivateAccount />
            )
          }
        />

        <Route
          path="/verify-email/:id/:hash"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute(user)} replace />
            ) : (
              <VerifyEmail />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute(user)} replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute(user)} replace />
            ) : (
              <Register onRegister={register} />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute(user)} replace />
            ) : (
              <ForgotPassword onForgotPassword={forgotPassword} />
            )
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute 
              isAuthenticated={isAuthenticated} 
              user={user}
              allowedRoles={["super_admin", "company_admin", "finance_officer", "support_staff"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/organization"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["company_admin"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Organization />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["finance_officer"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Request />
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
              allowedRoles={["company_admin", "finance_officer"]}
            >
              <MainLayout user={user} onLogout={logout}>
                <Room user={user}/>
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
              allowedRoles={["super_admin", "company_admin", "employee", "finance_officer"]}
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