export default {

  products: {
    permission: 'subscriptions.products.manage',
    activated: true,
    path: '/subscriptions/products/index',
    name: 'qsubscription.admin.products.index',
    page: () => import('@imagina/qsubscription/_layouts/admin/products/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminProducts',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
    productsCreate: {
    permission: 'subscriptions.products.create',
    activated: true,
    path: '/subscriptions/products/create',
    name: 'qsubscription.admin.products.create',
    page: () => import('@imagina/qsubscription/_layouts/admin/products/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminProductsCreate',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
  productsUpdate: {
    permission: 'subscriptions.products.edit',
    activated: true,
    path: '/subscriptions/products/:id',
    name: 'qsubscription.admin.products.edit',
    page: () => import('@imagina/qsubscription/_layouts/admin/products/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminProductsUpdate',
    icon: 'fas fa-map-marked-alt',
    authenticated: true
  },
  plans: {
    permission: 'subscriptions.plans.manage',
    activated: true,
    path: '/subscriptions/products/:id/plans/index',
    name: 'qsubscription.admin.plans.index',
    page: () => import('@imagina/qsubscription/_layouts/admin/plans/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminPlans',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
    plansCreate: {
    permission: 'subscriptions.plans.create',
    activated: true,
    path: '/subscriptions/products/:productId/plans/create',
    name: 'qsubscription.admin.plans.create',
    page: () => import('@imagina/qsubscription/_layouts/admin/plans/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminPlansCreate',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
  plansUpdate: {
    permission: 'subscriptions.plans.edit',
    activated: true,
    path: '/subscriptions/products/:productId/plans/:id',
    name: 'qsubscription.admin.plans.edit',
    page: () => import('@imagina/qsubscription/_layouts/admin/plans/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminPlansUpdate',
    icon: 'fas fa-map-marked-alt',
    authenticated: true
  },
  features: {
    permission: 'subscriptions.features.manage',
    activated: true,
    path: '/subscriptions/products/:id/features/index',
    name: 'qsubscription.admin.features.index',
    page: () => import('@imagina/qsubscription/_layouts/admin/features/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminFeatures',
    icon: 'fas fa-layer-group',
    authenticated: true
  },
  subscriptions:{
    permission: 'subscriptions.subscriptions.index',
    activated: true,
    path: '/subscriptions/subscription',
    name: 'qsubscription.admin.subscription.index',
    page: () => import('@imagina/qsubscription/_layouts/admin/subscriptions/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminSubscription',
    icon: 'fas fa-file-invoice',
    authenticated: true
  },
  subscriptionsUpdate:{
    permission: 'subscriptions.subscriptions.edit',
    activated: true,
    path: '/subscriptions/subscription/:id',
    name: 'qsubscription.admin.subscription.edit',
    page: () => import('@imagina/qsubscription/_layouts/admin/subscriptions/form'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminSubscription',
    icon: 'fas fa-file-invoice',
    authenticated: true
  },
  paymentMethods: {
    permission: 'subscriptions.paymentmethods.manage',
    activated: true,
    path: '/subscriptions/payment-methods',
    name: 'qsubscription.admin.payment.methods',
    page: () => import('@imagina/qsubscription/_layouts/admin/paymentMethods/index'),
    layout: () => import('src/layouts/master'),
    title: 'qsubscription.sidebar.adminPaymentMethods',
    icon: 'fas fa-money-bill-wave',
    authenticated: true,
  },
}
