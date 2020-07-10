import request from "@/utils/request.js"


// 商品列表
export function productlist(data) {
	return request({
		url: "/productlist",
		method: "post",
		data: data
	})
}

// 详情列表
export function productdetaillist(data){
	return request({
		url: "/productdetaillist",
		method: "post",
		data: data
	})
}
