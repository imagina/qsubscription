
export default {
  products: {
    permission: null,
    activated: true,
    path: 'subscriptions/products/:slug',
    name: 'products.show',
    page: () => import('@imagina/qsubscription/_layouts/frontend/products/show'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.products',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },

  shoppingCart: {
    permission: null,
    activated: true,
    path: 'subscriptions/shopping-cart/:planId',
    name: 'subscriptions.shopping.cart',
    page: () => import('@imagina/qsubscription/_layouts/frontend/shoppingCart/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.shoppingCart',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  shoppingCartTemplate: {
    permission: null,
    activated: true,
    path: 'subscriptions/shopping-cart-template',
    name: 'subscriptions.shopping.cart.template',
    page: () => import('@imagina/qsubscription/_layouts/frontend/shoppingCart/indexTemplate'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.shoppingCart',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  checkoutTemplate: {
    permission: null,
    activated: true,
    path: 'subscriptions/checkout-template',
    name: 'subscriptions.checkout.template',
    page: () => import('@imagina/qsubscription/_layouts/frontend/checkout/indexTemplate'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.checkout',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  checkout: {
    permission: null,
    activated: true,
    path: 'subscriptions/checkout/:planId/:quantity',
    name: 'subscriptions.checkout',
    page: () => import('@imagina/qsubscription/_layouts/frontend/checkout/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.checkout',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },

}
