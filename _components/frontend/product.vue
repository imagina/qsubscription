<template>
  <q-page class="page">
    <div id="productComponent" v-if="product" class="fondo-share q-pb-xl">
      <div class="line"></div>
      <div class="q-container">
        <div class="row justify-center">

          <div class="col-12 text-center q-mt-xl q-mb-lg">

            <h4 class="title-arrow-line-white font-family-secondary">
                {{product.name}}
            </h4>

          </div>
        </div>

        <div class="row justify-center stairs-d q-mb-xl">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 q-mb-xl step" v-for="(plan,index) in product.plans" :style="{ marginTop: (index+2) + '0px', marginBottom: '-' + (index) + '0px' }">
            <q-card class="rounded-sm bg-white plan relative-position w-100 h-100">
              <q-card-title class="bg-degradado text-right"></q-card-title>
              <q-card-main class="q-px-lg" style=" padding-bottom: 80px;">

                <h5 class="font-family-secondary text-primary q-mt-xl q-mb-lg" style="display: flex;">
                  <q-icon class="q-icon-round" name="far fa-id-card"  size="24px" />
                  {{plan.name}}
                </h5>

                <div class="list-plan q-subheading" v-for="feature in plan.features">
                  <i class="fas fa-check text-primary q-pr-md"></i>
                  {{feature.name}}
                </div>

                <h5 class="font-family-secondary text-primary text-center q-mt-xl q-mb-none" v-show="!plan.free">${{plan.price}} </h5>

              </q-card-main>

              <q-card-actions class="justify-center">
                  <q-btn
                  size="lg"
                  color="primary"
                  class="font-family-secondary text-white q-btn-end"
                  :loading="loading.page"
                  no-caps
                  label="Suscribirme" @click="subscribe(0)"
                  />
              </q-card-actions>

            </q-card>
          </div>

        </div>
      </div>
    </div>

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
  export default {
    name: "product",
    data(){
      return {
        product: null,
        name: '',
        minimizedModal: false,
        phone: '',
        email: '',
        password: '',
        loading: {
          page: false
        }
      }
    },
    props:{
      productId: {
        default: 0
      }
    },

    mounted: function(){
      this.$nextTick(function(){
        this.getProduct();
      })
    },
    methods: {
      async getProduct(){
        this.loading.page = true;
        //Params
        let params = {
          refresh: true,
          params: {
            include: 'plans.features',
            filter: {allTranslations: true}
          }
        }

        //Request
        await this.$crud.show("apiRoutes.qsubscription.products",this.productId,params).then(response => {
          this.product=response.data;
          this.loading.page = false;
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading.page = false;
        })

      },
      subscribe(planId){
        this.loading.page = true;
        if(this.userId){
          //push to checkout
          this.$router.push({ name: 'subscriptions.checkout', params: { planId: planId }});
        }else{
          this.minimizedModal = true
        }

      },

    }
  }
</script>

<style lang="stylus">
@import "~variables";
</style>
