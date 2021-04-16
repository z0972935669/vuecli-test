<template>
  <div class="home">
    <div class="banner">
      <router-link to="shop/protective">
        <img :src="banner" alt="健人嚴選" />
      </router-link>
      <div class="info">
        <div>
          <p>RUNNING MAN</p>
          <p class="py-2">運以臺準再引少不電？</p>
          <router-link to="/discount">點擊領取優惠序號</router-link>
        </div>
      </div>
      <span class="nextStep" @click.prevent="nextStepFn">
        <i class="fa fa-angle-double-down" aria-hidden="true"></i>
      </span>
    </div>
    <div class="row event01">
      <div class="box1 col-12 col-md-6">
        <div class="fadein">
          <p class="h3">RUNNING</p>
          <p class="font-weight-bold py-4 my-md-4">
            師營社遊至照長電紅點每主把
          </p>
          <p>
            該飛至功以你無著其在等年裡來書讀為想化在留動月。向至公魚出陸聽不就世遊種足三。設常成就使士院球自的是信至影出對官物電力口：界濟部有的字的多過兒我西來。
          </p>
        </div>
      </div>
      <div class="box2 col-12 col-md-6 p-0">
        <div class="grid1">
          <router-link to="/shop/protective">
            <img class="p-0" :src="e1Img01" alt />
          </router-link>
        </div>
        <div class="grid2">
          <router-link to="/shop/protective">
            <img class="p-0" :src="e1Img02" alt />
          </router-link>
        </div>
        <div class="grid3">
          <router-link to="/shop/whey">
            <img class="p-0" :src="e1Img03" alt />
          </router-link>
        </div>
        <div class="grid4">
          <router-link to="/shop/whey">
            <img class="p-0" :src="e1Img04" alt />
          </router-link>
        </div>
      </div>
    </div>
    <div class="row event02 m-0">
      <div class="box1 col-12 col-md-6 p-0">
        <router-link to="/shop/whey">
          <img class="p-0" :src="e2" alt />
        </router-link>
      </div>
      <div class="box2 col-12 col-md-6">
        <div class="fadein">
          <p class="h3">RUNNING</p>
          <p class="font-weight-bold py-4 my-md-4">親告一這我</p>
          <p>
            熱們總。一新陽次亞五去主是民把？不不目就作亮當古的似、向學減人花親名對正，照兩起是文，海海叫。
            一頭聲市的算做境給我了好親策一母去哥朋是生香這有實學吸？結靈聽念性果清重！灣愛苦害；總乎定關地它坐平而然語你我舉學計！地到業性專笑；年會有年失料待夫是不在如回了節細師當我文。
          </p>
        </div>
      </div>
    </div>
    <div class="row event03 p-0 m-0">
      <div class="scroll col-12 p-0">
        <div class="col-12 col-md-6 info fadein right">
          <p class="h3 font-weight-bold">RUNNING</p>
          <p class="py-4 my-md-4 font-weight-bold">
            沒了有一力講路發手二先作安
          </p>
          <p class="my-md-4">
            樣子片情供物研孩現前了得類家象；不把求育深野年在：華不過未父樂與創共配防有？能收的受候一花沒構使如中風關農書。友不單多團人提一了著們說的交女們在自我二市望再系關問東子今生少作出對爸標心葉以健行最下此維紅樂真裝的黃。
          </p>
          <p>RUN BERRY, RUN</p>
        </div>
      </div>
    </div>
    <div class="event04">
      <p align="center" class="h3 pb-4">RUNNING NEWS</p>
      <swiper :options="swiperOption" class="swiper">
        <swiper-slide
          class="box"
          v-for="(slide, index) in swiperNum"
          :key="index"
        >
          <router-link to="/news">
            <div
              class="bgImg"
              :style="{ backgroundImage: `url(${slide.img})` }"
            ></div>
            <div class="info">
              <p class="font-weight-bold h5">{{ slide.title }}</p>
              <p>{{ slide.main }}</p>
            </div>
          </router-link>
        </swiper-slide>
        <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "swiper/swiper-bundle.css";
import banner from "@/assets/images/index/banner.jpg";
import e1Img01 from "@/assets/images/index/e1-1.jpg";
import e1Img02 from "@/assets/images/index/e1-2.jpg";
import e1Img03 from "@/assets/images/index/e1-3.jpg";
import e1Img04 from "@/assets/images/index/e1-4.jpg";
import e2 from "@/assets/images/index/e2.jpg";
import e4Img01 from "@/assets/images/news/01.jpg";
import e4Img02 from "@/assets/images/news/02.jpg";
import e4Img03 from "@/assets/images/news/03.jpg";
import e4Img04 from "@/assets/images/news/04.jpg";
import e4Img05 from "@/assets/images/news/05.jpg";

