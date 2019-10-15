<template>
  <div id="pageId">

    <div class="relative-position q-mb-lg backend-page">

      <div class="row">
        <div class="col-sm-1"></div>

        <!-- LEFT SIDE -->
        <div class="col-sm-6 q-mt-sm q-mb-sm">

          <div class="row">

            <!-- SHIPPING DATA  -->
            <div class="col-sm-12 q-mt-sm q-mb-sm">
              <span class="">
                <i class="fas fa-truck text-primary"></i>
                {{$tr('qsubscription.layout.form.checkout.shippingInformation')}}
              </span>
              <q-card style="border-radius: 10px;" class="q-mt-sm">
                <q-card-main>

                  <div class="row">

                    <!-- Name -->
                    <div class="col-sm-6">

                      <q-field>
                        <q-input :stack-label="$tr('ui.form.name')"
                        type="text" v-model="name"/>
                      </q-field>
                    </div>

                    <!-- lastName -->
                    <div class="col-sm-6">
                      <q-field>
                        <q-input :stack-label="$tr('ui.form.lastName')"
                        type="text" v-model="lastName"/>
                      </q-field>
                    </div>

                    <!-- phone -->
                    <div class="col-sm-6">
                      <q-field>
                        <q-input :stack-label="$tr('ui.form.phone')"
                        type="text" v-model="phone"/>
                      </q-field>
                    </div>

                    <!-- email -->
                    <div class="col-sm-6">
                      <q-field>
                        <q-input :stack-label="$tr('ui.form.email')"
                        type="text" v-model="email"/>
                      </q-field>
                    </div>

                    <!-- city -->
                    <div class="col-sm-6">

                      <q-select
                      :float-label="$tr('qsubscription.layout.form.checkout.cityResidence')"
                      v-model="city_id"
                      :options="cities"
                      />

                    </div>

                    <!-- Dirección -->
                    <div class="col-sm-6">
                      <q-field>
                        <q-input :stack-label="$tr('ui.form.address')"
                        type="text" v-model="address"/>
                      </q-field>
                    </div>

                    <div class="col-sm-6 text-center q-mt-sm">
                      <q-btn outline style="border-radius: 10px;border-color:black;border-style:solid;" class="capitalize text-weight-bold" icon="fa fa-truck text-primary" :label="$tr('qsubscription.layout.form.checkout.homeDelivery')" />
                    </div>
                    <div class="col-sm-6 text-center q-mt-sm">
                      <q-btn outline style="border-radius: 10px;border-color:black;border-style:solid;" class="capitalize text-weight-bold" icon="fa fa-shopping-basket text-primary" :label="$tr('qsubscription.layout.form.checkout.storePickup')" />
                    </div>

                  </div>

                </q-card-main>
              </q-card>
            </div>

            <!-- Payment methods -->
            <div class="col-sm-12 q-mt-sm q-mb-sm">
              <span class="">
                <i class="fas fa-credit-card text-primary"></i>
                {{$tr('qsubscription.layout.form.checkout.paymentMethods')}}
              </span>
              <q-card style="border-radius: 10px;" class="q-mt-sm">
                <q-card-main>

                  <div class="row q-my-md">

                    <div class="col-sm-12">
                      <hr>
                      <span class="text-primary">
                        <i class="fas fa-credit-card q-mr-md"></i>
                        <strong>
                          Paypal
                        </strong>
                      </span>
                      <hr>
                      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ei.</span>
                      <br>
                      <div class="q-my-md">
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
                      <br>
                      <q-radio v-model="paymentMethod" val="paypal" label="Paypal" />
                      <hr>
                      <q-radio v-model="paymentMethod" val="payu" label="PayU" />
                      <hr>
                      <!-- <i class="fas fa-truck text-primary"></i> -->
                      <q-radio v-model="paymentMethod" val="contraentrega"  label="Contraentrega" />
                      <hr>
                    </div>

                  </div>

                </q-card-main>
              </q-card>
            </div>

            <!-- Products -->
            <div class="col-sm-12 q-mt-sm q-mb-sm">
              <span class="">
                <i class="fas fa-shopping-basket text-primary"></i>
                {{$tr('qsubscription.layout.form.checkout.products')}}
              </span>
              <q-card style="border-radius: 10px;" class="q-mt-sm">
                <q-card-main>

                  <div class="row q-my-md">
                    <div class="col-sm-2 border">
                      <img src="/assets/img/plan-oro.png" class=" q-mx-sm" alt="" style="height:100%;width:100%;">
                    </div>
                    <div class="col-sm-4">
                      <p class="text-primary q-mt-sm q-mx-sm q-title">Plan plata</p>
                      <p class="q-mx-sm">Atractivo e interesante</p>
                      <p class="q-my-md q-mx-sm text-primary">$000.000</p>
                      <p class="q-mx-sm">Enviado y Vendido por Lorem Ipsum</p>
                    </div>
                    <div class="col-sm-3 text-center">
                      <q-select
                      class="q-title"
                      float-label="Cantidad"
                      v-model="quantity"
                      :options="selectOptions"
                      />
                    </div>
                    <div class="col-sm-3 text-center">
                      <q-btn class="q-mt-lg" round color="primary" icon="fas fa-times" />
                    </div>

                    <div class="col-sm-12 q-mt-sm">

                      <hr>
                      <span class="text-primary q-my-sm q-ml-md">
                        <i class="fas fa-shopping-basket"></i>
                        {{$tr('qsubscription.layout.form.checkout.shippingOptions')}}
                      </span>
                      <br>
                      <q-radio class="q-ml-xl" v-model="shippingOptions" val="lorem"  label="Lorem ipsum dolor sit amet, co" />


                    </div>

                  </div>

                </q-card-main>
              </q-card>
            </div>

            <div class="col-sm-12 q-mt-md q-mb-sm text-right">
              <label class="text-primary">TOTAL $ 180,500</label>
              <br>
              <q-btn class="q-mt-lg" color="primary" :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')" />

            </div>

          </div>

        </div>

        <div class="col-sm-1"></div>

        <!-- RIGHT SIDE -->
        <div class="col-sm-3">


          <q-card style="border-radius: 10px;" class="q-mt-sm">
            <q-card-main>

              <div class="row q-my-md">

                <!-- 1° Line -->
                <div class="col-sm-12">

                  <q-btn class="full-width"  color="primary" :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')" />

                  <hr>

                </div>

                <div class="col-sm-6 text-left">
                  <p class="q-title">Subtotal</p>
                </div>

                <div class="col-sm-6 text-right">
                  <p class="q-title">$180,500</p>
                </div>

                <!-- 2nd Line -->
                <div class="col-sm-12">
                  <hr>
                </div>

                <div class="col-sm-6 text-left">
                  <p class="q-title">{{$tr('qsubscription.layout.form.checkout.shipping')}}</p>
                </div>

                <div class="col-sm-6 text-right">
                  <p class="q-title">$0</p>
                </div>

                <!-- 3r Line -->
                <div class="col-sm-12">
                  <hr>
                </div>

                <div class="col-sm-6 text-left">
                  <p class="q-title">{{$tr('qsubscription.layout.form.checkout.discount')}}</p>
                </div>

                <div class="col-sm-6 text-right">
                  <p class="q-title">$0</p>
                </div>

                <!-- 4d -->
                <div class="col-sm-12">
                  <hr>
                </div>

                <div class="col-sm-12 text-left">
                  <a class="q-title text-black" style="text-decoration: underline ;" href="#">
                    {{$tr('qsubscription.layout.form.checkout.calculateShipping')}}
                  </a>
                </div>

                <!-- 5° Line -->
                <div class="col-sm-12">
                  <hr>
                </div>

                <div class="col-sm-6 text-left text-primary q-mt-md">
                  <p class="q-title">TOTAL</p>
                </div>

                <div class="col-sm-6 text-right text-primary q-mt-md">
                  <p class="q-title">$180,500</p>
                </div>

              </div>

            </q-card-main>
          </q-card>

        </div>

        <div class="col-sm-1"></div>


      </div>


    </div>


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
      console.log('planId:');
      console.log(this.planId);
      console.log('userId');
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
      planId:this.$route.params.planId,
      status: 0,
      selectOptions:[
        {label:"1",value:1}
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
      paymentMethod:"",
      quantity:1,
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

  }
}
</script>
<style lang="stylus">
@import "~variables";
</style>
