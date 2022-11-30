export default [
    {
        path:'/player/:PlayerId',
        component:()=>import('../../views/player/PlayerPage')
    }
]