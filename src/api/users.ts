import request from '@/utils/request'
export const login = (data: any) =>
    request({
        url: '/api/login/login_post',
        method: 'POST',
        data
    })

export const getUserInfo = () =>
  request({
    url: '/api/all',
    method: 'GET'
  })
