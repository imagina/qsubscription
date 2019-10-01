<template>
  <div id="pageId">
    <div class="relative-position q-mb-lg backend-page">

      <div class="box">
        <div class="row gutter-x-sm">

          <div class="col-12 text-center">
            <h4>{{product.name}}</h4>
            <p>{{product.description}}</p>
          </div>


          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"  v-for="plan in product.plans">

            <div class="q-container q-pt-lg">
              <div class="text-left">
                <h5 class="text-primary">
                  {{plan.name}}
                </h5>
                <p>{{plan.description}}</p>
              </div>
              <div class="row" v-if="plan.features.length>0">
                <ul>
                  <li style="list-style-type: none;" v-for="feature in plan.features">
                    <i class="fas fa-check q-icon text-primary"></i>
                    {{feature.name}}
                  </li>
                </ul>
              </div>
              <div class="row q-py-lg" v-else>
                No posee características
              </div>
            </div>

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

          </div>

        </div>
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
        // console.log(this.locale.fields.userId);
        //Get product
        let params = {
          refresh: true,
          params: {
            include: 'plans.features',
            filter: {allTranslations: true}
          }
        }
        this.loading.page = true;
        this.$crud.show("apiRoutes.qsubscription.products",4,params).then(response => {
          console.log(response.data);
          this.product=response.data;
          this.loading.page = false;
          // resolve(true)//Resolve
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading.page = false;
          // reject(false)//Resolve
        })
      })
    },
    data() {
      return {
        loading: {
          page: false
        },
        configName: 'apiRoutes.qsubscription.products',
        itemId: false,
        userId: this.$store.state.quserAuth.userId,
        plans:[],
        product:[],
        locale: {
          fields: {
            id: '',
            status: 0
          },
          fieldsTranslatable: {
            name: '',
            description: ''
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
        router.push({ name: 'subscriptions.checkout', params: { planId: planId }});
      }

    }
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
