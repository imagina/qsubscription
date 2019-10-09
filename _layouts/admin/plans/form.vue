<template>
  <div id="adminPlansFrom">
    <!--Content-->
    <div class="relative-position q-mb-lg backend-page">

      <!--Form-->
      <div class="box">
        <div class="row gutter-x-sm">

           <!--Languages-->
          <div class="col-12">
            <locales ref="localeComponent" v-model="locale" @validate="$v.$touch()"/>
          </div>

          <!---Form Left-->
          <div class="col-12 col-md-8" v-if="locale.success">
            <!--name-->
            <q-field
              :error="$v.locale.formTemplate.name.$error"
              :error-label="$tr('ui.message.fieldRequired')"
            >
              <q-input :stack-label="`${$tr('ui.form.name')} (${locale.language}) *`"
                       type="text" v-model="locale.formTemplate.name"/>
            </q-field>

            <!--Description-->
            <q-field>
              <div class="input-title">
                {{`${$tr('ui.form.description')} (${locale.language}) *`}}
              </div>
              <q-editor v-model="locale.formTemplate.description" :toolbar="editorText.toolbar"/>
            </q-field>

            <!--frequency-->
            <q-field>
              <q-input :stack-label="`${$tr('qsubscription.layout.form.frequency')} (${locale.language}) *`"
                       type="number" v-model="locale.formTemplate.frequency"/>
            </q-field>

            <!--BillCyles-->
             <q-field>
               <div class="input-title">{{`${$tr('qsubscription.layout.form.bill_cycle')}`}}</div>
               <tree-select
                 :clearable="false"
                 :options="optionsFields.billCycles"
                 value-consists-of="BRANCH_PRIORITY"
                 v-model="locale.formTemplate.billCycle"
                 placeholder=""
               />
             </q-field>

          </div>

          <!---Form Right-->
          <div class="col-12 col-md-4" v-if="locale.success">

            <!--Status-->
            <q-field>
              <div class="input-title">{{`${$tr('ui.form.status')}`}}</div>
              <tree-select
                :clearable="false"
                :options="optionsFields.status"
                value-consists-of="BRANCH_PRIORITY"
                v-model="locale.formTemplate.status"
                placeholder=""
              />
            </q-field>

            <!--code-->
            <q-field>
              <q-input :stack-label="`${$tr('qsubscription.layout.form.code')} (${locale.language}) *`"
                       type="text" v-model="locale.formTemplate.code"/>
            </q-field>

            <!--displayOrder-->
            <q-field>
              <q-input :stack-label="`${$tr('qsubscription.layout.form.display_order')} (${locale.language}) *`"
                       type="number" v-model="locale.formTemplate.displayOrder"/>
            </q-field>

            <div class="input-title">{{`${$tr('qsubscription.layout.form.features')}`}}</div>
            <q-select
               multiple
               v-model="locale.formTemplate.features"
               :options="featuresOptions"
             />

             <hr>

             <!-- Free -->
             <q-checkbox v-model="locale.formTemplate.free" :label="$tr('qsubscription.layout.form.free')" />
             <!-- Visible -->
             <q-checkbox v-model="locale.formTemplate.visible" :label="$tr('qsubscription.layout.form.visible')" />
             <!-- Recommendation -->
             <q-checkbox v-model="locale.formTemplate.recommendation" :label="$tr('qsubscription.layout.form.recommendation')" />

             <!--Price-->
             <q-field>
               <q-input :stack-label="`${$tr('qsubscription.layout.form.price')} (${locale.language}) *`"
                        type="number" v-model="locale.formTemplate.price"/>
             </q-field>


          </div>


        </div>
      </div>

      <!--Buttons Actions-->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <!--Update button-->
        <q-btn
          v-if="itemId"
          color="positive" :loading="loading.page"
          icon="fas fa-edit" :label="$tr('ui.label.update')" @click="updateItem()"
        />
        <!--Save button-->
        <q-btn-dropdown :label="buttonActions.label" split v-else :loading="loading.app"
                        content-style="min-width: 250px !important"
                        color="positive" icon="fas fa-save" @click="createItem()" rounded align="right">
          <q-list link>
            <q-item @click.native="buttonActions = {label : optionsFields.btn.saveAndReturn, value : 1}"
                    v-close-overlay>
              {{optionsFields.btn.saveAndReturn}}
            </q-item>
            <q-item @click.native="buttonActions = {label : optionsFields.btn.saveAndCreate, value : 3}"
                    v-close-overlay>
              {{optionsFields.btn.saveAndCreate}}
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-page-sticky>

      <!--Loading-->
      <inner-loading :visible="loading.page"/>
    </div>

  </div>
