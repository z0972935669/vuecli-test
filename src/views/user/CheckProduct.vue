<template>
  <div>
    <CheckSchedule />
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-3" v-if="cart.carts.length > 0">
      <div class="checkProduct main row mb-3 mb-sm-5">
        <div class="col-md-8 p-0 pr-md-3">
          <div class="bagTitle text-center">
            <div class="row">
              <div class="col">品名</div>
              <div class="col">尺寸/口味</div>
              <div class="col">數量</div>
              <div class="col">單價</div>
              <div class="col mobNone">刪除</div>
            </div>
          </div>
            <div v-for="(item,index) in cart.carts" :key="index"  class="bagInfo text-center" :class="{'sale':couponSuccess}">
              <swiper :options="swiperOption">
                <swiper-slide>
                  <div class="row align-items-center" v-if="item.product">
                      <div class="col">
                      <img class="" :src="item.product.imageUrl" :alt="item.product.title" />
                      <p class="text-left">{{item.product.title}}</p>
                      </div>
                      <div class="col">{{item.size}}</div>
                      <div class="col">
                      <select
                          v-model="item.qty"
                          @change.prevent="changeCartFn(item.id,item.product.id, item.qty, item.size)"
                      >
                          <option :value="num" v-for="num in item.qty" :key="num.id">{{num}}</option>
                      </select>
                      </div>
                      <div class="col">{{item.product.price | currency}}</div>
                      <div class="col cartDelete" @click.prevent="cartItemDelete(item)" v-if="slideDeleteFn === false">
                        <button>
                          <i class="fa fa-times"></i>
                        </button>
                      </div>
                  </div>
                </swiper-slide>
                <swiper-slide class="swiperDelete" v-if="slideDeleteFn">
                  <div class="cartDelete" @click.prevent="cartItemDelete(item)">
                    <button>
                      <i class="fa fa-times"></i>
                    </button>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
        </div>
        <div class="priceInfo col-md-4 py-3">
          <table class="title">
            <thead>
              <th class="pb-5">訂單明細</th>
            </thead>
          </table>
          <table class="w-100">
            <tr>
              <th class="pb-4">小計</th>
              <td class="text-right">{{cart.total | currency}}</td>
            </tr>
            <tr v-if="couponSuccess" class="text-success">
              <th class="pb-4">折扣價</th>
              <td class="text-right">{{cart.final_total | currency}}</td>
            </tr>
            <tr>
              <th class="pb-4">運費</th>
              <td class="text-right">$80</td>
            </tr>
          </table>
          <table class="table">
            <tr class="pt-4">
              <th class="pl-0">總計</th>
              <td class="text-right pr-0">{{cart.final_total + 80 | currency}}</td>
            </tr>
          </table>
          <button class="goCheckOut" @click.prevent="goCheckOutFn">下一步</button>
          <div class="coupons">
            <div class="barcode mt-md-4 mt-2">
              <img :src="barcodeImg" alt="條碼" ondragstart="return false;" />
            </div>
            <div class="row pl-2 couponsInfo" v-if="couponSuccess == false">
              <input
                type="text"
                class="col-11"
                placeholder="輸入折扣碼"
                @keyup.enter="addCoupons()"
                v-model="coupon_code"
              />
              <button class="applyCoupons col-1" @click.prevent="addCoupons()">
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>
            <p class="couponCode text-center px-5" v-if="couponSuccess == true">{{coupon_code}}</p>
            <span>
              <p v-if="couponSuccess == true" class="text-success text-center pt-2">已套用優惠券!</p>
              <p
                v-if="couponMessage == '找不到優惠券!' | couponMessage == '優惠券無法使用'"
                class="text-danger text-center pt-2"
              >優惠券輸入錯誤</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="main mb-3 mx-auto py-3 col-10" v-if="cart.carts.length < 1">
      <router-link to="shop/all" class="text-center h5 m-0 d-block">點我前往購物</router-link>
    </div>
  </div>
