const pages = config('pages') // Get Pages from config

//Suscriptions
export default [
  {
    title: 'qsubscription.sidebar.adminGroup',
    icon: 'fas fa-map-marked-alt',
    children: [
      pages.qsubscription.products, // products setup
      //pages.qsubscription.features, // features setup
      //pages.qsubscription.plans, // plans setup
    ]
  },
]
