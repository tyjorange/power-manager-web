<template>
  <transition name="el-zoom-in-top">
    <el-container style="height: 100%;">
      <el-header>
        <el-row>
          <el-col :span="12" style="text-align: left;">
            <div class="logo">
              <span class="big">能源管理系统</span>
            </div>
          </el-col>
          <el-col :span="12" style="text-align: right;">
              <el-dropdown>
                <span class="el-dropdown-link">
                  下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i style="padding-right: 8px" class="fa fa-cog"></i>个人中心</el-dropdown-item>
                  <el-dropdown-item @click.native="logout"><i style="padding-right: 8px" class="fa fa-key"></i>注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <template v-for="route in $router.options.routes" v-if="!route.hidden">
            <template v-for="obj in route.children">
              <el-menu-item v-if="!obj.children || obj.children.length == 0" :index="obj.path" :key="obj.path">
                <i :class="obj.icon"></i><span slot="title">{{obj.name}}</span>
              </el-menu-item>
              <el-submenu v-else :index="obj.path" :key="obj.path">
                <template slot="title">
                  <i :class="obj.icon"></i>
                  <span slot="title">{{obj.name}}</span>
                </template>
                <el-menu-item v-for="child in obj.children" :index="child.path" :key="obj.path + '/' + child.path">{{child.name}}</el-menu-item>
              </el-submenu>
            </template>
          </template>
          <div class="sidebar-toggle" @click="sidebarToggle">
            <div class="icon-left">
              <i class="el-icon-sort"></i>
            </div>
          </div>
        </el-menu>
        <el-container>
          <el-main>
            <!--子组件加载到内层router-view-->
            <router-view name='root_view'></router-view>
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
  components: { commHeader, commFooter },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    sidebarToggle(e) {
      e.preventDefault();
      if (this.isCollapse) {
        document.body.classList.remove("sidebar-hidden");

        this.isCollapse = false;
      } else {
        document.body.classList.add("sidebar-hidden");
        this.isCollapse = true;
      }
      this.NavBarWidth();
    },
    NavBarWidth() {
      let navBar = document.getElementById("nav-bar");
      if (!navBar) return;
      if (!(this.fixedTabBar && this.switchTabBar)) {
        navBar.style.width = "100%";
        return;
      }
      let sidebarClose = document.body.classList.contains("sidebar-close");
      if (sidebarClose) {
        navBar.style.width = "100%";
        return;
      }
      if (this.isCollapse) navBar.style.width = "calc(100% - 64px)";
      else navBar.style.width = "calc(100% - 230px)";
    },
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
<style lang='less'>
.logo {
  width: 230px;
  height: 50px;
  text-align: center;
  color: #fff;
}
.sidebar-toggle {
  //position: relative;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 30px;
  //background-color: #367fa9;
  color: #fff;
  cursor: pointer;
  .icon-left {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    width: 64px;
    height: 100%;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
    transform: rotate(90deg);
  }
}
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
  // line-height: 160px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
</style>