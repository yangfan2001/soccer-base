<template>
 <div>
      <a-card class="login-card"
              :tab-list="tabList"
              :active-tab-key="key"
              @tabChange="key=> onTabChange(key)"
      >
        <a-form
            :model="formState"
            name="basic"
            :wrapper-col="{ offset:3,span: 18 }"
            autocomplete="off"
            class="LoginForm"
        >
          <a-form-item
              name="username"
              :rules="[{ required: true, message: '请输入账号!',trigger:'blur' }]"
          >
            <a-input v-model:value="formState.username" placeholder="请输入账号">
              <template #prefix>
                <user-outlined type="user" />
              </template>
              <template #suffix>
                <a-tooltip title="账号不能为空">
                  <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
                </a-tooltip>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码!',trigger:'blur'}]"
          >
            <a-input-password v-model:value="formState.password" placeholder="请输入密码">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 3, span: 18 }">
            <a-button :disabled="disabled" type="primary" @click="submitForm" block>
              提交
            </a-button>
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 9, span: 6 }" style="text-align: center">
            <a href="">忘记密码</a>
          </a-form-item>
        </a-form>
      </a-card>
 </div>
</template>

<script setup>
import {reactive,ref,computed,inject} from 'vue'
import {LockOutlined,UserOutlined,InfoCircleOutlined} from '@ant-design/icons-vue';
import {useRouter}from'vue-router'
import {useStore} from 'vuex'
import {message} from 'ant-design-vue'
// 定义基本数据
const router = useRouter()
const store = useStore()
const axios = inject('axios')

const tabList = [
  {
    key:'login',
    tab:'登陆'
  },
  {
    key:'register',
    tab:'注册'
  }
]
const key = ref('login')
const formState = reactive({
  username: '',
  password: ''
});

const onTabChange = (newKey)=>{
  if(newKey==='register')
  {
    router.push({path:'/register'})
  }
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
const submitForm = ()=>{
  const params = {
    username:formState.username,
    password:formState.password
  }
  const url = store.state.backend_url+'/login'

  // 利用axios向服务器发送请求
  axios.post(url,params)
      .then((response)=>{
        if(!response.data.status)
        {
          // 登陆失败的反馈
          message.error('账户名或密码错误')
          return
        }
        // 登陆成功的反馈
        message.success('登陆成功!')

        sessionStorage.setItem('user_name',response.data.user_name)
        sessionStorage.setItem('user_id',response.data.user_id)
        sessionStorage.setItem('auth',response.data.auth)

        //Vuex commit
        store.commit('UPDATE_AUTH',response.data.auth)
        store.commit('UPDATE_AVATAR_URL',`https://ui-avatars.com/api/?name=${response.data.user_name}`)
        store.commit('UPDATE_USER_NAME',response.data.user_name)

        router.push({path:'/'})
  })
      .catch((error)=>{
        console.log(error)
        // 登陆错误的反馈
        message.error('登陆失败，连接错误！')
  })

}
</script>

<style scoped>
.login-card{
  margin: auto;
  margin-bottom: 200px;
  margin-top: 150px;
  width: 300px;
  height: 300px;
}

.layout{
  position : absolute;
  width : 100%;
  height : 100%;
}
</style>