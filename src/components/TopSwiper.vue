<template>
    <div class="top_swiper">
        <swiper
            :indicator-dots='true'
            indicator-color='#EA5A49'
            :autoplay='true'
            :interval='2000'
            :duration='1000'
            :circular='true'
        >
        <div :key='imgindex' v-for='(top,imgindex) in imgUrls'>
            <swiper-item>
                <img  
                    @click='bookDetail(img)'
                    class='slide-image' 
                    mode='aspectFit' 
                    v-for='img in top'
                    :key='img.id'
                    :src="img.image" 
                >
            </swiper-item>
        </div>
        
        </swiper>
    </div>
</template>
<script>
export default {
    props:{
        tops:{
            type:Array,
            required:true
        },
        size:{
            type:Number,
            requierd:true
        }
    },
    computed: {
        imgUrls(){
            const res = this.tops;
            let count = parseInt(this.size / 3)
            return [res.slice(0, count), res.slice(count, count * 2),res.slice(count * 2)]
        }
    },
    methods:{
        bookDetail(item){
             wx.navigateTo({
                url:'/pages/detail/main?id=' + item.id
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.top_swiper{
  margin-top:5px;
  .slide-image{
    width:50%;
    //height:250rpx;
  }
}
</style>


