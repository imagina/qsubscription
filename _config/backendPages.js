//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {

  categories: {
    permission: 'suscriptions.products.manage',
    activated: true,
    path: '/suscriptions/products/index',
    name: 'qsuscription.admin.products',
    layout: require('@imagina/qsuscription/_layouts/admin/products/index').default,
    containerLayout: master,
    title: 'qsuscription.sidebar.adminProducts',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  }

}
