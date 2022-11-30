<template>
  <div>
      <a-row style="margin-top: 100px;margin-bottom: 200px">
        <a-col :span="16" :offset="4">
          <a-card>
            <template #title>
              球队
            </template>
            <template #extra>
              <a @click="showModal" v-show="store.state.auth === 'admin'">添加球队</a>
            </template>
            <a-empty v-show="data.length === 0"/>
            <a-card-grid style="width: 33.3%;"
                         v-for="(item,index) in data"
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

    <!--定义drawer用于编辑球队信息-->
    <a-modal v-model:visible="Visible" title="添加球队⚽️" @ok="handleModalOK" width="300px" :centered="true"
             :bodyStyle={} :get-container="false" style="text-align: center">
      <template #footer>
        <div style="text-align: center;">
          <a-button type="primary" @click="handleModalOK">Submit</a-button>
        </div>
      </template>
      <a-form style="text-align: center">

        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewTeamData.team_name"
                   placeholder="请输入球队名称">
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewTeamData.team_avatar_url"
                   placeholder="请输入球队图片URL">
          </a-input>
        </a-form-item>


        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewTeamData.team_country"
                   placeholder="请输入球队国家">
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewTeamData.team_city"
                   placeholder="请输入球队城市">
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input style="width: 100%;"
                   v-model:value="NewTeamData.team_coach"
                   placeholder="请输入球队教练">
          </a-input>
        </a-form-item>

        <a-textarea :rows="4"
                    v-model:value="NewTeamData.team_content"
                    placeholder="请输入球队简介"/>
      </a-form>
      <a href="https://sofifa.com/">go to data source</a>
    </a-modal>


  </div>
</template>

<script setup>
import {ref,inject} from 'vue'
import {useStore} from "vuex";
const store = useStore()
import {useRouter} from "vue-router";
const router = useRouter()
const data = ref([])
const handleClickTeam = (item)=>{
  router.push({path:`/team/${item.team_name}`})
}
const Visible = ref(false)
const showModal = () => Visible.value = true;

import {message} from "ant-design-vue";
const axios = inject('axios')
const NewTeamData = ref({
  team_avatar_url:'',
  team_name:'',
  team_country:'',
  team_city:'',
  team_coach:'',
  team_content:'',
})
async function handleModalOK(){
  Visible.value = false
  await axios({
    method:'post',
    url: `/api/team/new`,
    data:{
      team_name:NewTeamData.value.team_name,
      country:NewTeamData.value.team_country,
      city:NewTeamData.value.team_city,
      coach:NewTeamData.value.team_coach,
      team_avatar_url:NewTeamData.value.team_avatar_url,
      team_content:NewTeamData.value.team_content
    }
  }).then((response)=>{
    if(response.data.suc){
      message.success("添加成功!!")
    }else{
      message.error("添加失败!!")
    }
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误!!")
  })
  getData()
}

async function getData(){
  await axios({
    method:'get',
    url: `/api/team`,
  }).then((response)=>{
    data.value = response.data.team_data
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