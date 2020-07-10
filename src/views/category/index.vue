<template>
	<div class="container">
		<!-- 头部标签 -->
		<div class="app-header">
			<div class="app-header">
				<van-nav-bar title="分类" ></van-nav-bar>
			</div>
		</div>
		<div class="app-main" style="display: flex;">
			<!-- 侧边 -->
			<div style="width: 90px;" >
				<van-sidebar v-model="activeKey" @change="handleCate">
				  <van-sidebar-item :title="item.product_like_name" 
				  v-for="(item, index) in catelist" :key="index" />
				</van-sidebar>
			</div>
			<!-- 内容 -->
			<div style="width: 100%; margin-bottom: 50px;">
				<van-list v-model="loading" :immediate-check="false" :finished="finished" @load="onLoad" :offset="10">
					<van-grid :column-num="2">
						<van-grid-item v-for="(item,index) in prolist" :key="index" >
							<van-image width="100%" height="150" :src="imgheader + item.imgpath"/>
							<div class="shoptextbox">
								<div class="shoptitle">名称：{{item.product_name}}</div>
								<div class="shoprpice">
									单价：￥{{item.price}}
									<van-icon name="cart-o" size="18" class="shopicon" /> 
								</div>
							</div>
					  </van-grid-item>
					</van-grid>
				</van-list>
			</div>
		</div>
		<!-- 底部 -->
		<div class="app-footer">
			<Footer ></Footer>
		</div>
	</div>
</template>

<script>
	import Footer from "@/components/Footer/Footer.vue"
	import {procategorylist} from "@/api/productcategory.js"
	import {productlist} from "@/api/product.js"
	
	// 分类列表数据
	const defaultCateListQuery = {
		page: 1,
		pagesize: 5,
		keyword: null
	}
	// 商品列表数据
	const defaultProListQuery = {
		page: 1,
		pagesize: 6,
		keyword: null,
		product_like_id: null
	}
	export default {
		data() {
			return {
				activeKey: 0,
				cateListQuery: Object.assign({}, defaultCateListQuery),
				proListQuery: Object.assign({}, defaultProListQuery),
				prolist: [],
				catelist: [],
				loading: false,
				finished: false,
				imgheader: "http://120.27.0.79:4399/",
				// imgheader: "http://localhost:4399/",
			}
		},
		components: {
			Footer
		},
		mounted(){
			this.getCateList()
		},
		methods: {
			// 获取分类列表
			getCateList(){
				procategorylist(this.cateListQuery).then(res => {
					if (res.code == 0) {
						this.catelist = res.data
						this.proListQuery.product_like_id = res.data[0].product_like_id
						this.getProList()
					} else{
						this.$message.error(res.msg)
					}
				})
			},
			// 分类点击
			handleCate(index){
				this.proListQuery.product_like_id = this.catelist[index].product_like_id
				this.proListQuery.page = 1
				this.prolist = []
				this.getProList()
			},
			// 获取商品列表
			getProList(){
				productlist(this.proListQuery).then(res => {
					if (res.code == 0) {
						this.prolist = this.prolist.concat(res.data) 
						if (res.data.length < this.proListQuery.pagesize) {
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
				this.proListQuery.page = this.proListQuery.page + 1
				this.getProList()
			}
		},
	}
</script>

<style scoped="scoped">
	.van-sidebar-item{
		text-align: center;
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
</style>
