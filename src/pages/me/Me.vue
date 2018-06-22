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
import {get,showSuccess} from '@/util.js'
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
      //  get('/weapp/user').then((res) => {
      //     console.log(1)
      //     console.log(res)
      //   })
       qcloud.request({
        url: config.userUrl,
        login: true,
        success (userRes) {
         console.log(userRes.data.data)
        }
      })
    }
  },
  // 获取用户信息
  onGetUserInfo: function(e) {
      this.userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo',e.detail.userInfo)
      showSuccess('登录成功')


      console.log(e.detail.userInfo)
  },
  methods: {
    // 图书扫码
    scanBook(){
      wx.scanCode({
        success(res){
          console.log(res)
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
