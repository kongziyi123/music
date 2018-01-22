<template>
  <div class="select">
      <div class="items clearfix">
          <div class="item" v-for="(item,i) in selectitems" :class="{active:i==selectindex}" @click="changeindex(i,item)">
              {{item.name}}
          </div>
      </div>
  </div>
</template>


<script>
export default{
data(){
    return{
        selectindex:0
    }
},
methods:{
    changeindex(i){
        this.selectindex=i;
        this.$emit('selectchange',i);
    },
    clear(){
        this.selectindex=0;
    }
},
props:{
    selectitems:{
        default(){
            return []
        }
    }

}

}
</script>
<style lang='less'>
    .select{
        .items{
            width: 100%;
            .item{
                float: left;
                padding: 8px;
                color:#333;
                margin-right: 24px;
                cursor: pointer;
                font-size: 14px;
            }
            .active{
                color:#fff;
                background: #31c27c;
            }
        }       
    }


</style>
