export const appPaths = {
  // PUBLIC
  login: "/login",
  accountVerification: "/account-verification",
  passwordReset: "/reset-request",
  forgotPassword: "/forgot-password",

  // SHOP
  shop: "/shop",
  getShop: (id = ":id") => `/shop/${id}`,
  getRestaurant: (id = ":id") => `/restaurant/${id}`,

  // USER
  profile: "/account",
  shopsProducts: "shops-products",
  myOrders: "my-orders",
  shops: "shops",
  getShops: (id = ":id") => `/shops/${id}`,
  notification: "notification",
  products: "products",
  favorites: "favorites",
  discount: "discount",
  recentlyViewed: "recently-viewed",
  transaction: "transaction-history",

  // RESTAURANT
  restaurant: "/restaurant",
  templates: "/restaurant/templates",
  invoices: "invoices",
  // invoice: "invoices",
  reports: "/restaurant/reports",
  // getInvoice: (id = ":id") => `/${id}`,
  inventory: "/restaurant/inventory",
  createTemplate: "/restaurant/templates/create",
  template: "template",
  orders: "/restaurant/orders",
}
