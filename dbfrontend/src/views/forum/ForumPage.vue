<template>
  <div>
    <a-row style="margin-top: 100px">
      <a-col :offset="3" :span="18">
        <a-card>
          <template #title>
            <h1>专区</h1>
          </template>
          <template #extra>
            Your Role:{{store.state.auth}}
          </template>
          <a-card-grid style="width: 50%;"
                       v-for="(item,index) in data"
                       :key="index" @click="handleClickBlock(item)">
            <a-card :bordered="false" :body-style="{ padding: 0 }">

              <a-card-meta :description="item.description">
                <template #title>
                  {{item.name}}
                </template>
                <template #avatar>
                  <a-avatar :src="require('../../assets/icon/'+item.picName)"/>
                </template>
              </a-card-meta>
            </a-card>
          </a-card-grid>

        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore()
import {useRouter} from "vue-router";
const router = useRouter()
import {getLeagueEnglishName} from "../../utils/tools"

const data = [
  {
    name:"足球话题专区",
    id:1,
    description:"这是足球话题专区",
    picName:'Soccer.png'
  },
  {
    name:"欧洲足球专区",
    id:2,
    description:"这里是欧洲足球专区",
    picName:'EuropeSoccer.png'
  },
  {
    name:"英超专区",
    id:3,
    description:"精彩的英超，足球爱好者们的乐园",
    picName:'UkSoccer.png'
  },
  {
    name:"西甲专区",
    id:4,
    description:"精彩的西甲，足球爱好者们的乐园",
    picName:'SpainSoccer.png'
  },
  {
    name:"德甲专区",
    id:5,
    description:"德国足球爱好者们的乐园",
    picName:'GermainSoccer.png'
  },
  {
    name:"意甲专区",
    id:6,
    description:"意大利足球爱好者们的乐园",
    picName:'ItalySoccer.png'
  },
  {
    name:"法甲专区",
    id:7,
    description:"法国足球爱好者们的乐园",
    picName:'FranceSoccer.png'
  },
]

const handleClickBlock = (item)=>{
  router.push(`/forum/${getLeagueEnglishName(item.name)}`)
}
</script>

<style scoped>

</style>