<template>
	<div class="container">
		<div class="app-header">
			<van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="handleBack"
			right-text="添加" @click-right="handleAdd"/>
		</div>
		<div>
			<van-address-list
			  v-model="chosenAddressId"
			  :list="list"
			  default-tag-text="默认"
			  @edit="handleEdit"
			  @add="handleAdd"
			  @select="handleSelect"
			/>
		</div>
	</div>
</template>

<script>
	import {addresslist, updatestatusaddress} from "@/api/address"
	import {setCookie} from "@/utils/support"
	export default {
		data() {
			return {
				chosenAddressId: '',
				list: []
			}
		},
		mounted(){
			this.getList()
		},
		methods: {
			// 返回
			handleBack() {
				this.$router.back()
			},
			// 添加
			handleAdd(){
				this.$router.push({path: "/addressdetail", query: {isEdit: false}})
			},
			// 获取地址列表
			getList(){
				var data = {
					user_id: localStorage.getItem("shop_userid")
				}
				addresslist(data).then(res => {
					if (res.code == 0) {
						for (let i = 0; i < res.data.length; i++) {
							var addressdata = {
								id: res.data[i].user_address_id,
								name: res.data[i].user_address_name,
								address: res.data[i].user_address_detail,
								tel: res.data[i].user_address_phone,
								isDefault: res.data[i].user_address_status == 1 ? true: false
							}
							if (res.data[i].user_address_status == 1) {
								this.chosenAddressId = res.data[i].user_address_id
							}
							this.list.push(addressdata)
						}
					} else {
						this.$Notify({type: 'warning', message: res.msg})
						if (res.code == 2) {
							this.$router.push({path: "/login"})
						}
					}
				})
			},
			// 编辑
			handleEdit(item){
				setCookie("addressitem", JSON.stringify(item))
				this.$router.push({path: "/addressdetail", query: {isEdit: true}})
			},
			// 
			handleSelect(item){
				console.log(item)
				updatestatusaddress(item).then(res => {
					if (res.code == 0) {
						this.list = []
						this.getList()
					} else {
						this.$Notify({type: "warning", message: res.msg})
					}
				})
			}
		},
	}
</script>

<style>
</style>
