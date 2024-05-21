<template>
  <div>
    <el-button @click="logout()">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
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

</style>