<template>
  <div id="pageId">



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
      name: '',
      phone: '',
      email: '',
      password: '',
      locale: {
        fields: {
          id: '',

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
