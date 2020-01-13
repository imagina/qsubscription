<template></template>
<script>
  //Component
  import crud from '@imagina/qcrud/_components/crud'

  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qsubscription.plans',
          permission: 'subscriptions.plans',
          create: {
            title: this.$tr('qsubscription.layout.newPlan'),
            to : {
              name : 'qsubscription.admin.plans.create',
              params : {
                productId: this.$route.params.id
              },
              query : {}
            }
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'center'},
              {name: 'code', label: this.$tr('qsubscription.layout.form.code'), field: 'code', align: 'center'},
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {
              filter:{
                productId: this.$route.params.id
              },
              include:'product'
            }
          },
          update: {
            title: this.$tr('qsubscription.layout.updatePlan'),
            to : 'qsubscription.admin.plans.edit',
            // to : {
            //   name : 'qsubscription.admin.plans.edit',
            //   params : {},
            //   query : {}
            // },
            requestParams: {}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            productId: {value: this.$route.params.id},
            name: {
              value: '',
              type: 'input',
              props:{
                label: this.$tr('ui.form.name'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
              isTranslatable: true,
            },
            description: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props:{
                label: this.$tr('ui.form.description'),

              }
            },

            frequency: {
              value: 1,
              type: 'number',
              props:{
                label: this.$tr('qsubscription.layout.form.frequency'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
              isTranslatable: false,
            },

            billCycle: {
              value: 'week',
              type: 'select',
              props:{
                label: this.$tr('qsubscription.layout.form.bill_cycle'),
                options: [
                  {label: this.$tr('qsubscription.layout.form.bill_cycles.weeks'), value: 'week'},
                  {label: this.$tr('qsubscription.layout.form.bill_cycles.months'), value: 'month'},
                  {label: this.$tr('qsubscription.layout.form.bill_cycles.years'), value: 'year'},
                ],
              },
            },
            features: {
              value: null,
              type: 'select',
              // isRequired: true,
              multiple: true,
              isTranslatable: false,
              props:{
                label: this.$tr('qsubscription.layout.form.features'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
                loadOptions: {
                  apiRoute: 'apiRoutes.qsubscription.features',
                  select: {label: 'name', id: 'id'}
                }
              },
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

            code: {
              value: '',
              type: 'input',
              isRequired: false,
              isTranslatable: false,
              props:{
                label: this.$tr('qsubscription.layout.form.code'),

              }
            },

            displayOrder: {
              value: '',
              type: 'input',
              isRequired: false,
              isTranslatable: false,
              props:{
                label: this.$tr('qsubscription.layout.form.display_order'),

              }
            },

            free: {
              value: '',
              type: 'checkbox',
              isRequired: false,
              isTranslatable: false,
              props:{
                label: this.$tr('qsubscription.layout.form.free'),

              }
            },

            recommendation: {
              value: '',
              type: 'checkbox',
              isRequired: false,
              isTranslatable: false,
              props:{
                label: this.$tr('qsubscription.layout.form.recommendation'),

              }
            },

            visible: {
              value: '',
              type: 'checkbox',
              isRequired: false,
              isTranslatable: false,
              props:{
                label: this.$tr('qsubscription.layout.form.visible'),

              }
            },

            price: {
              value: 1,
              type: 'number',
              props:{
                label: this.$tr('qsubscription.layout.form.price'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
              isTranslatable: false,
            },

            trialPeriod: {
              props:{
                label: this.$tr('qsubscription.layout.form.trial_period'),
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
              value: 1,
              type: 'number',
              isTranslatable: false,
            },


          },
        }
      }
    },
  }
</script>
