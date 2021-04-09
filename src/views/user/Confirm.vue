<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <CheckSchedule />
    <form @submit.prevent="paying">
      <div class="mx-auto my-4 px-4">
        <div class="Confirm container">
          <div class="row p-2 py-md-4">
            <span class="col-12 col-md-6 pb-2 pb-md-0">
              <p>訂購人:{{order.user.name}}</p>
            </span>
            <span class="col-12 col-md-6 text-md-right">
              <p>訂購日期:{{order.user.nowDate}}</p>
            </span>
          </div>
          <div class="product py-2">
            <div class="row text-center p-2">
              <p class="col text-secondary text-left">項目</p>
              <p class="col text-secondary">數量</p>
              <p class="col text-secondary text-right">單價</p>
            </div>
            <div class="row text-center p-2" v-for="(item,key) in order.products" :key="key">
              <p class="col text-left">{{item.product.title}}</p>
              <p class="col">{{item.qty}}/件</p>
              <p class="col text-right">{{item.product.price | currency}}</p>
            </div>
          </div>
          <div class="info py-2">
            <div class="row text-center p-2">
              <p class="col text-left">收件人姓名 :</p>
              <p class="col mobNone"></p>
              <p class="col text-right">{{order.user.name}}</p>
            </div>
            <div class="row text-center p-2">
              <p class="col text-left">收件人電話 :</p>
              <p class="col mobNone"></p>
              <p class="col text-right">{{order.user.tel}}</p>
            </div>
            <div class="row text-center p-2">
              <p class="col text-left">收件地址 :</p>
              <p class="col mobNone"></p>
              <p class="col text-right">{{order.user.address}}</p>
            </div>
            <div class="row text-center p-2">
              <p class="col text-left">收件人信箱 :</p>
              <p class="col mobNone"></p>
              <p class="col text-right">{{order.user.email}}</p>
            </div>
          </div>
          <div class="total py-2">
            <div class="row text-center p-2">
              <p class="col text-left">總價</p>
              <p class="col mobNone"></p>
              <p class="col text-right">{{order.total | currency}}</p>
            </div>
            <div class="row text-center p-2">
              <p class="col text-left">運費</p>
              <p class="col mobNone"></p>
              <p class="col text-right">$80</p>
            </div>
            <div class="row text-center p-2">
              <p class="col text-left">小計</p>
              <p class="col mobNone"></p>
              <p class="col text-right">{{order.total + 80 | currency}}</p>
            </div>
          </div>
          <div class="pt-3">
            <p class="d-inline">訂單編號 :</p>
            <p class="d-inline-block px-2">{{orderId}}</p>
          </div>
          <div
            class="pt-2"
            :class="{'text-danger':order.is_paid===false,'text-success':order.is_paid}"
          >
            <p class="d-inline">付款狀態 :</p>
            <p class="d-inline px-2" v-if="order.is_paid">完成付款</p>
            <p class="d-inline px-2" v-else>尚未付款</p>
          </div>
          <button class="paying" :class="{'active':order.is_paid===false,'active':order.is_paid}">
            <span class="box">
              <i class="fa fa-check" v-if="order.is_paid"></i>
            </span>
            <p v-if="order.is_paid===true">結帳完成</p>
            <p v-else>點擊付款</p>
          </button>
        </div>
      </div>
    </form>
    <div class="checkOutAlert" v-if="isAlert === true" @click.prevent="isAlert = false">
      <div class="info">
        <span class="text-success">
          <i class="fa fa-check-circle-o" v-if="isIcon"></i>
          <i class="fa fa-spinner fa-spin text-dark" v-else></i>
        </span>
        <p>感謝您購買凱力的產品,我們將儘速為您出貨</p>
        <span class="count">{{num}}%</span>
        <router-link tag="button" to="/shop/all" class="d-block">繼續購物</router-link>
        <button class="d-block" @click.prevent="isAlert = false">查看清單</button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckSchedule from '@/components/user/CheckSchedule'
