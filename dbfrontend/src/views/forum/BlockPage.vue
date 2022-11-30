<template>
  <div>
    <a-row style="margin-top: 100px">
      <a-col :span="16" :offset="4">
        <span style="float: left">
          <a @click="returnLastPage"><ArrowLeftOutlined/>返回</a>
        </span>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="16" :offset="4">
        <a-card>
          <template #title>
            {{getLeagueChineseName(BlockName)}}
          </template>
          <template #extra>
            <router-link :to="{path:`/edit`}">发贴</router-link>
          </template>
          <a-list item-layout="horizontal" :data-source="showData">
            <template #renderItem="{ item }">
              <a-list-item>

                <template #actions>
                  发帖人：{{item.user_name}}
                  {{dayjs(item.post_time).fromNow()}}
                  <span v-show="store.state.auth === 'admin'">
                    <a-popconfirm title="确认删除？" ok-text="Yes" cancel-text="No" @confirm="deletePost(item)">
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                </template>
                <a-list-item-meta>
                  <template #description>
                  </template>
                  <template #title>
                   <span style="float: left">
                      <router-link :to="{path:`/post/${item.post_id}`}" style="font-size: 20px">
                      {{item.post_title}}
                    </router-link>
                   </span>
                  </template>
                  <template #avatar>
                    <a-avatar :src="`https://ui-avatars.com/api/?name=${item.user_name}`" />
                  </template>
                </a-list-item-meta>

              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import {ArrowLeftOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {getLeagueChineseName} from "../../utils/tools"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import {useStore} from "vuex";
const store = useStore()

const router = useRouter()
// return to last page
const returnLastPage = ()=>{
  router.back()
}
// router获取专区的Name
const BlockName = router.currentRoute.value.params.blockName
// getData读取数据
import {ref,inject} from 'vue'
const axios = inject('axios')
const showData = ref([
])

const getData = ()=>{
  axios({
        method: 'Get',
        url: `/api/post/block/${BlockName}`
      }
  ).then((response)=>{
    showData.value = response.data.BlockPostData
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误")
  })
}

async function deletePost(item){
  await axios({
        method: 'Post',
        url: `/api/post/delete/${item.post_id}`
      }
  ).then((response)=>{
    if(response.data.suc){
      message.success(`删除成功！`)
    }
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误")
  })

  getData()
}

import {onMounted} from "vue";
import {message} from "ant-design-vue";
onMounted(()=>{
  getData()
})
</script>

<style scoped>

</style>