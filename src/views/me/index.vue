<template>
	<div class="container">
		<!-- 头部 -->
		<div class="app-header">
			<van-nav-bar title="我的" ></van-nav-bar>
			<div class="imgbox">
				<img :src="touxiang" class="img">
				<!-- <div class="text">用户名称：</div> -->
			</div>
		</div>
		<!-- 中间 -->
		<div class="app-main">
			<van-cell-group >
				<van-cell title="用户信息" @click="handleAdmin()">
					<template #right-icon>
						<van-icon name="arrow" style="line-height: inherit;"  />
					</template>
				</van-cell>
				<van-cell title="我的订单" @click="handleOrder()">
					<template #right-icon>
						<van-icon name="arrow" style="line-height: inherit;"  />
					</template>
				</van-cell>
				<van-cell title="我的地址" @click="handleAddress()">
					<template #right-icon>
						<van-icon name="arrow" style="line-height: inherit;"  />
					</template>
				</van-cell>
				<van-cell title="系统退出" @click="handleOut()">
					<template #right-icon>
						<van-icon name="arrow" style="line-height: inherit;" />
					</template>
				</van-cell>
			</van-cell-group>
			
		</div>
		<!-- 底部 -->
		<div class="app-footer">
			<Footer ></Footer>
		</div>
	</div>
</template>

<script>
	import Footer from "@/components/Footer/Footer.vue"
	import touxiang from "@/assets/cat.jpeg"
	import {removeCookie} from "@/utils/support.js"
	import {removeToken} from "@/utils/auth.js"
	
	export default {
		data() {
			return {
				touxiang
			}
		},
		components: {
			Footer
		},
		mounted(){
			
		},
		methods: {
			// 用户信息
			handleAdmin(){
				this.$router.push({path: "/admin"})
			},
			// 地址
			handleAddress(){
				this.$router.push({path: "/address"})
			},
			// 订单
			handleOrder(){
				this.$router.push({path: "/order"})
			},
			// 系统退出
			handleOut(){
				// 清除token
				removeToken()
				// 清除其他缓存
				// removeCookie(productdetail)
				localStorage.removeItem("shop_userid")
				this.$router.push({path: "/login"})
			}
		},
	}
</script>

<style scoped="scoped">
	
	.imgbox{
		height: 150px;
		width: 100%;
		background: #409EFF;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.img{
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}
	.text{
		padding: 5px 0;
		font-size: 18px;
		color: #FFFFFF;
	}
</style>
