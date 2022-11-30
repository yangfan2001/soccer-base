<template>
  <div>
    <a-layout-header class="Header">
      <div class="NavbarLeft">
        <div class="Logo">
          <IconFont type="icon-soccer-player"></IconFont>
          SoccerBase
          <IconFont type="icon-soccer-ball"></IconFont>
        </div>

        <a-menu v-model:selectedKeys="currentPage" mode="horizontal" class="NavbarMenu"
                style="float:left;margin-left: 20px;width: 450px;">

          <a-menu-item key="news">
            <router-link to="/news">
              <icon-font type="icon-news"/> 新闻
            </router-link>
          </a-menu-item>

          <a-menu-item key="forum">
            <router-link to="/forum">
              <icon-font type="icon-forum"/> 论坛
            </router-link>
          </a-menu-item>

          <a-menu-item key="team">
            <router-link to="/team">
              <icon-font type="icon-team"/> 球队
            </router-link>
          </a-menu-item>


        </a-menu>

        <a-input-search class="NavbarSearch"
                        placeholder="输入查询帖子、球员、球队"
                        v-model:value = "searchVal"
                        @search = "onSearch"
        />
      </div>
      <!--the right side of the navbar-->
      <div class="NavbarRight">

        <span v-show="store.state.auth!==`nobody`">
          <span style="color: lightslategray">{{store.state.user_name}}</span>
          <a-dropdown class="NavbarAvatar">

          <span>
          <a-avatar  :src="store.state.user_avatar_url"
                     style="background-color:cornflowerblue"/>
          </span>

          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/">我的</router-link>
              </a-menu-item>
              <a-menu-item @click="logout">
                登出
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        </span>


        <div class="RegisterLogin" v-show="store.state.auth===`nobody`">
          <router-link to="/login">登陆</router-link>
          <a-divider type="vertical" />
          <router-link to="/register">注册</router-link>
        </div>
      </div>

    </a-layout-header>

  </div>
</template>

<script setup>
import {createFromIconfontCN} from '@ant-design/icons-vue'
import {ref} from'vue'
const IconFont = createFromIconfontCN({
  scriptUrl:'//at.alicdn.com/t/font_3349008_5fm7z4eu6qs.js'})
const currentPage = ref(['news'])

import {useStore} from "vuex";
const store = useStore()
import {useRouter} from "vue-router";
const router = useRouter()

// define the action of logOut action
const logout = ()=>{
  // clear all the items in session storage
  sessionStorage.clear()
  // clear vueX
  store.commit('UPDATE_AVATAR_URL','')
  store.commit('UPDATE_AUTH','nobody')
  // log...Out
  router.push({path: '/login'})
}

// define search action
const searchVal = ref('')

const onSearch = ()=>{
  router.push({path:`/search/${searchVal.value}`})
}
</script>

<style scoped>
.Header{
  position: fixed;
  z-Index: 1;
  width:100%;
  background:white;
}
.NavbarLeft{
  float: left;
}
.Logo{
  float: left;
  font-size: 30px;
}
.NavbarSearch{
  float: left;
  width: 340px;
  margin-top: 16px;
}
.NavbarRight{
  float:right;
}
.RegisterLogin{
  float:right;
  margin-top:5px;
}
.NavbarAvatar{
  float:right;
  margin-left: 20px;
}
</style>