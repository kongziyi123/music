<template>
	<div class="footer">
		<div class="container">
			<div class="dwonload">
				<div>
					<p>下载QQ音乐客户端</p>
					<div class="iconwarp">
						<div class="icon">
							<i class="bg"></i>
							<p>PC版</p>
						</div>
						<div class="icon">
							<i class="bg"></i>
							<p>Mac版</p>
						</div>
						<div class="icon">
							<i class="bg"></i>
							<p>Android版</p>
						</div>
						<div class="icon">
							<i class="bg"></i>
							<p>iPhone版</p>
						</div>
					</div>
				</div>
				<div>
					<p>开放平台</p>
					<div class="iconwarp">
						<div class="icon">
							<a href="#">腾讯音乐人平台</a>
						</div>
						<div class="icon">
							<a href="#">音乐号认证</a>
						</div>
						<div class="icon">
							<a href="#">上传视频</a>
						</div>
						<div class="icon">
							<a href="#">上传音频</a>
						</div>
					</div>
				</div>				
			</div>
			<div class="product">
				<p>特色产品</p>
				<div class="product-items">
					<div class="item">
						<div class="bg"></div>
						<p>全民k歌</p>
						<p>车载互联</p>
					</div>
					<div class="item">
						<div class="bg"></div>
						<p>Super Sound</p>
						<p>QQ演出</p>
					</div>
					<div class="item">
						<div class="bg"></div>
						<p>QPlay</p>
					</div>										
				</div>
			</div>
			<div class="cooperation">
				<p>合作链接</p>
				<div class="cooperation-tbody">
					<div class="cooperation-tr">
						<a href="##">CJ E&M</a>
						<a href="##">腾讯视频</a>
						<a href="##">手机QQ空间</a>
					</div>
					<div class="cooperation-tr">
						<a href="##">最新版QQ</a>
						<a href="##">腾讯社交广告</a>
						<a href="##">电脑管家</a>
					</div>
					<div class="cooperation-tr">
						<a href="##">QQ浏览器</a>
						<a href="##">腾讯微云</a>
						<a href="##">腾讯云</a>
					</div>									<div class="cooperation-tr">
						<a href="##">企鹅FM</a>
						<a href="##">智能电视网</a>
						<a href="##">当贝市场</a>
					</div>		
				</div>
			</div>
		</div>
		<div class="announcement">
			<p class="line">
				<a href="##">关于腾讯</a>
				<a href="##">About Tencent</a>
				<a href="##">noopener nofollow</a>
				<a href="##">用户服务协议</a>
				<a href="##">隐私政策</a>
				<a href="##">权利声明</a>
				<a href="##">广告服务</a>
				<a href="##">腾讯招聘</a>
				<a href="##">腾讯招聘</a>
				<a href="##">网站导航</a>
			</p>
			<p>
				Copyright © 1998 - 2017
				2017 Tencent. <a href="#">All Rights Reserved.</a>
			</p>
			<p>
				腾讯公司 
				<a href="##">版权所有</a>
				<a href="##">腾讯网络文化经营许可证</a>
			</p>
		</div>
	</div>
</template>


<script>
export default{

}

</script>

<style lang="less">
	.footer{
		width: 100%;
		background: #333;
		padding: 80px 80px 0 80px;
		box-sizing: border-box;
		min-width: 1200px;
		.container{
			width:100%;
			display:flex;
			.dwonload{
				
				flex:1;
				p{
					color:#999;
				}
				.iconwarp{
					margin-bottom:80px;
					margin-top:50px;
					display:flex;
					.icon{
						flex:1;
						text-align:center;
						.bg{
							width:48px;
							height: 48px;
							display:inline-block;
							cursor: pointer;
						}
						a{
							color:#7f998c;
						}
						p{
							color:#7f998c;
							margin-top:5px;
						}
					&:nth-of-type(1){
						.bg{
							background:url(../../assets/footicon.png);
							background-position:0 0;
						}
						.bg:hover{
							background-position:0 -49px;
						}
					}
					&:nth-of-type(2){
						.bg{
							background:url(../../assets/footicon.png);
							background-position:-89px 0;
						}
						.bg:hover{
							background-position:-89px -49px;
						}
					}
					&:nth-of-type(3){
						.bg{
							background:url(../../assets/footicon.png);
							background-position:-187px 0;
						}
						.bg:hover{
							background-position:-187px -49px;
						}
					}
					&:nth-of-type(4){
						.bg{
							background:url(../../assets/footicon.png);
							background-position:-276px 0;
						}
						.bg:hover{
							background-position:-276px -49px;
						}
					}					


				}

				}
			}
			.product{
				flex:1;
				margin-left:40px;
				p{
					color:#999;

				}
				.product-items{
					.item{
						float:left;
						text-align:center;
						margin-left: 20px;
						margin-top:50px;
						.bg{
							width:45px;
							height:45px;
							cursor:pointer;
							display:inline-block;
						}
						p{
							color:#999;
							line-height: 20px;
							margin-top:18px;
						}
						&:nth-of-type(1){
							.bg{
								background:url(../../assets/footicon.png);
								background-position:-367px 0;
							}
							.bg:hover{
								background-position:-367px -49px;	
							}
						}
						&:nth-of-type(2){
							.bg{
								background:url(../../assets/footicon.png);
								background-position:-461px 0;				
							}
							.bg:hover{
								background-position:-461px -49px;	
							}
						}
						&:nth-of-type(3){
							.bg{
								background:url(../../assets/footicon.png);
								background-position:-560px 0;		
							}
							.bg:hover{
								background-position:-560px -49px;	
							}
						}												
					}
				

				}
			}
			.cooperation{
				flex:1;
				p{
					color:#999;
				}
				.cooperation-tbody{
					width:100%;
					margin-top: 50px;
					.cooperation-tr{
						display:flex;
						a{
							display:inline-block;
							flex:1;
							color:#939193;
						}
						a:hover{
							color:rgb(50,183,124);
						}
					}
					.cooperation-tr+.cooperation-tr{
						margin-top:22px;
					}
				}
			}

		}
		.announcement{
			color:#999999;
			padding-bottom:15px;
			overflow: hidden;
			text-align:center;
			a{
				color:#999;
			}
			p+p{
				margin-top:18px;
			}
		}
	}

</style>