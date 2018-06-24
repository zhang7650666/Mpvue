<!--  -->
<template>
  <div class="book_wrap">
    <TopSwiper :tops='tops' :size="size"></TopSwiper>
    <Card v-for="(book,index)  in books" :book="book" :key="book.id"></Card>
    <p class='text-footer' v-if='!more'> 没有更多数据</p>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import TopSwiper from '@/components/TopSwiper.vue'
import {get} from '@/util.js'
// 35条数据
// 每次加载10条
// 0页   0-10
// 1     10-20
// 2     20-30（5）
// page 当前第几页

// 没有更多数据
// 1. page=0 不能显示这条提醒
// 2. page>0 数据长度<10 停止触底加载

export default {
  data () {
    return {
      books: [],
      page:0,
      more:true,
      size:6,
      tops:[]
    }
  },
  mounted () {
    this.getList (true)
    this.getTop()
  },
  methods:{
   async getList (init) {
     if(init){
       this.page = 0
       this.more = true
     }
      wx.showNavigationBarLoading()  //  下拉加载loading显示
     const res = await get('/weapp/booklist', {
       page: this.page,
       size: this.size
     })
     if(res.list.length < this.size && this.page > 0){
       this.more = false
     }
     if(init){
       this.books = res.list
       wx.stopPullDownRefresh() // 下拉事件取消
     }else{
       this.books = this.books.concat(res.list)
     }
     
     wx.hideNavigationBarLoading() //  下拉加载成功之后loading隐藏
    },
    async getTop () {
      const res = await get('/weapp/gettop', {size:this.size})
      this.tops = res.list
    }
  },
  onPullDownRefresh () {
    // 上拉刷新
    this.getList(true)
    this.getTop()
  },
  //距离页面底部加载下一页
  onReachBottom(){
    // 当没有更多的时候  直接返回
    if(!this.more){
      return
    }
    this.page ++
    this.getList()
  },
  components: {
    Card,
    TopSwiper
  }
}
</script>
<style scoped>
</style>
