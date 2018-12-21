<template>
  <div>
    <div class="login-page">
      <section class="main">
        <div class="theme">
          <img src="../../assets/logo/banner01.jpg" />
        </div>
        <div class="main-inner">
          <div class="login-block">
            <h3 class="h2">欢迎登录</h3>
            <el-form
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              label-width="0"
              class="demo-ruleForm"
            >
              <el-form-item
                label=""
                prop="name"
              >
                <div class="feild">
                  <el-input
                    id="user"
                    name="account"
                    type="text"
                    v-model.trim="loginForm.name"
                    placeholder="用户名"
                  >
                    <template slot="prepend">
                      <i class="el-icon-edit"></i>
                    </template>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item
                label=""
                prop="pwd"
              >
                <div class="feild">
                  <el-input
                    id="pwd"
                    name="pwd"
                    type="password"
                    @keyup.enter="login"
                    v-model.trim="loginForm.pwd"
                    placeholder="密码"
                  >
                    <template slot="prepend">
                      <i class="el-icon-edit"></i>
                    </template>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="submit">
                  <button
                    type="button"
                    @click="login"
                    class="j-doLogin btn-primary"
                  >登 &nbsp;&nbsp;&nbsp;&nbsp;录</button>
                </div>
              </el-form-item>
            </el-form>
            <div class="feild text-right">
              <a
                target="_blank"
                href="#"
                class="mr20"
              >忘记密码</a>
              <a
                target="_blank"
                href="#"
                class="mr20"
              >用户注册</a>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer">
        <div class="footer-inner">
          <img
            src="../../assets/logo/logo.png"
            height="35"
            alt="xxx"
          > Copyright @ 2017 XXX.All Rights Reserved.
          <a
            style="margin-left:10px;"
            href="#"
            target="_blank"
          >服务条款</a>｜
          <a
            href="#"
            target="_blank"
          >隐私政策</a> ｜
          <a
            href="#"
            target="_blank"
          >联系我们</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { login } from '@/api';
import { setSession } from '@/utils';
import { encryptpassword } from '@/utils/RSA/index.js';
export default {
  name: 'Login',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: {},
  data() {
    return {
      // 登录表单
      loginForm: {
        name: '',
        pwd: ''
      },
      // 登录表单校验
      loginRules: {
        name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      console.log(login);
      // 是否登录
      this.checkIsLogin();
    });
  },
  methods: {
    // 检查是否登录有效中
    checkIsLogin() {
      // login.isLoginFlag().then(res => {
      //   if (res.code === 0) {
      //     this.afterLogin(res);
      //   }
      // });
      let res = { code: 1008, msg: '用户未登录', data: null };
      if (res.code === 0) {
        this.afterLogin(res);
      }
    },
    afterLogin(res) {
      setSession('user', res.data.accountInfo);
      // 登陆成功-》主页面
      this.$router.push({
        name: 'home'
      });
    },
    // 点击登录
    login() {
      let name = this.loginForm.name;
      let pwd = this.loginForm.pwd;
      pwd = encryptpassword(pwd); // 密码加密
      let params = {
        userAccount: name,
        userPassword: pwd,
        loginFromType: 1,
        _V: new Date().getTime()
      };
      console.log(params);
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // login.logining(params).then(res => {
          //   if (res.code === 0) {
          //     document.cookie = 'hasCheckedYunProtocol=' + true;
          //     this.afterLogin(res);
          //   } else {
          //     this.$message.error('登录失败');
          //   }
          // });
          let res = {
            code: 0,
            msg: '操作成功',
            data: {
              accountInfo: {
                id: 2,
                userName: 'kakaxi',
                mail: 'kakaxi@muye.com',
                name: 'kakaxi',
                mobile: '15506548658',
                canDelete: null,
              },
              recordCount: 17,
              loginToken: { loginToken: '7ade0241ea014403aa3dad92cd7add8e' },
            }
          };
          if (res.code === 0) {
            document.cookie = 'hasCheckedYunProtocol=' + true;
            this.afterLogin(res);
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
@import "./style.scss";
</style>