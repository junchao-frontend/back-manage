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

//删除文章
export const deleteArticle =articleId =>{
  return request({
      method: 'DELETE',
      url:`/mp/v1_0/articles/${articleId}`
      //凡是看见接口路径中有：XXX的字段，则需要传递路径参数
  })
}

//发布文章
export const addArticle =(data,draft=false) =>{
  return request({
      method: 'POST',
      url:'/mp/v1_0/articles',
      params:{
        draft //是否存为草稿（true为草稿）
      },
      data
  })
}