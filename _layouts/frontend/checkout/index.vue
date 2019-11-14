<template>
  <q-page class="page">

    <div class="bg-fondo q-px-sm q-py-xl">
      <div class="q-container">
        <div class="row justify-end">
          <div class="col-auto text-center q-my-lg">
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Inicio"  to="/" />
              <q-breadcrumbs-el :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')"/>
            </q-breadcrumbs>
          </div>
        </div>
        <!-- Shipping info -->
<!--
        <div class="row">
          <div class="col-12">
            <h5 class="q-ma-md text-secondary font-family-secondary"><i class="fas fa-truck text-primary"></i>
              {{$tr('qsubscription.layout.form.checkout.shippingInformation')}}
            </h5>
          </div>
        </div> -->

        <div class="row gutter-lg">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">

            <!-- Shipping info -->
            <!-- <q-card class="rounded-sm bg-white q-mb-xl">

              <q-card-main class="q-pa-xl form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.name')}}</p>
                      <q-input type="text" v-model="name" placeholder="Emelis" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.phone')}}</p>
                      <q-input type="text" v-model="phone" placeholder="+00 00 00" />
                    </q-field>
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('qsubscription.layout.form.checkout.cityResidence')}}</p>
                      <q-select
                        v-model="city_id"
                        :options="cities"
                      />
                    </q-field>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.lastName')}}</p>
                       <q-input type="text" v-model="lastName" placeholder="Gonzalez" />
                    </q-field>

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-sm">{{$tr('ui.form.email')}}</p>
                       <q-input type="email" v-model="email" placeholder="info@lorem.com" />
                    </q-field>

                    <q-field class="q-mb-xl">
                      <p class="caption q-mb-none">{{$tr('ui.form.address')}}</p>
                       <q-input type="text" v-model="address" stack-label="(Para la entrega de productos adquiridos)" placeholder="Lorem ipsom" />
                    </q-field>

                  </div>

                  <div class="col-xs-12 col-sm-6 text-center">
                    <q-btn outline size="lg" class="rounded-md" no-caps icon="fa fa-truck text-primary" :label="$tr('qsubscription.layout.form.checkout.homeDelivery')" />
                  </div>
                  <div class="col-xs-12 col-sm-6 text-center">
                      <q-btn outline size="lg" class="rounded-md" no-caps icon="fa fa-shopping-basket text-primary" :label="$tr('qsubscription.layout.form.checkout.storePickup')" />
                  </div>

                </div>
              </q-card-main>

            </q-card> -->

            <!-- Shipping info -->



            <h5 class="q-ma-md text-secondary font-family-secondary">
                <i class="fas fa-credit-card text-primary"></i>
                {{$tr('qsubscription.layout.form.checkout.paymentMethods')}}
            </h5>

            <q-card class="rounded-sm bg-white q-mb-xl">

              <q-card-section class="q-pa-xl form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-12">

                    <!-- <hr class="line-grey">
                    <div class="text-primary q-subheading q-my-lg">
                    <i class="fas fa-credit-card q-mr-md"></i>
                        <strong>
                          Paypal
                        </strong>
                    </div> -->
                    <hr class="line-grey">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ei.</span>

                    <div class="q-my-xl">
                      <span >
                        <i class="fab fa-cc-mastercard q-mr-sm fa-4x"></i>
                      </span>
                      <span >
                        <i class="fab fa-cc-visa q-mr-sm fa-4x"></i>
                      </span>
                      <span >
                        <i class="fab fa-cc-diners-club q-mr-sm fa-4x"></i>
                      </span>
                      <span >
                        <i class="fab fa-cc-amex q-mr-sm fa-4x"></i>
                      </span>
                    </div>

                    <q-radio style="text-transform:capitalize;" v-for="payMethod in paymentMethods" v-model="paymentMethodId" :val="payMethod.id" :key="payMethod.id" :label="payMethod.name" />
                    <hr class="line-grey q-my-md">
                    <!-- <q-radio v-model="paymentMethod" val="payu" label="PayU" />
                    <hr class="line-grey q-my-md">
                    <q-radio v-model="paymentMethod" val="contraentrega"  label="Contraentrega" />
                    <hr class="line-grey q-mt-md"> -->

                  </div>
                </div>

              </q-card-section>

            </q-card>


            <h5 class="q-ma-md text-secondary font-family-secondary">
              <i class="fas fa-shopping-basket text-primary"></i>
                 {{$tr('qsubscription.layout.form.checkout.products')}}
            </h5>

            <q-card class="rounded-sm bg-white q-pa-md" v-if="plan">

              <q-card-section>

                <div class="row gutter-sm">
                  <div class="col-xs-5 col-sm-2 col-md-2">
                    <div class="ratio-1" style="border: 2px solid #ccc;">
                      <img :src="plan.mainImage.path" :alt="plan.name" class="responsive">
                    </div>
                  </div>
                  <div class="col-xs-7 col-sm-6 col-md-6">
                    <h6 class="text-primary font-family-secondary q-mt-sm q-mb-none">{{plan.name}}</h6>
                    <div class="q-body-1 text-secondary q-mb-lg">{{plan.description}}</div>
                    <div class="q-subheading text-primary text-weight-bold q-mb-lg">$ {{plan.price}}</div>
                    <!-- <div class="q-body-1 text-secondary q-mb-sm">Enviado y Vendido por Lorem Ipsum</div> -->
                  </div>
                  <div class="col-xs-11 col-sm-3 col-lg-3 self-center">
                    <div class="row items-center">
                      <div class="col-6 text-right q-pr-sm">
                        <div class="q-body-1 text-secondary">{{$tr('qsubscription.layout.form.types.quantity')}}</div>
                      </div>
                      <div class="col-6">
                        <tree-select
                          :clearable="false"
                          :append-to-body="true"
                          class="q-mb-md"
                          :options="selectOptions"
                          value-consists-of="BRANCH_PRIORITY"
                          v-model="quantity"
                          placeholder=""
                        />

                      </div>
                    </div>
                  </div>
                  <div class="col-xs-1 col-sm-1 col-md-1 self-center">
                      <q-btn round color="primary" @click="$router.push({name: 'app.home'})" icon="fas fa-times" />
                  </div>
                </div>
                <!-- SHIPPING OPTIONS -->
                <!-- <div class="row">
                  <div class="col-12">
                    <hr class="line-grey q-my-md">
                    <h6 class="text-primary font-family-secondary q-mt-sm q-mb-none">
                      <i class="fas fa-shopping-basket"></i>
                      {{$tr('qsubscription.layout.form.checkout.shippingOptions')}}
                    </h6>
                    <q-field class="q-mt-md">
                      <q-radio class="q-ml-xl" v-model="shippingOptions" val="lorem"  label="Lorem ipsum dolor sit amet, co" />
                    </q-field>
                    <hr class="line-grey q-mt-md">
                  </div>
                </div> -->

              </q-card-section>

            </q-card>

            <div class="row" v-if="plan">
              <div class="col-12 text-right">
                <h6 class="text-weight-bold q-my-lg">
                    TOTAL
                    <span class="text-primary q-pl-md">$ {{plan.price*quantity}}</span>
                </h6>
                <q-btn
                  @click="submit()"
                  size="lg"
                  class="capitalize text-weight-bold rounded-sm q-mb-md" color="primary"
                  :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')" />
              </div>
            </div>


          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <q-card class="rounded-sm bg-white plan" v-if="plan">
              <q-card-section style="color: #333333;">
              <q-btn size="lg" @click="submit()"
                class="capitalize text-weight-bold full-width rounded-sm q-mb-md" color="primary"
                :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')" />
                <hr class="line-grey">
                <div class="row">
                  <div class="col-6">
                    <p class="q-subheading q-my-md">Subtotal</p>
                  </div>
                  <div class="col-6 text-right">
                    <p class="q-subheading q-my-md">$ {{plan.price*quantity}}</p>
                  </div>
                </div>
                <!-- <hr class="line-grey">
                <div class="row">
                  <div class="col-6">
                    <p class="q-subheading q-my-md">{{$tr('qsubscription.layout.form.checkout.shipping')}}</p>
                  </div>
                  <div class="col-6 text-right">
                    <p class="q-subheading q-my-md">$0</p>
                  </div>
                </div> -->
                <!-- <hr class="line-grey">
                <div class="row">
                  <div class="col-6">
                    <p class="q-subheading q-my-md">{{$tr('qsubscription.layout.form.checkout.discount')}}</p>
                  </div>
                  <div class="col-6 text-right">
                    <p class="q-subheading q-my-md">$0</p>
                  </div>
                </div> -->
                <!-- <hr class="line-grey">
                <div class="row">
                  <div class="col-12">
                    <div class="q-subheading q-my-md cursor-pointer" ><u>{{$tr('qsubscription.layout.form.checkout.calculateShipping')}}</u></div>
                  </div>
                </div> -->
                <hr class="line-grey">
                <div class="row">
                  <div class="col-6">
                    <p class="q-subheading text-weight-bold q-my-md">TOTAL</p>
                  </div>
                  <div class="col-6 text-right">
                    <p class="q-subheading text-weight-bold text-primary q-my-md">$ {{plan.price*quantity}}</p>
                  </div>
                </div>
              </q-card-section>
            </q-card>

          </div>
        </div>
      </div>
    </div>


  </q-page>
