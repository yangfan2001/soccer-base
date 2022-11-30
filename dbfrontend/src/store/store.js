import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// root state object.

// each Vuex instance is just a single state tree.
const state = {
    backend_url:'http://localhost:5050',
    user_avatar_url:'',
    auth:'nobody',
    user_name:''
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    UPDATE_AVATAR_URL:(state,new_url)=>{
        state.user_avatar_url = new_url
    },
    UPDATE_AUTH:(state,new_auth)=>{
        state.auth = new_auth
    },
    UPDATE_USER_NAME:(state,new_name)=>{
        state.user_name = new_name
    },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
}

// getters are functions.
const getters = {

}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default createStore({
    state,
    getters,
    actions,
    mutations,
    plugins: [
            createPersistedState({
                // 默认存储在localStorage 现改为sessionStorage
                storage: window.sessionStorage,
                // 本地存储数据的键名
                key: 'mine',
            })
    ]
})