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
import withRoleAccess from "./components/routes-helpers/withRole"
import { Unauthorized } from "./components/unauthorized-page"
import RestaurantSuperAdminLayout from "./features/restaurants/restaurant-superadmin-layout"
import { PrivilegedRoute } from "./components/privileges"
// import TemplateForm from "./features/restaurants/template/template.form"

// pages-routes
const SettingsPage = lazy(() => import("./features/restaurants/settings/settings"))
const AnalyticsPage = lazy(() => import("./features/restaurants/analytics/analytics"))
const UsersPage = lazy(() => import("@/features/restaurants/users/users"))
const TemplatesPage = lazy(() => import("@/features/restaurants/template/templates"))
const InvoicesPage = lazy(() => import("@/features/restaurants/invoice/invoices"))
const InvoicePage = lazy(() => import("@/features/restaurants/invoice/invoice"))
const RestaurantBorad = lazy(() => import("@/features/restaurants/dashboard/dashboard"))
const InventoryPage = lazy(() => import("@/features/restaurants/inventory/inventory"))
const OrdersPage = lazy(() => import("@/features/restaurants/orders/orders"))
const ReportsPage = lazy(() => import("@/features/restaurants/reports/reports"))
const CreateTemplate = lazy(() => import("@/features/restaurants/template/create.template"))
const EditTemplate = lazy(() => import("@/features/restaurants/template/edit-templates"))
const OrderForRiderPage = lazy(() => import("@/features/admin/order/orders.component"))
const ProductsPage = lazy(() => import("@/features/admin/products/products.components"))
const TransactionPage = lazy(() => import("@/features/admin/transaction/transaction-history.components"))
const OrderHistoryPage = lazy(() => import("@/features/admin/order/order-history.component"))
const VendorsPage = lazy(() => import("@/features/admin/shop/shops.component"))
const VendorPage = lazy(() => import("@/features/admin/shop/shop.component"))
const Login = lazy(() => import("@/features/auth/login.component"))
const ForgotPassword = lazy(() => import("./features/auth/forgot-password"))
const VendorsProductPage = lazy(() => import("@/features/admin/shop/shops.product"))
const RestaurantOrdersPage = lazy(() => import("@/features/admin/restaurant-orders/restaurant-orders"))
const RestaurantOrderDetailsPage = lazy(() => import("@/features/admin/restaurant-orders/order-details"))

// Protected pages with user roles
const Templates = withRoleAccess("RESTAURANT")(TemplatesPage)
const Invoices = withRoleAccess("RESTAURANT")(InvoicesPage)
const Invoice = withRoleAccess("RESTAURANT")(InvoicePage)
const RestaurantDashboard = withRoleAccess("RESTAURANT")(RestaurantBorad)
const Inventory = withRoleAccess("RESTAURANT")(InventoryPage)
const Orders = withRoleAccess("RESTAURANT")(OrdersPage)
const Reports = withRoleAccess("RESTAURANT")(ReportsPage)
const Users = withRoleAccess("RESTAURANT")(UsersPage)
const Analytics = withRoleAccess("RESTAURANT")(AnalyticsPage)
const Settings = withRoleAccess("RESTAURANT")(SettingsPage)

const OrderForRider = withRoleAccess("ADMIN")(OrderForRiderPage)
const Products = withRoleAccess("ADMIN")(ProductsPage)
const Transaction = withRoleAccess("ADMIN")(TransactionPage)
const OrderHistory = withRoleAccess("ADMIN")(OrderHistoryPage)
const Vendors = withRoleAccess("ADMIN")(VendorsPage)
const Vendor = withRoleAccess("ADMIN")(VendorPage)
const VendorsProduct = withRoleAccess("ADMIN")(VendorsProductPage)
const RestaurantOrders = withRoleAccess("ADMIN")(RestaurantOrdersPage)
const RestaurantOrderDetails = withRoleAccess("ADMIN")(RestaurantOrderDetailsPage)

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
          <Route path={appPaths.restaurant} element={<RestaurantSuperAdminLayout />}>
            <Route
              index
              element={
                <Suspense fallback={false}>
                  <RestaurantDashboard />
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.templates}/:shopId`}
              element={
                <Suspense fallback={false}>
                  <PrivilegedRoute privileges={["c:order", "d:order", "r:order", "u:order"]}>
                    <Templates />
                  </PrivilegedRoute>
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.editTemplate}`}
              element={
                <Suspense fallback={false}>
                  <PrivilegedRoute privileges={["r:order", "u:order"]}>
                    <EditTemplate />
                  </PrivilegedRoute>
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
              path={`${appPaths.users}`}
              element={
                <Suspense fallback={false}>
                  <PrivilegedRoute privileges={["r:user"]}>
                    <Users />
                  </PrivilegedRoute>
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.analytics}`}
              element={
                <Suspense fallback={false}>
                  <Analytics />
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.settings}`}
              element={
                <Suspense fallback={false}>
                  <Settings />
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
              path={`${appPaths.orders}`}
              element={
                <Suspense fallback={false}>
                  <Orders />
                </Suspense>
              }
            />
            <Route
              path={`${appPaths.reports}`}
              element={
                <Suspense fallback={false}>
                  <Reports />
                </Suspense>
              }
            />

            <Route
              path={appPaths.invoices}
              element={
                <Suspense fallback={false}>
                  <Invoices />
                </Suspense>
              }
            />
            <Route
              path={`/restaurant/template/invoices/:id`}
              element={
                <Suspense fallback={false}>
                  <Invoice />
                </Suspense>
              }
            />
          </Route>

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
              path={appPaths.restaurantOrders}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <RestaurantOrders />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path={`/${appPaths.restaurantOrders}/:id`}
              element={
                <Suspense fallback={<ScreenLoader />}>
                  <PrivateRoute>
                    <RestaurantOrderDetails />
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
          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
