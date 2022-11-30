export default [
    {
        path:'/team',
        component:()=>import('../../views/team/TeamPage')
    },
    {
        path:'/team/:TeamName',
        component:()=>import('../../views/team/TeamDetailPage')
    }
]