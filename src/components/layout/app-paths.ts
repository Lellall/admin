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
  restaurantOrders: "restaurant-orders",

  // RESTAURANT
  restaurant: "/restaurant",
  templates: "/restaurant/templates",
  invoices: "templates/invoices",
  users: "/restaurant/users",
  analytics: "/restaurant/analytics",
  settings: "/restaurant/setting",

  // invoice: "invoices",
  reports: "/restaurant/templates/reports",
  // getInvoice: (id = ":id") => `/${id}`,
  inventory: "/restaurant/templates/83c04b97-0635-4c61-90e3-0f780716f0cd/inventory",
  createTemplate: "/restaurant/templates/create",
  // templates/:shopId/id/:templateId
  editTemplate: "templates/:shopId/id/:templateId",
  template: "template",
  orders: "/restaurant/orders",
}
