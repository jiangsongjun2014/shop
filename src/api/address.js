import request from "@/utils/request.js"


// 获取地址信息
export function addresslist(data) {
	return request({
		url: "/addresslist",
		method: "post",
		data: data
	})
}

// 添加地址
export function createaddress(data) {
	return request({
		url: "/createaddress",
		method: "post",
		data: data
	})
}

// 修改地址信息
export function updateaddress(data) {
	return request({
		url: "/updateaddress",
		method: "post",
		data: data
	})
}

// 修改地址状态
export function updatestatusaddress(data) {
	return request({
		url: "/updatestatusaddress",
		method: "post",
		data: data
	})
}

// 删除地址
export function deleteaddress(data) {
	return request({
		url: "/deleteaddress",
		method: "post",
		data: data
	})
}