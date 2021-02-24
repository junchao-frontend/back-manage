<template>
 <el-container class="layout-container">
  <el-aside class="aside"
  width="200px">
  <AppAside /></el-aside>
  <el-container>
    <el-header class="head">
      <div>
      <i class="el-icon-s-fold"></i>
      <span>后台管理系统</span>
      </div>
      <el-dropdown>
      <div class="people"> 
        <img class="picture" :src="user.photo" >
        <span>
        {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
       
      </el-dropdown-menu>
    </el-dropdown>
    </el-header>
    <el-main class="main"><router-view></router-view></el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from './components/aside'
import {getUserProfile} from '@/api/user'
export default {
  name: 'LayoutIndex',
  components:{
    AppAside
  },
   data () {
     return {
      user:{}
    }
  },
  created (){
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile(){

      getUserProfile().then(res =>{
        this.user =res.data.data
      })
    }
  }
}
</script>
<style>
.layout-container{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
}

.aside{
    background-color:#d3dce6;
}
.people{
  display: flex;
  align-items: center;
}
.picture{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right:10px;
}
.head{
    display: flex;
    align-items: center;
    height: 60px;
    justify-content:space-between;
    background-color: #b3c0d1;
}

.main{
    background-color: #e9eef3;
}
</style>
