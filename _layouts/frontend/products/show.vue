<template>
  <div id="pageId">
    <div class="relative-position q-mb-lg backend-page">

      <div class="box">
        <div class="row gutter-x-sm">

          <div class="col-12 text-center">
            <h4>{{product.name}}</h4>
            <p>{{product.description}}</p>
          </div>

          <div class="col-1">

          </div>

          <div class="col-10">
            <div class="row">

              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-my-sm"  v-for="plan in product.plans">

                <q-card style="border-radius: 10px;">
                  <q-card-title class="q-ml-sm">
                    <span class="text-primary">{{plan.name}}</span>
                    <span slot="subtitle">
                      <strong>
                        {{plan.description}}
                      </strong>
                    </span>
                  </q-card-title>
                  <q-card-main>
                    <ul>
                      <li style="list-style-type: none;" v-for="feature in plan.features">
                        <i class="fas fa-check q-icon text-primary"></i>
                        {{feature.name}}
                      </li>
                    </ul>

                    <div class="row">
                      <div class="col-6 text-center bg-primary text-white">
                        {{plan.price}} - {{plan.frequency}} {{plan.billCycleText}}
                      </div>
                      <div class="col-6 text-center bg-primary text-white" style="border-left:1px solid #dee2e6!important">
                        <q-btn
                        :loading="loading.page"
                        label="Suscribirme" @click="subscribe(plan.id)"
                        />
                      </div>
                    </div>

                  </q-card-main>
                </q-card>

              </div>
            </div>
          </div>

          <div class="col-1">

          </div>



        </div>
      </div>
    </div>

    <!-- specifying Vue ref for last example only -->
    <q-modal @hide="loading.page=false" v-model="minimizedModal" minimized :content-css="{padding: '50px'}" ref="modalRef">
      <div class="q-display-1 q-mb-md text-primary">Suscribirme</div>
      <span>Bienvenido, tu vaina en el mundo entero</span>
      <hr>

      <!-- name -->
      <q-field>
        <q-input :stack-label="`${$tr('ui.form.name')} *`"
                 type="text" v-model="name"/>
      </q-field>

      <!-- phone -->
      <q-field>
        <q-input :stack-label="`${$tr('ui.form.phone')} *`"
                 type="text" v-model="phone"/>
      </q-field>

      <!-- email -->
      <q-field>
        <q-input :stack-label="`${$tr('ui.form.email')} *`"
                 type="text" v-model="email"/>
      </q-field>

      <!-- password -->
      <q-field>
        <q-input :stack-label="`${$tr('ui.form.password')} *`"
                 type="text" v-model="password"/>
      </q-field>

      <!-- text -->
      --- O ingresa por medio de tu red social ---

      <div class="row">
        <div class="col-sm-12 text-center q-mb-sm q-mt-sm">
          <q-btn class="text-primary" label="Iniciar Sesión" />
        </div>
        <div class="col-sm-12 text-center q-mt-sm">
          <q-btn class="text-white bg-primary " label="Crear cuenta" />
        </div>
      </div>

    </q-modal>

  </div>
</template>
<script>
//Plugins
import {required} from 'vuelidate/lib/validators'
//Components
import locales from '@imagina/qsite/_components/locales'
import mediaForm from '@imagina/qmedia/_components/form'
export default {
  props: {},
  components: {locales, mediaForm,},
  watch: {},
  validations() {
    return {}
  },
  mounted() {
    this.$nextTick(function () {
      this.productId=this.$route.params.id;
      this.getProduct();
    })
  },
  data() {
    return {
      loading: {
        page: false
      },
      configName: 'apiRoutes.qsubscription.products',
      productId: 0,
      minimizedModal: false,
      plans:[],
      product:[],
      userId: this.$store.state.quserAuth.userId,
      status: 0,
      name: '',
      phone: '',
      email: '',
      password: '',
      locale: {
        fields: {
          id: '',

        },
        fieldsTranslatable: {

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
  methods: {

    subscribe(planId){
      console.log('Subscribe, planId: '+planId);
      this.loading.page = true;
      if(this.userId){
        //push to checkout
      }else{
        this.minimizedModal = true
      }

    },
    getProduct() {
      return new Promise((resolve, reject) => {
        this.loading.page = true

        if (this.productId) {

          //Params
          let params = {
            refresh: true,
            params: {
              include: 'plans.features',
              filter: {allTranslations: true}
            }
          }

          //Request
          this.$crud.show("apiRoutes.qsubscription.products",this.productId,params).then(response => {
            console.log(response.data);
            this.product=response.data;
            this.loading.page = false;
            resolve(true)//Resolve
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            this.loading.page = false;
            reject(false)//Resolve
          })
        } else {
          resolve(true)//Resolve
        }//else

      })
    },

  }
}
</script>
<style lang="stylus">
@import "~variables";
</style>
