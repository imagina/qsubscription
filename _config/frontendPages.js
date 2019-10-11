//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  products: {
    permission: null,
    activated: true,
    path: 'subscriptions/products/:slug',
    name: 'products.show',
    layout: require('@imagina/qsubscription/_layouts/frontend/products/show').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.products',
    icon: 'fas fa-layer-group',
    // middleware: [auth,access]
  },

  shoppingCart: {
    permission: null,
    activated: true,
    path: 'subscriptions/shopping-cart',
    name: 'subscriptions.shopping.cart',
    layout: require('@imagina/qsubscription/_layouts/frontend/shoppingCart/index').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.shoppingCart',
    icon: 'fas fa-layer-group',
    // middleware: [auth,access]
  },
  shoppingCartTemplate: {
    permission: null,
    activated: true,
    path: 'subscriptions/shopping-cart-template',
    name: 'subscriptions.shopping.cart.template',
    layout: require('@imagina/qsubscription/_layouts/frontend/shoppingCart/indexTemplate').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.shoppingCart',
    icon: 'fas fa-layer-group',
    // middleware: [auth,access]
  },
  checkoutTemplate: {
    permission: null,
    activated: true,
    path: 'subscriptions/checkout-template',
    name: 'subscriptions.checkout.template',
    layout: require('@imagina/qsubscription/_layouts/frontend/checkout/indexTemplate').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.checkout',
    icon: 'fas fa-layer-group',
    // middleware: [auth,access]
  },

}
