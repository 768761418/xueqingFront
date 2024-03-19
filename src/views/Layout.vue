<template>
    <div>

    <!-- 头部区域 -->
    <div style="height: 60px; line-height: 60px; background-color: white; margin-bottom: 2px;">
      <img src="@/assets/logo.png" alt="" style="width: 40px; position: relative; top: 10px; left: 10px;">
      <span style="margin-left: 10px; font-size: 24px;">学情视频管理系统</span>
      <el-dropdown style="float: right;margin-right: 20px;">
        <!-- 不把用户名写死 -->
        <!-- <span class="el-dropdown-link" style="color: black;font-size: 14px;">{{user.name}}<i class="el-icon-arrow-down el-icon--right"></i></span> -->
        <span class="el-dropdown-link" style="color: black;font-size: 14px;">Admin<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="logout()">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <div>
        <p>Admin</p>
        <p><rounter-link to="/login">退出</rounter-link></p>
      </div> -->
    </div>
    
    <!-- 侧边栏和主体 -->
    <div style="display: flex;">
      <!-- 侧边栏导航 -->
      <div style="width: 200px; min-height: calc(100vh - 62px); height: 200px; overflow: hidden; margin-right: 2px; background-color: 2a82e4;">
        <el-menu 
        :default-active="$route.path"
        router class="el-menu-demo"
        default active="1">

          <el-menu-item index="/home">
            <template slot="title">
            <i class="el-icon-menu"></i>
            <span>系统首页</span>
            </template>
          </el-menu-item>

          <el-submenu index="/home">
            <template slot="title">
              <i class="el-icon-data-analysis"></i>
              <span>管理</span>
            </template>
            <el-menu-item index="/stu">学生管理</el-menu-item>
            <el-menu-item index="/course">课程管理</el-menu-item>
            <el-menu-item index="/class">班级管理</el-menu-item>
            <el-menu-item index="/teacher">教师管理</el-menu-item>
            <el-menu-item index="/user">用户管理</el-menu-item>
          </el-submenu>

          <el-submenu index="。">
            <template slot="title">
              <i class="el-icon-data-analysis"></i>
              <span>课堂</span>
            </template>
            <el-menu-item index="/live">直播</el-menu-item>
            <el-menu-item index="/device">直播回放</el-menu-item>
          </el-submenu>
        </el-menu>

      </div>

      <!-- 主体数据 -->
      <div style="flex: 1; background-color: white; padding: 10px;">
        <router-view/>
      </div>
    </div>

    
    </div>
</template>

<script>
export default {
    name: "Layout",

    // 获取头部用户的姓名，不把用户名写死
    // data(){
    //   return {
    //     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    //   }
    // }

    methods: {
      logout() {
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    }
}
</script>

<style>
.el-menu{
  border-right: none !important;
}
</style>

