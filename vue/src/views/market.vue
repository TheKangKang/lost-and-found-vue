<template>
  <div>
    <el-container style="height: 100vh;">
      <el-aside :width="asideWidth">
        <div style="text-align: center;display: flex;height: 60px;
                                        justify-content: center;
                                        align-items: center;">
          <div>
            <img src="../assets/跳蚤市场.png" alt="" style="width: 32px;height: 32px"/>
          </div>
          <transition name="el-fade-in-linear">
            <span style="color: #fff;font-size:20px;margin-left: 10px" v-show="!isCollapse">
              FleaMarket
            </span>
          </transition>
        </div>
        <!--        菜单栏-->
        <el-menu :collapse="isCollapse" :collapse-transition="false" router style="border: none;" active-text-color="#fff" background-color="#00152a" text-color="rgba(255,255,255,0.65)" :default-active="$route.path">
          <el-menu-item index="/indexManager">
            <i class="el-icon-house"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-menu-item index="/market">
            <i class="el-icon-takeaway-box"></i>
            <span slot="title">跳蚤广场</span>
          </el-menu-item>
          <el-menu-item index="/mygoods">
            <i class="el-icon-search"></i>
            <span slot="title">我的商品</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item index="/users">用户信息</el-menu-item>
            <el-menu-item index="/managers">管理员信息</el-menu-item>
            <el-menu-item index="/goodsManage">商品信息</el-menu-item>
            <!--            <el-menu-item index="/indexManager">系统首页</el-menu-item>-->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i :class="collapseIcon" style="font-size: 26px;" @click="handleCollapse"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px;">
            <el-breadcrumb-item :to="{ path: '/indexManager' }">系统首页</el-breadcrumb-item>
            <el-breadcrumb-item>跳蚤广场</el-breadcrumb-item>
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
          <el-form :inline="true" style="margin-top: 20px;">
            <el-row>
              <el-col :span="12">
                <el-form-item label="请输入查询条件：">
                  <el-input v-model="inputstr" placeholder="输入查询" style="width: 420px;">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="text-align: right;padding-right: 15px;">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search"
                             @click="queryUsers()">查询</el-button>
                  <el-button type="primary" icon="el-icon-document"
                             @click="getUsers()">全部</el-button>
                  <el-button type="primary" icon="el-icon-circle-plus-outline"
                             @click="addUser()">添加</el-button>
                </el-button-group>
              </el-col>
              <el-col :span="2">
                <el-upload action="#" :show-file-list="false" :http-request="uploadExcelPost">
                  <el-button type="primary">导入excel</el-button>
                </el-upload>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="exportExcelGet()">导出excel</el-button>
              </el-col>
            </el-row>
          </el-form>

          <!-- 表格 -->
          <el-table :data="pageUsers" border style="width: 100%" size="mini"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index" label="序号" align="center" width="60">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" align="center" width="200">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center" width="60">
            </el-table-column>
            <el-table-column prop="image" label="图片" align="center" width="200">
              <template>
                <img :src="userForm.imageUrl" style="width: 50px;height: 50px;">
              </template>
            </el-table-column>
            <el-table-column prop="owner" label="卖方" align="center" width="100">
            </el-table-column>
            <el-table-column prop="nickname" label="卖方昵称" align="center" width="100">
            </el-table-column>
            <el-table-column prop="catagory" label="分类" align="center" width="100">
            </el-table-column>
            <el-table-column prop="mobile" label="联系方式" align="center" width="100">
            </el-table-column>
            <el-table-column prop="status" label="商品状态" align="center" width="100">
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button type="success" size="mini" icon="el-icon-more"
                           @click="viewUser(scope.row)" circle></el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit"
                           @click="updateUser(scope.row)" circle></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete"
                           @click="deleteUser(scope.row)" circle></el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-row style="margin-top: 5px;">
            <el-col :span="8" style="text-align: left;">
              <el-button type="primary" icon="el-icon-delete" size="mini"
                         @click="deleteUsers()">批量删除</el-button>
            </el-col>
            <el-col :span="16" style="text-align: right;">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page="currentpage" :page-sizes="[5, 10, 50, 100]" :page-size="pagesize"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </el-col>
          </el-row>


          <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="780px"
                     @close="closeDialog('userForm')">
            <el-form :model="userForm" ref="userForm" :inline="true"
                     style="margin-left: 20px;" label-width="110px" label-position="right">
              <el-upload class="avatar-uploader" action="#"
                         :show-file-list="false" :http-request="uploadPicturePost" :disabled="isView" style="text-align: center;margin-bottom: 20px;margin-left: 250px;">
                <img v-if="userForm.image" :src="userForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-form-item label="商品名称:" prop="name" size="mini">
                <el-input v-model="userForm.name" :disabled="isView || isEdit"
                          suffix-icon="el-icon-edit"></el-input>
              </el-form-item>
              <el-form-item label="价格:" prop="price" size="mini">
                <el-input v-model="userForm.price" :disabled="isView"
                          suffix-icon="el-icon-edit"></el-input>
              </el-form-item>
              <el-form-item label="卖方:" prop="owner" size="mini">
                <el-input v-model="userForm.owner" :disabled="isView"
                          suffix-icon="el-icon-edit"></el-input>
              </el-form-item>
              <el-form-item label="卖方昵称:" prop="nickname" size="mini">
                <el-input v-model="userForm.nickname" :disabled="isView"
                          suffix-icon="el-icon-edit"></el-input>
              </el-form-item>
              <el-form-item label="分类:" prop="category" size="mini">
                <el-select v-model="userForm.catagory" :disabled="isView" placeholder="请选择分类">
                  <el-option value="男"></el-option>
                  <el-option value="女"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="联系方式:" prop="mobile" size="mini">
                <el-input v-model="userForm.mobile" :disabled="isView"
                          suffix-icon="el-icon-edit"></el-input>
              </el-form-item>
              <el-form-item label="商品状态:" prop="status" size="mini">
                <el-input v-model="userForm.status" :disabled="isView"
                          suffix-icon="el-icon-edit"></el-input>
              </el-form-item>
            </el-form>
            <el-row style="text-align: right;">
              <el-button type="primary" size="mini"
                         @click="submitAddForm('userForm')">确认</el-button>
              <el-button type="info" size="mini" @click="closeDialog('userForm')">取消</el-button>
            </el-row>
          </el-dialog>
        </el-main>
        <el-footer style="height: 30px;">跳蚤市场系统 版权所有：zoushuxing | 2024-3-1</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "market",
  data() {
    return{
      isCollapse: false,
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',

      users: [],//所有用户的信息
      inputstr: "",//输入框中的内容
      pageUsers: [],//当前页
      currentpage: 1,//当前的所在的页
      pagesize: 10,//每页显示多少行
      selectStudents: [],
      total: 0, //总行数

      userForm: {
        id:'',
        name: '',
        price: '',
        image:'',
        owner:'',
        nickname:'',
        catagory:'',
        mobile:'',
        status:'',
        imageUrl:'',
      },
      // rules: {
      //   // 设置账户效验规则
      //   username: [
      //     {required: true, message: '请输入账户', trigger: 'blur'},
      //     {min: 3, max: 15, message: '长度在 3 到 15 个字符的账户', trigger: 'blur'}
      //   ],
      //   // 设置密码效验规则
      //   password: [
      //     {required: true, message: '请输入密码', trigger: 'blur'},
      //     {min: 6, max: 15, message: '长度在 6 到 15 个字符的密码', trigger: 'blur'}
      //   ],
      //   real_name: [
      //     { required: true, message: "姓名不能为空", trigger: "blur" },
      //     { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: "姓名必须是2-5个汉字", trigger: "blur" }
      //   ],
      //   gender: [
      //     { required: true, message: "性别不能为空", trigger: "change" },
      //   ],
      //   birthday: [
      //     { required: true, message: "出生日期不能为空", trigger: "change" },
      //   ],
      //   mobile: [
      //     { required: true, message: "手机号不能为空", trigger: "blur" },
      //     { pattern: /^[1]\d{10}$/, message: "手机号格式有误", trigger: "blur" }
      //   ],
      //   email: [
      //     { required: true, message: "邮箱不能为空", trigger: "blur" },
      //     { pattern: /^[0-9a-zA-Z]+([\.\-_]*[0-9a-zA-Z]+)*@([0-9a-zA-Z]+[\-_]*[0-9a-zA-Z]+\.)+[0-9a-zA-Z]{2,6}$/, message: "邮箱格式有误", trigger: "blur" }
      //   ],
      //   address: [
      //     { required: true, message: "地址不能为空", trigger: "blur" },
      //   ],
      // },

      baseURL: localStorage.getItem("baseURL"),

      dialogTitle: "",
      dialogFormVisible: false,

      isView: false,
      isEdit: false,
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    handleCurrentChange(current) {
      this.currentpage = current;
      this.getPageUsers();
    },
    handleSizeChange(size) {
      this.pagesize = size;
      //数据重新分页
      this.getPageUsers();
    },
    //批量删除
    deleteUsers() {
      this.$confirm('是否确认批量删除' + this.selectUsers.length + '个用户信息', '提示', {
        confirmButtonText: '确定',
        confirmButtonClass: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        axios
            .post(that.baseURL + 'market/deletes/', {user: that.selectUsers})
            .then(res => {
              if (res.data.code === 1) {
                that.students = res.data.data;
                that.total = res.data.data.length;
                that.getPageUsers();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                that.$message.error('删除失败！');
              }
            })
      })
    },
    viewUser(row) {
      let that = this;
      console.log(row);
      that.dialogTitle = "用户明细";
      that.isView = true;
      that.dialogFormVisible = true;
      //深拷贝的方法
      that.userForm = JSON.parse(JSON.stringify(row));

      that.userForm.images = this.getImageBySno(row.username);
      that.userForm.imageUrl = that.baseURL + "media/" + that.userForm.image;
    },
    updateUser(row) {
      let that = this;
      that.dialogTitle = "修改信息";

      this.isEdit = true;

      that.dialogFormVisible = true;
      that.userForm = JSON.parse(JSON.stringify(row));
      that.userForm.images = this.getImageBySno(row.username);
      that.userForm.imageUrl = that.baseURL + "media/" + that.userForm.image;
    },
    deleteUser(row) {
      //等待确认
      this.$confirm('是否确认删除用户信息【用户名：' + row.username + '】', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this;
        axios
            .post(that.baseURL + 'market/delete/', { username: row.username })
            .then(res => {
              if (res.data.code === 1) {
                //获取所有信息
                that.students = res.data.data;
                //获取记录数
                that.total = res.data.data.length;
                //分页
                that.getPageUsers();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                that.$message.error('删除失败！');
              }
            })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //复选框
    handleSelectionChange(data) {
      this.selectUsers = data;
      console.log(this.selectUsers);
    },
    //导出
    exportExcelGet(){
      let that = this;
      axios
          .get(that.baseURL + 'excel/export/')
          .then(res => {
            if(res.data.code === 1) {
              let url = that.baseURL + 'media/' + res.data.name;
              window.open(url)
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            that.$message.error('导出失败！');
          });
    },
    //导入
    uploadExcelPost(file){
      let that = this;

      let fileReq = new FormData();
      fileReq.append('excel', file.file);

      axios(
          {
            method: 'post',
            url: that.baseURL + 'excel/import/',
            data: fileReq,
          }
      ).then(res => {
        if (res.data.code === 1) {
          that.users = res.data.data;
          that.total = res.data.data.length;
          that.getPageUsers();
          this.$alert('导入完成，成功' + res.data.success + '条，失败' + res.data.error + '条'
              ,'导入结果展示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
          console.log("本次导入失败的用户名");
          console.log(res.data.errors);
        } else {
          that.$message.error(res.data.msg);
        }

      }).catch(err => {
        console.log(err);
        that.$message.error('上传失败！');
      })
    },
    //根据id获取image
    getImageBySno(name) {
      for( let oneUser of this.users){
        if(oneUser.name === name){
          return oneUser.image;
        }
      }
    },
    uploadPicturePost(file){
      let that = this;
      let fileReq = new FormData();
      fileReq.append('avatar', file.file);
      axios(
          {
            method: 'post',
            url: that.baseURL + 'upload/',
            data: fileReq,
          }
      ).then(res => {
        if (res.data.code === 1) {
          //把照片给image
          that.userForm.image = res.data.name;
          //拼接
          that.userForm.imageUrl = that.baseURL + 'media/' + res.data.name;
          //element.imageUrl = that.baseURL + 'media/' + res.data.name;
        } else {
          that.$message.error(res.data.msg);
        }

      }).catch(err => {
        console.log(err);
        that.$message.error('上传失败！');
      })
    },
    //查询用户
    queryUsers() {
      let that = this;

      axios
          .post(that.baseURL + "/markets/query/", {
            inputstr: that.inputstr
          })
          .then(function (res) {
            if (res.data.code === 1) {
              that.users = res.data.data;
              that.total = that.users.length;
              that.getPageUsers();
              that.$message({
                message: '数据查询成功！',
                type: 'success'
              });
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function (err) {
            console.log(err);
          })
    },
    getUsers: function () {
      let that = this;
      axios
          .get(this.baseURL + "getAll/markets/")
          .then(function (res) {
            //console.log(res);
            if (res.data.code === 1) {
              that.users = res.data.data;
              that.total = res.data.data.length;
              that.getPageUsers();
              that.$message({
                message: '数据加载成功！',
                type: 'success'
              });
            } else {
              that.$message.error(res.data.msg);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
    },
    getPageUsers() {
      this.pageUsers = [];
      for (let i = (this.currentpage - 1) * this.pagesize; i < this.currentpage * this.pagesize && i < this.total; i++) {
        this.pageUsers.push(this.users[i]);
        if (this.pageUsers.length === this.pagesize) {
          break;
        }
      }
      // console.log(this.pageUsers)
    },
    addUser() {
      let that = this;
      that.dialogTitle = "添加商品";
      that.dialogFormVisible = true;
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields();

      this.dialogFormVisible = false;
      this.userForm = {
        id:'',
        username: '',
        password: '',
        real_name: '',
        gender: '',
        birthday: '',
        mobile: '',
        email: '',
        address: '',
        image: '',
        imageUrl: '',
      };
      this.isView = false;
      this.isEdit = false;
    },
    submitAddForm(){
      let that = this;
      let lastUrl;
      let message;
      if (that.isEdit === true) {
        lastUrl = 'market/update/';
        message = "修改成功！";
      } else {
        lastUrl = 'addMarket/';
        message = "注册成功！";
      }

      axios
          .post(that.baseURL + lastUrl, that.userForm)
          .then(res => {
            if (res.data.code === 1) {
              console.log(that.userForm.image);
              that.Users = res.data.data;
              that.total = res.data.data.length;
              that.$message({
                message: message,
                type: 'success'
              });
              //关闭窗体
              that.closeDialog('userForm');
              location.reload();
            } else if(res.data.code === 2) {
              that.$message.error('用户已存在！');
            }
            else {
              that.$message.error('注册失败！');
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
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
