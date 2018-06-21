<!-- Me component -->
<template>
  <div>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
    <p>个人中心</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created(){
    console.log('小程序启动成功')
  }

}
</script>
<style scoped>
</style>
