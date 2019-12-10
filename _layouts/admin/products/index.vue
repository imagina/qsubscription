<template>
  <div id="pageId">
    <!---Component CRUD-->
    <crud :crud-data="import('@imagina/qsubscription/_crud/products')"/>

  </div>
</template>
<script>

  export default {
    props: {},
    validations() {
      return {}
    },
    mounted() {
      this.$nextTick(function () {
        // console.log(this.locale.fields.userId);
      })
    },
    data() {
      return {
        loading: {
          page: false
        },
        configName: 'apiRoutes.qsubscription.products',
        itemId: false,
        locale: {
          fields: {
            id: '',
            userId: this.$store.state.quserAuth.userId,
            status: 0
          },
          fieldsTranslatable: {
            name: '',
            description: ''
          }
        },
        editorText: {
          toolbar: [
            ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
            ['link'],
            [
              {
                label: 'Font Size',
                icon: 'format_size',
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
              }
            ],
            ['quote', 'unordered', 'ordered'],
            ['fullscreen']
          ]
        },
        buttonActions: {}
      }
    },
    methods: {}
  }
</script>
<style lang="stylus">
</style>
