import axios from 'axios'

const request=axios.create({
    baseURL:'http://api-toutiao-web.itheima.net/'
})
//请求拦截器
request.interceptors.request.use(
    //任何请求都会经过这里
    //config是当前请求相关的配置信息对象
    function (config){
        const user =JSON.parse(window.localStorage.getItem('user'))

        if(user){
             config.headers.Authorization=`Bearer ${user.token}`
         }
        //当这里 return config 之后 请求才会真正的发出去
        
        return config
    },
    //请求失败 经过这里
    function (error){
        return Promise.reject(error)
    }
)


//导出请求方法
export default request

//谁要使用谁就加载reques模块

