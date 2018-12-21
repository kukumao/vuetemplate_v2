<template>
  <div class="error-page-container">
    <div class="error-content">
      <div class="bg-pic">
        <div class="error-text">
          <p>我是<span class="big">404</span>，你迷路了。</p>
          <p>或许你想去<a class="big blue" href="javascript:;" @click="$router.push('/home')">首页</a>？</p>
          <p>还是想回到<a class="big blue" href="javascript:;" @click="$router.go(-1)">上一页</a>？</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorPage',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
      };
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

<style lang="scss" scoped>
  .error-page-container{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .error-content{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  .bg-pic{
    position: relative;
    margin: 0 auto;
    width: 382px;
    height: 340px;
    background: url('../../assets/404_images/bg-404.png') no-repeat;
  }
  .error-text{
    position: absolute;
    left: 94px;
    font-size: 24px;
    line-height: 24px;
    .big{
      font-size: 32px;
    }
    .blue{
      color: #0a9dfa;
      text-decoration: none;
    }
  }
</style>