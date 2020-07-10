import request from "@/utils/request.js"


export function createorder(data) {
	return request({
		url: "/createorder",
		method: "post",
		data: data
	})
}

export function orderlist(data) {
	return request({
		url: "/orderlist",
		method: "post",
		data: data
	})
}

export function updateorderstatus(data) {
	return request({
		url: "/updateorderstatus",
		method: "post",
		data: data
	})
}

export function createcartorder(data) {
	return request({
		url: "/createcartorder",
		method: "post",
		data: data
	})
}
