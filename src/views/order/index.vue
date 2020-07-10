<template>
	<div class="container">
		<div class="app-header">
			<van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="handleBack"/>
		</div>
		<div>
			<van-tabs v-model="order.order_status" @change="handleChange">
			  <!-- <van-tab title="待购买"></van-tab> -->
				<van-tab title="已购买" name="0">
					<div style="margin: 10px; border-radius: 5px ;overflow: hidden;" 
					v-for="(item,index) in list" :key="index">
						<van-card :num="item.order_count" :price="item.price" 
						:desc="'地址：'+item.user_address_detail" :title="'商品名称：'+ item.product_name"
						:thumb="imgheader + item.imgpath">
							<template #tags>
								<div>{{'总金额：' + item.total_money}}</div>
								<div>{{"订单号码："+ item.order_id}}</div>
							</template>
							<template #footer>
								<van-button type="primary"  size="small">已支付</van-button>
								<van-button type="info" size="small" @click="handleConfirm(item.order_id)">确认签收</van-button>
							</template>
						</van-card>
					</div>
				</van-tab>
				<van-tab title="已签收" name="1">
					<div style="margin: 10px; border-radius: 5px ;overflow: hidden;" v-for="(item,index) in list" :key="index">
						<van-card :num="item.order_count" :price="item.price" 
						:desc="'地址：'+item.user_address_detail" :title="'商品名称：'+ item.product_name"
						:thumb="imgheader + item.imgpath">
							<template #tags>
								<div>{{'总金额：' + item.total_money}}</div>
								<div>{{"订单号码："+ item.order_id}}</div>
							</template>
							<template #footer>
								<van-button type="info" size="small">已签收</van-button>
							</template>
						</van-card>
					</div>
				</van-tab>
				<van-tab title="所有订单" name="2">
					<div style="margin: 10px; border-radius: 5px ;overflow: hidden;" v-for="(item,index) in list" :key="index">
						<van-card :num="item.order_count" :price="item.price" 
						:desc="'地址：'+item.user_address_detail" :title="'商品名称：'+ item.product_name"
						:thumb="imgheader + item.imgpath">
							<template #tags>
								<div>{{'总金额：' + item.total_money}}</div>
								<div>{{"订单号码："+ item.order_id}}</div>
							</template>
							<template #footer>
								<van-button type="primary" v-if="item.order_status == 0"  size="small">已支付</van-button>
								<van-button type="info" v-if="item.order_status == 0" size="small" @click="handleConfirm(item.order_id)">确认签收</van-button>
								<van-button type="info" v-if="item.order_status == 1" size="small">已签收</van-button>
							</template>
						</van-card>
					</div>
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
	import {orderlist, updateorderstatus} from "@/api/order"
	export default {
		data() {
			return {
				order: {
					user_id: localStorage.getItem("shop_userid"),
					order_status: 0
				},
				list: [],
				imgheader: "http://120.27.0.79:4399/",
				// imgheader: "http://localhost:4399/",
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
			// 获取列表
			getList(){
				orderlist(this.order).then(res => {
					if (res.code == 0) {
						this.list = res.data
					} else if (res.code == 1) {
						this.$Notify({type: "warning", message: res.msg})
					} else {
						this.$Notify({type: "warning", message: res.msg})
						this.$router.push({path: "/login"})
					}
				})
			},
			// 切换状态
			handleChange(val){
				this.order.order_status = val
				this.getList()
			},
			// 确认收款
			handleConfirm(id){
				var data = {
					order_id: id
				}
				updateorderstatus(data).then(res => {
					if (res.code == 0) {
						this.$Notify({type: "success", message:'签收成功'})
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
	}
</script>

<style>
	.van-card{
		background: #FFFFFF;
	}
</style>
