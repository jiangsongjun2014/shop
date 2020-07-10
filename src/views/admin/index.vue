<template>
	<div class="container">
		<div class="app-header">
			<van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="handleBack"></van-nav-bar>
		</div>
		<div>
			<van-form @submit="handleSubmit" ref="admin">
				<van-field v-model="admin.nickname" name="nickname" label="姓名" placeholder="请输入姓名" :rules="adminRules.nickname"/>
				<van-field v-model="admin.sex" name="sex" label="性别" placeholder="请输入性别" :rules="adminRules.sex"/>
				<van-field v-model="admin.age" type="digit" name="age" label="年龄" placeholder="请输入年龄" :rules="adminRules.age" />
				<van-field v-model="admin.phone" type="digit" name="phone" label="手机号码" placeholder="请输入手机号码" :rules="adminRules.phone" />
				<van-field v-model="admin.pay_password" type="digit" label="支付密码" placeholder="请输入支付密码" :rules="adminRules.pay_password" />
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
						保存
					</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import {admininfo, updateadmin} from "@/api/admin.js"
	
	const defaultAdmin = {
		nickname: "",
		sex: "",
		age: "",
		phone: "",
		pay_password: "",
		user_id: ""
	}
	export default {
		data() {
			return {
				admin: Object.assign({}, defaultAdmin),
				adminRules: {
					nickname: [{ required: true, message: '请填写姓名' }],
					sex: [{ required: true, message: '请填写性别' }],
					age: [{ required: true, message: '请填写年龄' }],
					phone: [{ required: true, message: '请填写手机号码' }],
					pay_password: [{ required: true, message: '请填写支付密码' }],
				}
			}
		},
		mounted(){
			this.getAdminInfo()
		},
		methods: {
			// 返回
			handleBack(){
				this.$router.back()
			},
			// 获取用户信息
			getAdminInfo(){
				var data = {
					user_id: localStorage.getItem("shop_userid")
				}
				admininfo(data).then(res => {
					if (res.code == 0) {
						this.admin = Object.assign({}, res.data[0])
					} else {
						this.$Notify({type: 'warning', message: res.msg})
					}
				})
			},
			// 确认
			handleSubmit() {
				updateadmin(this.admin).then(res => {
					if (res.code == 0) {
						this.$Notify({type: 'success', message: res.msg})
						this.getAdminInfo()
					} else {
						this.$Notify({type: 'warning', message: res.msg})
						if (res.code == 2) {
							this.$router.push({path: "/login"})
						}
					}
				})
			}
		},
	}
</script>

<style>
</style>
