import React, { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// components
import AuthLayout from "@/components/layout/auth.layout"
// eslint-disable-next-line import/extensions
import PrivateRoute from "@/components/routes-helpers/private-route"
import ScreenLoader from "@/components/screen.loader"
import { ErrorComponent } from "./components/error-404-component"
import AdminLayout from "@/components/layout/admin.layout"
import RestaurantLayout from "./features/restaurants/layout"
import { appPaths } from "./components/layout/app-paths"
import Inventory from "./features/restaurants/inventory"
// import TemplateForm from "./features/restaurants/template/template.form"
// import ProductSearch from "./features/restaurants/template"
// pages-routes
const Restaurant = lazy(() => import("@/features/restaurants/restaurant"))

const CreateTemplate = lazy(() => import("@/features/restaurants/template/create.template"))
const EditTemplate = lazy(() => import("@/features/restaurants/template/edit.template"))
const OrderForRider = lazy(() => import("@/features/admin/order/orders.component"))
const Products = lazy(() => import("@/features/admin/products/products.components"))
const Transaction = lazy(() => import("@/features/admin/transaction/transaction-history.components"))
const OrderHistory = lazy(() => import("@/features/admin/order/order-history.component"))
const Vendors = lazy(() => import("@/features/admin/shop/shops.component"))
const Vendor = lazy(() => import("@/features/admin/shop/shop.component"))
const Login = lazy(() => import("@/features/auth/login.component"))
const ForgotPassword = lazy(() => import("./features/auth/forgot-password"))
const VendorsProduct = lazy(() => import("@/features/admin/shop/shops.product"))

function App() {
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
          <Route path={appPaths.restaurant} element={<RestaurantLayout />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <Restaurant />
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.inventory}`}
              element={
                <Suspense fallback={false}>
                  <Inventory />
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.createTemplate}`}
              element={
                <Suspense fallback={false}>
                  <CreateTemplate />
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.template}/:id`}
              element={
                <Suspense fallback={false}>
                  <EditTemplate />
                </Suspense>
              }
            />
          </Route>
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
              path={appPaths.transaction}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <Transaction />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path={appPaths.products}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <Products />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path={appPaths.myOrders}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <OrderHistory />
                  </PrivateRoute>
                </Suspense>
              }
            />

            <Route
              path={appPaths.shops}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <Vendors />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.getShops()}`}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <Vendor />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.shopsProducts}/:id`}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <VendorsProduct />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
