//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {

  products: {
    permission: 'suscriptions.products.manage',
    activated: true,
    path: '/suscriptions/products/index',
    name: 'qsubscription.admin.products',
    layout: require('@imagina/qsubscription/_layouts/admin/products/index').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminProducts',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },
    productsCreate: {
    permission: 'suscriptions.products.create',
    activated: true,
    path: '/suscriptions/products/create',
    name: 'qsubscription.admin.products.create',
    layout: require('@imagina/qsubscription/_layouts/admin/products/form').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminProductsCreate',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },
  placesUpdate: {
    permission: 'suscriptions.products.edit',
    activated: true,
    path: '/suscriptions/products/:id',
    name: 'qsubscription.admin.products.edit',
    layout: require('@imagina/qsubscription/_layouts/admin/products/form').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminProductsUpdate',
    icon: 'fas fa-map-marked-alt',
    middleware: [auth,access]
  },

}
