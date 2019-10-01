//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  products: {
    permission: null,
    activated: true,
    path: 'subscriptions/products/:id',
    name: 'products.show',
    layout: require('@imagina/qsubscription/_layouts/frontend/products/show').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.products',
    icon: 'fas fa-layer-group',
    // middleware: [auth,access]
  },

}
