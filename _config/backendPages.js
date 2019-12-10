export default {

  products: {
    permission: 'suscriptions.products.manage',
    activated: true,
    path: '/suscriptions/products/index',
    name: 'qsubscription.admin.products.index',
    page: () => import('@imagina/qsubscription/_layouts/admin/products/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminProducts',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
    productsCreate: {
    permission: 'suscriptions.products.create',
    activated: true,
    path: '/suscriptions/products/create',
    name: 'qsubscription.admin.products.create',
    page: () => import('@imagina/qsubscription/_layouts/admin/products/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminProductsCreate',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
  productsUpdate: {
    permission: 'suscriptions.products.edit',
    activated: true,
    path: '/suscriptions/products/:id',
    name: 'qsubscription.admin.products.edit',
    page: () => import('@imagina/qsubscription/_layouts/admin/products/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminProductsUpdate',
    icon: 'fas fa-map-marked-alt',
    authenticated: true
  },
  plans: {
    permission: 'suscriptions.plans.manage',
    activated: true,
    path: '/suscriptions/plans/index/:id',
    name: 'qsubscription.admin.plans.index',
    page: () => import('@imagina/qsubscription/_layouts/admin/plans/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminPlans',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
    plansCreate: {
    permission: 'suscriptions.plans.create',
    activated: true,
    path: '/suscriptions/plans/create/:productId',
    name: 'qsubscription.admin.plans.create',
    page: () => import('@imagina/qsubscription/_layouts/admin/plans/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminPlansCreate',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
  plansUpdate: {
    permission: 'suscriptions.plans.edit',
    activated: true,
    path: '/suscriptions/plans/:id',
    name: 'qsubscription.admin.plans.edit',
    page: () => import('@imagina/qsubscription/_layouts/admin/plans/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminPlansUpdate',
    icon: 'fas fa-map-marked-alt',
    authenticated: true
  },
  features: {
    permission: 'suscriptions.features.manage',
    activated: true,
    path: '/suscriptions/features/index/:id',
    name: 'qsubscription.admin.features.index',
    page: () => import('@imagina/qsubscription/_layouts/admin/features/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminFeatures',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
    featuresCreate: {
    permission: 'suscriptions.features.create',
    activated: true,
    path: '/suscriptions/features/create',
    name: 'qsubscription.admin.features.create',
    page: () => import('@imagina/qsubscription/_layouts/admin/features/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminFeaturesCreate',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
  featuresUpdate: {
    permission: 'suscriptions.features.edit',
    activated: true,
    path: '/suscriptions/features/:id',
    name: 'qsubscription.admin.features.edit',
    page: () => import('@imagina/qsubscription/_layouts/admin/features/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminFeaturesUpdate',
    icon: 'fas fa-map-marked-alt',
    authenticated: true
  },

}