</template>
<script>
  //Plugins
  import {required} from 'vuelidate/lib/validators'
  import {gmaps} from '@imagina/qplace/_plugins/gmaps'
  //Components
  import locales from '@imagina/qsite/_components/locales'
  import mediaForm from '@imagina/qmedia/_components/form'
  import recursiveList from 'src/components/master/recursiveListSelect'
  import schedulesForm from 'src/components/master/schedules'

  export default {
    props: {},
    components: {locales, mediaForm, recursiveList, schedulesForm},
    watch: {},
    validations() {
      return this.getObjectValidation()
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        loading: {
          page: false
        },
        configName: 'apiRoutes.qsubscription.plans',
        itemId: false,
        featuresOptions:[],
        locale: {
          fields: {
            id: '',
            userId: this.$store.state.quserAuth.userId,
            recommendation: 0,
            price: 0,
            status: 0,
            free: false,
            visible: false,
            code: "",
            displayOrder: "",
            frequency: "",
            billCycle: "week",
            features: [],
          },
          fieldsTranslatable: {
            name: '',
            description: ''
          },
          validations: {
            name: {required}
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
    computed: {
      //Options translatables
      optionsFields() {
        return {
          status: [
            {label: this.$tr('ui.label.enabled'), id: 1},
            {label: this.$tr('ui.label.disabled'), id: 0}
          ],
          billCycles: [
            {label: this.$tr('qsubscription.layout.form.bill_cycles.weeks'), id: 'week', value: 'week'},
            {label: this.$tr('qsubscription.layout.form.bill_cycles.months'), id: 'month', value: 'month'},
            {label: this.$tr('qsubscription.layout.form.bill_cycles.years'), id: 'year', value: 'year'},
          ],
          btn: {
            saveAndReturn: this.$tr('ui.message.saveAndReturn'),
            saveAndCreate: this.$tr('ui.message.saveAndCreate'),
          }
        }
      },
    },
    methods: {
      //Init
      async init() {
        //Search id in params URL
        if (this.$route.params.id) this.itemId = this.$route.params.id
        if (this.itemId) await this.getData()//Get data if is edit

        //Set default button action
        this.buttonActions = {label: this.optionsFields.btn.saveAndReturn, value: 1}
      },
      //Get data item
      getData() {
        return new Promise((resolve, reject) => {
          this.loading.page = true
          const itemId = this.$clone(this.itemId)

          if (itemId) {
            //Params
            let params = {
              refresh: true,
              params: {
                include: 'features',
                filter: {allTranslations: true}
              }
            }
            //Request
            this.$crud.show(this.configName, itemId, params).then(response => {
              if(response.data.features.length>0){
                for(var i=0;i<response.data.features.length;i++){
                  response.data.features[i]=response.data.features[i].id;
                }//for
              }
              this.locale.form = this.$clone(response.data);
              this.loading.page = false;
              resolve(true)//Resolve
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading.page = false
              reject(false)//Resolve
            })
            //Request
            this.$crud.index("apiRoutes.qsubscription.features").then(response => {
              for(var i=0;i<response.data.length;i++){
                this.featuresOptions.push({label: response.data[i].name , id: response.data[i].id, value: response.data[i].id})
              }
            })
          } else {
            resolve(true)//Resolve
          }

        })
      },
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
      //Create Product
      createItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading.page = true
          this.$crud.create(this.configName, this.locale.form).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
            this.actionAfterCreated()
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            this.loading.page = false
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Action after created
      actionAfterCreated(id) {
        setTimeout(() => {
          let action = this.buttonActions.value
          switch (action) {
            case 1://redirect to index plans
              this.$router.push({
                name: 'qsubscription.admin.plans.index',
                params:{ id : this.$route.params.id}
              })
              break;
            case 3://Reset and init form
              this.$refs.localeComponent.vReset()
              this.loading.page = false
              break;
          }
        }, 500)
      },
      //Update Product
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading.page = true
          this.$crud.update(this.configName, this.itemId, this.locale.form).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            // this.$router.push({name: 'qsubscription.admin.products.index',
            // params:{ id : 4}})//Redirect to index
            this.$router.go(-1);
            this.loading.page = false
          }).catch(error => {
            this.loading.page = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
