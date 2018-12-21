<template>
  <div class="nav-container">
    <!-- 一级菜单 -->
    <div class="nav-header-bottom">
      <div class="nav-logo-title">
        <div class="head-login-bg"></div>
      </div>
      <ul class="nav-bottom-ul">
        <!-- 一级导航 -->
        <li
          v-for="(item, index) in firstListMenu"
          :key="index"
          class="nav-bottom-li"
          @click.stop="topNavClick(item.value)"
          :class="{'active': isActiveMenu(item.value)}"
        >
          <span class="nav-item">{{ item.label }}</span>
        </li>
      </ul>
      <div class="title-right-box">
        <div class="user-box">
          <div>{{ userName }}</div>
          <div>
            <img
              class="title-user-headimg"
              src="../../assets/common/user-head-img.jpg"
              alt="头像"
            >
          </div>
        </div>
        <div
          @click="logout"
          class="sign-out"
        >退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api';
import { setSession, getSession, removeSession } from '@/utils';
import first from './demoData/first.json';
import second from './demoData/second.json';

export default {
  name: 'NavHeader',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: {},
  data() {
    return {
      // 用户名称
      userName: '',
      // 头部菜单 value的值和后端一起约定
      firstListMenu: [
        {
          label: '顶部菜单一',
          value: 'first'
        },
        {
          label: '顶部菜单二',
          value: 'second'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    // 用户名称
    this.userName = getSession('user') && getSession('user').userName;
  },
  mounted() {
    this.$nextTick(function() {
      console.log(login);
    });
  },
  methods: {
    // 点击顶部导航
    topNavClick: function(key) {
      setSession('menuKey', key);
      // 重新获取左侧菜单
      this.getLeftMenu(key);
    },
    // 获取本地菜单数据
    getLeftMenu: function(key) {
      let leftlist = [];
      if (key === 'first') {
        leftlist = first;
      } else if (key === 'second') {
        leftlist = second;
      }
      // 跳转第一个菜单
      this.$router.push({
        path: leftlist[0].subMenus[0].menuUrl,
        query: {
          t: Date.now()
        }
      });
      setSession('leftMenu', leftlist);
    },
    // 接口获取左侧菜单（目前所有菜单写死）
    // getLeftMenu: function(key) {
    //   let leftlist = [];
    //   let pm = {
    //     userId: getSession('user') && getSession('user').id,
    //     appId: 1,
    //     menuKey: getSession('menuKey')
    //   };
    //   menu.getleftAuthlist(pm).then(res => {
    //     let leftlist = res.data;
    //     // 跳转第一个菜单
    //     this.$router.push({
    //       path: leftlist[0].subMenus[0].menuUrl,
    //       query: {
    //         t: Date.now(),
    //       }
    //     });
    //     setSession('leftMenu', leftlist);
    //   });
    // },
    // 退出登录
    logout: function() {
      removeSession('leftMenu');
      removeSession('menuKey');
      // login
      //   .logout({})
      //   .then(res => {
      //     this.$router.push({
      //       name: 'login'
      //     });
      //   })
      //   .catch(() => {
      //     this.$router.push({
      //       name: 'login'
      //     });
      //   });
      this.$router.push({
        name: 'login'
      });
    },
    // 是否选中
    isActiveMenu: function(val) {
      if (val === 'first') {
        return this.isFirst();
      } else if (val === 'second') {
        return this.isSecond();
      }
    },
    // 是否first
    isFirst: function() {
      let routers = this.$route;
      if (routers.matched[0].name === 'memberList') {
        return true;
      } else {
        return false;
      }
    },
    // 是否second
    isSecond: function() {
      let routers = this.$route;
      if (routers.matched[0].name === 'activityCenter') {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.nav-container {
  background-color: $--base-dark-color;
  box-shadow: 0px 3px 7px 0px rgba(182, 217, 251, 0.35);
  color: #fff;
}
.nav-bottom-ul {
  display: flex;
  flex-direction: row;
  height: 57px;
  line-height: 57px;
  padding: 0 30px;
}

.nav-header-bottom {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 30px;
}

/* 一级导航菜单 */
.nav-bottom-ul {
  justify-content: center;
  padding: 0;
  margin: 0;
  font-size: 16px;
}
.nav-bottom-li {
  list-style: none;
  margin: 0 10px;
  &.active {
    .nav-item {
      color: #fff;
      border-bottom: 4px solid #619aff;
      box-sizing: border-box;
    }
  }
  .nav-line {
    display: inline-block;
    padding: 0 20px;
    color: #9b9eac;
    text-decoration: blink;
  }
}
.nav-item {
  display: inline-block;
  padding: 0 20px;
  color: $--base-font-grop;
  text-decoration: blink;
  cursor: pointer;
}
.nav-logo-title {
  font-size: 18px;
  line-height: 60px;
}
.head-login-bg {
  margin: 11px 0;
  width: 120px;
  height: 38px;
  background: url("../../assets/logo/logo.png") no-repeat center center;
  background-size: contain;
}
/*右边*/
.title-right-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  color: #fff;
}
.sign-out {
  font-size: 14px;
  cursor: pointer;
}
.user-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  padding-left: 18px;
  margin-left: 19px;
  height: 26px;
  // border-left: 1px solid #3d445f;
}
.title-user-headimg {
  width: 20px;
  height: 20px;
  margin-left: 8px;
  border-radius: 50%;
}
</style>