export default {
  data() {
    return {
      banner,
      e1Img01,
      e1Img02,
      e1Img03,
      e1Img04,
      e2,
      swiperNum: [
        {
          img: e4Img01,
          title: "健身飲食篇",
          main:
            "不管你是要減重、增肌或是為了健康,運動後的30分鐘到1小時內,聰明攝取一份,運動後補充一份均衡營養的輕食很重要,內容以碳水化合物與蛋白質的",
        },
        {
          img: e4Img02,
          title: "有氧運動迷失",
          main:
            "提到有氧運動,相信許多人都會想到減肥（減重）,因為有氧運動的確是可以,健身之前要先了解什麼是核心肌",
        },
        {
          img: e4Img03,
          title: "適合老人的運動有哪些？",
          main:
            "所謂要活就要動,老了也別忘記運動。適合老人的運動類型有3種,包含可提升心肺功能的有氧運動、可強化骨頭和肌肉的肌力訓練,及幫助保",
        },
        {
          img: e4Img04,
          title: "吃蛋白棒前要搞清楚的5件事情",
          main:
            "隨著食品加工業的發展,以及人們對營養食品需求的增進,熱愛健康的人群已經不再滿足於簡單的多種維生素以及乳清蛋白粉產品。各類蛋白",
        },
        {
          img: e4Img05,
          title: "第一次健身就上手",
          main:
            "下一站,我們即將帶領大家走入健身房,提供獨家的「攻略要點」,協助「健身房新手」不再像無頭蒼蠅於健身房裡亂竄",
        },
      ],
      // 螢幕寬度
      screenWidth: document.documentElement.clientWidth,
      swiperOption: {
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        },
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 1,
        observer: true,
        observeParents: true,
      },
    };
  },
  methods: {
    nextStepFn() {
      $("html, body").animate(
        {
          scrollTop: $(".event01").offset().top,
        },
        1000
      );
    },
  },
  computed: {
    swiperFn() {
      const vm = this;
      if (vm.screenWidth >= 769) {
        vm.swiperOption.slidesPerView = 3;
        return vm.swiperNum;
      } else {
        vm.swiperOption.slidesPerView = 1;
        return vm.swiperNum;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";

.home {
  img {
    vertical-align: bottom;
  }
  .banner {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(255, 255, 255, 0.8);
      & > div {
        white-space: nowrap;
        background: rgba(255, 255, 255, 0.8);
        margin: 10px;
        padding: 0 40px;
        animation-name: bannerAnimate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.5, 0.5, 0.5, 0.5);
        @include pad() {
          padding: 0 30px;
        }
        @include mobile() {
          padding: 0 10px;
        }
        & > p {
          font-weight: bold;
          &:nth-child(1) {
            white-space: nowrap;
            font-size: 2rem;
            padding: 8px 0;
            @include pad() {
              font-size: 1.5rem;
            }
          }
          &:nth-child(2) {
            font-size: 1.5rem;
            @include pad() {
              font-size: 1rem;
            }
          }
        }
        & > a {
          display: block;
          font-weight: bold;
          text-decoration: none;
          color: #8d3742;
          text-align: center;
          padding: 8px 0;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
  .nextStep {
    cursor: pointer;
    display: inline-block;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translatex(-50%);
    color: #fff;
    font-size: 2.5rem;
    animation-name: nextStep;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.5, 0.5, 0.5, 0.5);
  }
}
@keyframes nextStep {
  0% {
    bottom: 10px;
  }
  25% {
    bottom: 5px;
  }
  50% {
    bottom: 10px;
  }
  75% {
    bottom: 15px;
  }
  100% {
    bottom: 10px;
  }
}
@keyframes bannerAnimate {
  0% {
    margin: 10px;
  }
  50% {
    margin: 15px;
  }
  100% {
    margin: 10px;
  }
}
.event01 {
  padding: 0;
  margin: 0;
  vertical-align: top;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
  .box1 {
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0 100px;
    @include desktop() {
      padding: 0 50px;
    }
    @include pad() {
      height: 375px;
    }
    @include md() {
      padding: 0 100px;
    }
    @include mobile() {
      padding: 0 40px;
    }
    & > div:nth-child(1) {
      @include pad {
        transform: translateY(25%);
      }
      .h3 {
        font-family: "Dancing Script";
        font-weight: bold;
        transform: skewY(-10deg);
      }
      & > p:nth-child(3) {
        line-height: 1.5rem;
        text-align: justify;
        overflow: hidden;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        @include pad {
          -webkit-line-clamp: 5;
        }
      }
    }
  }
  .box2 {
    display: grid;
    .grid1 {
      filter: brightness(0.7);
      grid-column: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .grid2 {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .grid3 {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    .grid4 {
      filter: brightness(0.7);
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
    }
    & > div[class^="grid"] {
      overflow: hidden;
      & > a {
        & > img {
          transition: 1s ease;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
.event02 {
  align-items: center;
  .box1 {
    width: 100%;
    height: 100%;
    @include md() {
      order: 2;
    }
    img {
      width: 100%;
    }
  }
  .box2 {
    align-items: center;
    text-align: center;
    padding: 0 100px;
    @include desktop() {
      padding: 0 50px;
    }
    @include pad() {
      height: 375px;
    }
    @include md() {
      padding: 0 100px;
    }
    @include mobile() {
      padding: 40px;
    }
    & > div {
      @include pad {
        transform: translateY(25%);
      }
      & > p:nth-child(1) {
        font-family: "Dancing Script";
        font-weight: bold;
        transform: skewY(-10deg);
      }
      & > p:nth-child(2) {
        margin: 0 auto;
      }
      & > p:nth-child(3) {
        line-height: 1.5rem;
        text-align: justify;
        overflow: hidden;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        @include pad {
          -webkit-line-clamp: 5;
        }
      }
      @include md() {
        order: 1;
      }
    }
  }
}
.event03 {
  width: 100%;
  height: 700px;
  max-height: 100%;
  @include desktop {
    height: 500px;
  }
  @include md {
    height: 1000px;
  }
  @include mobile {
    height: 700px;
  }
  @include iphoneX {
    height: 640px;
  }
  .scroll {
    background-attachment: fixed;
    background-image: url("../../assets/images/index/e3.jpg");
    background-color: #929c9a;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 80% 50%;
    @include pad {
      background-attachment: unset;
      background-position: 80% 50%;
    }
    .info {
      order: 1;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      text-align: center;
      overflow: hidden;
      padding: 0 100px;
      @include desktop() {
        padding: 0 50px;
      }
      @include md() {
        height: 50%;
        padding: 0 100px;
      }
      @include mobile() {
        padding: 0 40px;
      }
      & > p:nth-child(1) {
        margin-top: 10rem;
        font-family: "Dancing Script";
        font-weight: bold;
        transform: skewY(-10deg);
        @include desktop() {
          margin-top: 5rem;
        }
        @include md() {
          margin-top: 7rem;
        }
        @include mobile() {
          margin-top: 2.5rem;
        }
      }
      & > p:nth-child(3) {
        line-height: 2rem;
        text-align: justify;
        overflow: hidden;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        @include pad() {
          line-height: 1.2rem;
        }
      }
      & > p:nth-child(4) {
        padding-top: 2rem;
        font-family: "Dancing Script";
        font-weight: bold;
        font-size: 0.8rem;
        text-align: right;
        @include iphoneX {
          padding-top: 1rem;
        }
      }
    }
  }
}
.event04 {
  margin: 100px 0;

  & > p {
    font-family: impact;
    letter-spacing: 0.2rem;
    &::after {
      content: "";
      margin-top: 20px;
      display: block;
      width: 10%;
      height: 3px;
      background: #000;
      @include pad() {
        width: 20%;
      }
    }
  }
  .swiper {
    margin: 0;
    cursor: pointer;
    @include mobile() {
      margin: 0 10px;
    }
    .box {
      height: 100%;
      width: 100%;
      background: $color-bg;
      &:hover {
        opacity: 0.5;
      }
      .bgImg {
        background-repeat: no-repeat;
        height: 400px;
        background-size: cover;
        background-position: 50% 50%;
      }
      .info {
        position: absolute;
        bottom: 0;
        padding: 15px;
        width: 100%;
        color: #fff;
        background: rgba(0, 0, 0, 0.7);
        text-align: center;
        & > .h5 {
          margin: 10px 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        & > p:nth-child(2) {
          margin: 20px 0 10px 0;
          text-align: justify;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    @include mobile() {
      background-size: 15px 25px;
    }
  }
}
</style>