</template>
<script>
//Plugins
import {required} from 'vuelidate/lib/validators'
//Components
import mediaForm from '@imagina/qmedia/_components/form'
export default {
  props: {},
  components: { mediaForm},
  watch: {},
  validations() {
    return {}
  },
  mounted() {
    this.$nextTick(function () {
      this.getPlan();
      this.getPaymentMethods();
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
      plan:null,
      paymentMethods:[],
      userId: this.$store.state.quserAuth.userId,
      planId:this.$route.params.planId,
      quantity:this.$route.params.quantity,
      status: 0,
      selectOptions:[
        {value:1,id:1,label:"1"},
        {value:2,id:2,label:"2"},
        {value:3,id:3,label:"3"},
        {value:4,id:4,label:"4"},
        {value:5,id:5,label:"5"},
        {value:6,id:6,label:"6"},
        {value:7,id:7,label:"7"},
        {value:8,id:8,label:"8"},
        {value:9,id:9,label:"9"},
        {lvalue:10,id:10,label:"10"},
        {lvalue:11,id:11,label:"11"},
        {lvalue:12,id:12,label:"12"}
      ],
      cities:[
        {label:"Bogotá",value:"CO_BO"},
        {label:"Ibagué",value:"CO_IB"}
      ],
      shippingOptions:"lorem",
      name: '',
      lastName: '',
      phone: '',
      email: '',
      city_id:'CO_BO',
      address:'',
      paymentMethodId:null,
      locale: {
        fields: {
          id: '',
          name:''
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

    submit(){
      if(!this.paymentMethodId){
        this.$alert.error({message: this.$tr('qsubscription.messages.error.selectPaymentMethod'), pos: 'bottom'})
      }else{
        let params={
          plan_id:this.planId,
          quantity:this.quantity,
          payment_method_id:this.paymentMethodId
        };
        this.$crud.create("apiRoutes.qsubscription.suscriptions",params).then(response => {

          this.$alert.success({message: this.$tr('qsubscription.messages.success.createSubscription'), pos: 'bottom'})
          this.$router.push({ name: 'app.home'});

        }).catch(error => {
          this.$alert.error({message: error, pos: 'bottom'})
          // this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
      }
    },

    getPlan(){
      if(this.planId){
        //Params
        let params = {
          refresh: true,
          params: {
            include: '',
            filter: {allTranslations: true}
          }
        }

        //Request
        this.$crud.show("apiRoutes.qsubscription.plans",this.planId,params).then(response => {
          this.plan=response.data;
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
      }else{
        this.$router.push({ name: 'app.home'});
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
      }
    },
    getPaymentMethods(){
      //Get
      this.$crud.index("apiRoutes.qsubscription.paymentMethods").then(response => {
        this.paymentMethods=response.data;
      })
    }

  }
}
</script>
<style lang="stylus">
</style>
