<template>
	<div class="container">
		<div class="app-header">
			<van-nav-bar title="注册" left-text="返回" left-arrow @click-left="handleBack"/>
		</div>
		<div>
			<van-form @submit="handleSubmit" >
				<van-field v-model="user.username" name="username" label="账号" placeholder="请输入账号" :rules="userRules.username"/>
				<van-field v-model="user.password" name="password" label="密码" type="password" placeholder="请输入密码" :rules="userRules.password"/>
				<van-field v-model="user.chePassword" name="chePassword" label="确认密码" type="password" placeholder="请确认密码" :rules="userRules.chePassword"/>
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
						登录
					</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import {register} from "@/api/login.js"
	const defaultUser = {
		username: "",
		password: "",
		chePassword: ""
	}
	export default {
		data() {
			return {
				user: Object.assign({}, defaultUser),
				userRules: {
					username: [{ required: true, message: '请填写账号' }],
					password: [{ required: true, message: '请填写密码' }],
					chePassword: [{ required: true, message: '请确认密码' }]
				}
			}
		},
		mounted(){
			
		},
		methods: {
			// 返回
			handleBack(){
				this.$router.back()
			},
			// 确认
			handleSubmit(values) {
				register(values).then(res => {
					if (res.code == 0) {
						this.$Notify({type: 'success', message: "注册成功"})
						this.$router.back()
					} else {
						this.$Notify({type: 'warning', message: res.msg})
					}
				})
			}
		},
	}
</script>

<style>
	.checkbox{
		padding: 10px;
	}
</style>
