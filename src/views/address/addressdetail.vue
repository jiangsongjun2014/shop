<template>
	<div class="container">
		<div class="app-header">
			<van-nav-bar :title="isEdit?'编辑地址':'添加地址'" left-text="返回" left-arrow @click-left="handleBack"/>
		</div>
		<div>
			<van-form @submit="handleSubmit" >
				<van-field v-model="address.user_address_name" name="user_address_name" label="姓名" placeholder="请输入姓名" :rules="addressRules.user_address_name"/>
				<van-field v-model="address.user_address_phone" name="user_address_phone" label="电话" placeholder="请输入电话" :rules="addressRules.user_address_phone"/>
				<van-field v-model="address.user_address_detail"  name="user_address_detail" label="地址" placeholder="请输入地址" :rules="addressRules.user_address_detail" />
				<van-field name="checked" label="是否默认">
				  <template #input>
					<van-switch v-model="address.user_address_status" size="20" />
				  </template>
				</van-field>
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
						保存
					</van-button>
				</div>
			</van-form>
			<div style="margin: 16px;" v-if="isEdit">
				<van-button round block type="danger" @click="handleDelete">
					删除
				</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {createaddress, updateaddress, deleteaddress} from "@/api/address"
	import {getCookie} from "@/utils/support"
	const defaultAddress = {
		user_address_name: null,
		user_address_phone: null,
		user_address_detail: null,
		user_address_status: false,
		user_address_id: null,
		user_id: null
	}
	export default {
		data() {
			return {
				address: Object.assign({}, defaultAddress),
				addressRules: {
					user_address_name: [{ required: true, message: '请填写姓名' }],
					user_address_phone: [{ required: true, message: '请填写电话' }],
					user_address_detail: [{ required: true, message: '请填写地址' }]
				},
				isEdit: false
			}
		},
		mounted(){
			this.address.user_id = localStorage.getItem("shop_userid")
			this.isEdit = this.$route.query.isEdit
			if (this.isEdit) {
				this.address.user_address_name = JSON.parse(getCookie("addressitem")).name
				this.address.user_address_phone = JSON.parse(getCookie("addressitem")).tel
				this.address.user_address_detail = JSON.parse(getCookie("addressitem")).address
				this.address.user_address_status = JSON.parse(getCookie("addressitem")).isDefault
				this.address.user_address_id = JSON.parse(getCookie("addressitem")).id
			}
		},
		methods: {
			// 返回
			handleBack() {
				this.$router.back()
			},
			// 确认
			handleSubmit(){
				if (this.isEdit) {
					updateaddress(this.address).then(res => {
						if (res.code == 0) {
							this.$Notify({type: "success", message: "添加成功"})
							this.$router.back()
						} else {
							this.$Notify({type: "warning", message: res.msg})
							if (res.code == 2) {
								this.$router.push({path: "/login"})
							}
						}
					})
				} else {
					createaddress(this.address).then(res => {
						if (res.code == 0) {
							this.$Notify({type: "success", message: "修改成功"})
							this.$router.back()
						} else {
							this.$Notify({type: "warning", message: res.msg})
							if (res.code == 2) {
								this.$router.push({path: "/login"})
							}
						}
					})
				}
			},
			// 删除
			handleDelete(){
				deleteaddress(this.address).then(res => {
					if (res.code == 0) {
						this.$Notify({type: "success", message: "删除成功"})
						this.$router.back()
					} else {
						this.$Notify({type: "warning", message: res.msg})
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
