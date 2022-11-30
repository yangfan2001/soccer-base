<template>
  <a-comment>
    <template #avatar>
      <a-avatar :src="store.state.user_avatar_url"/>
    </template>
    <template #content>
      <a-form-item>
        <a-textarea v-model:value="content" :rows="4" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" @click="handleSubmit">
          Add Comment
        </a-button>
      </a-form-item>
    </template>
  </a-comment>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore()
import {ref,inject} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
const postId = router.currentRoute.value.params.postId

import {message} from "ant-design-vue";
const axios = inject('axios')
const content = ref('')
// 总线监听
import emitter from "../../../utils/eventbus";

const handleSubmit = ()=>{
  axios({
        method: 'Post',
        url: `/api/post/comment/new/${postId}`,
        data:{
          user_name:sessionStorage.getItem('user_name'),
          user_id:sessionStorage.getItem('user_id'),
          post_id:postId,
          content:content.value
        }
      }
  ).then((response)=>{
    if(response.data.suc){
      message.success("评论成功！")
      emitter.emit("updateComment")
    }
  }).catch((error)=>{
    console.log(error)
    message.error("连接错误")
  })
}

</script>

<style scoped>

</style>