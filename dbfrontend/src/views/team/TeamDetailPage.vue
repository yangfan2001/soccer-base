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
            TeamName:{{TeamData.team_name}}
          </template>
          <a-avatar  :size="100" :src="TeamData.team_avatar_url"/>
          <a-card-meta style="margin-top: 20px">
            <template #title>
              Country:{{TeamData.country}}
              <a-divider type="vertical"/>
              City:{{TeamData.city}}
              <a-divider type="vertical"/>
              Coach:{{TeamData.coach}}
            </template>
            <template #description>
              <span style="float: left">
                 {{TeamData.team_content}}
              </span>
            </template>
          </a-card-meta>
        </a-card>

        <a-card>
          <template #title>
            {{TeamData.team_name}} Players({{TeamPlayerData.length}})
          </template>
          <template #extra>
            <span v-show="store.state.auth==='admin'">
              <a @click="addPlayer">add player</a>
            </span>
          </template>
          <a-list item-layout="horizontal" :data-source="TeamPlayerData">
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

    <!--The modal to add a new Player To a Team-->

    <!--定义drawer用于编辑球队信息-->
    <a-modal v-model:visible="Visible" title="添加球员️" @ok="handleModalOK" width="300px" :centered="true"
             :bodyStyle={} :get-container="false" style="text-align: center">
      <a-form style="text-align: center">

        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewPlayerData.player_name"
                   placeholder="请输入球员名称">
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewPlayerData.player_avatar_url"
                   placeholder="请输入球员图片URL">
          </a-input>
        </a-form-item>


        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewPlayerData.country"
                   placeholder="请输入球员国籍">
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewPlayerData.player_value"
                   placeholder="请输入球员市值">
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-select
              v-model:value="NewPlayerData.position"
              :options="options"
          />
        </a-form-item>

      </a-form>
      <a href="https://sofifa.com/">go to data source</a>
    </a-modal>

  </div>

</template>

<script setup>

import {ArrowLeftOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
const router = useRouter()
const returnLastPage = ()=> router.back()
import {useStore} from "vuex";
const store = useStore()
import {ref,inject} from "vue";
import {message} from "ant-design-vue";
const axios = inject('axios')

// define TeamData Var
const TeamName = router.currentRoute.value.params.TeamName
const TeamData = ref([])
const TeamPlayerData = ref([])

async function getData(){
  await axios({
    method:'Get',
    url: `/api/team/detail/${TeamName}`,
  }).then((response)=>{
    TeamData.value = response.data.team_data
    TeamPlayerData.value = response.data.player_data
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误!!")
  })
}

// add player related action
const NewPlayerData = ref({
  player_name:'',
  country:'',
  team_name:'',
  player_value:'',
  player_avatar_url:'',
  position:'GoalKeeper'
})
const Visible = ref(false)
async function handleModalOK(){
  await axios({
    method:'Post',
    url: `/api/player/new`,
    data:{
      player_name:NewPlayerData.value.player_name,
      country:NewPlayerData.value.country,
      team_name:TeamName,
      player_value:NewPlayerData.value.player_value,
      player_avatar_url:NewPlayerData.value.player_avatar_url,
      position:NewPlayerData.value.position
    }
  }).then((response)=>{
    if(response.data.suc){
      message.success("添加成功!!")
    }
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误!!")
  })
  getData()
  Visible.value = false
}
const addPlayer = ()=> Visible.value = true
const options = [
  {value:'GoalKeeper',label:'GoalKeeper'},
  {value:'Center Back',label:'Center Back'},
  {value:'Left Side Back',label:'Left Side Back'},
  {value:'Right Side Back',label:'Right Side Back'},
  {value:'Right Midfielder',label:'Right Midfielder'},
  {value:'Left Midfielder',label:'Left Midfielder'},
  {value:'Center Midfielder',label:'Center Midfielder'},
  {value:'Center Forward',label:'Center Forward'},
  {value:'Left Forward',label:'Left Forward'},
  {value:'Right Forward',label:'Right Forward'},
]
import {onMounted} from "vue";
onMounted(()=>{
  getData()
})
</script>

<style scoped>

</style>