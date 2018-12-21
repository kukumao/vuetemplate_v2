<template>
  <!-- 通用布局页面 -->
  <router-view class="layout-body-view" name="bodyView"></router-view>
</template>

<script>
  export default {
    name: 'Layout',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {

      });
    },
    methods: {
      /** --------------- 说明 -------------  */
    },
  };
</script>

<style scoped>
</style>