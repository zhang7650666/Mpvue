<!-- Me component -->
<template>
  <div class="me-wrap">
    <div class="userInfo">
      <img :src="userInfo.avatarUrl" alt="">
      <p v-if="!userInfo.flag">{{userInfo.nickName}}</p>
      <button v-if="userInfo.flag" open-type="getUserInfo" bindgetuserinfo="onGetUserInfo">授权登录</button>
    </div>
    <YearProgress></YearProgress>
    <button @click="scanBook" class="btn">添加图书</button>
  </div>
</template>

<script>
import {get,showSuccess,post, showModal} from '@/util.js'
import YearProgress from "@/components/YearProgress"
import qcloud from 'wafer2-client-sdk' // 获取用户id   微信自带的  只需要安装一下就好
import config from '@/config.js'
export default {
  data () {
    return {
      userInfo:{
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录',
        flag:true,// 未登录标识
      }
    }
  },
  mounted(){
    if(wx.getStorageSync('userInfo')){
      this.userInfo = wx.getStorageSync('userInfo')
    }
  },
  // 获取用户信息
  onGetUserInfo: function(e) {
      let This = this;
      showSuccess('登录成功')
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userinfo) {
          This.userInfo = userinfo
          wx.setStorageSync('userInfo',userinfo)
          console.log(This.userInfo)
        }
      })
     
  },
  methods: {
    // addbook  添加图书
    async addBook(isbn){
      let res = await post('/weapp/addbook',{
        isbn,
        openId:this.userInfo.openId
      })
      console.log(res)
      if(res.code === 0){
         showModal('添加成功',`${res.title}添加成功`)
      }
     
    },
    // 图书扫码
    scanBook(){
      let This = this
      wx.scanCode({
        success(res){
          if(res.result){
            console.log(res)
            This.addBook(res.result)
          }
        },
        fail(err){
          console.log(res)
        }
      })
    }
  },
  components:{
    YearProgress
  }
}
</script>
<style lang="scss">
.me-wrap{
  margin:0 30rpx;
  .userInfo{
    margin-top:100rpx;
    text-align:center;
    img{
      display:inline-block;
      width:150rpx;
      height:150rpx;
      margin:20rpx;
      border-radius:50%;
    }
    p{
      font-size:30rpx;
    }
  }
}
</style>
