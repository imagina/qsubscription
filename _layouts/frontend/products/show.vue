<template>
  <q-page class="page">

    <div class="bg-fondo q-px-sm q-py-xl">
      <div class="q-container">
        <div class="row">
          <div class="col-12 text-center q-my-lg">

            <h4 class="font-family-secondary text-tertiary">{{product.name}}</h4>
            <p class="text-weight-medium" v-html="product.description"></p>

            <h4 class="title-arrow-line-tertiary font-family-secondary">
              {{product.name}}
            </h4>

          </div>
        </div>
        <div class="row q-mb-xl stairs">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-mb-xl step" v-for="(plan,index) in product.plans" :style="{ marginTop: (index+5) + '0px' }">
            <q-card class="rounded-sm bg-white plan relative-position w-100 h-100">

              <q-card-title class="bg-degradado text-right" style="height: 20px;">
                <img class="img-title" src="/assets/img/plan-oro.png" alt="plan">
              </q-card-title>

              <q-card-main class="q-px-xl" style=" padding-bottom: 100px;">

                <div class="row">
                  <div class="col-8">
                     <h5 class="font-family-secondary text-primary q-mt-xl q-mb-none">{{plan.name}}</h5>
                  <h6 class="q-mt-none">{{plan.description}}</h6>
                  </div>
                </div>


                <div class="list-plan q-subheading" v-for="feature in plan.features">
                  <i class="fas fa-check text-primary q-pr-md"></i>
                  {{feature.name}}
                </div>

              </q-card-main>

              <q-card-actions class="bg-degradado font-family-secondary">
                <div class="row items-center w-100">
                <div class="col-6 text-center  text-white">
                    {{plan.price}} - {{plan.frequency}} {{plan.billCycleText}}
                </div>
                <div class="col-6 text-center  text-white" style="border-left:1px solid #dee2e6!important">

                  <q-btn
                  flat
                  size="lg"
                  :loading="loading.page"
                  no-caps
                  label="Suscribirme" @click="subscribe(plan.id)"
                  />

                </div>
              </div>
              </q-card-actions>
            </q-card>

          </div>
        </div>
      </div>
    </div>

    <product productId="6"/>

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
  </q-page>
</template>
<script>
//Plugins
import {required} from 'vuelidate/lib/validators'
//Components
import locales from '@imagina/qsite/_components/locales'
import mediaForm from '@imagina/qmedia/_components/form'
import product from '@imagina/qsubscription/_components/frontend/product'
export default {
  props: {},
  components: {locales, mediaForm,product},
  watch: {},
  validations() {
    return {}
  },
  mounted() {
    this.$nextTick(function () {
      this.productId=this.$route.params.id;
      this.getProduct();
      console.log('this $store state quserAuth: ');
      console.log(this.$store.state.quserAuth);
      console.log(this.userId);
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
          userId: this.$store.state.quserAuth.userId,

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
      this.$router.push({ name: 'subscriptions.checkout', params: { planId: planId }});
      if(this.userId){
        //push to checkout
        this.$router.push({ name: 'subscriptions.checkout', params: { planId: planId }});
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
