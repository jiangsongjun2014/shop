import axios from "axios"
import {getToken} from "@/utils/auth.js"

const service = axios.create({
	// baseURL: "http://localhost:4399/api",
	baseURL: "http://120.27.0.79:4399/api",
	timout:5000
})

// 请求拦截
service.interceptors.request.use(
	config => {
		if (getToken()) {
			config.headers['Authorization'] = getToken()
		}
		return config
	},
	error => {
		return Promise.reject()
	}
)

// 响应拦截
service.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return response.data
		} else {
			return Promise.reject()
		}
	},
	error => {
		return Promise.reject()
	}
)


export default service
