import request from "@/utils/request.js"


// ��Ʒ�б�
export function productlist(data) {
	return request({
		url: "/productlist",
		method: "post",
		data: data
	})
}

// �����б�
export function productdetaillist(data){
	return request({
		url: "/productdetaillist",
		method: "post",
		data: data
	})
}
