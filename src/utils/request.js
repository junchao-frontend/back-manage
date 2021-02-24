import axios from 'axios'

const request=axios.create({
    baseURL:'http://api-toutiao-web.itheima.net/'
})

//导出请求方法
export default request

//谁要使用谁就加载reques模块

