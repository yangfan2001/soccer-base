<template>
 <div>
    <a-card class="register-card"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="key=> onTabChange(key)"

    >
      <!--输入账号-->
     <a-form
         :model="formState"
         name="basic"
         :wrapper-col="{ offset:3,span: 18 }"
         autocomplete="off"
         class="RegisterForm"
     >
       <a-form-item
           name="username"
           :rules="[{ required: true, message: '请输入用户名!',trigger:'blur'}]"
       >
         <a-input v-model:value="formState.username" placeholder="请输入用户名">
           <template #prefix>
             <user-outlined type="user" />
           </template>
           <template #suffix>
             <a-tooltip title="用户名不能为空">
               <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
             </a-tooltip>
           </template>
         </a-input>
       </a-form-item>

       <!--输入密码-->

       <a-form-item
           name="password"
           :rules="[{ required: true, message: '请输入密码!',trigger:'blur' }]"
       >
         <a-input-password v-model:value="formState.password" placeholder="请输入密码">
           <template #prefix>
             <LockOutlined class="site-form-item-icon" />
           </template>
         </a-input-password>

       </a-form-item>

       <!--再次输入密码-->

       <a-form-item
           name="checkPassword"
           :rules="[{ required: true, message: '请再次输入密码!',trigger:'blur'}]"
       >
         <a-input-password v-model:value="formState.checkPassword" placeholder="请再次输入密码">
           <template #prefix>
             <LockOutlined class="site-form-item-icon" />
           </template>
         </a-input-password>

       </a-form-item>
       <!--提交按钮-->

       <a-form-item :wrapper-col="{ offset: 3, span: 18 }">
         <a-button :disabled="disabled" type="primary" @click="submitForm" block>
           提交
         </a-button>
       </a-form-item>
     </a-form>
    </a-card>
  </div>
</template>

<script setup>
import {reactive,ref,computed,inject} from 'vue'
import {LockOutlined,UserOutlined,InfoCircleOutlined,
 } from '@ant-design/icons-vue';
import {useRouter}from'vue-router'
import {message} from 'ant-design-vue';
import {useStore} from 'vuex'
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
const key = ref('register')
// 定义表格状态的基本响应事件
const formState = reactive({
  username: '',
  password: '',
  checkPassword:'',
  email:'',
  verificationCode:''
});
// 定义Tab选项栏改变后对应的路由的改变
const onTabChange = (newKey)=>{
  if(newKey==='login')
  {
    router.push({path:'/login'})
  }
}
// 定义验证码相关数据项
const send = {
  verificationCode:'',
  email:''
}
// 定义验证码按钮的控制属性
const disabled = computed(()=>{
  return !(formState.username&&formState.password
      &&formState.checkPassword)
})
// 验证邮箱合法性的function
const verify = {
  email:()=>{
    let pattern = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    let res = pattern.test(formState.email)
    if(!res){
      message.warning('请输入合法的邮箱')
      return false
    }
    return true
  },
  password:()=>{
      if(formState.password !== formState.checkPassword)
      {
        message.warning('两次输入的密码不一致!!')
        return false
      }
      return true
  },
  verificationCode:()=>{
    if(formState.verificationCode !== send.verificationCode.toString())
    {
      message.warning('验证码输入错误!!')
      return false
    }
    return true
  }

}
//
const submitForm = ()=>{
  // 验证密码
  if(!verify.password())
  {
    return
  }
  // 定义axios访问的参数
  const params = {
    username:formState.username,
    password:formState.password
  }
  const url = store.state.backend_url+'/register'
  console.log(params)

  axios.post(url,params)
      .then((response)=>{
        if(!response.data.status)
        { // 后端返回的status为false，那么注册失败
          message.error('用户名或邮箱已被使用!')
          return
        }
        message.success('注册成功!')
        router.push({path:'/login'})
      })
      .catch((error)=>{
        console.log(error)
        message.error('注册失败,连接错误！！')
      })
}
</script>

<style scoped>
.layout{
  position : absolute;
  width : 100%;
  height : 100%;
}
.register-card{
  margin: auto;
  margin-bottom: 200px;
  margin-top: 150px;
  width: 350px;
  height: 320px;
}
</style>