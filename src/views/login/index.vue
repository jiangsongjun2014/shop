<template>
	<div class="container">
		<div class="app-header">
			<van-nav-bar title="登录" left-text="返回" left-arrow @click-left="handleBack"/>
		</div>
		<div>
			<van-form @submit="handleSubmit" ref="admin">
				<van-field v-model="user.username" name="username" label="账号" placeholder="请输入账号" :rules="userRules.username"/>
				<van-field v-model="user.password" name="password" label="密码" type="password" placeholder="请输入密码" :rules="userRules.password"/>
				<van-field name="checked" label="记住密码">
				  <template #input>
					<van-switch v-model="checked" size="20" />
				  </template>
				</van-field>
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
						登录
					</van-button>
				</div>
			</van-form>
			<div style="margin: 16px;">
				<van-button round block type="primary" @click="handleRegister">
					注册
				</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {login} from "@/api/login.js"
	import {setToken, removeToken} from "@/utils/auth.js"
	
	const defaultUser = {
		username: "",
		password: ""
	}
	export default {
		data() {
			return {
				user: Object.assign({}, defaultUser),
				userRules: {
					username: [{ required: true, message: '请填写账号' }],
					password: [{ required: true, message: '请填写密码' }]
				},
				checked: false
			}
		},
		mounted(){
			this.getLoginInfo()
		},
		methods: {
			// 返回
			handleBack(){
				this.$router.back()
			},
			// 获取账号密码
			getLoginInfo(){
				if (localStorage.getItem("shop_username") && localStorage.getItem("shop_password")) {
					this.user.username = localStorage.getItem("shop_username")
					this.user.password = localStorage.getItem("shop_password")
					this.checked = true
				}
			},
			// 确认
			handleSubmit(values) {
				login(values).then(res => {
					if (res.code == 0) {
						// 判断记住密码是否存在
						if (values.checked) {
							localStorage.setItem('shop_username', res.data.username)
							localStorage.setItem('shop_password', res.data.password)
						}
						// 缓存用户id
						localStorage.setItem("shop_userid", res.data.user_id)
						// 缓存token
						setToken(res.token)
						// 登录成功跳转
						this.$router.push({path: '/home'});
					} else {
						this.$Notify({type: 'warning', message: res.msg})
					}
				})
			},
			// 注册
			handleRegister(){
				this.$router.push({path: '/register'})
			}
		},
	}
</script>

<style>
	.checkbox{
		padding: 10px;
	}
</style>
