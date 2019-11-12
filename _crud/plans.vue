<template></template>
<script>
  //Component
  import crud from '@imagina/qcrud/_components/crud'

  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qsubscription.plans',
          permission: 'suscriptions.plans',
          create: {
            title: this.$tr('qsubscription.layout.newPlan'),
            to: 'qsubscription.admin.plans.create',
            params:{}
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
            to: 'qsubscription.admin.plans.edit',
            requestParams: {}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            productId: {value: this.$route.params.id},
            name: {
              label: this.$tr('ui.form.name'),
              value: '',
              type: 'text',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              isTranslatable: true,
            },
            description: {
              label: this.$tr('ui.form.description'),
              value: '',
              type: 'html',
              isRequired: false,
              isTranslatable: true,
            },

            frequency: {
              label: this.$tr('qsubscription.layout.form.frequency'),
              value: 1,
              type: 'number',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              isTranslatable: false,
            },

            billCycle: {
              label: this.$tr('qsubscription.layout.form.bill_cycle'),
              value: 'week',
              type: 'select',
              options: [
                {label: this.$tr('qsubscription.layout.form.bill_cycles.weeks'), value: 'week'},
                {label: this.$tr('qsubscription.layout.form.bill_cycles.months'), value: 'month'},
                {label: this.$tr('qsubscription.layout.form.bill_cycles.years'), value: 'year'},
              ],
            },
            features: {
              label: this.$tr('qsubscription.layout.form.features'),
              value: null,
              type: 'select',
              isRequired: true,
              multiple: true,
              isTranslatable: false,
              loadOptions: {
                apiRoute: 'apiRoutes.qsubscription.features',
                select: {label: 'name', id: 'id'}
              }
            },

          },
          formRight: {

            status : {
              label: `${this.$tr('ui.form.status')}:`,
              value: '1',
              type: 'select',
              options: [
                {label: this.$tr('ui.label.enabled'), value: '1'},
                {label: this.$tr('ui.label.disabled'), value: '0'},
              ],
            },

            code: {
              label: this.$tr('qsubscription.layout.form.code'),
              value: '',
              type: 'text',
              isRequired: false,
              isTranslatable: false,
            },

            displayOrder: {
              label: this.$tr('qsubscription.layout.form.display_order'),
              value: '',
              type: 'text',
              isRequired: false,
              isTranslatable: false,
            },

            free: {
              label: this.$tr('qsubscription.layout.form.free'),
              value: '',
              type: 'checkbox',
              isRequired: false,
              isTranslatable: false,
            },

            recommendation: {
              label: this.$tr('qsubscription.layout.form.recommendation'),
              value: '',
              type: 'checkbox',
              isRequired: false,
              isTranslatable: false,
            },

            visible: {
              label: this.$tr('qsubscription.layout.form.visible'),
              value: '',
              type: 'checkbox',
              isRequired: false,
              isTranslatable: false,
            },

            price: {
              label: this.$tr('qsubscription.layout.form.price'),
              value: 1,
              type: 'number',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              isTranslatable: false,
            },

            trialPeriod: {
              label: this.$tr('qsubscription.layout.form.trial_period'),
              value: 1,
              type: 'number',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              isTranslatable: false,
            },


          },
        }
      }
    },
  }
</script>
