<template>
  <a-list
      class="comment-list"
      item-layout="horizontal"
      :data-source="showData"
      :pagination="{...paginationProps, current: currentPage}"
  >
    <template #header>
      <h1>Comments({{showData.length}})</h1>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment :author="item.user_name" :avatar="`https://ui-avatars.com/api/?name=${item.user_name}`">
          <template #content>
            <p style="float: left;">
              {{item.content}}
            </p>
          </template>
          <template #datetime>
            <a-tooltip>
              <a-tooltip :title="dayjs(item.comment_time).format('YYYY-MM-DD HH:mm:ss')">
                <span>{{dayjs(item.comment_time).fromNow() }}</span>
              </a-tooltip>
            </a-tooltip>
          </template>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import {ref,computed} from "vue";

const data = ref([])
//定义分页相关信息
const currentPage = ref(1)
const paginationProps =computed(()=>{
  return {
    showQuickJumper: true,
    pageSize: 4,
    total: data.value.length,
    onChange (page) {
      currentPage.value = page
    }
  }
})
const showData = computed( ()=>{
  const { pageSize, total } = paginationProps.value // 每页条数
  const res = []
  const start = (currentPage.value - 1) * pageSize
  const end = currentPage.value * pageSize < total ? (currentPage.value * pageSize) : total
  for (let i = start; i < end; i++) {
    res.push(data.value[i])
  }
  return res
})

import {inject} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

const postId = router.currentRoute.value.params.postId

import {message} from "ant-design-vue";
const axios = inject('axios')

const getData = ()=>{
  axios({
        method: 'Get',
        url: `/api/post/comment/${postId}`,
      }
  ).then((response)=>{
    data.value = response.data.comment_data
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误")
  })
}




import {onMounted} from "vue";
onMounted(()=>{
  getData()
})
import emitter from "../../../utils/eventbus";
emitter.on("updateComment",()=>{
  getData()
})
</script>