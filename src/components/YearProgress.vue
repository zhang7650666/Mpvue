<template>
    <div class="progressBar">
      <progress :percent="percent" activeColor="#EA5A49" show-info />
      <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>
<script>
export default {
  computed:{
   year(){
     return new Date().getFullYear();
   },
   days(){
     let start = new Date();
     start.setMonth(0)
     start.setDate(1);
     //今年第一天
     // 已过天数=(今天天的时间戳 -今年第一天的时间戳)/(1000*60*60*24)+1
     let offset = new Date().getTime() - start.getTime()
     return parseInt(offset/(1000*60*60*24))+1
   },
   percent(){
     // 运年计算规则  只要整除4 并且不能被100整除   或者 能整除400
     let y = new Date()
     let isLeap = (y%4 === 0 && y%100 !== 0) || y%400 === 0
     let day = isLeap ? 366 : 365
     return (this.days/day*100).toFixed(2)

   }
  }
}
</script>
<style lang="scss" scoped>
.progressBar{
  text-align: center;
  margin-top:10px;
  margin-bottom:40px;
  width:100%;
  progress{
    margin-bottom: 10px;
  }
}

</style>


