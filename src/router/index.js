import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRouterMap = [
	{
		path: "/login",
		component: () => import("@/views/login/index.vue"),
	},
	{
		path: "/register",
		component: () => import("@/views/login/register.vue"),
	},
	{
		path: "/",
		redirect: '/home'
	},
	{
		path: "/home",
		component: () => import("@/views/home/index.vue"),
		meta: { title: "首页" }
	},
	{
		path: "/cart",
		component: () => import("@/views/cart/index.vue"),
		meta: { title: "购物车" }
	},
	{
		path: "/category",
		component: () => import("@/views/category/index.vue"),
		meta: { title: "分类" }
	},
	{
		path: "/me",
		component: () => import("@/views/me/index.vue"),
		meta: { title: "管理" }
	},
	{
		path: "/address",
		component: () => import("@/views/address/index.vue"),
		meta: { title: "地址" }
	},
	{
		path: "/addressdetail",
		component: () => import("@/views/address/addressdetail.vue"),
	},
	{
		path: "/admin",
		component: () => import("@/views/admin/index.vue"),
		meta: { title: "信息" }
	},
	{
		path: "/order",
		component: () => import("@/views/order/index.vue"),
		meta: { title: "订单" }
	},
	{
		path: "/productdetail",
		component: () => import("@/views/productdetail/productdetail.vue"),
	}
]

export default new Router({
	routes: constantRouterMap
})

