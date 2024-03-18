import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import LayoutView from '../views/Layout.vue'
import LiveBroadcast from '../views/LiveBroadcast.vue'
import StudentManage from '../views/StudentManage.vue'
import ClassManage from '../views/ClassManage.vue'
import CourseManage from '../views/CourseManage.vue'
import TeacherManage from '../views/TeacherManage.vue'
import UserManage from '../views/UserManage.vue'
import DeviceManage from '../views/DeviceManage.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/',
    name: 'Layout',
    component: LayoutView,
    // redirect:'/login',
    children: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/live',
      name: 'live',
      component:LiveBroadcast
    },
    {
      path: '/about',
        name: 'about',
        component:AdminView
    },
    {
      path: '/stu',
      name: 'stu',
      component:StudentManage
    },
    {
      path: '/class',
      name: 'class',
      component:ClassManage
    },
    {
      path: '/course',
      name: 'course',
      component:CourseManage
    },
    {
      path: '/teacher',
      name: 'teacher',
      component:TeacherManage
    },
    {
      path: '/user',
      name: 'user',
      component:UserManage
    }
    ,
    {
      path: '/device',
      name: 'device',
      component:DeviceManage
    }
    ]
    },
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router
  
  