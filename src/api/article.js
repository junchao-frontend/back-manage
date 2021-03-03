import request from '@/utils/request'

export const getArticles =params =>{
    return request({
        method: 'GET',
        url:'/mp/v1_0/articles',
        //Body 参数使用data 设置
        //Query 参数使用params设置
        //Headers 参数使用headers设置
        params
    })
}
//展示文章频道
export const getArticleChannels =() =>{
  return request({
      method: 'GET',
      url:'/mp/v1_0/channels',
  })
}