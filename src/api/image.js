import request from '@/utils/request'

export const getImages=params =>{
  return request({
    method:'GET',
    url:'/mp/v1_0/user/images',
    params
  })
}