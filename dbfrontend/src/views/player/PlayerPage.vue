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
            {{PlayerData.player_name}}
          </template>
          <a-avatar  :size="100" :src="PlayerData.player_avatar_url"/>
          <a-card-meta style="margin-top: 20px">
            <template #title>
              Country:{{PlayerData.country}}
              <a-divider type="vertical"/>
              Team:{{PlayerData.team_name}}
              <a-divider type="vertical"/>
              Position:{{PlayerData.position}}
              <a-divider type="vertical"/>
              Value:{{PlayerData.player_value}}
            </template>
            <template #description>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import {ArrowLeftOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
const router = useRouter()
const returnLastPage = ()=> router.back()

import {ref,inject} from "vue";
import {message} from "ant-design-vue";
const axios = inject('axios')
const PlayerData = ref([])
const PlayerId = router.currentRoute.value.params.PlayerId

async function getData(){
  await axios({
    method:'Get',
    url: `/api/player/detail/${PlayerId}`,
  }).then((response)=>{
    PlayerData.value = response.data.player_data[0]
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误!!")
  })
}

import {onMounted} from "vue";
onMounted(()=>{
  getData()
})
</script>

<style scoped>

</style>