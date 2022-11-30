<template>
  <div>
    <a-row style="margin-top: 100px">
      <a-col :span="16" :offset="4">
        <span style="float: left">
          <a @click="returnLastPage"><ArrowLeftOutlined/> 返回</a>
        </span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="16" :offset="4">
        <a-card>
          <template #title>
            <a-card-meta>
              <template #title>
                <a-typography-title style="float: left;text-align:left;width:800px;margin-top: 10px"
                                    :level="4"
                                    :ellipsis="{ tooltip:PostData.title }"
                                    href=""
                                    :content="PostData.title"/>
              </template>
              <template #description>
                <span style="float: left">
                  By {{PostData.Author}}
                  <a-divider type="vertical"></a-divider>
                  {{PostData.Block}}
                </span>
                <span style="float: right"><CalendarOutlined/> {{dayjs(PostData.Date).format('YYYY-MM-DD HH:mm:ss')}}</span>
              </template>
              <template #avatar>
                <a-avatar :src="PostData.AvatarUrl" :size="80"/>
              </template>
            </a-card-meta>
          </template>
          <template #actions>
            <span v-show="PostData.link">
              <router-link :to="`/team/${PostData.link}`">{{PostData.link}}</router-link>
            </span>
          </template>
          <div style="" id="content">
            <span
                v-html="PostData.content"
            />
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row style="margin-top: 50px">
     <a-col :span="16" :offset="4">

         <a-card>
           <CommentList/>
         </a-card>
         <a-card style="margin-top: 20px">
           <ReplyZone/>
         </a-card>
     </a-col>
    </a-row>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import {ArrowLeftOutlined} from '@ant-design/icons-vue';
import {CalendarOutlined} from '@ant-design/icons-vue';
import CommentList from './post/components/CommentList'
import ReplyZone from "@/views/post/components/ReplyZone";
// eslint-disable-next-line no-undef,no-unused-vars
const data = defineProps(
    {
      Type:{type:String,default:'post'}
    }
)
//
import {ref,inject} from "vue";
import {message} from "ant-design-vue";
const axios = inject('axios')
const PostData = ref({
  AvatarUrl:'',
  Content:'',
  Author:'',
  Date:'',
  Title:'',
  Block:'',
  link:''
})
import {useRouter} from "vue-router";
const router = useRouter()

import {getLeagueChineseName} from "../utils/tools"
const processImg = ()=>{
  // obtain the content div
  const content_div = document.getElementById("content")
  const dom_arr = content_div.getElementsByTagName("img")
  for(let i=0;i<dom_arr.length;i++){
    dom_arr[i].style.width = "400px"
    dom_arr[i].style.flexWrap = "true"
  }
}
// lets getTheData
async function getData(){
  await axios({
        method: 'Get',
        url: `/api/post/detail/${router.currentRoute.value.params.postId}`
      }
  ).then((response)=>{
    PostData.value.Author = response.data.user_name
    PostData.value.Date = response.data.post_time
    PostData.value.content = response.data.content
    PostData.value.title = response.data.post_title
    PostData.value.Block = getLeagueChineseName(response.data.block_name)
    PostData.value.AvatarUrl = `https://ui-avatars.com/api/?name=${response.data.user_name}`
    PostData.value.link = response.data.link
    console.log(response.data.content)
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误")
  })

  processImg()
}

const returnLastPage = ()=>{
  router.back()
}
import {onBeforeMount,onMounted} from "vue";
onBeforeMount(()=>{
  getData()
})

onMounted(()=>{
  console.log()
})


</script>

<style scoped>

</style>