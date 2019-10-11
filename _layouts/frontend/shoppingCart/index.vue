<template>
  <div id="pageId" class="bg-fondo q-px-sm q-py-xl">

    <div class="relative-position q-mb-lg backend-page">

      <div class="row">
        <div class="col-sm-1"></div>

        <!-- LEFT SIDE -->
        <div class="col-sm-7 q-mt-sm q-mb-sm">

          <div class="row" v-if="plan">

            <!-- Shopping cart -->
            <div class="col-12 q-mt-sm q-mb-sm">
              <span class="">
                Carrito de compras
              </span>
              <q-card class="q-mt-sm rounded-sm">
                <q-card-main>

                  <div class="row q-my-md">
                    <div class="col-sm-2 border">
                      <img src="/assets/img/plan-oro.png" class=" q-mx-sm" style="max-width:96%;height:auto;">
                    </div>
                    <div class="col-4">
                      <p class="text-primary q-mt-sm q-mx-sm q-title">{{plan.name}}</p>
                      <p class="q-mx-sm">{{plan.description}}</p>
                      <!-- <p class="q-mx-sm">{{plan.frequency}} {{plan.billCycleText}}</p> -->
                      <p class="q-my-md q-mx-sm text-primary">$ {{plan.price}}</p>
                    </div>
                    <div class="col-3 text-center">
                      <q-select
                      class="q-title"
                      :float-label="'Cantidad - '+plan.billCycleText"
                      v-model="quantity"
                      :options="selectOptions"
                      />
                    </div>
                    <div class="col-3 text-center">
                      <q-btn @click="$router.push({name: 'app.home'})" class="q-mt-lg" round color="primary" icon="fas fa-times" />
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


          <q-card class="q-mt-sm  rounded-sm">

            <q-card-title class="bg-degradado text-right" style="height: 20px;">
            </q-card-title>

            <q-card-main>

              <div class="row q-my-md">

                <!-- 1° Line -->
                <div class="col-12 text-center">

                  <span class="q-title">
                    Resumen de tu Pedido
                  </span>

                  <hr>

                </div>

                <div class="col-6 text-left q-mt-sm">
                  <p class="q-title">Subtotal</p>
                </div>

                <div class="col-6 text-right q-mt-sm" v-if="plan">
                  <p class="q-title">$ {{plan.price*quantity}}</p>
                </div>

                <!-- 5° Line -->
                <div class="col-12">
                  <hr>
                </div>

                <div class="col-6 text-left text-primary q-mt-md">
                  <p class="q-title">TOTAL</p>
                </div>

                <div class="col-6 text-right text-primary q-mt-md">
                  <p class="q-title">$ {{plan.price*quantity}}</p>
                </div>

              </div>

            </q-card-main>
          </q-card>

          <div class="q-my-lg text-center">
            <q-btn @click="submit()" style="border-radius: 10px;border-color:black;border-style:solid;"
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
      console.log('asdiajdioajdoasjdoad index checkout');
      console.log('EL plan:');
      console.log(this.planId);
      console.log('userId');
      console.log(this.userId);
      this.getPlan();
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
      plan:null,
      userId: this.$store.state.quserAuth.userId,
      planId:this.$route.params.planId,
      status: 0,
      selectOptions:[
        {label:"1",value:1},
        {label:"2",value:2},
        {label:"3",value:3},
        {label:"4",value:4},
        {label:"5",value:5},
        {label:"6",value:6},
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

    getPlan(){
      if(this.planId){
        //Params
        let params = {
          refresh: true,
          params: {
            include: 'features',
            filter: {allTranslations: true}
          }
        }

        //Request
        this.$crud.show("apiRoutes.qsubscription.plans",this.planId,params).then(response => {
          this.plan=response.data;
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
      }
    },
    submit(){
      let params={
          plan_id:this.planId,
          quantity:this.quantity,
      };
      this.$crud.create("apiRoutes.qsubscription.suscriptions",params).then(response => {

        this.$alert.success({message: this.$tr('qsubscription.messages.success.createSubscription'), pos: 'bottom'})
        this.$router.push({ name: 'app.home'});

      }).catch(error => {
        this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
      })
    }

  }
}
</script>
<style lang="stylus">
@import "~variables";
</style>
