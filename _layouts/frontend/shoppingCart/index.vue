<template>
  <div id="pageId" class="bg-fondo q-px-sm q-py-xl">
    <div class="q-container">
      <div class="row justify-end">
        <div class="col-auto text-center q-mb-lg">
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Inicio"  to="/" />
            <q-breadcrumbs-el :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')"/>
          </q-breadcrumbs>
        </div>
      </div>


      <div class="row q-col-gutter-lg">
        <div class="col-12">
          <div class="text-h5 font-family-secondary">
            {{$tr('qsubscription.sidebar.shoppingCart')}}
          </div>
        </div>

        <!-- LEFT SIDE -->
        <div class="col-sm-12 col-md-7 col-lg-8 q-mb-sm">

          <div v-if="plan">

            <!-- Shopping cart -->
              <q-card class="q-mt-sm rounded-sm my-card">
                <q-card-section>

                  <div class="row q-my-md">
                    <div class="col-sm-2 border">
                      <img :src="plan.mainImage.path" class=" q-mx-sm" style="max-width:96%;height:auto;">
                    </div>
                    <div class="col-4">
                      <p class="text-primary q-mt-sm q-mx-sm font-family-secondary">{{plan.name}}</p>
                      <p class="q-mx-sm">{{plan.description}}</p>
                      <!-- <p class="q-mx-sm">{{plan.frequency}} {{plan.billCycleText}}</p> -->
                      <p class="q-my-md q-mx-sm text-primary font-family-secondary">$ {{plan.price}}</p>
                    </div>
                    <div class="col-3 text-center">

                      <div class="input-title">{{`${$tr('qsubscription.layout.form.types.quantity')+' en '+plan.billCycleText}`}}</div>
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
                    <div class="col-3 text-center">
                      <q-btn @click="$router.push({name: 'app.home'})" class="q-mt-lg" round color="primary" icon="fas fa-times" />
                    </div>

                  </div>

                </q-card-section>
              </q-card>


          </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="col-sm-12 col-md-5 col-lg-4" >


          <q-card class="q-mt-sm  rounded-sm my-card">

            <div class="bg-degradado text-right" style="height: 20px;">
            </div>

            <q-card-section>

              <div class="row items-center q-my-md" v-if="plan">

                <!-- 1° Line -->
                <div class="col-12 text-center">

                  <span class="text-h5 font-family-secondary text-primary">
                    {{$tr('qsubscription.sidebar.summaryOrder')}}
                  </span>

                  <hr>

                </div>

                <div class="col-6 text-left">
                  <p class="q-title q-my-sm">Subtotal</p>
                </div>

                <div class="col-6 text-right" v-if="plan">
                  <p class="q-title q-my-sm">$ {{plan.price*quantity}}</p>
                </div>

                <!-- 5° Line -->
                <div class="col-12">
                  <hr>
                </div>

                <div class="col-6 text-left text-primary">
                  <p class="q-title q-my-sm">TOTAL</p>
                </div>

                <div class="col-6 text-right text-primary">
                  <p class="q-title q-my-sm">$ {{plan.price*quantity}}</p>
                </div>

              </div>

            </q-card-section>
          </q-card>

          <div class="q-my-lg text-center">
            <q-btn @click="$router.push({ name: 'subscriptions.checkout', params: { planId: planId,quantity:quantity }})"
            class="capitalize text-weight-bold full-width rounded-sm" size="lg" color="primary"
            :label="$tr('qsubscription.layout.form.checkout.processPurchase')" />

          </div>

        </div>

        <div class="col-sm-1"></div>


      </div>

    </div>
    <div class="relative-position q-mb-lg backend-page">



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
        {label:"1",value:1,id:1},
        {label:"2",value:2,id:2},
        {label:"3",value:3,id:3},
        {label:"4",value:4,id:4},
        {label:"5",value:5,id:5},
        {label:"6",value:6,id:6},
        {label:"7",value:7,id:7},
        {label:"8",value:8,id:8},
        {label:"9",value:9,id:9},
        {label:"10",value:10,id:10},
        {label:"11",value:11,id:11},
        {label:"12",value:12,id:12}
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
      this.$crud.create("apiRoutes.qsubscription.subscriptions",params).then(response => {

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
</style>
