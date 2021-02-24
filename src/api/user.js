//用户相关请求模块
//用户登录.
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