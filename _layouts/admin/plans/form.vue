<template>
  <div id="adminPlansFrom">
    <q-no-ssr>
    <!--Content-->
      <div class="relative-position q-mb-lg backend-page">

        <!--Data-->
        <q-form autocorrect="off" autocomplete="off" ref="formContent"
        @submit="(!itemId && !field) ? createItem() : updateItem()"
        @validation-error="$alert.error($tr('ui.message.formInvalid'))">
          <!--Form-->
          <div class="box">
            <div class="row gutter-x-sm">

              <!--Languages-->
             <div class="col-12">
               <locales ref="localeComponent" v-model="locale" :form="$refs.formContent"/>
             </div>

              <!---Form Left-->
              <div class="col-12 col-md-8" v-if="locale.success">

              <!--name-->
              <q-input v-model="locale.formTemplate.name" outlined dense
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                       :label="`${$tr('ui.form.name')} (${locale.language})*`"/>

              <!--Description-->
              <div class="input-title">{{`${$tr('ui.form.description')} (${locale.language})*`}}</div>
              <q-field v-model="locale.formTemplate.description" borderless
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
                <q-editor v-model="locale.formTemplate.description" class="full-width"
                          :toolbar="editorText.toolbar" content-class="text-grey-9" toolbar-text-color="grey-9"/>
              </q-field>

              <!--frequency-->
              <q-input v-model="locale.formTemplate.frequency" outlined dense type="number"
                       :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                       :label="`${$tr('qsubscription.layout.form.frequency')} (${locale.language})*`"/>

              <!--BillCyles-->
              <div class="input-title">{{`${$tr('qsubscription.layout.form.bill_cycle')}`}}</div>
              <tree-select
                :clearable="false"
                :append-to-body="true"
                class="q-mb-md"
                :options="optionsFields.billCycles"
                value-consists-of="BRANCH_PRIORITY"
                v-model="locale.formTemplate.billCycle"
                placeholder=""
              />

              <!--Status-->
              <div class="input-title">{{`${$tr('ui.form.status')}`}}</div>
              <tree-select
              :clearable="false"
              :append-to-body="true"
              class="q-mb-md"
              :options="optionsFields.status"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.status"
              placeholder=""
              />

              <!--code-->
              <q-input v-model="locale.formTemplate.code" outlined dense
              :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
              :label="`${$tr('qsubscription.layout.form.code')} (${locale.language})*`"/>

              <!--displayOrder-->
              <q-input v-model="locale.formTemplate.displayOrder" outlined dense type="number"
              :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
              :label="`${$tr('qsubscription.layout.form.display_order')} (${locale.language})*`"/>

              <!-- Free -->
              <q-checkbox v-model="locale.formTemplate.free" :label="$tr('qsubscription.layout.form.free')" />
              <!-- Visible -->
              <q-checkbox v-model="locale.formTemplate.visible" :label="$tr('qsubscription.layout.form.visible')" />
              <!-- Recommendation -->
              <q-checkbox v-model="locale.formTemplate.recommendation" :label="$tr('qsubscription.layout.form.recommendation')" />

              <!--Price-->
              <q-input v-model="locale.formTemplate.price" outlined dense type="number"
              :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
              :label="`${$tr('qsubscription.layout.form.price')} (${locale.language})*`"/>


            </div>

            <!---Form Right-->
            <div class="col-12 col-md-4" v-if="locale.success">

              <!-- Image -->
              <div class="input-title">{{$tr('ui.form.image')}}</div>
              <upload-media
              v-model="locale.formTemplate.mediasSingle"
              entity="Modules\Suscriptions\Entities\Plan"
              :entity-id="itemId ? itemId : null"
              zone='mainimage'
              />
              <br>
              <!-- Features -->
              <div class="input-title">{{`${$tr('qsubscription.layout.form.features')}`}}</div>
              <br>
              <div v-if="itemId" v-for="(feature,index) in locale.formTemplate.features" :key="'feature'+index">
                <q-input v-model="feature.value" outlined dense v-if="feature.type==1" type="text"
                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                :label="feature.name"/>
                <q-input v-model="feature.value" outlined dense v-else-if="feature.type==0" type="number"
                :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                :label="feature.name"/>
                <q-checkbox v-model="feature.value" left-label :label="feature.name" v-if="feature.type==2"/>

              </div>

              <div v-else>

                <q-select
                multiple
                v-model="locale.formTemplate.features"
                :options="featuresOptions"
                />

              </div>


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
        </q-form>

      <!--Loading-->
      <inner-loading :visible="loading.page"/>
    </div>
    </q-no-ssr>

  </div>
</template>
<script>
  //Components
  import locales from '@imagina/qsite/_components/locales'
  import recursiveList from 'src/components/master/recursiveListSelect'
  import schedulesForm from 'src/components/master/schedules'
  import uploadMedia from '@imagina/qmedia/_components/form'

  export default {
    components: {locales, recursiveList, schedulesForm,uploadMedia},
    mounted() {
      this.$nextTick(function () {
        this.init();
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
        features:[],
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
            mediasSingle: {},
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
    computed: {
      //Options translatables
      optionsFields() {
        return {
          status: [
            {label: this.$tr('ui.label.enabled'), value: 1,id:1},
            {label: this.$tr('ui.label.disabled'), value: 0,id:0}
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
                for(var i=0;i<response.data.features[i].length;i++){
                  if(parseInt(response.data.features[i].type)==2){
                    if(response.data.features[i].value==""){
                      response.data.features[i].value=false;
                    }
                  }
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
      //Create Product
      async createItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading.page = true
          var data=this.$clone(this.locale.form);
          var features=[];
          for(var i=0;i<data.features.length;i++){
            features.push(data.features[i].value);
          }//for
          data.features=features;
          this.$crud.create(this.configName, data).then(response => {
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
      async updateItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading.page = true
          var data=this.$clone(this.locale.form);
          // var features={};
          // for(var i=0;i<data.features.length;i++){
          //   features[String(data.features[i].id)]={
          //     value:data.features[i].value
          //   }
          //   // features.push(data.features[i].value);
          // }//for
          // data.features=features;
          this.$crud.update(this.configName, this.itemId, data).then(response => {
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
</style>
