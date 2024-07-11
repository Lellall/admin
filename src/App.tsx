import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import AdminLayout from "./components/layout/admin.layout";
import AuthLayout from "./components/layout/auth.layout";
import PrivateRoute from "./components/routes-helpers/private-route";
import ScreenLoader from "./components/screen-loader";
import Transaction from "./features/transaction/transaction-history.components";
import Products from "./features/products/products.components";
import { ManageVendors } from "./features/vendors/vendors.component";

//pages-routes
const OrderForRider = lazy(() => import("./features/order/orders.component"));
const Login = lazy(() => import("./features/auth/login.component"));
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
          <Route path="/" element={<AdminLayout />}>
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
            <Route
              path="/transaction-history"
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <Transaction />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path="/products"
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <Products />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path="/my-orders"
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <ManageVendors />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path="/products"
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <Products />
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
