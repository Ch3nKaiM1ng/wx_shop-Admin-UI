import request from '@/utils/request'

export function delObj(data) {
  // 删除医生
  return request({
    url: '/shop/delObj',
    method: 'post',
    data
  })
}

export function findObj(data) {
  // 查询医生
  return request({
    url: '/shop/findObj',
    method: 'post',
    data
  })
}

export function findAll(data) {
  // 查询医生
  return request({
    url: '/shop/findAll',
    method: 'post',
    data
  })
}

export function findAllPage(data) {
  // 查询医生
  return request({
    url: '/shop/findAllPage',
    method: 'post',
    data
  })
}

export function addObj(data) {
  // 添加医生
  return request({
    url: '/shop/addObj',
    method: 'post',
    data
  })
}

export function updateObj(data) {
  // 修改医生
  return request({
    url: '/shop/updateObj',
    method: 'post',
    data
  })
}

export function shopAccountObj(data) {
  // 修改医生
  return request({
    url: '/sysUser/findObj',
    method: 'post',
    data
  })
}

export function shopAccountAddObj(data) {
  // 修改医生
  return request({
    url: '/sysUser/addObj',
    method: 'post',
    data
  })
}

export function shopAccountUpdateObj(data) {
  // 修改医生
  return request({
    url: '/sysUser/updateObj',
    method: 'post',
    data
  })
}
