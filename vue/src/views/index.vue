<template>
  <div>
    <el-container style="height: 100vh;">
      <el-aside :width="asideWidth">
        <div style="text-align: center;display: flex;height: 60px;
                                        justify-content: center;
                                        align-items: center;">
          <div>
            <img src="../assets/跳蚤市场.png" style="width: 32px;height: 32px"/>
          </div>
          <transition name="el-fade-in-linear">
            <span style="color: #fff;font-size:20px;margin-left: 10px" v-show="!isCollapse">
              FleaMarket
            </span>
          </transition>
        </div>
        <!--        菜单栏-->
        <el-menu :collapse="isCollapse" :collapse-transition="false" router style="border: none;" active-text-color="#fff" background-color="#00152a" text-color="rgba(255,255,255,0.65)" :default-active="$route.path">
          <el-menu-item index="/index">
            <i class="el-icon-house"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-menu-item index="/userMarket">
            <i class="el-icon-takeaway-box"></i>
            <span slot="title">跳蚤广场</span>
          </el-menu-item>
          <el-menu-item index="/mygoods">
            <i class="el-icon-search"></i>
            <span slot="title">我的商品</span>
          </el-menu-item>
<!--          <el-submenu index="3">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-menu"></i>-->
<!--              <span>信息管理</span>-->
<!--            </template>-->
<!--            <el-menu-item index="/users">用户信息</el-menu-item>-->
<!--            <el-menu-item index="/managers">管理员信息</el-menu-item>-->
<!--            <el-menu-item index="/goodsManage">商品信息</el-menu-item>-->
<!--            &lt;!&ndash;            <el-menu-item index="/indexManager">系统首页</el-menu-item>&ndash;&gt;-->
<!--          </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i :class="collapseIcon" style="font-size: 26px;" @click="handleCollapse"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px;">
            <el-breadcrumb-item :to="{ path: '/indexManager' }">系统首页</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1; width: 0; display: flex; align-items: center; justify-content: flex-end;">
            <el-dropdown style="display: flex; align-items: center;" placement="bottom">
              <div style="display: flex;align-items: center; cursor:default" >
                <img src="../assets/logo.png" style="width: 40px;height: 40px">
                <span>管理员</span>
              </div>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <div style="box-shadow:0 0 10px rgba(0, 0, 0, 0.1);padding:10px 20px;border-radius: 5px;margin-bottom: 10px;">
            早安，祝你开心每一天！
          </div>
          <el-card style="width: 500px;">
            <div slot="header" class="clearfix">
              <span>中南大跳蚤市场 | 张哲康 & 邹术星</span>
            </div>
            <div>
              <div style="margin-top: 20px;">
                <div  style="margin: 10px 0"><strong>主题色</strong></div>
                <el-button type="primary">按钮</el-button>
                <el-button type="success">按钮</el-button>
                <el-button type="warning">按钮</el-button>
                <el-button type="danger">按钮</el-button>
                <el-button type="info">按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-main>
        <el-footer style="height: 30px;">跳蚤市场系统 版权所有：zsx & zzk | 2024.6.6</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "indexManager",
  data() {
    return{
      isCollapse: false,
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',
    }
  },
  methods: {
    handleCollapse(){
      this.isCollapse = !this.isCollapse;
      this.asideWidth = this.isCollapse ? '64px' : '200px';
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    },
    logout(){
      this.$confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("session_id");
        this.$router.push("/");
        this.$message({
          type: 'success',
          message: '退出登录成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        });
      });
    },
  }
}
</script>

<style scoped>
.el-aside {
  position: relative;
  background-color: #00152a;
  color: #333;
  line-height: 100%;
  transition: 0.3s;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35) !important;
}

.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  margin: 4px !important;
}

.el-submenu .el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px;
  margin: 4px !important;
  width: calc(100% - 8px);
}

.el-submenu .el-menu-item {
  min-width: 0;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px;
  margin: 4px;
}

.el-submenu>>>.el-submenu__title:hover i{
  color:#fff !important;
}

.el-menu-item:hover, .el-menu-item:hover i, .el-submenu>>>.el-submenu__title:hover{
  color:#fff !important;
}

.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;
  padding-left: 49px !important;
}

.el-menu>>>.el-menu--inline {
  background-color: #000c17 !important;
}

.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
  position: relative;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35) !important;
  display: flex;
  align-items: center;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 30px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
