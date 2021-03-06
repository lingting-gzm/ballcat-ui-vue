import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import i18n from './modules/i18n'
import userRouter from './modules/user-router'
import dict from './modules/dict'
import getters from './getters'
import lovModule from './modules/lov'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    i18n,
    dict,
    userRouter,
    lovModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
