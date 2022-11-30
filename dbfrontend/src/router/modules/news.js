export default [
    {
        path:'/news',
        component:()=>import('../../views/news/NewsHomePage')
    },
    {
        path:'/post/:postId(\\d+)',
        component:()=>import('../../views/PostNewsPage')
    },
    {
        path: '/forum',
        component:()=>import('../../views/forum/ForumPage')
    },
    {
        path:'/forum/:blockName',
        component:()=>import('../../views/forum/BlockPage')
    },
    {
        path: '/search/:KeyWord',
        component:()=>import('../../views/search/searchResPage')
    }
]