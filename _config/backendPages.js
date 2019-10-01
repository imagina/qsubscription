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
    name: 'qsubscription.admin.products.index',
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
  productsUpdate: {
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
  plans: {
    permission: 'suscriptions.plans.manage',
    activated: true,
    path: '/suscriptions/plans/index/:id',
    name: 'qsubscription.admin.plans.index',
    layout: require('@imagina/qsubscription/_layouts/admin/plans/index').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminPlans',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },
    plansCreate: {
    permission: 'suscriptions.plans.create',
    activated: true,
    path: '/suscriptions/plans/create',
    name: 'qsubscription.admin.plans.create',
    layout: require('@imagina/qsubscription/_layouts/admin/plans/form').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminPlansCreate',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },
  plansUpdate: {
    permission: 'suscriptions.plans.edit',
    activated: true,
    path: '/suscriptions/plans/:id',
    name: 'qsubscription.admin.plans.edit',
    layout: require('@imagina/qsubscription/_layouts/admin/plans/form').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminPlansUpdate',
    icon: 'fas fa-map-marked-alt',
    middleware: [auth,access]
  },
  features: {
    permission: 'suscriptions.features.manage',
    activated: true,
    path: '/suscriptions/features/index/:id',
    name: 'qsubscription.admin.features.index',
    layout: require('@imagina/qsubscription/_layouts/admin/features/index').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminFeatures',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },
    featuresCreate: {
    permission: 'suscriptions.features.create',
    activated: true,
    path: '/suscriptions/features/create',
    name: 'qsubscription.admin.features.create',
    layout: require('@imagina/qsubscription/_layouts/admin/features/form').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminFeaturesCreate',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },
  featuresUpdate: {
    permission: 'suscriptions.features.edit',
    activated: true,
    path: '/suscriptions/features/:id',
    name: 'qsubscription.admin.features.edit',
    layout: require('@imagina/qsubscription/_layouts/admin/features/form').default,
    containerLayout: master,
    title: 'qsubscription.sidebar.adminFeaturesUpdate',
    icon: 'fas fa-map-marked-alt',
    middleware: [auth,access]
  },

}
