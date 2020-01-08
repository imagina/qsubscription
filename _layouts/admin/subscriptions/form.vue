<template>
   <div id="adminProductsFrom">
      <q-no-ssr>
         <!--Content-->
         <div class="relative-position q-mb-lg backend-page">
            <!--Data-->
            <q-form @submit="updateItem" ref="formRegister" class="box relative-position" autocomplete="off"
                    @validation-error="$alert.error($tr('ui.message.formInvalid'))">
               <div class="row gutter-x-sm">
                  <div class="col-12 col-md-8 q-pa-lg">
                     <q-select outlined
                               v-model="form.userId"
                               :options="userOptions"
                               option-label="label"
                               dense
                               emit-value
                               map-options
                               label="Usuario"/>

                     <q-input dense mask="date"
                              v-model="form.initDate"
                              color="primary"
                              label="Fecha de Inicio"
                              outlined placeholder="YYYY/MM/DD">
                        <template v-slot:append>
                           <q-icon name="fas fa-calendar-day"/>
                           <q-popup-proxy
                                   ref="qDateProxy"
                                   transition-show="scale"
                                   transition-hide="scale"
                           >
                              <q-date
                                      v-model="form.initDate"
                                      @input="() => $refs.qDateProxy.hide()"
                              />
                           </q-popup-proxy>
                        </template>
                     </q-input>
                     <q-input dense
                              mask="date"
                              v-model="form.endDate"
                              color="primary"
                              label="Fecha de Renovaciòn"
                              outlined
                              placeholder="YYYY/MM/DD">
                        <template v-slot:append>
                           <q-icon name="fas fa-calendar-day"/>
                           <q-popup-proxy
                                   ref="qDateProxy"
                                   transition-show="scale"
                                   transition-hide="scale"
                           >
                              <q-date
                                      v-model="form.endDate"
                                      @input="() => $refs.qDateProxy.hide()"
                              />
                           </q-popup-proxy>
                        </template>
                     </q-input>
                  </div>
                  <div class="col-12 col-md-4 q-pa-lg">
                     <q-select outlined
                               v-model="product"
                               :options="productOptions"
                               option-label="label"
                               dense
                               emit-value
                               map-options
                               @input="getPlans(product)"
                               label="Paquete"/>
                     <q-select outlined
                               v-model="form.planId"
                               :options="planOptions"
                               option-label="label"
                               dense
                               emit-value
                               map-options
                               label="Plan"/>
                     <q-input
                             prefix="$"
                             v-model="value"
                             outlined
                             dense
                             label="Valor"
                             readonly
                     />
                     <q-toggle
                             v-model="form.active"
                             checked-icon="check"
                             color="green"
                             label="Activo"
                             unchecked-icon="clear"
                     />

                  </div>
                  <!--Update button-->
                  <div class="text-right q-mt-sm q-pa-lg">
                     <q-btn color="positive" :loading="loading" type="submit"
                            icon="fas fa-save" :label="$tr('ui.label.save')"/>
                  </div>
                  <!--Inner loafing-->
                  <inner-loading :visible="loading"/>
               </div>
            </q-form>
         </div>
      </q-no-ssr>

   </div>
</template>
<script>
   //Components
   import recursiveList from 'src/components/master/recursiveListSelect'
   import schedulesForm from 'src/components/master/schedules'

   export default {
      props: {},
      components: {recursiveList, schedulesForm},
      watch: {},
      mounted() {
         this.$nextTick(function () {
            this.init()
         })
      },
      data() {
         return {
            loading: false,
            success: false,
            form: {
               firstName: null,
               lastName: null,
               email: null,
               fields: {}
            },
            product: null,
            value:null,
            userOptions: [],
            productOptions: [],
            planOptions: [],
         }
      },
      computed: {},
      methods: {
         //Init
         async init() {
            //Search id in params URL
            await this.getUser()
            await this.getData().catch(error => {
               console.error('Get subscription ' + error)
            })//Get data if is edit
            await this.getProducts()
         },
         //Get data item
         getData() {
            return new Promise((resolve, reject) => {
               this.loading = true
               const itemId = this.$route.params.id
               if (itemId) {
                  //Params
                  let params = {
                     refresh: true,
                     params: {
                        include: 'user,plan',
                        filter: {allTranslations: true}
                     }
                  }
                  //Request
                  this.$crud.show('apiRoutes.qsubscription.subscriptions', itemId, params).then(response => {
                     this.form = this.$clone(response.data);
                     if (this.form.userId) this.form.userId = {
                        label: this.$clone(this.form.user.fullName),
                        id: this.$clone(this.form.user.id)
                     }
                     if (this.form.planId) {
                        this.form.planId = {
                           label: this.$clone(this.form.plan.name),
                           id: this.$clone(this.form.plan.id)
                        }
                        this.product = {
                           label: this.$clone(this.form.plan.product.name),
                           id: this.$clone(this.form.plan.product.id)
                        }
                        this.value=this.$n(this.form.plan.price)
                     }

                     this.loading = false;
                     resolve(true)//Resolve
                  }).catch(error => {
                     this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
                     this.loading = false
                     reject(false)//Resolve
                  })
               } else {
                  resolve(true)//Resolve
               }

            })
         },
         //Update Product
         async updateItem() {
            if (await this.$refs.localeComponent.validateForm()) {
               this.loading.page = true
               this.$crud.update(this.configName, this.itemId, this.locale.form).then(response => {
                  this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
                  this.$router.push({name: 'qsubscription.admin.products.index'})//Redirect to index
                  this.loading.page = false
               }).catch(error => {
                  this.loading.page = false
                  this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
               })
            } else {
               this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
            }
         },
         getUser() {
            let params = {
               remember: false,
               params: {filter: {search: this.search}}
            };//params
            this.$crud.index("apiRoutes.quser.users", params).then(response => {
               this.userOptions = this.$array.select(response.data, {label: 'fullName', id: 'id'});
            });
         },
         getProducts(){
            let params = {
               refresh: true,
               params: {
                  include:'',
               }
            }
            //Request
            this.$crud.index('apiRoutes.qsubscription.products', params).then(response => {
               this.productOptions = this.$array.select(response.data, {label: 'name', id: 'id'});
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         },
         getPlans(key){
            let params = {
               refresh: true,
               params: {
                  include: '',
                  filter:{
                     productId: key
                  }
               }
            }
            //Request
            this.$crud.index('apiRoutes.qsubscription.plans', params).then(response => {
               this.planOptions = this.$array.select(response.data, {label: 'name', id: 'id'});
            }).catch(error => {
               this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
               this.loading = false
            })
         }
      }
   }
</script>
<style lang="stylus">
</style>
