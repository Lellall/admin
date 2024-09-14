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
  restaurant: "/restaurant",
  inventory: "/restaurant/inventory",
  createTemplate: "create",
  template: "template",
  notification: "notification",
  products: "products",
  favorites: "favorites",
  discount: "discount",
  recentlyViewed: "recently-viewed",
  transaction: "transaction-history",
}
