import {createRouter,createWebHashHistory} from 'vue-router'
import news from './modules/news'
import edit from './modules/edit'
import player from "@/router/modules/player";
import team from "@/router/modules/team";

const routes = [
    {
        path:'',
        redirect:'/news'
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/LoginPage')
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('../views/RegisterPage')
    },
    ...news,
    ...edit,
    ...team,
    ...player
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;