<template></template>
<script>
  //Component
  import crud from '@imagina/qcrud/_components/crud'

  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qsubscription.products',
          permission: 'subscriptions.products',
          create: {
            title: this.$tr('qsubscription.layout.newProduct'),
             to : {name : 'qsubscription.admin.products.create', params : {}, query : {}}
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'rigth'},
              {name: 'slug', label: this.$tr('ui.form.slug'), field: 'slug', align: 'rigth'},
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {},
            actions : [
              {
                icon : 'fas fa-location-arrow',
                color : 'warning',
                route : 'qsubscription.admin.plans.index',
                tooltip:this.$tr('qsubscription.sidebar.adminPlans')
              },
              {
                icon : 'fas fa-stream',
                color : 'info',
                route : 'qsubscription.admin.features.index',
                tooltip:this.$tr('qsubscription.sidebar.adminFeatures')
              },
            ]
          },
          update: {
            title: this.$tr('qsubscription.layout.updateProduct'),
            to: 'qsubscription.admin.products.edit',
            requestParams: {}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            name: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props:{
                label: this.$tr('ui.form.name'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props:{
                label: this.$tr('ui.form.slug'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            description: {
              value: '',
              type: 'html',
              isRequired: false,
              isTranslatable: true,
              props:{
                label: this.$tr('ui.form.description'),
              }
            },

          },
          formRight: {

            status : {
              value: '1',
              type: 'select',
              props:{
                label: `${this.$tr('ui.form.status')}:`,
                options: [
                  {label: this.$tr('ui.label.enabled'), value: '1'},
                  {label: this.$tr('ui.label.disabled'), value: '0'},
                ],
              }
            },

          },
        }
      }
    },
  }
</script>
