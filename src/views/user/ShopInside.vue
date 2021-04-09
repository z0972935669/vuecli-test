<template>
  <div class="shopInside pt100">
    <loading :active.sync="isLoading"></loading>
    <div>
      <div>
        <ul class="navColumn">
          <router-link tag="li" to="/shop" class="title pointer">商品列表</router-link>
          <li @click="back" class="title pointer">{{product.category}}</li>
          <li class="title">{{product.title}}</li>
        </ul>
      </div>
      <div class="row mb-5 mt-4 align-items-center">
        <div class="col-md-6">
          <img :src="product.imageUrl" :alt="product.title" />
          <span class="like">
            <i
              class="fa fa-heart text-danger"
              @click.stop="removeLike(product)"
              v-if="getFilterLocalData(product)"
            ></i>
            <i class="fa fa-heart-o text-dark" @click.stop="addLike(product)" v-else></i>
          </span>
        </div>
        <div class="shopInside_info col-md-6 col-xl-4">
          <div>
            <h2 class="h2 mb-3 mt-xl-0">{{product.title}}</h2>
            <!-- <div class="mb-3">商品存貨:</div> -->
            <span>購買數量:</span>
            <div class="row">
              <div class="addSize mt-2 col-6">
                <select
                  :class="{'borderErr':isSize}"
                  class="form-control"
                  id="tasteValue"
                  @change.prevent="tasteValue"
                  v-if="product.category !== '護具'"
                  v-model="size"
                >
                  <option value="undefined" disabled>口味</option>
                  <option value="草莓">草莓</option>
                  <option value="巧克力">巧克力</option>
                  <option value="香草">香草</option>
                </select>
                <select
                  :class="{'borderErr':isSize}"
                  class="form-control"
                  id="protectiveValue"
                  @change.prevent="protectiveValue"
                  v-else
                >
                  <option value="undefined" selected disabled>尺寸</option>
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="S">S</option>
                </select>
              </div>
              <div class="addNumber mt-2 col-6">
                <select name class="form-control" id="cartNum" @change.prevent="cartNumFn">
                  <option :value="num" v-for="num in 10" :key="num.id">{{num}}</option>
                </select>
              </div>
            </div>
            <p class="h3 pt-2 pb-2 mb-4">NT.{{product.price}}</p>
          </div>
          <div class="text-danger text-center" v-if="product.in_stock === 0">商品已售完</div>
          <div class="addShop text-center" v-else>
            <button class="col-5" @click.prevent="addtoCart(product)">加入購物車</button>
            <span class="col"></span>
            <button class="col-5" @click.prevent="buyNow(product)" to="/shop/all">直接購買</button>
          </div>
          <h6 class="h5 pt-4">商品描述:</h6>
          <ul class="ml-2">
            <li class="productWrite mb-3">{{product.description}}</li>
          </ul>
          <h6 class="h5 mb-3">商品資訊:</h6>
          <ul class="ml-2">
            <li class="mb-3">實品顏色依照片為主</li>
            <li class="mb-3">厚薄:適中</li>
            <li class="mb-3">彈性:佳</li>
            <li class="mb-3">素材產地 / 中國</li>
            <li class="mb-3">加工產地 / 中國</li>
          </ul>
        </div>
      </div>
      <div class="aboutLike">
        <h2 class="h2 mb-3 text-center">
          <span>MORE LOOK</span>
        </h2>
        <div class="info row">
          <div class="col-6 col-lg-3 mt-4" v-for="(item,key) in moreLook" :key="key">
            <div @click.prevent="goPath(item.id)">
              <img :src="item.imageUrl" alt />
              <p class="text-left py-2">{{item.title}}</p>
              <p class="text-left">NT.{{item.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      isSize: false,
      itemId: '',
      // 全部商品
      products: '',
      // 單筆商品
      product: '',
      moreLook: [],
      likeData: []
    }
  },
  methods: {
    ...mapActions('cartsModules', ['cartNumFn', 'addtoCart']),
    getProduct (id) {
      // 取得指定商品資料
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then(response => {
        const newArray = response.data.products.filter(function (
          item,
          index,
          arr
        ) {
          if (item.id !== id) {
            return item
          }
        })
        vm.products = newArray
        for (let i = 0; i < 4; i++) {
          // 隨機顯示物件中的商品
          const num = Math.floor(Math.random() * vm.products.length)
          // 將隨機的商品新增到新物件
          vm.moreLook.push(vm.products[num])
          // 新增後刪除該筆資料位置,避免重複
          vm.products.splice(num, 1)
        }
      })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.$store.dispatch('updateLoading', false)
      })
    },
    goPath (id) {
      // 透過id到指定內頁
      const vm = this
      vm.$router.push({ path: `/shop_inside/${id}` })
      location.reload()
    },
    back (e) {
      const vm = this
      if (vm.product.category === '護具') {
        vm.$router.push({ path: '/shop/protective' })
      } else if (vm.product.category === '乳清') {
        vm.$router.push({ path: '/shop/whey' })
      }
    },
    tasteValue () {
      // 選擇口味
      const vm = this
      vm.$store.state.cartsModules.size = document.getElementById('tasteValue').value
      vm.isSize = false
    },
    protectiveValue () {
      // 選擇尺寸
      const vm = this
      vm.$store.state.cartsModules.size = document.getElementById('protectiveValue').value
      vm.isSize = false
    },
    buyNow (product) {
      const vm = this
      const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$store.dispatch('updateLoading', false)
      if (vm.$store.state.cartsModules.size === undefined || vm.$store.state.cartsModules.size === 'undefined') {
        alert('請選擇尺寸/口味')
        vm.isSize = true
      } else {
        const { carts } = vm.$store.state.cartsModules.cart
        if (carts.some(item => item.product.title === product.title && item.size === vm.$store.state.cartsModules.size)) {
          let deletId = String
          let currentQty = Number
          carts.map(item => {
            if (item.product.title === product.title && item.size === vm.$store.state.cartsModules.size) {
              // 取得當前的qty做累加
              currentQty = item.qty
              // 取得外層刪除ID值
              deletId = item.id
            }
          })
          const cart = {
            product_id: product.id,
            qty: vm.$store.state.cartsModules.cartNum + currentQty,
            size: vm.$store.state.cartsModules.size
          }
          const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${deletId}`
          axios.all([axios.delete(delAPI), axios.post(addAPI, { data: cart })])
            .then(res => {
            // 直接購買,導頁並更新購物車
              vm.$store.dispatch('cartsModules/getCart')
            })
        } else {
          const cart = {
            product_id: product.id,
            qty: vm.$store.state.cartsModules.cartNum,
            size: vm.$store.state.cartsModules.size
          }
          vm.$http.post(addAPI, { data: cart }).then(response => {
            // 直接購買,導頁並更新購物車
            vm.$store.dispatch('cartsModules/getCart')
          })
        }
        vm.$router.push('/checkProduct')
        vm.$store.dispatch('updateLoading', true)
      }
    },
    getLocalData () {
      const vm = this
      vm.likeData = JSON.parse(localStorage.getItem('likeData')) || []
    },
    getFilterLocalData (item) {
      const vm = this
      return vm.likeData.some(function (ele) {
        return item.id === ele.id
      })
    },
    addLike (item) {
      const vm = this
      const likeArr = {
        title: item.title,
        id: item.id
      }
      vm.likeData.push(likeArr)
      localStorage.setItem(
        'likeData',
        JSON.stringify(vm.likeData)
      )
    },
    removeLike (item) {
      const vm = this
      const num = vm.likeData.findIndex(ele => {
        return ele.title === item.title
      })
      vm.likeData.splice(num, 1)
      localStorage.setItem(
        'likeData',
        JSON.stringify(vm.likeData)
      )
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['size'])
  },
  created () {
    const vm = this
    vm.itemId = vm.$route.params.itemId
    // 將指定商品id帶入
    vm.getProduct(vm.itemId)
    vm.getLocalData()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";
/*shopInside*/
.shopInside {
  max-width: 80%;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
  .navColumn {
    max-width: 100%;
    display: flex;
    white-space: nowrap;
    .title::after {
      content: "/";
      font-family: cursive;
      margin: 0 0.5rem;
    }
    .title:last-child::after {
      content: "";
    }
  }
  .like {
    position: absolute;
    top: 3%;
    right: 3%;
    padding-right: 15px;
    & > i {
      font-size: 1.5rem;
    }
  }
  .shopInside_info {
    div:nth-child(1) {
      p {
        color: red;
        font-weight: bold;
        text-align: right;
        border-bottom: 1px solid $color-gray;
      }
    }
    div:nth-child(2) {
      :hover {
        opacity: 0.75;
      }
      & > button:nth-child(1) {
        background: $color-darkGray;
        color: #fff;
        padding: 1rem 0;
        float: left;
      }
      & > button:nth-child(3) {
        background: $color-darkRed;
        color: #fff;
        padding: 1rem 0;
        float: right;
      }
    }
    .productWrite {
      line-height: 1.5rem;
      letter-spacing: 0.1rem;
      text-align: justify;
    }
  }
  h6 {
    clear: both;
  }
  .aboutLike {
    h2 {
      position: relative;
      span {
        position: absolute;
        background: $color-bg;
        padding: 0 0.5rem;
        transform: translate(-50%, -50%);
      }
    }
    .info {
      padding: 3rem 0;
      border-top: 1px solid $color-gray;
      cursor: pointer;
    }
  }
}
.borderErr {
  border: 1px solid $color-red;
}
</style>
