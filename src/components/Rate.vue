<template>
    <div class="rate_wrap">
        <span>☆☆☆☆☆</span>
        <div class="hollow" :style='style'> ★★★★★</div>
    </div>
</template>
<script>
export default {
    props:{
        rate:{
            type:[Number,String],
            default:0
        }
    },
    computed:{
        style(){
             return `width:${this.rate/2}em`
        }
    }
}
</script>
<style lang="scss" scoped>
.rate_wrap{
  position: relative;
  display: inline-block;
  .hollow{
    position: absolute;
    display: inline-block;
    top:0;
    left:0;
    width:0;
    overflow:hidden;
  }
}
</style>

