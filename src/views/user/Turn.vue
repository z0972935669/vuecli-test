<template>
  <div class="pt150">
    <div class="text-center my-3 info">
      <p class="h3">歡樂大轉盤</p>
      <p>點擊下方圖片轉動唱盤,獲取折扣碼</p>
    </div>
    <div class="turn">
      <img class="turnBg" :src="turnBg" ondragstart="return false;" @click.prevent="playTurn" />
      <img class="turnTable" :src="turnTable" ondragstart="return false;" />
    </div>
    <div :class="{'rewardAlert':isAlertBg,'d-none':isAlertBg === false}">
      <div class="alertBg" @click.prevent="isAlertBg = false"></div>
      <div class="alertInfo">
        <span class="text-success">
          <i class="fa fa-money"></i>
        </span>
        <p class="text-center">Save up to</p>
        <p class="text-center">{{price}}</p>
        <p class="text-center pt-2">優惠代碼: kaizbb90</p>
        <router-link tag="button" to="/shop/all" class="d-block">馬上購物去</router-link>
        <button class="d-block" @click.prevent="playAgain">再玩一次</button>
      </div>
    </div>
  </div>
</template>

<script>
import turnBg from '@/assets/images/discount/turn/turnBg.png'
import turnTable from '@/assets/images/discount/turn/turnTable.png'
export default {
  data () {
    return {
      turnBg,
      turnTable,
      isPlay: true,
      isNum: '',
      isAlertBg: false,
      price: ''
    }
  },
  methods: {
    playTurn () {
      const vm = this
      const turnTable = document.querySelector('.turnTable')
      const num = Math.floor(Math.random() * 5)
      if (vm.isPlay === true) {
        switch (num) {
          case 0:
            vm.price = '70%'
            vm.isNum = 360
            break
          case 1:
            vm.price = '80%'
            vm.isNum = 450
            break
          case 2:
            vm.price = '85%'
            vm.isNum = 550
            break
          case 3:
            vm.price = '90%'
            vm.isNum = 600
            break
          default:
            vm.price = '95%'
            vm.isNum = 650
            break
        }
        turnTable.style.transform = `rotate(${vm.isNum}deg)`
        turnTable.style.transition = '5s'
        vm.isPlay = false
        setTimeout(() => {
          vm.isAlertBg = true
        }, 5000)
      }
    },
    playAgain () {
      const vm = this
      const turnTable = document.querySelector('.turnTable')
      vm.isPlay = true
      turnTable.style.transform = 'rotate(0deg)'
      turnTable.style.transition = '0s'
      vm.isAlertBg = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";
.turn {
  position: relative;
  max-width: 1107px;
  width: 100%;
  margin: 0 auto;
  .turnBg {
    width: 100%;
    height: 100%;
    position: sticky;
    z-index: 1;
    cursor: pointer;
  }
}
.turnTable {
  transform-origin: center;
  position: absolute;
  z-index: 0;
  top: 17%;
  left: 37.5%;
  width: 43%;
  transform: rotate(0deg);
}
.rewardAlert {
  .alertBg {
    position: fixed;
    z-index: 510;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $color-bgActive;
  }
  .alertInfo {
    position: fixed;
    z-index: 510;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    max-width: 360px;
    max-height: 380px;
    background: #fff;
    border-radius: 20px;
    font-weight: bold;
    @include mobile() {
      max-width: 300px;
    }
    & > span:nth-child(1) {
      padding: 30px;
      font-size: 5rem;
      text-align: center;
      display: block;
    }
    & > p:nth-child(3) {
      color: $color-darkRed;
      font-size: 4rem;
      padding: 5px 0;
      font-family: impact;
    }
    & > button:nth-child(5) {
      margin: 20px auto 0 auto;
      padding: 10px 0;
      width: 90%;
      background: $color-darkRed;
      color: white;
    }
    & > button:nth-child(6) {
      margin: 20px auto 0 auto;
      padding: 10px 0;
      width: 90%;
      background: $color-darkGray;
      color: white;
    }
  }
}
</style>
