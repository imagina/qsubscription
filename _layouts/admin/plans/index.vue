<template>
  <div id="pageId">
    <div class="row gutter-x-sm">
      <div class="col-12 col-md-12 q-mb-md">
        <q-btn
        color="primary"
        icon="fas fa-layer-group"
        size="md"
        :label="$tr('qsubscription.layout.goProducts')"
        @click="$router.push({name: 'qsubscription.admin.products.index'})" />
      </div>
      <div class="col-12 col-md-12">
        <!---Component CRUD-->
        <crud :crud-data="import('@imagina/qsubscription/_crud/plans')"/>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: {},
    components: {},
    watch: {},
    validations() {
      return {}
    },
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="stylus">
</style>
