<template>
<div style="margin-top: 100px">
  <a-row>
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
          帖子/新闻
        </template>
        <a-list item-layout="horizontal" :data-source="PostData">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <span>发帖人：{{item.user_name}}</span>
                {{dayjs(item.post_time).fromNow()}}
              </template>
              <a-list-item-meta>
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
                {{item}}
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </a-col>
  </a-row>

  <a-row style="margin-top: 20px">
    <a-col :span="16" :offset="4">
      <a-card>
        <template #title>
          球队
        </template>
        <a-empty v-if="TeamData.length===0"/>

        <a-card-grid style="width: 33.3%;"
                     v-for="(item,index) in TeamData"
                     :key="index" @click="handleClickTeam(item)">
          <a-card :bordered="false" :body-style="{ padding: 0 }">

            <a-card-meta :description="item.country">
              <template #title>
                {{item.team_name}}
              </template>
              <template #avatar>
                <a-avatar :src="item.team_avatar_url"/>
              </template>
            </a-card-meta>
          </a-card>
        </a-card-grid>

      </a-card>
    </a-col>
  </a-row>

  <a-row  style="margin-top: 20px">
    <a-col :span="16" :offset="4">
      <a-card>
        <template #title>
          球员
        </template>
        <a-empty v-if="PlayerData.length===0"/>
        <a-list item-layout="horizontal" :data-source="PlayerData">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                {{item.position}}
              </template>
              <a-list-item-meta>
                <template #description>
                </template>
                <template #title>
                   <span style="float: left">
                     <router-link :to="{path:`/player/${item.player_id}`}">
                       {{item.player_name}}
                     </router-link>
                   </span>
                </template>
                <template #avatar>
                  <a-avatar :size="50" :src="item.player_avatar_url" />
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
import {ArrowLeftOutlined} from '@ant-design/icons-vue'
import {useRouter,onBeforeRouteUpdate} from "vue-router"
import {ref,inject} from 'vue'
import {message} from "ant-design-vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const router = useRouter()
// return to last page
const returnLastPage = ()=>{
  router.back()
}
// team GRID CLICK action
const handleClickTeam = item => router.push({path:`/team/${item.team_name}`})

// define the search data
const PostData = ref([])
const TeamData = ref([])
const PlayerData = ref([])
const axios = inject('axios')


async function getData(KeyWord){
  PostData.value = []
  TeamData.value = []
  PlayerData.value = []
  // init
  await axios({
    method:'Get',
    url: `/api/post/search/${KeyWord}`,
  }).then((response)=>{
    PostData.value = response.data.post_data
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误!!")
  })

  await axios({
    method:'Get',
    url: `/api/team/search/${KeyWord}`,
  }).then((response)=>{
    TeamData.value = response.data.team_data
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误!!")
  })

  await axios({
    method:'Get',
    url: `/api/player/search/${KeyWord}`,
  }).then((response)=>{
    PlayerData.value = response.data.player_data
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误!!")
  })

}

import {onMounted} from "vue";
onMounted(()=>{
  getData(router.currentRoute.value.params.KeyWord)
})

// listen the router,if it updates then it should get data
onBeforeRouteUpdate((to)=>{
  getData(to.params.KeyWord)
  console.log(to)
})

</script>

<style scoped>

</style>