import request from "@/utils/request.js"


export function createcart(data) {
	return request({
		url: "/createcart",
		method: "post",
		data: data
	})
}

export function cartlist(data) {
	return request({
		url: "/cartlist",
		method: "post",
		data: data
	})
}

export function addcartcount(data) {
	return request({
		url: "/addcartcount",
		method: "post",
		data: data
	})
}

export function reducecartcount(data) {
	return request({
		url: "/reducecartcount",
		method: "post",
		data: data
	})
}

export function updatecartstatus(data) {
	return request({
		url: "/updatecartstatus",
		method: "post",
		data: data
	})
}

export function updateallcartstatus(data) {
	return request({
		url: "/updateallcartstatus",
		method: "post",
		data: data
	})
}

export function deletecart(data) {
	return request({
		url: "/deletecart",
		method: "post",
		data: data
	})
}