import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

//components
import AdminLayout from "./components/layout/admin.layout";
import AuthLayout from "./components/layout/auth.layout";
import PrivateRoute from "./components/routes-helpers/privateRoute";
import ScreenLoader from "./components/ui/ScreenLoader";

//pages-routes
const OrderForRider = lazy(() => import("./features/order/orderForRider"));
const Login = lazy(() => import("./features/auth/login"));
const ForgotPassword = lazy(() => import("./features/auth/forgot-password"));
const Register = lazy(() => import("./features/auth/register"));

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<ScreenLoader />}>
                <AuthLayout>
                  <Login />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<ScreenLoader />}>
                <AuthLayout>
                  <Register />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<ScreenLoader />}>
                <AuthLayout>
                  <ForgotPassword />
                </AuthLayout>
              </Suspense>
            }
          />
          <Route path="/check" element={<AdminLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <OrderForRider />
                  </PrivateRoute>
                </Suspense>
              }
            />
            {/* <Route path={appPaths.products} element={<Products />} /> */}
            {/* <Route path={appPaths.transaction} element={<Transaction />} /> */}
            {/* <Route path={appPaths.myOrders} element={<UserOrders />} /> */}
            {/* <Route path={appPaths.favorites} element={<Favorites />} /> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
