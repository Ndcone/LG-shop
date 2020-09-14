import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginstate: false,
    token: '',
    idarray: '',
    shopcard: [],
    allSelected: false,
    selectaddress: false,
    addressindex: 0
  },
  mutations: {
    changetoken(state, newtoken) {
      state.token = newtoken
    },
    changestate(state, newstate) {
      state.loginstate = newstate
    },
    joinid(state, newid) {
      // state.idarray = []
      state.idarray = newid
    },
    getshopcard(state, shopca) {
      state.shopcard = shopca
    },
    showselect(state, newselect) {
      state.selectaddress = newselect
    },
    changeindex(state, newaddressindex) {
      state.addressindex = newaddressindex
    },
    allchecked(state, data) {
      state.allSelected = data.every((el) => {
        return el.ischecked === true;
      })
    },
  },
  actions: {

  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.localStorage
  })] //会自动保存创建的状态。刷新还在
})
