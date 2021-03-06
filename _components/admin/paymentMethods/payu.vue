<template>
  <q-dialog id="formCategory" v-model="show" v-if="show"
            no-esc-dismiss no-backdrop-dismiss class="backend-page">
    <q-card class="backend-page bg-grey-1">
      <!--Header-->
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          {{`${$tr('qsubscription.layout.paymentMethods.updatePaymentMethod')}: ${item.title}`}}
        </q-toolbar-title>
        <q-btn flat v-close-popup icon="fas fa-times"/>
      </q-toolbar>

      <!--Content-->
      <div class="relative-position q-pa-md">
        <q-form @submit="updateItem" class="row q-col-gutter-x-md" ref="formContent" autocomplete="off"
                @validation-error="$alert.error($tr('ui.message.formInvalid'))">
          <!--Language-->
          <div class="col-12 q-mb-md">
            <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
          </div>
          <!--Form left-->
          <div class="col-12 col-md-8" v-if="locale.success">
            <!--Title-->
            <q-input v-model="locale.formTemplate.title" :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                     :label="`${$tr('ui.form.title')} (${locale.language})*`" outlined dense/>

            <!--Description-->
            <q-input v-model="locale.formTemplate.description" outlined dense
                     :label="`${$tr('ui.form.description')} (${locale.language})*`"
                     type="textarea" rows="3" :rules="[val => !!val || $tr('ui.message.fieldRequired')]"/>

            <!--Merchant ID-->
            <q-input v-model="locale.formTemplate.merchantid" outlined dense
                     :label="$tr('qsubscription.layout.form.paymentMethods.merchantId')"/>

            <!--API login-->
            <q-input v-model="locale.formTemplate.apilogin" outlined dense
                     :label="$tr('qsubscription.layout.form.paymentMethods.apiLogin')"/>

            <!--API Key-->
            <q-input v-model="locale.formTemplate.apikey" outlined dense
                     :label="$tr('qsubscription.layout.form.paymentMethods.apiKey')"/>

            <!--Account ID-->
            <q-input v-model="locale.formTemplate.accountid" outlined dense
                     :label="$tr('qsubscription.layout.form.paymentMethods.accountId')"/>
          </div>
          <!--Form right-->
          <div class="col-12 col-md-4" v-if="locale.success">
            <!--Mode-->
            <q-select v-model="locale.formTemplate.mode"
                      :options="[
                        {label:'SANDBOX',value:'sandbox'},
                        {label:'LIVE',value:'live'}
                        ]"
                      outlined dense
                      :label="$tr('qsubscription.layout.form.paymentMethods.mode')"/>
            <!--Status-->
            <q-select v-model="locale.formTemplate.status"
                      :options="[
                        {label:$tr('ui.label.enabled'),value:true},
                        {label:$tr('ui.label.disabled'),value:false}
                      ]"
                      outlined dense
                      :label="$tr('ui.form.status')"/>

            <!--Allow use of Test Credit Cards-->
            <q-select v-model="locale.formTemplate.test"
                      :options="[
                        {label:$tr('ui.label.enabled'),value:1},
                        {label:$tr('ui.label.disabled'),value:0}
                      ]"
                      outlined dense
                      :label="$tr('qsubscription.layout.form.allowTestCreditCard')"/>
            <!--Main Image-->
            <div class="input-title">
              {{$tr('ui.form.image')}}
            </div>
            <upload-img
              v-model="locale.formTemplate.mediasSingle"
              entity="Modules\Subscription\Entities\PaymentMethod"
              :entity-id="itemId ? itemId : null"
              zone='mainimage'
            />
          </div>
        </q-form>
        <!--Loading-->
        <inner-loading :visible="loading"/>
      </div>

      <!--Footer-->
      <q-toolbar color="white">
        <q-toolbar-title></q-toolbar-title>
        <!--Button Update-->
        <q-btn :label="$tr('ui.label.update')" icon="fas fa-pen" color="positive"
               :loading="loading" @click="$refs.formContent.submit()"/>
      </q-toolbar>
    </q-card>
  </q-dialog>
</template>
<script>
  //Services
  import commerceServices from '@imagina/qsubscription/_services/index'

  //Plugins
  import _cloneDeep from 'lodash.clonedeep'
  import {alert} from '@imagina/qhelper/_plugins/alert'

  //Components
  import uploadImg from '@imagina/qmedia/_components/form'

  export default {
    props: {
      value: {default: false},
      itemId: {default: false},
      item: {
        default: () => {
          return {}
        },
      },
    },
    components: {uploadImg},
    watch: {
      value(newValue) {
        this.show = this.value
      },
      show(newValue) {
        this.$emit('input', this.show)
        this.initForm()
      },
    },
    mounted() {
      this.$nextTick(function () {
        this.show = this.value//Assign props value to show modal

      })
    },
    data() {
      return {
        show: false,
        locale: _cloneDeep(this.dataLocale),
        loading: false
      }
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            merchantid: '',
            apilogin: '',
            apikey: '',
            init: '',
            mode: 'sandbox',
            test: '',
            status: false,
            accountid: '',
            mediasSingle: {}
          },
          fieldsTranslatable: {
            title: null,
            description: '',
          }
        }
      }
    },
    methods: {
      //Init form
      async initForm() {
        this.loading = true
        //If ther is category Id, request data, else set default data
        this.locale = _cloneDeep(this.dataLocale)

        //initialize item data
        if (this.item) {
          this.locale.form = _cloneDeep(this.item)
        }
        this.show = this.value//Assign props value to show modal
        this.loading = false
      },

      //update item
      async updateItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let data = _cloneDeep(this.locale.form)
          data['options'] = {
            merchantid: data.merchantid,
            apilogin: data.apilogin,
            apikey: data.apikey,
            init: data['init'],
            mode: data.mode,
            test: data['test'],
            accountid: data.accountid
          }
          //Request
          this.$crud.update('apiRoutes.qsubscription.paymentMethods', this.item.id, data).then(response => {
            this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
            this.$emit('updated')
            this.loading = false
            this.show = false
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
          })
        }
      }
    }

  }
</script>
<style lang="stylus">
</style>
