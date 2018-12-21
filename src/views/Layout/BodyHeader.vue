<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item 
      v-for="(item, index) in breadList"
      :key="index"
      :to="{ path: item.path }"
      >{{ item.meta.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'BodyTitle',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        // 面包屑列表
        breadList: []
      };
    },
    computed: {},
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    },
    created() {
      this.getBreadcrumb();
    },
    mounted() {
      this.$nextTick(function() {
        this.getBreadcrumb();
      });
    },
    methods: {
      getBreadcrumb() {
        this.breadList = this.$route.matched;
        // console.log(this.$route.matched);
      }
    },
  };
</script>

<style scoped>
  .breadcrumb-box{
    display: flex;
    align-items: center;
    height: 38px;
    padding: 0 16px;
    line-height: 38px;
  }
  .breadcrumb-box >>> .el-breadcrumb{
    font-size: 12px;
  }
  .breadcrumb-box >>> .el-breadcrumb__inner.is-link{
    color: #C0C3D4;
  }
  .breadcrumb-box >>> .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    color: #000;
  }
</style>