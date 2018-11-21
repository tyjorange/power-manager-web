<template>
  <transition name="el-zoom-in-top">
    <el-container style="height: 100%;">
      <el-header>
        <el-row>
          <el-col :span="12" style="text-align: left;">
            <div class="grid-content bg-purple">
              <el-radio-group v-model="isCollapse">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <div class="grid-content bg-purple-light">
              <el-dropdown>
                <span class="el-dropdown-link">
                  下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                  <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  <el-dropdown-item>
                    <el-button v-on:click="logout">注销</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

          <el-menu-item index="#">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item index="/1">选项1</el-menu-item>
            <el-menu-item index="/userlist">选项2</el-menu-item>
            <el-menu-item index="/devicelist">选项3</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </template>
            <el-menu-item index="1-3">选项4</el-menu-item>
          </el-submenu>

        </el-menu>
        <el-container>
          <el-main>
            <!--子组件加载到内层router-view-->
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </transition>
</template>

<script>
import commHeader from "@/components/comm/CommHeader.vue";
import commFooter from "@/components/comm/CommFooter.vue";

export default {
  name: "Index",
  // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
  components: { commHeader, commFooter },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$axios
        .get("/auth/logout")
        .then(successResponse => {
          if (successResponse.data.code === 100) {
            this.common.notysucc(
              this.$notify,
              successResponse.data.code,
              successResponse.data.msg
            );
            this.$router.replace({ path: "/" });
          } else if (successResponse.data.code === 403) {
            this.common.notysucc(
              this.$notify,
              successResponse.data.code,
              successResponse.data.msg
            );
            this.$router.replace({ path: "/" });
          }
        })
        .catch(failResponse => {});
    }
  }
};
</script>
<style>
.el-header,
.el-footer {
  padding: 0px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>