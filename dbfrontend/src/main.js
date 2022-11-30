import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from "@/router";
import 'ant-design-vue/dist/antd.css';
import VueAxios from 'vue-axios'
import axios from "axios"
import VueCookies from 'vue-cookies'
import store from "@/store/store";

const app = createApp(App)


app.use(Antd)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .use(VueCookies,{ expire: '7d'})
    .provide('axios', app.config.globalProperties.axios)
    .provide('cookies', VueCookies)// provide 引入VueCookies
    .mount('#app')


// 添加拦截器(每个请求前都加入auth和user_name/user_id字段)
router.beforeEach((to, from, next) => {
    const auth = sessionStorage.getItem('auth')
    console.log(auth)
    if (to.name !== 'login' && to.name !== 'register' &&!auth) next({ path:'/login'})
    else
        next()
})
