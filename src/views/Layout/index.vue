<template>
  <!-- 通用布局页面 -->
  <div class="layout-app-wrapper">
    <div class="hei100"></div>
    <!-- 头部区（logo、一级菜单） -->
    <router-view
      class="layout-app-header"
      name="appHeader"
    ></router-view>
    <div class="layout-app-main">
      <!-- 二级菜单区 -->
      <router-view
        class="layout-second-menu"
        v-if="isRouterActive"
        name="secondMenu"
      ></router-view>
      <!-- 主内容区 -->
      <div class="layout-body-wrapper">
        <router-view
          class="layout-body-header"
          name="bodyHeader"
        ></router-view>
        <router-view
          class="layout-body-view"
          name="bodyView"
        ></router-view>
      </div>
    </div>
  </div>
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
    return { isRouterActive: true };
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.query.t) {
        this.isRouterActive = false;
        this.$nextTick(() => (this.isRouterActive = true));
      }
    }
  },
  created() {},
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
/* 整个页面 */
.layout-app-wrapper {
  display: flex;
  min-width: 1200px;
  height: 100%;
  flex-direction: column;
}
.layout-app-header {
  flex: none;
}
/* 主要内容区 */
.layout-app-main {
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* 二级菜单 */
.layout-second-menu {
  background: $--base-dark-bgcolor;
  min-width: 200px;
  flex: none;
}
/* 次级内容区 */
.layout-body-wrapper {
  flex: auto;
  display: flex;
  flex-direction: column;
  min-width: 600px;
}
/* 只有存在侧边栏时，才有左右边距 */
.layout-second-menu + .layout-body-wrapper {
  /* margin: 0 20px; */
}

.layout-body-header {
  /* font-size: 18px;
    line-height: 2;
    font-weight: 700; */
  flex: none;
}
/* 页面显示主要内容区 */
.layout-body-view {
  flex: 1 0 auto;
  margin: 0 16px 16px;
  padding: 24px;
  background-color: #fff;
}
</style>