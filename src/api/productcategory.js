import request from "@/utils/request.js"

// 分类列表
export function procategorylist(data) {
	return request({
		url: "/procategorylist",
		method: "post",
		data: data
	})
}
