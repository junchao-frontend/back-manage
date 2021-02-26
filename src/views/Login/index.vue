<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="user"  :rules="rules">
  <el-form-item prop="mobile">
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item prop="agree">
  <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" :loading='loginLoading' @click="onlogin" class="login-btn">登录</el-button>
  </el-form-item>

</el-form>
  </div>
</template>

<script>
import {login} from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
          mobile: '13911111111',
          code: '246810',
          agree:'true'
      },
      loginLoading: false,
      rules:{
         mobile: [
            { required: true, message: '手机号不能为空', trigger: 'change' },
            { pattern:/^1[3|5|7|9]\d{9}$/,message: '请输入正确格式的手机号', trigger: 'change' }
          ],
          code:[
            {required:true,message:'验证码不能为空',trigger:'blur'},
            {pattern:/^\d{6}$/,message:'请输入正确格式的验证码',trigger:'change'}
          ],
          agree: [
            {
            validator: (rule,value,callback) =>{
              if(value){
                callback()
              }else{
                callback(new Error('请同意用户协议'))
              }
            },
            trigger:'change'
            }
          ]
      },
      
    }
  },
  methods: {
      onlogin () {
        const user=this.user
        this.loginLoading=true

        login(this.user).then(res => {
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          this.loginLoading=false
          //本地储存只能存字符串
          window.localStorage.setItem('user',JSON.stringify(res.data.data))
          this.$router.push({
            name: 'home'
          })
         
        }).catch(err => {
          console.log('登陆失败',err)
          this.$message.error('登陆失败，手机号或验证码错误')
          this.loginLoading=false
        })
        
       
      }
    }
  }
</script>
<style>
.login-container{
  position :fixed;
  left:0;
  top:0;
  right:0;
  bottom :0;
  display :flex;
  justify-content:center;
  align-items:center;
  background: url("./beijing.jpg") no-repeat;
  background-size: cover;
}
.login-form{
  background-color: white;
  padding: 55px;
  min-width: 300px;
}
.login-btn{
  width: 100%;
}

</style>


