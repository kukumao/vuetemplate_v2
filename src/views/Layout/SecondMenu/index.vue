<template>
  <div>
    <div class="side-box">
      <el-menu ref="leftMenue" :default-active="activitedRules" unique-opened class="leftMenue el-menu-vertical-demo"  background-color="#3D445F" active-text-color="#509aff" router>
        <!-- 循环路由 -->
        <second-el-menu-item v-for="(item, index) in menuList" :key="index" :menuObj="item">
        </second-el-menu-item>

      </el-menu>
    </div>
  </div>
</template>

<script>
import SecondElMenuItem from './SecondElMenuItem.vue';
// import { menu } from '@/api';
import first from '../demoData/first.json';
import second from '../demoData/second.json';
import { getSession } from '@/utils';
export default {
  name: 'SecondMenu',
  components: { SecondElMenuItem },
  directives: {},
  filters: {},
  mixins: [],
  props: {},
  data() {
    return {
      menuList: [],
      activitedRules: ''
    };
  },
  computed: {},
  watch: {
    $route: {
      handler(to, from) {
        if (getSession('leftMenu')) {
          this.$set(this, 'menuList', getSession('leftMenu'));
        };
      },
      deep: true
    }
  },
  created() {
    // 设置当前激活菜单的index，同时菜单使用了router属性，子菜单index与该值相同会激活并跳转对应路由
    this.$set(this, 'activitedRules', this.$route.meta.menuKeyPath);

  },
  mounted() {
    this.$nextTick(function() {
      // 获取左侧导航数据
      if (this.menuList.length === 0 && getSession('leftMenu')) {
        this.$set(this, 'menuList', getSession('leftMenu'));
      } else if (this.menuList.length === 0) {
        this.getLeftMenu();
      }
    });
  },
  methods: {
    // 获取本地菜单数据
    getLeftMenu: function() {
      let menuKey = getSession('menuKey') || 'first';
      this.$set(this, 'menuList', null);
      if (menuKey === 'first') {
        this.$set(this, 'menuList', first);
      } else if (menuKey === 'second') {
        this.$set(this, 'menuList', second);
      }
      this.$set(this, 'activitedRules', this.$route.meta.menuKeyPath);
    },
    // 接口获取左侧导航数据（目前不用，因为小天鹅所有菜单写死）
    // getLeftMenu: function() {
    //   let menuKey = getSession('menuKey');
    //   let pm = {
    //     userId: getSession('user') && getSession('user').id,
    //     appId: 1,
    //     menuKey: menuKey || 'vip'
    //   };
    //   menu.getleftAuthlist(pm).then(res => {
    //     this.$set(this, 'menuList', null);
    //     this.$set(this, 'menuList', res.data);
    //     this.$set(this, 'activitedRules', this.$route.meta.menuKeyPath);
    //   });
    // }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  border: none;
}
.side-box {
  min-width: 200px;
  /* min-height: 600px; */
  height: 100%;
}
.side-box >>> .el-submenu__title {
  font-size: 13px;
  color: #fff;
}
.side-box >>> .el-menu-item {
  font-size: 12px;
  color: #9b9eac;
}
.side-box >>> .el-menu-vertical-demo > li {
  border-top: 1px solid #2d3349;
}
.side-box >>> li.el-menu-item {
  height: 40px;
  line-height: 40px;
}
/*图标*/
.nav-icon-box {
  display: inline-block;
  margin-right: 5px;
  width: 16px;
  height: 16px;
}
/*会员列表*/
.md-icon__memberList {
  background: url('../../../assets/common/common-nav-icon.png') no-repeat 0 0;
  background-size: 120px 72px;
}
</style>