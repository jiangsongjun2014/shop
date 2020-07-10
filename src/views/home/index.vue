<template>
	<div class="container" >
		<!-- 头部 -->
		<div class="app-header" >
			<van-nav-bar title="首页" >
			  <template #right>
				<van-icon name="search" size="18" /> 
			  </template>
			</van-nav-bar>
		</div>
		<!-- 轮播 -->
		<div class="app-swipe" >
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			  <van-swipe-item v-for="(item, index) in swipelist" :key="index">
				  <img :src="item" alt="">
			  </van-swipe-item>
			</van-swipe>
		</div>
		<!-- 列表 -->
		<div class="app-listbox">
			<van-list v-model="loading" :immediate-check="false" :finished="finished" @load="onLoad" :offset="10">
				<van-grid  :column-num="2">
					<van-grid-item v-for="(item,index) in list" :key="index" @click="handledetail(item)">
						<van-image width="100%" height="150" :src="imgheader + item.imgpath"/>
						<div class="shoptextbox">
							<div class="shoptitle">商品名称：{{item.product_name}}</div>
							<div class="shoprpice">
								商品单价：￥{{item.price}}
								<van-icon name="cart-o" size="18" class="shopicon" /> 
							</div>
						</div>
					</van-grid-item>
				</van-grid>
			</van-list>
		</div>
		<!-- 底部 -->
		<div class="app-footer">
			<Footer></Footer>
		</div>
	</div>
</template>

<script>
	import Footer from "@/components/Footer/Footer.vue"
	import {productlist} from "@/api/product.js"
	import {setCookie} from "@/utils/support"
	import swipe1 from "@/assets/1.png"
	import swipe2 from "@/assets/2.png"
	
	// 列表数据
	const defaultListQuery = {
		page: 1,
		pagesize: 6,
		keyword: null,
		product_like_id: null
	}
	export default {
		data() {
			return {
				loading: false,
				finished: false,
				listQuery: Object.assign({}, defaultListQuery),
				list: [],
				imgheader: "http://120.27.0.79:4399/",
				// imgheader: "http://localhost:4399/",
				swipelist:[
					swipe1,
					swipe2
				]
			}
		},
		components: {
			Footer
		},
		mounted(){
			this.getList()
		},
		methods: {
			// 获取商品列表
			getList(){
				productlist(this.listQuery).then(res => {
					if (res.code == 0) {
						this.list = this.list.concat(res.data) 
						
						if (res.data.length < this.listQuery.pagesize) {
							this.finished = true
						} else {
							this.finished = false
						}
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			// 列表触底加载
			onLoad(){
				this.listQuery.page = this.listQuery.page + 1
				this.getList()
			},
			// 点击详情
			handledetail(item){
				setCookie("productdetail", JSON.stringify(item))
				this.$router.push({path: "/productdetail", query:{id: item.product_id}})
			}
		},
	}
</script>

<style scoped="scoped">
	.my-swipe .van-swipe-item img{
	  width: 100%;
	  height: 150px;
	}
	.shoptextbox{
		width: 100%; 
		margin-top: 5px;
	}
	.shoptitle{
		padding: 5px 0;
		margin: 0;  
		font-size: 15px;
	}
	.shoprpice{
		padding: 2px 0; 
		margin: 0; 
		color: #ea625b; 
		font-size: 12px;
	}
	.shopicon{
		float: right; 
		margin-right: 5px;
	}
	.app-listbox{
		margin-bottom: 50px;
		/* width: 100%;
		flex: 1;
		background: #000000;
		position: absolute;
		margin-top: 200px; */
	}
</style>
