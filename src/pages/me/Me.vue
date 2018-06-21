<!-- Me component -->
<template>
  <div class="me-wrap">
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
    <p>个人中心</p>
    <div class="userInfo">
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button @click="scanBook" class="btn">添加图书</button>
  </div>
</template>

<script>
import {get,showSuccess} from '../../util.js'
import qcloud from 'wafer2-client-sdk' // 获取用户id   微信自带的  只需要安装一下就好
import config from '../../config'
export default {
  data () {
    return {
      userInfo:{

      }
    }
  },

  async created () {
    // await get('/weapp/demo').then(res => {
    //   console.log(res)
    // }) 
    console.log('小程序启动成功')
    this.userInfo = wx.getStorageSync('userInfo')
  },
  methods: {
    // 图书扫码
    scanBook(){

    },
    // 判断有没有登录
    doLogin() {
      let userInfo = wx.getStorageSync('userInfo')
      if(!userInfo){
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            console.log('登录成功', userInfo)
            wx.setStorageSync('userInfo',userInfo)
            showSuccess('登录成功')
          },
          fail: function (err) {
            console.log('登录失败', err)
            showSuccess('登录失败')
          }
        })
      }else{
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            console.log('登录成功', userInfo)
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
      
    }
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
