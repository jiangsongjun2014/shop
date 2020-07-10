import requests from "../utils/request.js"


// 登录
export const login = ( data ) => {
  return requests({
    url: "login",
    method: "post",
    data: data
  })
}

// 注册
export const register = ( data ) => {
  return requests({
    url: "register",
    method: "post",
    data: data
  })
}