<template>
  <div class="login-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">

    <div class="login-total" style="height: 400px; width: 600px;">

    <div class="login-left">
      <div class="welcome" style="background-color: #4ca1ff;height: 400px; color: white; font-weight: bolder;font-size: 18px;">学情视频管理系统</div>
    </div>
    <div class="login-right">

    <div class="welcome-form-container text-center" style="margin: auto; background-color:white;">
    <div style="width: 100%; height: 100px; font-size: 23px; line-height: 120px; text-align: center; color: #6d6b6b; font-weight: bolder;">登录</div>
    <div style="margin-top: 10px; text-align: center; height: 290px;">
      <el-form :model="admin">
        <el-form-item>
          <el-input class=username v-model="admin.name" prefix-icon="el-icon-user" style="width: 75%;" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" class=password v-model="admin.password" prefix-icon="el-icon-lock" style="width: 75%;" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="admin.agree" label="true" style="margin-top: 10px;">我已阅读<a href="#">《服务协议》</a></el-checkbox>
        </el-form-item>
        <el-form-item >
          <el-button style="border-radius: 20px; width: 60%; height: 35px; font-size: 15px;" type="primary" :disabled="!admin.agree">
            <div @click="login()">登录</div></el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
  </div>

  </div>
  </div>
</template>

<script>
import backgroundImage from "../assets/LoginView.jpg";
export default {
  name: 'Login',
  data() {
    return {
      backgroundImage: backgroundImage,
      admin: {}
    }
  },

  //页面加在的时候，做一些事情，在created里面
  created() {

  },

  methods: {
  
  login() {
    
  if (this.admin.name === 'Admin' && this.admin.password === '123456') {
    this.$message({
      message: '登录成功',
      type: 'success'
    });
    // 登录后获得用户的信息
    const userData = { name: 'Admin' };
    localStorage.setItem("user", JSON.stringify(userData));
    // 判断当前路由是否为登录页
    if (this.$route.path == '/login') {
      this.$router.push('/home')
      // this.$router.push({ path: '/home' });
    }
  } else {
    this.$message({
      message: '用户名或密码错误',
      type: 'error'
    });
  }
}

  //定义一些页面上空间出发的时间调用的方法
  // methods: {
  //   login() {
  //     requsst.post("/admin/login",this.admin).then(res => {
  //       if (res.code === '0') {
  //         this.$message( {
  //           message:'登录成功',
  //           type:'success'
  //         });
  //         //登录后获得用户的信息
  //         localStorage.setItem("user",JSON.stringify(res,data))
  //         this.$router.push("/");
  //       } else {
  //         this.$message( {
  //           message: res.msg,
  //           type:'error'
  //         });
  //       }
  //     })
  //   }
  // }
}
}
</script>

<style scoped>


.username /deep/ .el-input__inner{
  border-radius: 100px;
  height: 40px;
}
.password /deep/ .el-input__inner{
  border-radius: 100px;
  height: 40px;
}

.login-total{
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  display: flex;
  flex-direction: row;
  width: 600px;
  height: 350px;
  border-radius: 50%;
  box-sizing: border-box; 
  
  .login-left{
    position: relative;
    width: 33%;
    height: 100%;
    text-align: center; /* 水平居中 */
    line-height: 380px;
  }
  .login-right{
    position: relative;
    width: 77%;
    height: 100%;
  }

}
.login-container {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/LoginView.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}


.welcome-form-container {
      /* display: flex; */
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* 其他样式 */
    }
</style>
