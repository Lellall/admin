export const appPaths = {
  // PUBLIC
  login: '/login',
  accountVerification: '/account-verification',
  passwordReset: '/reset-request',
  forgotPassword: '/forgot-password',

  // SHOP
  shop: '/shop',
  getShop: (id = ':id') => `/shop/${id}`,

  // USER
  profile: '/account',
  myOrders: 'my-orders',
  vendors: 'vendors',
  getVendors: (id = ':id') => `/vendors/${id}`,
  notification: 'notification',
  vendorsProducts: 'vendors-products',
  products: 'products',
  favorites: 'favorites',
  discount: 'discount',
  recentlyViewed: 'recently-viewed',
  transaction: 'transaction-history',
};