</template>
<script>
import CheckSchedule from '@/components/user/CheckSchedule'
import barcodeImg from '@/assets/images/checkout/barcode.jpg'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CheckSchedule
  },
  data () {
    return {
      barcodeImg,
      coupon_code: '',
      couponSuccess: '',
      couponMessage: '',
      status: {
        loadingItem: ''
      },
      currentWidth: document.body.clientWidth,
      swiperOption: {
        slidesPerView: 'auto',
        resistanceRatio: 0.2,
        on: {
          // 點擊刪除時回到第一個
          click: function () {
            this.slideTo(0)
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['cartItemDelete']),
    ...mapActions('cartsModules', ['getCart']),
    addCoupons () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(url, { data: coupon }).then(response => {
        // 套用優惠卷//
        vm.couponSuccess = response.data.success
        vm.couponMessage = response.data.message
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    goCheckOutFn () {
      const vm = this
      vm.$router.push('/checkInfo')
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    changeCartFn (id, productId, qty, size) {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const changeCart = {
        product_id: productId,
        qty: qty,
        size: size
      }
      vm.$http.all([vm.$http.delete(delAPI), vm.$http.post(addAPI, { data: changeCart })])
        .then(vm.$http.spread((delResp, addResp) => {
          vm.getCart()
          vm.$store.dispatch('updateLoading', false)
        }))
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'products']),
    ...mapGetters('cartsModules', ['cart']),
    slideDeleteFn () {
      // 判斷是否顯示slide滑塊
      return this.currentWidth <= 480 && true
    }
  },
  async created () {
    const vm = this
    await vm.getCart()
  },
  mounted () {
    return (
      // 監聽視窗變化
      window.onresize = () => {
        this.currentWidth = document.body.clientWidth
      }
    )
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";
a {
  text-decoration: none;
  color: $color-darkRed;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
}
/*checkProduct*/
.checkProduct {
  margin: 0 auto;
  padding: 1rem !important;
  @include mobile {
    padding: 0rem !important;
  }
}
.bagTitle {
  background: #f3f3f3;
  margin-bottom: 1rem;
  display: block;
  padding: 0.75rem;
  & > div {
    // 針對手機此吋調整title大小
    & > div {
      @include mobile{
        font-size: 12px;
      }
    }
    & > div:nth-child(1){
      @include mobile {
        min-width: 120px;
      }
      @include iphone5 {
        min-width: 0px;
      }
    }
    & > div:nth-child(2){
      white-space: nowrap;
    }
  }
}
.bagInfo {
  margin-bottom: 1rem;
  padding: 1rem;
  position: relative;
  width: 100%;
  background: #f3f3f3;
  overflow: hidden;
  @include mobile() {
    padding: 0;
  }
  // 調整品名文字
  .row > div:nth-child(1) {
    @include mobile {
      min-width: 120px;
      padding: .5rem 0 .5rem 1.5rem;
    }
    @include iphone5 {
      min-width: 0px;
    }
    & > p{
      white-space: nowrap;
      @include mobile {
        font-size: 14px;
      }
    }
  }
  // 調整尺寸口味文字
  .row > div:nth-child(2) {
    @include mobile {
      font-size: 12px;
    }
  }
  img {
    width: 100%;
  }
  &::before {
    content: "";
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 0;
    width: 25px;
    height: 25px;
    background: $color-bg;
    border-radius: 100%;
    @include mobile() {
      width: 0;
    }
  }
  .swiperDelete {
    max-width:100px;
    height:auto;
    background: $color-red;
    &:hover{
      opacity: .9;
    }
  }
  .cartDelete {
    @include mobile(){
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      i {
        color: $color-white;
      }
    }
  }
}
.priceInfo {
  background: #f3f3f3;
  width: 100%;
  @include mobile() {
    margin: 0;
  }
  .title {
    font-family: "微軟正黑體", "Microsoft JhengHei", "Segoe UI Semibold", "Segoe UI", "Lucida Grande", Verdana, Arial,
      Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    @include pad() {
      font-size: 1.2rem;
    }
  }
}
</style>
