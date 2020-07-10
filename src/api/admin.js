import request from "@/utils/request.js"


// 获取用户信息〃
export function admininfo(data) {
	return request({
		url: "/admininfo",
		method: "post",
		data: data
	})
}

// 修改用户信息
export function updateadmin(data) {
	return request({
		url: "/updateadmin",
		method: "post",
		data: data
	})
}