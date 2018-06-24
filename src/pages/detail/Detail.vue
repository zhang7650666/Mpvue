<!-- Me component -->
<template>
  <div class="detail-wrap">图书id:{{bookId}}</div>
</template>

<script>
import {get} from '@/util'
export default {
  data () {
    return {
      bookId: ""
    }
  },
  mounted(){
     this.bookId = this.$root.$mp.query.id
    this.getDetail()
  },
  methods:{
    async getDetail() {
      const res = await get('/weapp/bookdetail', {id: this.bookId})
    }
  }
}
</script>
<style lang="scss">


</style>
