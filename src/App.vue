
<script>
//import config from "./config.js"
import {get} from "./util.js"
import qcloud from 'wafer2-client-sdk' // 获取用户id   微信自带的  只需要安装一下就好
import config from './config.js'

export default {
  async created(){
  //  qcloud.setLoginUrl(config.loginUrl)
  //  qcloud.login({
  //     success(userInfo){
  //       console.log('登录成功', userInfo)
  //     },
  //     fail(err){
  //       console.log('登录失败', err)
  //     }
  //   })
   await get('/demo').then(res => {
      console.log(res)
    })
    // wx.request({
    //   url:config.host+'/weapp/demo',
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    console.log('小程序启动成功')
  },
  methods: {
    doLogin: function (e) {
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
</script>
<style scoped>
</style>

