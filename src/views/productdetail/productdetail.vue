<template>
	<div class="container">
		<div class="app-header">
			<van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="handleBack"/>
		</div>
		<div>
			<van-swipe :autoplay="3000" indicator-color="blue">
				<van-swipe-item v-for="(item,index) in imgList" :key="index">
					<img :src="imgheader + item" style="width: 100%; height: 250px;"/>
				</van-swipe-item>
			</van-swipe>
			<van-cell :title="'商品名称：' + name" :value="'库存：' + stock" 
			size="large" :label="'单价：' +price" />
			<van-tabs>
				<van-tab title="参数">
					 <van-cell v-for="(item, index) in paramsList" :key="index"
					 :title="item.product_detail_name" :value="item.product_detail"  />
				</van-tab>
				<van-tab title="详情">
					<div v-for="(item,index) in imgList" :key="index">
						<img :src="imgheader + item" style="width: 100%; height: 250px;"/>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<div>
			<!-- 底部 -->
			<van-goods-action>
			  <van-goods-action-icon icon="cart-o" text="购物车" @click="handleCart" />
			  <van-goods-action-button type="warning" text="加入购物车" @click="handleAddCart" />
			  <van-goods-action-button type="danger" text="立即购买" @click="handleBuy" />
			</van-goods-action>
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
	import {productdetaillist} from "@/api/product.js"
	import {addresslist} from "@/api/address"
	import {admininfo} from "@/api/admin.js"
	import {createcart} from "@/api/cart.js"
	import {createorder} from "@/api/order.js"
	import {getCookie} from "@/utils/support"
	export default {
		data() {
			return {
				productdetail: {
					product_id: null,
					page: 1,
					pagesize: 30
				},
				cart: {
					product_id: null,
					user_id: null
				},
				imgheader: "http://120.27.0.79:4399/",
				// imgheader: "http://localhost:4399/",
				imgList: [],
				paramsList:[],
				name: "",
				price: "",
				stock: "",
				addressId: "",
				pay_password: "",
				showKeyboard: false,
				value: ""
			}
		},
		mounted(){
			this.productdetail.product_id = this.$route.query.id
			this.cart.product_id = this.$route.query.id
			this.cart.user_id = localStorage.getItem("shop_userid")
			this.name =JSON.parse(getCookie("productdetail")).product_name
			this.price =JSON.parse(getCookie("productdetail")).price
			this.stock =JSON.parse(getCookie("productdetail")).stock
			this.getDetailList()
		},
		methods: {
			// 返回
			handleBack() {
				this.$router.back()
			},
			// 获取详情
			getDetailList(){
				productdetaillist(this.productdetail).then(res => {
					if (res.code == 0) {
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].product_detail_imgpath != null) {
								this.imgList.push(res.data[i].product_detail_imgpath)
							}
							if (res.data[i].product_detail_name != null) {
								this.paramsList.push(res.data[i])
							}
						}
					} else {
						this.$Notify({type: "warning", message: res.msg})
					}
				})
			},
			// 购物车
			handleCart(){
				this.$router.push({path: "/cart"})
			},
			// 加入购物车
			handleAddCart(){
				createcart(this.cart).then(res => {
					if (res.code == 0) {
						this.$Notify({type: "success", message: "添加成功"})
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			},
			// 立即购买
			handleBuy(){
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
						if (res.code == 2) {
							this.$router.push({path: "/login"})
						}
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
				} else {
					var data = {
						user_id: localStorage.getItem("shop_userid"),
						product_id: this.cart.product_id,
						user_address_id: this.addressId,
						order_count: 1,
						total_money: this.price
					}
					createorder(data).then(res => {
						if (res.code == 0) {
							this.$Notify({type: "success", message: "购买成功"})
							this.value = ""
						} else if (res.code == 1) {
							this.$Notify({type: "warning", message: res.msg})
						} else {
							this.$Notify({type: "warning", message: res.msg})
							this.$router.push({path: "/login"})
						}
					})
				}
			}
		},
	}
</script>

<style>
</style>
