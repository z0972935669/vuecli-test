import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cartsModules from './carts'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
    products: [],
    bagToggle: true
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getProducts (context, page) {
      // 取得api資料
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(api).then(res => {
        context.commit('PRODUCTS', res.data.products)
        context.commit('LOADING', false)
      })
    },
    bagToggleFn (context, state) {
      context.commit('BAGTOGGLE', state)
    },
    async cartItemDelete (context, item) {
      await context.commit('LOADING', true)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
      await axios.delete(url).then(res => {
        context.dispatch('cartsModules/getCart')
        context.commit('LOADING', false)
      })
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    BAGTOGGLE (state, payload) {
      state.bagToggle = payload
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    products (state) {
      return state.products
    },
    bagToggle (state) {
      return state.bagToggle
    }
  },
  modules: {
    cartsModules
  }
})
