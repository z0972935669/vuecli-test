import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cart: {
      carts: {}
    },
    size: 'undefined',
    cartNum: 1
  },
  actions: {
    async getCart (context) {
      // 取得購物車內容
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      await axios.get(url).then(res => {
        // 接受到購物車資訊時用eventbus傳遞
        context.commit('CART', res.data.data)
        // 合併購物車重複商品
        context.commit('LOADING', false, { root: true })
      })
    },
    cartNumFn (context) {
      // 變更商品數量
      context.commit('CARTNUM', parseInt(document.querySelector('#cartNum').value))
    },
    addtoCart (context, product) {
      // qty加入的數量
      const vm = this
      if (vm.state.cartsModules.size === undefined || vm.state.cartsModules.size === 'undefined') {
        alert('請選擇尺寸/口味')
      } else {
        context.commit('LOADING', true, { root: true })
        const { carts } = vm.state.cartsModules.cart
        const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        // 判斷id size是否重複
        if (carts.some(item => item.product.title === product.title && item.size === vm.state.cartsModules.size)) {
          let deletId = String
          let currentQty = Number
          // 重複=>將數量累加後,刪除原本的資料,在重新post新的資料
          carts.map(item => {
            if (item.product.title === product.title && item.size === vm.state.cartsModules.size) {
              // 取得當前的qty做累加
              currentQty = item.qty
              // 取得外層刪除ID值
              deletId = item.id
            }
          })
          const cart = {
            product_id: product.id,
            qty: vm.state.cartsModules.cartNum + currentQty,
            size: vm.state.cartsModules.size
          }
          const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${deletId}`
          axios.all([axios.delete(delAPI), axios.post(addAPI, { data: cart })])
            .then(res => {
              context.dispatch('getCart')
              context.commit('BAGTOGGLE', false, { root: true })
              context.commit('LOADING', false, { root: true })
            })
        } else {
          const cart = {
            product_id: product.id,
            qty: vm.state.cartsModules.cartNum,
            size: vm.state.cartsModules.size
          }
          // 不重複=>直接post新的資料
          axios.post(addAPI, { data: cart }).then(res => {
            // 加入購物車,res=商品資料
            context.dispatch('getCart')
            context.commit('BAGTOGGLE', false, { root: true })
            context.commit('LOADING', false, { root: true })
          })
        }
      }
    }
  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    },
    CARTNUM (state, payload) {
      state.cartNum = payload
    }
  },
  getters: {
    cart (state) {
      return state.cart
    },
    size (state) {
      return state.size
    }
  }
}
