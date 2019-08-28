const pages = config('pages') // Get Pages from config

//Suscriptions
export default [
  {
    title: 'qsuscription.sidebar.adminGroup',
    icon: 'fas fa-map-marked-alt',
    children: [
      pages.qsuscription.products, // products setup
      pages.qsuscription.features, // features setup
      pages.qsuscription.plans, // plans setup
    ]
  },
]
