<template>
	<div class="header">
		<div class="container">
			<div class="header-top clearfix">
				<div class="logo">
					<a href="##">
						<img src="../../assets/logo.png" alt="">
					</a>
				</div>
				<ul class="nav">
					<li>
						<a href="#" class="actiev">音乐馆</a>
					</li>
					<li>
						<a href="#">我的音乐</a>
					</li>
					<li>
						<a href="#">客户端</a>
					</li>
					<li>
						<a href="#">音乐号</a>
					</li>
					<li>
						<a href="#">VIP</a>
					</li>
				</ul>	
				<div class="form">
					<div class="search">
						<input class="search-ipt" type="text" placeholder="梦想的声音第二季">
						<input type="button" class="sear-btn">
						<input type="button" class="sear-reg" value="登录">
					</div>
					<div class="btn-group"> 
						<input type="button" value="开通绿钻豪华版">
						<input type="button" value="开通付费包">
					</div>
				</div>
			</div>
		<div class="router-nav clearfix">
				<ul>
					<li>
						<router-link to="/Home">首页</router-link>
					</li>
					<li>
						<router-link to="/singer">歌手</router-link>
					</li>
					<li>
						<router-link to="/album">专辑</router-link>
					</li>
					<li>
						<router-link to="/list">排行榜</router-link>
					</li>
					<li>
						<router-link to="/playlist">分类歌单</router-link>
					</li>
					<li>
						<router-link to="/radio">电台</router-link>
					</li>
					<li>
						<router-link to="/mv">MV</router-link>
					</li>
					<li>
						<router-link to="/dligitalablum">数字专辑</router-link>
					</li>
				</ul>	
			</div>			
		</div>

	</div>
</template>


<script>
export default{


}
</script>


<style lang="less">
	.header{
		width: 100%;
		background:#fff;
		.container
		{
			width:1200px;
			margin:0 auto;
			.header-top{
				border-bottom:1px solid #f2f2f2;
				.logo{
					width:168px;
					height:45px;
					padding: 22px 0px;
					float: left;
					a{
						width:100%;
						height:100%;
						img{
							width:100%;
							heigt:100%;
						}
					}
				}
				.nav{
					display: inline-block;
					float:left;
					margin-left: 30px;
					li{
						float:left;
						a{
							font-size: 17px;
							line-height: 20px;
							padding:35px 20px;
							display:inline-block;
							color:#6e3333;
							&:hover{
								color:rgb(49,194,124);
							}

						}
						.actiev{
							background:#31c27c;
							color:#fff;
							&:hover{
								color:#fff;
							}
						}
					}
				}
				.form{
					margin-top:25px;
					float:right;
					.search{
						position: relative;
						float:left;
						.search-ipt{
							width:220px;
							height:38px;
							border:1px solid #c9c9c9;
							outline: none;
							border-radius:2px;
							float:left;
							text-indent: 10px;
							font-size:14px;
						}
						.sear-btn{
							position:absolute;
							margin-top:10px;
							width:16px;
							height:16px;
							background:url("../../assets/icon_sprite.png");
							background-position:-0px -40px;
							right:90px;
							outline:none;
							border:none;
							cursor:pointer;

						}
						.sear-btn:hover{
							background-position:-0px -60px;
						}
						.sear-reg{
							float:left;
							font-size:15px;
							padding:11px 0px;
							margin:0 26px;
							background:#fff;
							border:none;
							color:#333;
							cursor:pointer;
						}
						.sear-reg:hover{
							color:#31c27c;
						}
					}
					.btn-group{
						float:left;
						font-size:0px;
						input{
							padding:0px 10px;
							height:38px;
							line-height:38px;
							text-align: center;
							border-radius:2px;
							cursor:pointer;
						}
						input:nth-of-type(1){
							color:#deffea;
							background:#31c27c;
							border:none;
							margin-right: 10px;
							&:hover{
								background:rgb(44,175,111);
							}
						}	
						input:nth-of-type(2){
							color:#333333;
							background:#ffffff;
							border:1px solid #c9c9c9;
							&:hover{
								background:rgb(237,237,237);
							}
						}
					}
				}
			}
			.router-nav{
				margin-left:184px;
				line-height:50px;
				li{
					float:left;
					margin-left:47px;
					a{
						font-size:13px;
						color:#333333;
						user-select:none;
						&:hover{
							color:rgb(49,194,124);
						}
					}
					.router-link-active{
						color:rgb(49,194,124);
					}
				}

			}
		}
	}


</style>