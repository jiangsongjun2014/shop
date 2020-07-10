import router from './router'
import { getToken } from '@/utils/auth' // 验权

// 不重定向白名单
const whiteList = [
	'/home', '/category', '/cart', '/me', "/login", 
	"/register", "/productdetail",
] 

router.beforeEach((to, from, next) => {
	if (getToken()) {
		if (to.path === "/login") {
			next({ path: '/' })
		} else {
			next()
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
		}
	}
})

