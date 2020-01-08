<template>
  <div id="pageSubscriptions"
       class=" q-py-xl">

    <div class="row">
      <div class="col-12">
        <div class="text-h5 text-primary q-mb-md font-family-secondary">Suscripciones</div>
      </div>
      <div class="col-12">
        <q-card class="rounded-md bg-white q-mb-xl">
          <q-card-section>
            <div class="row">
              <div class="col-xs-12 col-sm-4 q-px-sm filters">
                <q-select
                        outlined
                        v-model="filter.active"
                        :options="optionsActive"
                        stack-label
                        clearable
                        @input="getSubscriptions()"
                >
                  <template v-slot:selected>
                    <span class="text-primary text-bold">Suscripcciones: </span>
                    <div
                            v-if="filter.active"
                            class="q-my-none q-ml-xs q-mr-none"
                    >
                      {{filter.active.label}}
                    </div>
                    <div v-else> Todas</div>
                  </template>
                </q-select>
              </div>
              <div class="col-xs-12 col-sm-4 q-px-sm filters">
                <q-input
                        v-model="search"
                        debounce="500"
                        filled
                        placeholder="Buscar por Usuario"
                >
                  <template v-slot:append>
                    <q-icon name="search" ></q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-4 q-px-sm filters" v-if="$auth.hasAccess('marketplace.notification.create')">
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pa-lg">
            <ul>
              <li v-for="(item,i) in subscriptions" :key="item.id">
                <div class="row q-col-gutter-md items-center">
                  <div class="col text-truncate">
                    <div class="row">
                      <div class="col-xs-12 col-md-2 col-xl-1 text-truncate">
                        <q-avatar color="red" text-color="white" icon="fas fa-times-circle" v-if="!item.active"/>
                        <q-avatar color="positive" text-color="white" icon="fas fa-check-circle" v-else/>
                      </div>
                      <div class="col-xs-12 col-md-10 col-xl-11 ">
                        <div class="row"><span class="text-primary text-bold ">{{item.user.fullName}}</span></div>
                        <div class="row"><span class="text-bold q-pr-sm">{{item.plan.name}}</span> - <span class="text-bold text-tertiary q-px-sm">$ {{$n(item.total)}}</span></div>
                        <div class="row"><span class="text-bold q-pr-sm">{{$trd(item.initDate)}}</span> - <span class="text-tertiary text-bold q-px-sm">{{$trd(item.endDate)}}</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <q-btn v-if="!item.isRead" dense round icon="fas fa-eye" class="q-mr-sm q-pa-xs"
                           size="10px" color="primary" @click="updateNotification(item.id)"/>
                    <q-btn dense round icon="fas fa-trash-alt" class="q-mr-sm q-pa-xs" size="10px"
                           color="primary" v-if="$auth.hasAccess('marketplace.notification.destroy')"
                           @click="deleteNotification(item.id)"/>
                  </div>
                </div>
              </li>
            </ul>
            <div class="q-pa-lg flex flex-center" v-if="page">
              <q-pagination
                      v-model="page"
                      :max="pages.lastPage"
                      :direction-links="true"
                      @input="getSubscriptions()"
              >
              </q-pagination>
            </div>
            <div class="q-pa-lg flex flex-center" v-else><span class="text-primary text-h6 text-bold ">Notificaciones no encontradas</span>
            </div>
          </q-card-section>
          <inner-loading :visible="loading"/>
        </q-card>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    props: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    components:{
    },
    data() {
      return {
        page: 1,
        pages: {lastPage: 0},
        loading: false,
        subscriptions: [],
        search:null,
        filter: {
          active:{label: 'Activas', value: 1},
        },
        optionsActive: [
          {label: 'Activas', value: 1},
          {label: 'Vencidas', value: 0},
        ]
      }
    },
    methods: {
      async init() {
        await this.getSubscriptions()
      },
      //Get users with infinite scroll
      getSubscriptions() {
        let active = this.filter.active ? this.filter.active.value : null
        let params = {
          remember: false,
          params: {
            include: 'user,plan',
            filter: {
              active: active,
              order:{
                field:'end_date',
                way:'asc'
              },
              status:1
            },
            take: 12,
            page: this.page ? this.page : 1
          }
        };//params
        this.loading = true
        this.$crud.index("apiRoutes.qsubscription.subscriptions", params).then(response => {
          this.subscriptions = response.data
          this.pages = response.meta.page
          if (!this.subscriptions.length) this.page = null;
          this.loading = false
        }).catch(error => {
          console.error(error)
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      },
  
    }
  }
</script>
<style lang="stylus">
  #pageSubscriptions
    .q-list
      padding 0

    .q-collapsible-sub-item
      background white
      padding 8px 0 8px 35px

      .mesageNotification
        padding 15px

    ul
      list-style none
      padding-left 0

      li
        border 1px solid $primary
        padding 20px
        border-radius 10px
        margin-bottom 20px

    .filters
      font-size 12px
    @media screen and (max-width: $breakpoint-xs)
      ul
        li
          .q-avatar
            font-size 12px
</style>
