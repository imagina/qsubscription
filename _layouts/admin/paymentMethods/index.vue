<template>
  <div id="paymentMethodsIndex">

    <!--Content-->
    <div class="col-12 relative-position backend-page">
      <!--Table-->
      <q-table
        :data="table.data"
        :columns="columns"
        :pagination.sync="table.pagination"
        @request="getData"
        :filter="table.filter"
        class="shadow-1 border-top-color"
      >
        <!--Table slot left-->
        <template slot="top-left" slot-scope="props">
          <!--Search-->
          <q-input clearable v-model="table.filter.search" dense outlined debounce="800"
                   :placeholder="`${$tr('ui.label.search',{capitalize : true})}...`"
                   @input="getDataTable">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
        <!--Table slot right-->
        <template slot="top-right" slot-scope="props">
          <!--Button refresh data-->
          <q-btn icon="fas fa-sync-alt" color="info" class="q-ml-xs"
                 @click="getDataTable(true)">
            <q-tooltip :delay="300">{{$tr('ui.label.refresh')}}</q-tooltip>
          </q-btn>
        </template>

        <!--= Custom Columns =-->
        <q-td slot="body-cell-actions" slot-scope="props" :props="props">
          <!--Edit button-->
          <q-btn color="positive" icon="fas fa-pen" size="sm"
                 v-if="$auth.hasAccess('subscriptions.paymentmethods.edit')"
                 @click="itemToEdit = props.row; formItemShow = true">
            <q-tooltip :delay="300">{{$tr('ui.label.edit')}}</q-tooltip>
          </q-btn>
          <!--status button-->
          <q-toggle color="positive" v-model="props.row.status" class="q-px-xs" @input="update(props.row)">
            <q-tooltip :delay="300">{{`${$tr('ui.label.enabled')}/${$tr('ui.label.disabled')}`}}</q-tooltip>
          </q-toggle>
        </q-td>
      </q-table>


      <!--Loading-->
      <inner-loading :visible="loading" />
      <component :is="itemToEdit.name" v-model="formItemShow" :item="itemToEdit"
                 @updated="getDataTable(true)" :itemId="itemToEdit.id"/>
    </div>
  </div>
</template>
<script>
  //Components
  import Subscriptionpaypal from '@imagina/qsubscription/_components/admin/paymentMethods/paypal'
  import Subscriptionpayu from '@imagina/qsubscription/_components/admin/paymentMethods/payu'
  import Suscriptionscheckmo from '@imagina/qsubscription/_components/admin/paymentMethods/checkmo'
  import Subscriptionauthorize from '@imagina/qsubscription/_components/admin/paymentMethods/authorize'

  export default {
    props: {},
    components: {
      Subscriptionpaypal,
      Subscriptionpayu,
      Suscriptionscheckmo,
      Subscriptionauthorize
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.getDataTable(true)
      })
    },
    data() {
      return {
        loading: false,
        formItemShow: false,
        itemToEdit: {},
        table: {
          data: [],
          pagination: {
            page: 1,
            rowsNumber: '',
            rowsPerPage: 10
          },
          filter: {
            search: null,
            allTranslations: true
          }
        },
      }
    },
    computed: {
      columns() {
        return [
          {name: 'id', label: 'ID', field: 'id', style: 'width: 50px'},
          {name: 'title', label: this.$tr('ui.form.title'), field: 'title', align: 'rigth'},
          {
            name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
            format: val => val ? this.$trd(val) : '-',
          },
          {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
        ]
      }
    },
    methods: {
      //Request products with params from server table
      getDataTable(refresh = false) {
        this.getData({pagination: this.table.pagination}, refresh)
      },
      //Get payment methods
      getData({pagination, filter}, refresh = false) {
        this.loading = true

        //Params to request
        let params = {
          refresh: refresh,
          params: {
            filter: this.table.filter,
            page: pagination.page,
            take: pagination.rowsPerPage
          }
        }

        //Request
        this.$crud.index('apiRoutes.qsubscription.paymentMethods', params).then(response => {
          this.table.data = response.data
          this.table.pagination.page = response.meta.page.currentPage
          this.table.pagination.rowsNumber = response.meta.page.total
          this.table.pagination.rowsPerPage = pagination.rowsPerPage
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })

      },

      //update payment methods
      update(data) {
        this.loading = true
        //Request
        this.$crud.update('apiRoutes.qsubscription.paymentMethods', data.id, data).then(response => {
          this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
          this.loading = false
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          this.loading = false
        })

      },

    }

  }
</script>
<style lang="stylus">
</style>
