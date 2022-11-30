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
      <a-card style="border-radius: 20px;">
        <template #title>
          <div style="text-align: center">
            <span style="float: left">
              <a-select :options="TeamNameOptions"  v-model:value="TeamSelected"
                        style="width: 130px"
                        placeholder="选择一个链接"
              />
            </span>
            <span>发帖</span>
            <a-select style="float: right;width: 130px;"
                      v-model:value="selectVal">
              <a-select-opt-group>
                <template #label>
                  <span>
                     <IconFont type="icon-news"/> 新闻
                  </span>
                </template>
                <a-select-option :value="BlockArr[0].val">{{BlockArr[0].name}}</a-select-option>
              </a-select-opt-group>
              <a-select-opt-group>
                <template #label>
                  <span>
                     <IconFont type="icon-forum"/> 帖子
                  </span>
                </template>
                <a-select-option
                    v-for="(item,index) in BlockArr.slice(1,)"
                    :key="index"
                    :value="item.val"
                >
                  {{item.name}}
                </a-select-option>
              </a-select-opt-group>
            </a-select>
          </div>
        </template>
        <a-input placeholder="请输入标题" v-model:value="title"></a-input>
        <a-input v-show="selectVal === 'News'"
                 placeholder="请输入封面URL(不输入为默认)" v-model:value="cover_url">
        </a-input>
        <rich-editor @submitRichText="getRichText"/>
      </a-card>
    </a-col>
  </a-row>


</div>
</template>

<script setup>
import {createFromIconfontCN} from "@ant-design/icons-vue";
import {ArrowLeftOutlined} from '@ant-design/icons-vue';
import {ref,inject} from "vue";
import {message} from "ant-design-vue";
import {getRandomUrl} from "@/utils/tools";

const axios = inject('axios')
const title = ref("")
const cover_url = ref("")
// create Store
import {useStore} from "vuex";
const store = useStore()

const IconFont = createFromIconfontCN({
  scriptUrl:'//at.alicdn.com/t/font_3349008_5fm7z4eu6qs.js'})
import RichEditor from './RichEditor'
import router from "@/router";
// 通过emit向子编辑组件传递了自己的参数
const TeamSelected = ref('')
// eslint-disable-next-line no-unused-vars
const getRichText = (content,a)=>{
  if(store.state.auth!=="admin" && selectVal.value ==="News"){
    message.warning("只有管理员才能上传新闻!")
    return
  }
  if(!title.value.length){
    message.error("标题不能为空")
    return
  }
  if(title.value.length>60){
    message.error("标题超出长度限制")
    return
  }
  if(cover_url.value.length === 0){
    cover_url.value = getRandomUrl()
  }
  if(selectVal.value!=='News'){
    cover_url.value = ''
  }
  axios({
    method: 'Post',
    url: `/api/post/new`,
    data:{
      user_name:sessionStorage.getItem('user_name'),
      user_id:sessionStorage.getItem('user_id'),
      block_name:selectVal.value,
      content:content.innerHTML,
      post_title:title.value,
      cover_url:cover_url.value,
      link:TeamSelected.value
    }
  }).then((response) => {
    if(response.data.suc){
      message.success("发帖成功！")
    }
    const new_post_Id = response.data.post_id

    router.push(`/post/${new_post_Id}`)
  }).catch((error) => {
    message.error ('连接错误！')
    console.log(error)
  })
}
const selectVal = ref("News")
const BlockArr = [
  {val:'News',name:'新闻'},
  {val:'SoccerBlock',name:'足球话题专区'},
  {val:'EuropeSoccerBlock',name:'欧洲足球专区'},
  {val:'UkSoccerBlock',name:'英超专区'},
  {val:'SpainSoccerBlock',name:'西甲专区'},
  {val:'GermainSoccerBlock',name:'德甲专区'},
  {val:'ItalySoccerBlock',name:'意甲专区'},
  {val:'FranceSoccerBlock',name:'法甲专区'}
]

const returnLastPage = ()=>{
  router.back()
}
const TeamNameOptions = ref([])
const getData = ()=>{
  axios({
    method: 'Get',
    url: `/api/team/teamname`,
  }).then((response) => {
    const data = response.data.team_name_data
    const temp = []
    data.forEach((item) =>{
      temp.push({value:item.team_name,label:item.team_name})
    })
    TeamNameOptions.value = temp
    console.log(response.data)
  }).catch((error) => {
    message.error ('连接错误！')
    console.log(error)
  })
}
import {onMounted} from "vue";
onMounted(()=>{
  getData()
})
</script>

<style scoped>

</style>