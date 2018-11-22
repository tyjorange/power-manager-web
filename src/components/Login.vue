<template>
  <transition name="el-zoom-in-bottom">
    <div class="login">
      <div class="login-form">
        <div class="login-header">
          <img src="../assets/logo.png" width="100" height="100" alt="">
          <p>Admin</p>
        </div>
        <div>
          <el-input placeholder="请输入用户名" prefix-icon="fa fa-user" v-model="loginInfoVo.username" clearable style="margin-bottom: 18px;">
          </el-input>
          <br />
          <el-input placeholder="请输入密码" prefix-icon="fa fa-keyboard-o" v-model="loginInfoVo.password" clearable style="margin-bottom: 18px;" type="password" @keyup.native.enter="login">
          </el-input>
          <br />
          <el-button type="primary" :loading="loginLoading" v-on:click="login" style="width: 100%; margin-bottom: 18px;">登录</el-button>
          <br />
          <div>
            <el-checkbox v-model="Remenber">Remenber</el-checkbox>
            <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "Login",

  data() {
    return {
      loginInfoVo: { username: "", password: "" },
      Remenber: true,
      loginLoading: false
    };
  },
  methods: {
    login() {
      this.loginLoading = true;
      this.$axios
        .post("/auth/login", {
          userName: this.loginInfoVo.username,
          passWord: this.loginInfoVo.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.common.notysucc(
              this.$notify,
              successResponse.data.code,
              successResponse.data.msg
            );
            this.$router.replace({ path: "/index" });
          } else {
            this.common.notywarn(
              this.$notify,
              successResponse.data.code,
              successResponse.data.msg
            );
            this.loginLoading = false;
          }
        })
        .catch(failResponse => {});
    }
  }
};
</script>
<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #e4e5e6;
  .login-form {
    width: 375px;
    height: 400px;
    padding: 30px;
    background-color: white;
    text-align: left;
    border-radius: 4px;
    position: relative;
    margin-left: 0;
    margin-right: 0;
    zoom: 1;
    display: block;
    .login-header {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
}
</style>
