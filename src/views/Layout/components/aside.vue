<template>
  <div>
    <el-menu
      default-active="/layout"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router >
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <li > <img class="logo" src="./logo.png" ></li>
      <el-menu-item index="/layout">
        <i class="el-icon-s-check"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/a">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
       <el-menu-item index="1">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
       <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="3">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="4" >
        <i class="el-icon-s-promotion"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
<style>
.logo{
    width: 200px;
}
</style>