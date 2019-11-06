<template></template>
<script>
  //Component
  import crud from '@imagina/qcrud/_components/crud'

  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qsubscription.features',
          permission: 'suscriptions.features',
          create: {
            title: this.$tr('qsubscription.layout.newFeature'),
            // to: 'qsubscription.admin.features.create',
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'rigth'},
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
            title: this.$tr('qsubscription.layout.updateFeature'),
            // to: 'qsubscription.admin.features.edit',
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
            caption: {
              label: this.$tr('qsubscription.layout.form.caption'),
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

            type: {
              label: this.$tr('qsubscription.layout.form.type'),
              value: 1,
              type: 'select',
              options: [
                {label: this.$tr('qsubscription.layout.form.types.quantity'), value: 0},
                {label: this.$tr('qsubscription.layout.form.types.text'), value: 1},
                {label: this.$tr('qsubscription.layout.form.types.boolean'), value: 2},
              ],
            },

            unit: {
              label: this.$tr('qsubscription.layout.form.unit'),
              value: '',
              type: 'text',
              isRequired: false,
              isTranslatable: false,
            },

          },
        }
      }
    },
  }
</script>
