<template>
  <div class="discount pt150 px-3">
    <div class="pb-3 mb-3 title">
      <p>優惠活動</p>
      <p class="pt-3">點擊下方票卡即可進入遊戲區領取優惠碼</p>
    </div>
    <router-link to="/discount/turn" class="box row">
      <div class="icon col-3">
        <img :src="iconImg1" alt="game_photo" ondragstart="return false" />
      </div>
      <div class="info col">
        <div class="row">
          <div class="col-7">
            <p class="h5">歡樂大轉盤</p>
            <p class="h6">活動辦法:</p>
            <p class="my-2">凡於活動期間內,每日至官網登入會員,點選轉盤,立即獲得折扣優惠.</p>
            <p class="h6">活動時間:</p>
            <p class="my-2">隨時下架,請保握機會.</p>
          </div>
          <div class="col">
            <p class="h5">歡樂大轉盤</p>
            <p>本次活動最高享有</p>
            <p>70%</p>
            <p>折扣</p>
            <img :src="barcodeImg" alt />
          </div>
        </div>
      </div>
    </router-link>
    <router-link to class="box row">
      <div class="icon col-3">
        <img :src="iconImg2" alt="game_photo" ondragstart="return false" />
      </div>
      <div class="info col">
        <div class="row">
          <div class="col-7">
            <p class="h5">刮出小確幸</p>
            <p class="h6">活動辦法:</p>
            <p class="my-2">凡於活動期間內,每日至官網登入會員,點選轉盤,立即獲得折扣優惠.</p>
            <p class="h6">活動時間:</p>
            <p class="my-2">敬請期待</p>
          </div>
          <div class="col">
            <p class="h5">刮出小確幸</p>
            <p>本次活動最高享有</p>
            <p>XX%</p>
            <p>折扣</p>
            <img :src="barcodeImg" alt />
          </div>
        </div>
      </div>
      <div class="comingSoon">
        <p>Coming Soon</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import iconImg1 from '@/assets/images/discount/turn/turnTable.png'
import iconImg2 from '@/assets/images/discount/scratch/pop.png'
import barcodeImg from '@/assets/images/checkout/barcode.jpg'
export default {
  data () {
    return {
      iconImg1,
      iconImg2,
      barcodeImg
    }
  },
  methods: {
    goTurn () {
      const vm = this
      vm.$router.push({
        path: '/discount/turn'
      })
    }
  }
}
</script>

<style lang="scss" second>
@import "@/assets/scss/helpers/breakpoint.scss";
@mixin fontBold {
  font-family: impact;
}

.discount {
  max-width: 1024px;
  margin: 0 auto;
  .title {
    position: sticky;
    z-index: 1;
    border-bottom: 1px solid $color-black;
    background: #fff;
    & > p:nth-child(2) {
      font-size: 0.9rem;
      opacity: 0.7;
    }
  }
  .box {
    position: relative;
    color: black;
    text-decoration: none;
    background: #f3f3f3;
    position: relative;
    z-index: 0;
    max-width: 800px;
    width: 100%;
    height: 200px;
    margin: 0 auto;
    box-shadow: 0px 1px 3px 1px $color-bgActive;
    margin-bottom: 2rem;
    @include desktop() {
      height: 200px;
    }
    @include mobile() {
      height: 150px;
    }
    .icon {
      border-right: 0.5rem dotted $color-bgActive;
      padding: 2rem;
      @include pad() {
        padding: 1rem;
      }
      @include mobile() {
        flex: 0 0 33.33333%;
        max-width: 33.333333%;
      }
      &::before {
        content: "";
        position: absolute;
        top: 0%;
        right: 0%;
        transform: translate(55%, -50%);
        width: 40px;
        height: 40px;
        border-radius: 999%;
        background: #fff;
        border-bottom: 2px solid $color-bgActive;
        @include mobile() {
          width: 30px;
          height: 30px;
        }
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0%;
        right: 0%;
        transform: translate(55%, 50%);
        width: 40px;
        height: 40px;
        border-radius: 999%;
        background: #fff;
        border-top: 2px solid $color-bgActive;
        @include mobile() {
          width: 30px;
          height: 30px;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding: 2rem;
      height: 200px;
      @include desktop() {
        height: 200px;
      }
      @include pad() {
        padding: 1rem;
      }
      @include mobile() {
        height: 150px;
      }
      & > div {
        align-items: center;
        overflow: hidden;
        div:nth-child(1) {
          border-right: 1px dotted $color-bgActive;
          & > p {
            opacity: 0.9;
            text-align: justify;
            overflow: hidden;
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-height: 1.2rem;
            -webkit-box-orient: vertical;
            @include pad() {
              -webkit-line-clamp: 2;
            }
            @include mobile() {
              display: none;
            }
          }
          & > p:nth-child(5) {
            -webkit-line-clamp: 1;
          }
        }
        div:nth-child(2) {
          text-align: center;
          @include mobile() {
            max-width: 100%;
            flex: 0 0 100%;
          }
          & > p:nth-child(1) {
            display: none;
            @include mobile() {
              display: block;
            }
          }
          & > p:nth-child(2) {
            font-size: 1.3rem;
            opacity: 0.7;
            @include mobile() {
              font-size: 1.1rem;
            }
          }
          & > p:nth-child(3) {
            display: inline-block;
            font-weight: bold;
            font-size: 2rem;
            color: $color-red;
            padding-right: 5px;
          }
          & > p:nth-child(4) {
            display: inline;
            opacity: 0.7;
          }
          & > img {
            display: block;
            padding-top: 0.5rem;
            width: 90%;
            height: auto;
            margin: 0 auto;
            @include mobile() {
              width: 60%;
            }
          }
        }
      }
    }
  }
  .comingSoon {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    & > p {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 3rem;
      font-weight: bold;
      padding: 1rem;
      border: 3px solid #fff;
      @include pad() {
        font-size: 1.5rem;
      }
      @include mobile() {
        font-size: 1rem;
      }
    }
  }
}
</style>
