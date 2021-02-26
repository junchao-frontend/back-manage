//用户相关请求模块
//用户登录
//用户修改信息
import request from '@/utils/request'
export const login =data =>{
    return request({
        method: 'POST',
        url:'/mp/v1_0/authorizations',
        //data用来设置POST请求体
        data
      })
}
//获取用户信息

export const getUserProfile= () =>{
  //const user =JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    url:'/mp/v1_0/user/profile'
    //后端要求把需要授权的用户身份放到请求头中
    //axios 可以通过 headers选项设置请求头
    // headers: {
    //   //属性名： Authorization
    //   //属性值： Bearer token
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}