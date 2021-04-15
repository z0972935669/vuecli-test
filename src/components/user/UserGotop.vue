<template>
  <div class="gotop" @click.prevent="gotopFn">
    <i class="fa fa-arrow-up"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotopFn() {
      // 獲取當前毫秒數
      const startTime = new Date();
      // 獲取當前頁面滾動高度
      const b = document.body.scrollTop || document.documentElement.scrollTop;
      const d = 500;
      const c = b;
      let timer = requestAnimationFrame(function func() {
        const t = d - Math.max(0, startTime - +new Date() + d);
        document.documentElement.scrollTop = document.body.scrollTop =
          (t * -c) / d + b;
        timer = requestAnimationFrame(func);
        if (t === d) {
          cancelAnimationFrame(timer);
        }
      });
    },
    gotopShow() {
      window.addEventListener('scroll', () => {
        const gotop = document.querySelector('.gotop');
        document.documentElement.scrollTop > 100 ? (gotop.style.display = 'block') : (gotop.style.display = 'none')
      });
    },
  },
  created() {
    const vm = this;
    vm.gotopShow();
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/helpers/breakpoint.scss";

.gotop {
  cursor: pointer;
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  box-shadow: 0px 1px 3px 1px rgba(255, 255, 255, 0.6);
  border-radius: 100%;
  & > i {
    color: $color-gray;
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-iteration-count: infinite;
    animation-duration: 1.5s;
    animation-timing-function: cubic-bezier(0.5, 0.5, 0.5, 0.5);
  }
  &:hover i {
    animation-name: isfloat;
  }
  @keyframes isfloat {
    0% {
      top: 50%;
    }
    25% {
      top: 40%;
    }
    50% {
      top: 50%;
    }
    75% {
      top: 55%;
    }
    100% {
      top: 50%;
    }
  }
}
</style>
