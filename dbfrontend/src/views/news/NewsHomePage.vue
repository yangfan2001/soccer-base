<template>
  <a-row  style="margin-top: 100px">
    <a-col :span="18" :offset="3">
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="18" :offset="3">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px',padding:'0px'}">
        <a-card>
          <template #title>
            <span style="font-size: 30px">Soccer News</span>
          </template>
          <template #extra>
            <span v-show="store.state.auth==='admin'">
              <router-link to="/edit">add news</router-link>
            </span>
          </template>
        <!--V for 循环遍历dataArr数组在界面上面显示数据-->
          <div class="display-box" v-for="(item,index) in dataArr" :key="item.id">
            <a-row class="display-block">
              <!--The place to display the image of the news-->
              <a-col :span="6" :offset="1">
                <a-image :src="item.cover_url" width="150px"
                         height="100px" style="object-fit: cover;margin-bottom: 20px"/>
              </a-col>
              <!--The place to display the content of the news-->
              <a-col :span="16" :offset="1">
                <a-row style="margin-top: 10px">
                  <!--The title of the news-->
                  <a-col :span="18">
                    <a-typography-title style="float: left;text-align:left;width:500px;"
                                        :level="4"
                                        :ellipsis="{ tooltip:item.title }"
                                        href=""
                                        :content="item.post_title"
                                        @click="handleTitleClick(item)"
                    />
                  </a-col>
                  <a-col :offset="4">
                    <h3 style="float: right">
                      <icon-font type="icon-news"/>
                    </h3>
                  </a-col>
                </a-row>

                <br/>
                <!--The content of the news-->
                <a-row>
                  <a-col :span="18">
                    <div style="float: left">
                       <span v-show="item.link">
                         <router-link :to="`/team/${item.link}`">{{item.link}}</router-link>
                       </span>
                    </div>
                  </a-col>
                  <!--the date of the news-->
                  <a-col :offset="2">
                    <div style="float: right;margin-right:10px">
                      <calendar-outlined/> {{dayjs(item.post_time).format('YYYY-MM-DD')}}
                    </div>
                  </a-col>
                </a-row>
              </a-col>
              <template v-if="index!==dataArr.length-1">
                <a-divider
                    style="background-color: gainsboro;margin-top: 10px;"
                />
              </template>
            </a-row>
          </div>
        </a-card>
      </div>
    </a-col>
  </a-row>

</template>

<script setup>
import {useStore} from "vuex";
const store = useStore()
import {ref, inject, onMounted} from "vue";
import {createFromIconfontCN,CalendarOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
// 引入ant-design和iconfont的包
const IconFont = createFromIconfontCN({
  scriptUrl:'//at.alicdn.com/t/font_3349008_5fm7z4eu6qs.js'})
// 定义暂时用来展示的基本数据data-> 后期该数据项从数据库中取得
const dataArr = ref([])
const axios = inject('axios')
import dayjs from "dayjs";
import router from "@/router";

async function getData(){
  await axios({
        method: 'Get',
        url: `/api/post/block/News`
      }
  ).then((response)=>{
    dataArr.value = response.data.BlockPostData
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误")
  })
}

onMounted(()=>{
  getData()
})

const handleTitleClick = item => router.push({path:`/post/${item.post_id}`})
</script>

<style scoped>
.select-box{
  padding:120px 200px 0px 200px;
}
.select{
  float:left;
  width: 100px;
}
.display-box{
}
.display-block{
  height: 120px;
}
</style>