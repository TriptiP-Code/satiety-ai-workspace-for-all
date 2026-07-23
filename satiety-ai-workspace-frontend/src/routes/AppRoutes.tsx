import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import HomePage from "../pages/HomePage";
import SettingsPage from "../pages/SettingsPage";
import WelcomePage from "../pages/auth/WelcomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route
          path="/welcome"
          element={<WelcomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Main App */}

<Route
  element={
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="/"
    element={<HomePage />}
  />

  <Route
    path="/settings"
    element={<SettingsPage />}
  />
</Route>

        {/* Anything else */}

        <Route
          path="*"
          element={
            <Navigate
              to="/welcome"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;