//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {

  products: {
    permission: null,
    activated: true,
    path: '/suscriptions/products/index',
    name: 'qsubscription.admin.products',
    layout: require('@imagina/qsubscription/_layouts/admin/products/index').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminProducts',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  }

}
