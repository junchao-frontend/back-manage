import request from '@/utils/request'
//获取图片素材
export const getImages=params =>{
  return request({
    method:'GET',
    url:'/mp/v1_0/user/images',
    params
  })
}

//收藏图片
export const collectImages=(imageId,collect) =>{
  return request({
    method:'PUT',
    url:`/mp/v1_0/user/images/${imageId}`,
    data:{
      collect
    }
  })
}
//删除图片
export const deleteImages=imageId =>{
  return request({
    method:'DELETE',
    url:`/mp/v1_0/user/images/${imageId}`
    
  })
}