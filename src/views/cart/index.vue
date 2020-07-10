<template>
	<div class="container">
		<!-- 头部 -->
		<div class="app-header">
			<van-nav-bar title="购物车" >
				<template #right >
					<van-icon name="edit" size="18" @click="delflag = !delflag" />
				</template>
			</van-nav-bar>
		</div>
		<div style="display: flex; background: #FFFFFF; margin: 5px; border-radius: 5px; overflow: hidden;" v-for="(item, index) in list" :key="index">
			<van-checkbox v-model="item.cart_status" @change="handleChange(item.cart_status, item.cart_id)"></van-checkbox>
			<van-card :num="item.count" :price="item.price" :title="'商品名称：'+item.product_name" 
			:thumb="imgheader + item.imgpath">
			  <template #tags>
				<div style="margin-top: 15px;">
					<van-button icon="delete"  size="mini" @click="handlereduce(item)" />
					<span>{{item.count}}</span>
					<van-button icon="add-o"  size="mini" @click="handleAdd(item)" />
				</div>
			  </template>
			</van-card>
			<div style="padding: 20px; display: flex;justify-content: center;align-items: center;"
			v-if="delflag" @click="handledelete(item)">
				<van-button icon="delete" type="danger" size="mini" />
			</div>
		</div>
		<div>
			<van-submit-bar :price="totalmoeny*100" button-text="提交订单" @submit="onSubmit">
				<van-checkbox v-model="checked" @change="handleAllSelect">全选</van-checkbox>
			</van-submit-bar>
		</div>
		<!-- 底部 -->
		<div class="app-footer">
			<Footer ></Footer>
		</div>
		<div v-if="showKeyboard">
			<!-- 密码输入框 -->
			<van-password-input :value="value" :focused="showKeyboard"/>
			<!-- 数字键盘 -->
			<van-number-keyboard :show="showKeyboard" @input="handleOnInput" 
			@delete="handleOnDelete" @blur="showKeyboard = false" close-button-text="完成"
			@close="handleClose"/>
		</div>
	</div>
</template>

<script>
	import {cartlist, addcartcount, reducecartcount, updatecartstatus, updateallcartstatus, deletecart} from "@/api/cart.js"
	import {addresslist} from "@/api/address"
	import {admininfo} from "@/api/admin.js"
	import {createcartorder} from "@/api/order"
	import Footer from "@/components/Footer/Footer.vue"
	export default {
		data() {
			return {
				list: [],
				imgheader: "http://120.27.0.79:4399/",
				// imgheader: "http://localhost:4399/",
				totalmoeny: "",
				checked: false,
				delflag: false,
				orderlist: [],
				addressId: "",
				pay_password: "",
				showKeyboard: false,
				value: ""
			}
		},
		components: {
			Footer
		},
		mounted(){
			this.getList()
		},
		methods: {
			// 提交
			onSubmit(){
				// 获取默认地址id
				this.getAddressId()
				// 获取支付密码
				this.getPayPassword()
				// 打开键盘
				this.showKeyboard = true
			},
			// 获取地址id
			getAddressId(){
				var data = {
					user_id: localStorage.getItem("shop_userid")
				}
				addresslist(data).then(res => {
					if (res.code == 0) {
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].user_address_status == 1) {
								this.addressId = res.data[i].user_address_id
							}
						}
						if (this.addressId == '') {
							this.$Notify({type: 'warning', message: "请设置默认地址"})
							this.$router.push({path: "/address"})
						}
					} else {
						this.$Notify({type: 'warning', message: res.msg})
						if (res.code == 2) {
							this.$router.push({path: "/login"})
						}
					}
				})
			},
			// 获取支付密码
			getPayPassword(){
				var data = {
					user_id: localStorage.getItem("shop_userid")
				}
				admininfo(data).then(res => {
					if (res.code == 0) {
						this.pay_password = res.data[0].pay_password
					} else {
						this.$Notify({type: 'warning', message: res.msg})
					}
				})
			},
			// 输入
			handleOnInput(key){
				this.value = (this.value + key).slice(0, 6);
			},
			// 删除
			handleOnDelete(){
				this.value = this.value.slice(0, this.value.length - 1);
			},
			// 关闭键盘
			handleClose(){
				if (this.value != this.pay_password) {
					this.$Notify({type: 'warning', message: "密码不正确"})
					this.value = ""
				} else {
					var data = {
						user_id: localStorage.getItem("shop_userid"),
						orderlist: this.orderlist,
						addressId: this.addressId
					}
					createcartorder(data).then(res => {
						if (res.code == 0) {
							this.$Notify({type: "success", message: "操作成功"})
							this.getList()
						} else if (res.code == 1) {
							this.$Notify({type: "warning", message: res.msg})
						} else {
							this.$Notify({type: "warning", message: res.msg})
							this.$router.push({path: "/login"})
						}
					})
				}
			},
			// 全选
			handleAllSelect(){
				var data ={
					status: "",
					user_id: localStorage.getItem('shop_userid')
				}
				if (this.checked == false) {
					data.status = 0
				} else {
					data.status = 1
				}
				updateallcartstatus(data).then(res => {
					if (res.code == 0) {
						this.getList()
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			},
			// 列表
			getList(){
				var data = {
					user_id: localStorage.getItem("shop_userid")
				}
				cartlist(data).then(res => {
					this.totalmoeny  = ''
					if (res.code == 0) {
						for(let i = 0; i<res.data.length; i++) {
							if (res.data[i].cart_status == 1) {
								res.data[i].cart_status = true
								this.orderlist.push(res.data[i])
								this.totalmoeny = Number(this.totalmoeny) + Number(res.data[i].count) * Number(res.data[i].price)
							} else {
								res.data[i].cart_status = false
							}
						}
						this.list = res.data
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			},
			// 添加
			handleAdd(item){
				addcartcount(item).then(res => {
					if (res.code == 0) {
						this.getList()
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			},
			// 减少
			handlereduce(item){
				reducecartcount(item).then(res => {
					if (res.code == 0) {
						this.getList()
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			},
			// 选中
			handleChange(status,id){
				var data = {
					status: "",
					cart_id: id
				}
				if (status == false) {
					data.status = 0
				} else {
					data.status = 1
				}
				updatecartstatus(data).then(res => {
					if (res.code == 0) {
						this.getList()
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			},
			handledelete(item){
				deletecart(item).then(res => {
					if (res.code == 0) {
						this.getList()
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			}
		}
		
	}
</script>

<style>
	.van-submit-bar{
		bottom: 50px !important;
	}
	.van-card{
		width: 100% !important;
		background: #FFFFFF !important;
	}
	.van-card:not(:first-child){
		margin: 0 !important;
	}
	.van-checkbox{
		padding: 10px !important;
	}
</style>
