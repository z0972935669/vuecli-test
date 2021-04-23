<template>
  <div class="news pt150">
    <div class="row m-0 p-0">
      <div
        class="box col-12 col-md-6"
        v-for="(item, index) in newsList"
        :key="item + index"
      >
        <img :src="item.img" :alt="item.title" />
        <div>
          <div class="info">
            <h2 class="info">{{ item.title }}</h2>
            <p class="mb-2">{{ item.text }}</p>
            <p>{{ item.date }}</p>
            <p><i class="fa fa-eye"></i>: {{item.look}}</p>
          </div>
          <div class="more">查看更多</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img01 from "@/assets/images/news/01.jpg";
import img02 from "@/assets/images/news/02.jpg";
import img03 from "@/assets/images/news/03.jpg";
import img04 from "@/assets/images/news/04.jpg";
import img05 from "@/assets/images/news/05.jpg";

export default {
  data() {
    return {
      newsList: [
        {
          title: "健身飲食篇",
          text:
            "不管你是要減重、增肌或是為了健康，運動後的30分鐘到1小時內，聰明攝取一份,運動後補充一份均衡營養的輕食很重要，內容以碳水化合物與蛋白質的",
          date: "2019/8/18",
          look: "7596",
          img: img01,
        },
        {
          title: "有氧運動迷失",
          text:
            "當你決定開始健身，身邊的朋友都會跟你說乳清蛋白很重要，一定要喝，不然 ... 蛋白質是掌管人體生理機能相當重要的營養素，而對於健身、運動、體重管理的 ... 讓你的減重過程更有效率，又不用擔心營養不足，是個非常健康的減肥法，身體也會更結實。 ... 只想增加肌肉比例，不想增重的人，你需要的是一般乳清蛋白。",
          date: "2019/5/13",
          look: "6723",
          img: img02,
        },
        {
          title: "適合老人的運動有哪些？",
          text:
            "所謂要活就要動，老了也別忘記運動。適合老人的運動類型有3種，包含可提升心肺功能的有氧運動、可強化骨頭和肌肉的肌力訓練，及幫助保",
          date: "2018/12/27",
          look: "3563",
          img: img03,
        },
        {
          title: "吃蛋白棒前要搞清楚的5件事情",
          text:
            "隨著食品加工業的發展，以及人們對營養食品需求的增進，熱愛健康的人群已經不再滿足於簡單的多種維生素以及乳清蛋白粉產品。各類蛋白",
          date: "2018/10/19",
          look: "2283",
          img: img04,
        },
        {
          title: "第一次健身就上手",
          text:
            "下一站，我們即將帶領大家走入健身房，提供獨家的「攻略要點」，協助「健身房新手」不再像無頭蒼蠅於健身房裡亂竄",
          date: "2018/8/13",
          look: "5233",
          img: img05,
        },
      ],
    };
  },
  created() {
    document.querySelector("html").classList.contains("box");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";

.news {
  max-width: 1200px;
  margin: 0 auto 1rem auto;
  .box {
    margin: 15px 0;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    text-align: center;
    align-items: center;
    img {
      width: 100%;
    }
    .info {
      & > p:nth-child(2) {
        text-align: justify;
      }
      & > p:nth-child(3) {
        float: left;
        color: #70757a;
        font-size: 0.8rem;
        @include pad() {
          color: white;
        }
      }
      & > p:nth-child(4) {
        float: right;
        color: #70757a;
        font-size: 0.8rem;
        @include pad() {
          color: white;
        }
      }
      @include pad() {
        position: absolute;
        bottom: 3px;
        color: white;
        background: $color-bgActive;
        margin-right: 15px;
      }
    }
    h2 {
      font-weight: bold;
    }
    p {
      line-height: 1.5rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      @include pad() {
        padding: 0 15px;
      }
    }
  }
  .more {
    transition: 0.6s;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    color: #fff;
    font-family: impact;
    font-size: 1.5rem;
    letter-spacing: 0.5rem;
    width: calc(80% - 30px);
    border: 2px solid #fff;
    padding: 15px 0;
  }
  .box:hover {
    img {
      filter: grayscale(0.3);
    }
    .info {
      opacity: 0.5;
    }
    .more {
      opacity: 1;
      @include pad() {
        display: none;
      }
    }
  }
}
</style>
