<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage:`url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6" v-if="item.origin_price > 0">{{item.origin_price}} 元</del>
              <div class="h5">{{item.price}}元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <!--帶入vfor=>item的id-->
              <i class="fa fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fa fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!--購物車資料-->
            <img :src="product.imageUrl" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <!--查看更多-->
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id,product.num)"
            >
              <i class="fa fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5-row justify-content-center">
      <!--購物車呈現-->
      <div class="col-md-6" style="margin:0 auto;">
        <div class="h2 text-center card-title">購物車清單</div>
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody v-for="(item,key) in cart.carts" :key="key">
            <tr v-if="item.product">
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteCart(item.id)">
                  <i class="fa fa-trash" title="刪除"></i>
                </button>
              </td>
              <td>
                {{item.product.title}}
                <div class="text-success" v-if="item.coupon" style="font-size:.4rem;">已套用優惠券</div>
              </td>
              <td>{{item.qty}}{{item.product.unit}}</td>
              <td>{{Math.round(item.final_total)}}元</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-left">總記</td>
              <td class="text-right">{{cart.total}}元</td>
            </tr>
            <tr v-if="cart.total !== cart.final_total">
              <td colspan="3" class="text-left text-success">折扣價</td>
              <td class="text-right">{{Math.round(cart.final_total)}}元</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="請輸入折扣代碼" v-model="coupon_code" />
          <div class="input-group-append">
            <button type="button" class="btn btn-outline-secondary" @click="addCoupon">套用折扣代碼</button>
          </div>
        </div>
        <div class="text-center">
          <span
            v-if="couponMessage == '找不到優惠券!' ||
                    couponMessage == '優惠券無法使用'"
            class="text-danger"
          >{{couponMessage}}</span>
          <span v-else class="text-success">{{couponMessage}}</span>
        </div>
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="createOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                v-validate="'required|email'"
                :class="{'is-invalid':errors.has('email')}"
                v-model="form.user.email"
                placeholder="請輸入 Email"
              />
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                :class="{'is-invalid':errors.has('name')}"
                v-model="form.user.name"
                v-validate="'required'"
                placeholder="輸入姓名"
              />
              <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                id="usertel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              />
            </div>

            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                class="form-control"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                :class="{'is-invalid':errors.has('address')}"
                placeholder="請輸入地址"
                v-validate="'required'"
              />
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      // 單一資料存放
      product: {},
      status: {
        // 判斷畫面哪個元素正在讀取中
        // 存放值為產品id
        loadingItem: ''
      },
      form: {
        // 建立對應資料結購
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      // 折扣碼
      coupon_code: '',
      // 優惠碼有無正確資訊
      couponMessage: ''
    }
  },
  methods: {
    ...mapActions(['getCart', 'getProducts']),
    getProduct (id) {
      // 查看更多
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      vm.$http.get(url).then(response => {
        vm.product = response.data.product
        $('#productModal').modal('show')
        vm.status.loadingItem = ''
      })
    },
    addtoCart (id, qty = 1) {
      // 加入購物車，傳入值預設為1
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        // 定義資料結購
        product_id: id,
        qty
      }
      vm.$http.post(url, { data: cart }).then(response => {
        vm.status.loadingItem = ''
        // 加入後取得購物車資料
        vm.getCart()
        $('#productModal').modal('hide')
      })
    },
    deleteCart (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.delete(url).then(response => {
        // 刪除後取得購物車內容
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    addCoupon () {
      // 新增優惠代碼
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(url, { data: coupon }).then(response => {
        vm.couponMessage = response.data.message
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    createOrder () {
      // 創建訂單
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.$store.dispatch('updateLoading', true)
      vm.$validator.validate().then(result => {
        if (result) {
          // email格式正確時發送訂單
          vm.$http.post(url, { data: order }).then(response => {
            if (response.data.success) {
              // 訂單確認建立 導頁至結帳畫面
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
            vm.$store.dispatch('updateLoading', false)
          })
        } else {
          alert('欄位不完整')
          vm.$store.dispatch('updateLoading', false)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'products', 'cart'])
  },
  created () {
    const vm = this
    vm.getProducts()
    vm.getCart() // 取得購物車
  }
}
</script>
