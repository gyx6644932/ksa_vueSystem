import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  });
}
export function resetPwd(data,id) {
  return request({
    url: '/api/user/resetPwd/'+id,
    method: 'put',
    data
  });
}
