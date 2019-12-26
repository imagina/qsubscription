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

        <div class="row justify-center q-mb-xl">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 q-mb-xl step" v-for="(plan,index) in product.plans" :style="{ marginTop: (index+2) + '0px', marginBottom: '-' + (index) + '0px' }">
            <q-card class="rounded-sm bg-white plan relative-position full-width full-height">
              <div class="q-card-title bg-degradado text-right"></div>
              <q-card-section class="q-px-lg" style=" padding-bottom: 80px;">

                <h5 class="font-family-secondary text-primary q-mt-xl q-mb-lg items-center">
                  <q-icon class="q-icon-round" name="far fa-id-card"  size="24px" />
                  {{plan.name}}
                </h5>

                <div class="list-plan q-subheading" v-for="feature in plan.features">
                  <i class="fas fa-check text-primary q-pr-md" v-if="parseInt(feature.type)==2 && feature.value==true"></i>
                  <i class="fas fa-window-close text-primary q-pr-md" v-else-if="parseInt(feature.type)==2 && feature.value!=true"></i>
                  <i class="fas fa-check text-primary q-pr-md" v-else-if="parseInt(feature.type)==0"></i>
                  <i class="fas fa-window-close text-primary q-pr-md" v-else-if="parseInt(feature.type)==1"></i>
                  <label style="margin-right:4px;" v-if="parseInt(feature.type)==0">
                    {{feature.value}}
                  </label> {{feature.name}}
                </div>
                <h5 class="font-family-secondary text-primary text-center q-mt-xl q-mb-none" v-show="!plan.free">${{plan.price}} </h5>

              </q-card-section>

              <q-card-actions class="justify-center">
                  <q-btn
                  size="lg"
                  color="primary"
                  class="font-family-secondary text-white q-btn-end"
                  :loading="loading.page"
                  no-caps
                  label="Suscribirme" @click="subscribe(plan.id)"
                  />
              </q-card-actions>

            </q-card>
          </div>

        </div>
      </div>
    </div>

    <!-- Modal Register / Login-->
   <q-dialog transition-show="rotate" transition-hide="rotate" full-height full-width @hide="loading.page=false" v-model="minimizedModal" minimized :content-css="{borderRadius: '20px', minWidth: '50vw', backgroundColor: 'transparent', boxShadow: 'none'}" ref="modalRef">

     <div class="bg-degradado modal-subscription shadow-2 rounded-md q-my-xl">
       <div class="row items-center">
         <div class="col-md-4 q-pa-xl">
           <img :src="logo" :alt="projectName" class="full-width">
         </div>
         <div class="col-md-8">
           <div class="form-general bg-white form rounded-md line-primary border-primary q-pa-xl">
             <h4 class="text-primary text-center font-family-secondary q-my-none">Suscribirme</h4>
             <div class="q-body-2 text-center">Bienvenido, tu vaina en el mundo entero</div>
             <hr class="line-grey q-my-md">

             <!-- name -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm"> {{$tr('ui.form.name')}}: </p>
               <q-input v-model="name" inverted color="white" class="line-grey no-shadow rounded-sm" />
             </q-field>

             <!-- phone -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm">{{$tr('ui.form.phone')}}: </p>
               <q-input type="text" v-model="phone" inverted color="white" class="line-grey no-shadow rounded-sm"/>
             </q-field>

             <!-- email -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm">{{$tr('ui.form.email')}}: </p>
               <q-input type="email" v-model="email" inverted color="white" class="line-grey no-shadow rounded-sm"/>
             </q-field>

             <!-- password -->
             <q-field class="q-mb-lg">
               <p class="q-subheading q-mb-sm">{{$tr('ui.form.password')}}:</p>
               <q-input type="password" v-model="password" inverted color="white" class="line-grey no-shadow rounded-sm"/>
             </q-field>

             <!-- text -->
             <div class="q-body-2 line-text text-center q-mb-lg">
               <hr class="line-grey q-my-none full-width">
               <span class="bg-white q-px-lg">O ingresa por medio de tu red social </span>
             </div>

             <div class="row">
               <div class="col-xs-12 col-sm-6 text-center">
                 <q-btn icon="fab fa-facebook text-blue" flat label="FACEBOOK" />
               </div>
               <div class="col-xs-12 col-sm-6 text-center">
                 <q-btn icon="fab fa-google text-red-14" flat label="GOOGLE" />
               </div>
               <div class="col-12 text-center q-my-sm">
                 <q-btn class="text-primary font-family-secondary" no-caps flat label="Iniciar Sesión" />
               </div>
               <div class="col-12 text-center q-mt-sm">
                 <q-btn no-caps class="bg-primary text-white btn-arrow-send-pink">Crear cuenta</q-btn>
               </div>
             </div>

           </div>
         </div>
       </div>
     </div>
   </q-dialog>
  </q-page>



</template>
<script>
  export default {
    name: "product",
    data(){
      return {
        userId: this.$store.state.quserAuth.userId,
        logo : this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo2').path,
        projectName : "Donde esta esa vaina",
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
        // this.$router.push({ name: 'subscriptions.shopping.cart', params: { planId: planId }});
        if(this.userId){
          //push to shopping cart
          this.$router.push({ name: 'subscriptions.shopping.cart', params: { planId: planId }});
        }else{
          this.minimizedModal = true
        }

      },

    }
  }
</script>

<style lang="stylus">
</style>
