const pages = config('pages') // Get Pages from config

//Suscriptions
export default [
   {
      title: 'qsubscription.sidebar.adminGroup',
      icon: 'fas fa-file-invoice',
      children: [
         pages.qsubscription.products, // products setup
         //pages.qsubscription.features, // features setup
         //pages.qsubscription.plans, // plans setup
         pages.qsubscription.subscriptions,
         pages.qsubscription.paymentMethods
      ]
   },
]
