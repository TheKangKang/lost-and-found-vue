<template>
  <div :xl="6" :lg="7" class="bg-login">
    <!--标题-->
    <el-row type="flex"  justify="center" align="middle">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <!--标题-->
        <h1 class="title">中南大跳蚤市场</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!--form表单-->
    <el-row type="flex" class="row-bg card" justify="center" align="bottom">
      <el-col :span="7" class="login-card">
        <!--loginForm-->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="21%" class="loginForm">
          <el-form-item label="账户" prop="username" style="width: 380px">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-radio-group v-model="isManager" class="select-user" @change="clickChange">
            <el-radio label="1">用户</el-radio>
            <el-radio label="2" style="padding-left: 50px">管理员</el-radio>
          </el-radio-group>
          <el-form-item class="btn-ground">
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="register()">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

<!--    注册弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
               @close="closeDialog('loginForm')">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" :inline="true"
               style="margin-left: 20px;" label-width="110px" label-position="right">
        <el-upload class="avatar-uploader"
                   :show-file-list="false" style="text-align: center;margin-bottom: 20px;margin-left: 250px;">
          <img v-if="loginForm.image" :src="loginForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="用户名:" prop="username" size="mini">
          <el-input v-model="loginForm.username"
                    suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" size="mini">
          <el-input v-model="loginForm.password"
                    suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="real_name" size="mini">
          <el-input v-model="loginForm.real_name"
                    suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="gender" size="mini">
          <el-select v-model="loginForm.gender" placeholder="请选择性别">
            <el-option value="男"></el-option>
            <el-option value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号:" prop="mobile" size="mini">
          <el-input v-model="loginForm.mobile"
                    suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email" size="mini">
          <el-input v-model="loginForm.email"
                    suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址:" prop="address" size="mini">
          <el-input v-model="loginForm.address"
                    suffix-icon="el-icon-edit" style="width: 262%;"></el-input>
        </el-form-item>
      </el-form>
      <el-row style="text-align: right;">
        <el-button type="primary" size="mini"
                   @click="submitAddForm('loginForm')">确认</el-button>
        <el-button type="info" size="mini" @click="closeDialog('loginForm')">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      baseURL: localStorage.getItem("baseURL"),
      // 表单信息
      loginForm: {
        id:'',
        username: '',
        password: '',
        real_name:'',
        gender:'',
        mobile:'',
        email:'',
        address:'',
        image:'',
        imageUrl:'',
      },
      // 表单验证
      rules: {
        // 设置账户效验规则
        username: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符的账户', trigger: 'blur'}
        ],
        // 设置密码效验规则
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符的密码', trigger: 'blur'}
        ],
        real_name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: "姓名必须是2-5个汉字", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "性别不能为空", trigger: "change" },
        ],
        birthday: [
          { required: true, message: "出生日期不能为空", trigger: "change" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { pattern: /^[1]\d{10}$/, message: "手机号格式有误", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { pattern: /^[0-9a-zA-Z]+([\.\-_]*[0-9a-zA-Z]+)*@([0-9a-zA-Z]+[\-_]*[0-9a-zA-Z]+\.)+[0-9a-zA-Z]{2,6}$/, message: "邮箱格式有误", trigger: "blur" }
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" },
        ],
      },
      isManager:0,

      dialogTitle: "",
      dialogFormVisible: false,

    };
  },
  methods: {
    // 提交表单
    submitForm() {
      let that = this;
      if (that.isManager === '1') {
        axios
            .post(this.baseURL + "loginUser/",that.loginForm)
            .then(function (res){
              if(res.data.code === 1){
                sessionStorage.setItem("session_id", res.data.sessionId)
                that.$router.push('/index')
                that.$message({
                  message: '登录成功！',
                  type: 'success'
                });
              } else {
                that.$message.error('用户或密码错误');
                console.log(res)
              }
            })
            .catch(function (err){
              console.log(err);
            });
      } else if (that.isManager === '2') {
        axios
            .post(this.baseURL + "loginManager/",that.loginForm)
            .then(function (res){
              if(res.data.code === 1){
                sessionStorage.setItem("session_id", res.data.sessionId)
                that.$router.push('/indexManager')
                that.$message({
                  message: '登录成功！',
                  type: 'success'
                });
              } else {
                that.$message.error('用户或密码错误');
                console.log(res)
              }
            })
            .catch(function (err){
              console.log(err);
            });
      } else {
        that.$message.error('请选择登录类型');
      }

    },
    clickChange() {
    },

    //注册入口
    register() {
      let that = this;
      that.dialogTitle = "注册用户";
      that.dialogFormVisible = true;
    },

    //关闭注册弹窗
    closeDialog(formName) {
      this.$refs[formName].resetFields();

      this.dialogFormVisible = false;
      this.loginForm = {
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
    },

    //提交注册
    submitAddForm(){
      let that = this;

      axios
          .post(that.baseURL + 'addUser/', that.loginForm)
          .then(res => {
            if (res.data.code === 1) {
              console.log(that.loginForm.images);
              that.Users = res.data.data;
              that.total = res.data.data.length;
              that.$message({
                message: '注册成功！',
                type: 'success'
              });
              //关闭窗体
              that.closeDialog('loginForm');
            } else if (res.data.code === 2) {
              that.$message.error('用户已存在！');
            }
            else {
              that.$message.error('注册失败！');
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
  },

    logout(){
      sessionStorage.removeItem("session_id");
      this.$router.push("/");
    }

}
</script>

<style scoped>

.bg-login {
  height: 100vh;
  background-image: url("../assets/background.jpg");
  background-size: cover;

}

.btn-ground {
  text-align: center;
  margin-right: 35px;
}

.title {
  text-shadow: -3px 3px 1px #5f565e;
  text-align: center;
  margin-top: 40%;
  color: #41b9a6;
  font-size: 40px;
}

.login-card {
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0 0 20px #ffffff;
  border-radius: 10px;
  padding: 40px 40px 20px 15px;
  width: auto;
}

.select-user {
  text-align: center;
  padding:10px 20px 15px 100px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}

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
</style>