import { mapGetters } from 'vuex'
export default {
  components: {
    CheckSchedule
  },
  data () {
    return {
      payingCheck: true,
      isAlert: false,
      isIcon: false,
      num: 0,
      order: {
        user: {}
      },
      // 取得orderId
      orderId: ''
    }
  },
  methods: {
    getOrder () {
      // 取得訂單資料
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url).then(response => {
        vm.order = response.data.order
        vm.$store.dispatch('updateLoading', false)
        vm.payingCheck = !vm.order.is_paid
      })
    },
    paying () {
      const vm = this
      if (vm.payingCheck) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
        vm.$store.dispatch('updateLoading', true)
        vm.$http.post(url).then(response => {
          if (response.data.success) {
            // 付款完成時,重新取得訂單資料
            vm.getOrder()
          }
        })
        document.querySelector('.paying').classList.add('active')
        vm.$store.dispatch('updateLoading', false)
        vm.payingCheck = false
      }
      setTimeout(() => {
        vm.isAlert = true
        vm.countFn()
      }, 1000)
    },
    countFn () {
      const vm = this
      if (vm.num === 100) {
        return false
      } else {
        const i = setInterval(function (e) {
          const count = document.querySelector('.count')
          if (vm.isAlert === true) {
            count.innerHTML = `${vm.num + 1}` + '%'
            vm.num++
            if (vm.num === 100) {
              clearInterval(i)
              setTimeout(function () {
                count.classList.add('countStyle')
                vm.isIcon = true
              }, 600)
            }
          } else {
            vm.isIcon = false
            clearInterval(i)
          }
        }, 10)
      }
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  created () {
    const vm = this
    vm.orderId = this.$route.params.orderId
    vm.getOrder()
  },
  mounted () {
    document.querySelector('.checkOut').style = 'border:3px solid #8d3742;'
    document.querySelector('.checkOut>i').style = 'color:#8d3742;'
    document.querySelector('.checkOut>p').style = 'color:#8d3742;'
    document.querySelector('.checkInfo').style = 'border:3px solid #8d3742;'
    document.querySelector('.checkInfo>i').style = 'color:#8d3742;'
    document.querySelector('.checkInfo>p').style = 'color:#8d3742;'
    document
      .querySelector('.checkSchedule>span')
      .classList.add('scheduleConfirmAnimation')
  }
}
</script>

<style lang="scss" secoped>
@import "@/assets/scss/helpers/breakpoint.scss";
form {
  padding: 0 15px;
}
.Confirm {
  padding: 15px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0px 1px 3px 1px $color-bgActive;
  border-radius: 8px 8px 0 0;
  width: 80%;
  @include mobile() {
    width: 100%;
  }
  .product,
  .info,
  .total {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    @include mobile() {
      p {
      }
    }
  }
  .product {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
  .paying {
    &:focus {
      outline: none;
    }
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-20%, -50%);
    width: 150px;
    height: 40px;
    background: #16111f;
    color: #fff;
    border-radius: 30rem;
    padding: 10px;
    @include mobile() {
      position: static;
      transform: translate(0%, 0%);
      display: block;
      margin: 1rem auto 0 auto;
    }
    .box {
      transition: 2s;
      background: #69666f;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0%, -50%);
      height: 30px;
      width: 30px;
      margin-left: 3px;
      border-radius: 20px;
      z-index: 2;
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    p {
      transition: 2s;
      position: absolute;
      transform: translatey(-50%);
      top: 50%;
      left: 40%;
      z-index: 1;
    }
    &.active {
      background: green;
      .box {
        transform: translate(0%, -50%) rotate(2turn);
        background: #fff;
        position: absolute;
        left: calc(100% - 36px);
        i {
          color: #150f24;
        }
      }
      p {
        left: 20%;
      }
    }
  }
}
.checkOutAlert {
  z-index: 510;
  position: fixed;
  top: 0;
  left: 0;
  background: $color-bgActive;
  width: 100vw;
  height: 100vh;
  & > .info {
    box-shadow: 0px 1px 3px 1px $color-bgActive;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 360px;
    width: 100%;
    padding: 15px 0;
    background: #fff;
    @include mobile() {
      max-width: 300px;
    }
    & > span:nth-child(1) {
      padding: 10px 30px;
      font-size: 5rem;
      text-align: center;
      display: block;
    }
    & > p:nth-child(2) {
      text-align: center;
      padding: 10px 0;
    }
    & > .count {
      display: block;
      text-align: center;
      color: $color-darkRed;
      font-size: 3rem;
      padding: 5px 0;
      font-family: impact;
    }
    & > button:nth-child(4) {
      margin: 20px auto 0 auto;
      padding: 10px 0;
      width: 90%;
      background: $color-darkRed;
      color: white;
    }
    & > button:nth-child(5) {
      margin: 20px auto 0 auto;
      padding: 10px 0;
      width: 90%;
      background: $color-darkGray;
      color: white;
    }
  }
}
.countStyle {
  transition: 1s;
  animation-name: countStyle;
  animation-iteration-count: 1;
  animation-duration: 1.5s;
}
@keyframes countStyle {
  0% {
    font-size: 3rem;
  }
  25% {
    font-size: 2rem;
  }
  85% {
    font-size: 4rem;
  }
  100% {
    font-size: 3rem;
  }
}
</style>
