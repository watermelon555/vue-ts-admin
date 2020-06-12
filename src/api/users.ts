import request from '@/utils/request'
export const login = (data: any) =>
    request({
        url: '/api/login',
        method: 'POST',
        data
    })

export const getUserInfo = () =>
  request({
    url: '/api/roles',
    method: 'GET'
  })
