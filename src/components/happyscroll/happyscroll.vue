<template>
	<div class="scroll" v-if="isshow">
		 <happy-scroll color="rgb(221,221,221)">
			<slot>
				
			</slot>										
		 </happy-scroll>
	</div>	
</template>

<script>
export default{
	name:'scroll',
	data(){
		return{
			isshow:false
		}
	},
	methods:{
		show(){
			this.isshow=true;
		},
		hide(){
			this.isshow=false;
		}

	}

}
</script>

<style>
	.scroll{
		width: 500px;
    	height: 280px;
    	background: #f6f6f6;
    	padding: 20px;
    	border: 1px solid #ddd;
    	border-radius:6px;
    	letter-spacing: 2px;
	}
</style>