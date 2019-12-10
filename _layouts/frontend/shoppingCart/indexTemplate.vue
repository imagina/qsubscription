<template>
  <div id="pageId">

    <div class="relative-position q-mb-lg backend-page">

      <div class="row">
        <div class="col-sm-1"></div>

        <!-- LEFT SIDE -->
        <div class="col-sm-7 q-mt-sm q-mb-sm">

          <div class="row">

            <!-- Shopping cart -->
            <div class="col-12 q-mt-sm q-mb-sm">
              <span class="">
                {{$tr('qsubscription.sidebar.shoppingCart')}}
              </span>
              <q-card class="q-mt-sm rounded-sm">
                <q-card-main>

                  <div class="row q-my-md">
                    <div class="col-sm-2 border">
                      <img src="/assets/img/plan-oro.png" class=" q-mx-sm" style="max-width:96%;height:auto;">
                    </div>
                    <div class="col-4">
                      <p class="text-primary q-mt-sm q-mx-sm q-title">Plan plata</p>
                      <p class="q-mx-sm">Atractivo e interesante</p>
                      <p class="q-my-md q-mx-sm text-primary">$000.000</p>
                      <p class="q-mx-sm">Enviado y Vendido por Lorem Ipsum</p>
                    </div>
                    <div class="col-3 text-center">
                      <q-select
                      class="q-title"
                      float-label="Cantidad"
                      v-model="quantity"
                      :options="selectOptions"
                      />
                    </div>
                    <div class="col-3 text-center">
                      <q-btn class="q-mt-lg" round color="primary" icon="fas fa-times" />
                    </div>

                    <div class="col-12 q-mt-sm">

                      <hr>
                      <span class="text-primary q-my-sm q-ml-md">
                        <i class="fas fa-shopping-basket"></i>
                        Opciones de envio
                      </span>
                      <br>
                      <q-radio class="q-ml-xl" v-model="shippingOptions" val="lorem"  label="Lorem ipsum dolor sit amet, co" />


                    </div>

                  </div>

                </q-card-main>
              </q-card>
            </div>

          </div>

        </div>

        <div class="col-sm-1"></div>

        <!-- RIGHT SIDE -->
        <div class="col-sm-2">


          <q-card class="q-mt-sm rounded-sm">
            <q-card-title class="bg-degradado text-right" style="height: 20px;">
            </q-card-title>
            <q-card-main>

              <div class="row q-my-md">

                <!-- 1° Line -->
                <div class="col-12 text-center">

                  <span class="q-title">
                    {{$tr('qsubscription.sidebar.summaryOrder')}}
                  </span>

                  <hr>

                </div>

                <div class="col-6 text-left q-mt-sm">
                  <p class="q-title">Subtotal</p>
                </div>

                <div class="col-6 text-right q-mt-sm">
                  <p class="q-title">$180,500</p>
                </div>

                <!-- 2nd Line -->
                <div class="col-12">
                  <hr>
                </div>

                <div class="col-6 text-left q-mt-sm">
                  <p class="q-title">Envío</p>
                </div>

                <div class="col-6 text-right q-mt-sm">
                  <p class="q-title">$0</p>
                </div>

                <!-- 3r Line -->
                <div class="col-12">
                  <hr>
                </div>

                <div class="col-6 text-left q-mt-sm">
                  <p class="q-title">Descuento</p>
                </div>

                <div class="col-6 text-right q-mt-sm">
                  <p class="q-title">$0</p>
                </div>

                <!-- 4d -->
                <div class="col-12">
                  <hr>
                </div>

                <div class="col-12 text-left q-mt-sm">
                  <a class="q-title text-black" style="text-decoration: underline ;" href="#">
                    Calcular envío
                  </a>
                </div>

                <!-- 5° Line -->
                <div class="col-12">
                  <hr>
                </div>

                <div class="col-6 text-left text-primary q-mt-md">
                  <p class="q-title">TOTAL</p>
                </div>

                <div class="col-6 text-right text-primary q-mt-md">
                  <p class="q-title">$180,500</p>
                </div>

              </div>

            </q-card-main>
          </q-card>

          <div class="q-my-lg text-center">
            <q-btn style="border-radius: 10px;border-color:black;border-style:solid;"
            class="capitalize text-weight-bold full-width" color="primary"
            label="PROCESAR COMPRA" />

          </div>

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
      console.log('asdiajdioajdoasjdoad index checkout');
      console.log('EL plan:');
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
        {label:"1",value:"1"}
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
</style>
