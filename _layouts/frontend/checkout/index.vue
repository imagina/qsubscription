<template>
  <q-page class="page">
    <div class="bg-fondo q-px-sm q-py-xl">
      <div class="q-container">
        <div class="row justify-end">
          <div class="col-auto text-center q-mb-lg">
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Inicio"  to="/" />
              <q-breadcrumbs-el :label="$tr('qsubscription.layout.form.checkout.finalizePurchase')"/>
            </q-breadcrumbs>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <h5 class="q-ma-md text-secondary font-family-secondary">
                <i class="fas fa-credit-card text-primary"></i>
                {{$tr('qsubscription.layout.form.checkout.paymentMethods')}}
            </h5>
          </div>
        </div>
        <div class="row q-col-gutter-lg">

          <div class="col-sm-12 col-md-7 col-lg-8 q-mb-sm">
            <!-- Shipping info -->

            <q-card class="rounded-sm bg-white q-mb-xl">

              <q-card-section class="q-pa-xl form-general">

                <div class="row gutter-md justify-center">
                  <div class="col-12">

                    <div v-for="payMethod in paymentMethods" :key="payMethod.id">
                        <img :src="payMethod.mainImage.path" style="height: 70px; max-width: 100%"/>
                      <q-radio style="text-transform:capitalize;"  v-model="paymentMethodId" :val="payMethod.id" :label="$tr(payMethod.title)" />
                      <hr class="line-grey q-my-md">
                    </div>


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

                <div class="row q-col-gutter-sm">
                  <div class="col-xs-5 col-sm-2 col-md-2">
                    <div style="border: 2px solid #ccc;">
                      <q-img :ratio="1" :src="plan.mainImage.path" :alt="plan.name" />
                    </div>
                  </div>
                  <div class="col-xs-7 col-sm-6 col-md-6">
                    <h6 class="text-primary font-family-secondary q-mt-sm q-mb-none">{{plan.name}}</h6>
                    <div class="q-body-1 text-secondary q-mb-lg">{{plan.description}}</div>
                    <div class="q-subheading text-primary text-bold q-mb-lg">$ {{plan.price}}</div>
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
                <h6 class="text-bold q-my-lg">
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
                class="capitalize text-bold full-width rounded-sm q-mb-md" color="primary"
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
    });
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
        this.$crud.create("apiRoutes.qsubscription.subscriptions",params).then(response => {

          this.$alert.success({message: this.$tr('qsubscription.messages.success.createSubscription'), pos: 'bottom'});

          //Update Role
          var update=false;
          for(let i=0;i<this.$store.state.quserAuth.userData.roles.length;i++){
            if(this.$store.state.quserAuth.userData.roles[i].slug=="superadmin"){
              update=false;
              break;
            }else if(this.$store.state.quserAuth.userData.roles[i].slug=="business"){
              update=false;
              break;
            }else{
              update=true;
            }
          }//for
          if(update){
            let params={
              id:this.userId,
              roles:[
                8
              ],
              activated:1
            };
            if(this.planId==3){
              //Directory
              params.roles=[11];
            }else if(this.planId==6){
              //Free
              params.roles=[9];
            }else if(this.planId==7){
              //Independient
              params.roles=[10];
            }
            this.$crud.update("apiRoutes.quser.users",this.userId,params).then(response => {
              this.$router.push({ name: 'app.home'});
            }).catch(error => {
              this.$alert.error({message: error, pos: 'bottom'})
            });
          }//update

          this.$router.push({ name: 'qmarketplace.admin.subscriptions.mysubscriptions'});

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
