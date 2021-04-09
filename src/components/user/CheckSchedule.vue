<template>
  <div>
    <div class="row w-100 m-auto pt150">
      <div class="container m-auto" style="height:140px;">
        <div class="checkSchedule">
          <span></span>
          <div class="checkProduct">
            <i class="fa fa-shopping-cart"></i>
            <p>確認購物車</p>
          </div>
          <div class="checkInfo">
            <i class="fa fa-edit"></i>
            <p>填寫資料</p>
          </div>
          <div class="checkOut">
            <i class="fa fa-check-square-o"></i>
            <p>確認結帳</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckSchedule',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/helpers/breakpoint.scss";
.scheduleInfoAnimation {
  animation-name: scheduleInfo;
  animation-iteration-count: infinite;
  animation-duration: 0.5s;
  @include mobile {
    animation-name: none;
    background:linear-gradient(to right, $color-darkRed 50%, $color-gray 50%) !important;
  }
}
.scheduleConfirmAnimation {
  animation-name: scheduleConfirm;
  animation-iteration-count: infinite;
  animation-duration: 0.5s;
  @include mobile {
    animation-name: none;
    background: $color-darkRed !important;
  }
}
.checkSchedule {
  position: relative;
  & > span {
    position: absolute;
    bottom: calc(-1.5rem - 4px);
    display: block;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, $color-gray 0%, transparent 100%),
      linear-gradient(90deg, $color-gray 100%, transparent 100%);
    background-size: 30px 30px;
  }
  .checkProduct {
    position: absolute;
    left: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 999%;
    border: 3px solid $color-darkRed;
    background: $color-bg;
    & > i {
      color: $color-darkRed;
      font-size: 1.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    p {
      position: absolute;
      bottom: -40%;
      left: -50%;
      transform: translate(0%, 100%);
      white-space: nowrap;
      color: $color-darkRed;
      font-weight: bold;
      @include mobile {
        width: 1%;
        left: 25%;
        white-space: normal;
      }
    }
  }
  .checkInfo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: 999%;
    border: 3px solid $color-gray;
    background: $color-bg;
    & > i {
      color: $color-gray;
      font-size: 1.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    p {
      position: absolute;
      bottom: -40%;
      left: 50%;
      transform: translate(-50%, 100%);
      white-space: nowrap;
      color: $color-gray;
      font-weight: bold;
      @include mobile {
        white-space: normal;
      }
    }
  }
  .checkOut {
    position: absolute;
    right: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 999%;
    border: 3px solid $color-gray;
    background: $color-bg;
    & > i {
      color: $color-gray;
      font-size: 1.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    p {
      position: absolute;
      bottom: -40%;
      left: 50%;
      transform: translate(-50%, 100%);
      white-space: nowrap;
      color: $color-gray;
      font-weight: bold;
      @include mobile {
        white-space: normal;
      }
    }
  }
}
@keyframes scheduleInfo {
  0% {
    background: linear-gradient(45deg, #dca7ae 10%, transparent 10%),
      linear-gradient(45deg, #8d3742 20%, transparent 20%),
      linear-gradient(45deg, #dca7ae 30%, transparent 30%),
      linear-gradient(45deg, #8d3742 40%, transparent 40%),
      linear-gradient(90deg, #dca7ae 50%, transparent 50%),
      linear-gradient(45deg, #d4d4d4 100%, transparent 100%);
  }
  25% {
    background: linear-gradient(45deg, #8d3742 5%, transparent 5%),
      linear-gradient(45deg, #dca7ae 15%, transparent 15%),
      linear-gradient(45deg, #8d3742 25%, transparent 25%),
      linear-gradient(45deg, #dca7ae 35%, transparent 35%),
      linear-gradient(45deg, #8d3742 45%, transparent 45%),
      linear-gradient(90deg, #dca7ae 50%, transparent 50%),
      linear-gradient(45deg, #d4d4d4 100%, transparent 100%);
  }
  50% {
    background: linear-gradient(45deg, #8d3742 10%, transparent 10%),
      linear-gradient(45deg, #dca7ae 20%, transparent 20%),
      linear-gradient(45deg, #8d3742 30%, transparent 30%),
      linear-gradient(45deg, #dca7ae 40%, transparent 40%),
      linear-gradient(90deg, #8d3742 50%, transparent 50%),
      linear-gradient(45deg, #d4d4d4 100%, transparent 100%);
  }
  75% {
    background: linear-gradient(45deg, #dca7ae 5%, transparent 5%),
      linear-gradient(45deg, #8d3742 15%, transparent 15%),
      linear-gradient(45deg, #dca7ae 25%, transparent 25%),
      linear-gradient(45deg, #8d3742 35%, transparent 35%),
      linear-gradient(45deg, #dca7ae 45%, transparent 45%),
      linear-gradient(90deg, #8d3742 50%, transparent 50%),
      linear-gradient(45deg, #d4d4d4 100%, transparent 100%);
  }
  100% {
    background: linear-gradient(45deg, #dca7ae 10%, transparent 10%),
      linear-gradient(45deg, #8d3742 20%, transparent 20%),
      linear-gradient(45deg, #dca7ae 30%, transparent 30%),
      linear-gradient(45deg, #8d3742 40%, transparent 40%),
      linear-gradient(90deg, #dca7ae 50%, transparent 50%),
      linear-gradient(45deg, #d4d4d4 100%, transparent 100%);
  }
}
@keyframes scheduleConfirm {
  0% {
    background: linear-gradient(45deg, #dca7ae 10%, transparent 10%),
      linear-gradient(45deg, #8d3742 20%, transparent 20%),
      linear-gradient(45deg, #dca7ae 30%, transparent 30%),
      linear-gradient(45deg, #8d3742 40%, transparent 40%),
      linear-gradient(45deg, #dca7ae 50%, transparent 50%),
      linear-gradient(45deg, #8d3742 60%, transparent 60%),
      linear-gradient(45deg, #dca7ae 70%, transparent 70%),
      linear-gradient(45deg, #8d3742 80%, transparent 80%),
      linear-gradient(45deg, #dca7ae 90%, transparent 90%),
      linear-gradient(90deg, #8d3742 100%, transparent 100%);
  }
  25% {
    background: linear-gradient(90deg, #8d3742 5%, transparent 5%),
      linear-gradient(45deg, #dca7ae 15%, transparent 15%),
      linear-gradient(45deg, #8d3742 25%, transparent 25%),
      linear-gradient(45deg, #dca7ae 35%, transparent 35%),
      linear-gradient(45deg, #8d3742 45%, transparent 45%),
      linear-gradient(45deg, #dca7ae 55%, transparent 55%),
      linear-gradient(45deg, #8d3742 65%, transparent 65%),
      linear-gradient(45deg, #dca7ae 75%, transparent 75%),
      linear-gradient(45deg, #8d3742 85%, transparent 85%),
      linear-gradient(45deg, #dca7ae 95%, transparent 95%),
      linear-gradient(90deg, #8d3742 100%, transparent 100%);
  }
  50% {
    background: linear-gradient(90deg, #8d3742 10%, transparent 10%),
      linear-gradient(45deg, #dca7ae 20%, transparent 20%),
      linear-gradient(45deg, #8d3742 30%, transparent 30%),
      linear-gradient(45deg, #dca7ae 40%, transparent 40%),
      linear-gradient(45deg, #8d3742 50%, transparent 50%),
      linear-gradient(45deg, #dca7ae 60%, transparent 60%),
      linear-gradient(45deg, #8d3742 70%, transparent 70%),
      linear-gradient(45deg, #dca7ae 80%, transparent 80%),
      linear-gradient(45deg, #8d3742 90%, transparent 90%),
      linear-gradient(45deg, #dca7ae 100%, transparent 100%);
  }
  75% {
    background: linear-gradient(45deg, #dca7ae 5%, transparent 5%),
      linear-gradient(90deg, #8d3742 15%, transparent 15%),
      linear-gradient(45deg, #dca7ae 25%, transparent 25%),
      linear-gradient(45deg, #8d3742 35%, transparent 35%),
      linear-gradient(45deg, #dca7ae 45%, transparent 45%),
      linear-gradient(45deg, #8d3742 55%, transparent 55%),
      linear-gradient(45deg, #dca7ae 65%, transparent 65%),
      linear-gradient(45deg, #8d3742 75%, transparent 75%),
      linear-gradient(45deg, #dca7ae 85%, transparent 85%),
      linear-gradient(45deg, #8d3742 95%, transparent 95%),
      linear-gradient(45deg, #dca7ae 100%, transparent 100%);
  }
  100% {
    background: linear-gradient(45deg, #dca7ae 10%, transparent 10%),
      linear-gradient(90deg, #8d3742 20%, transparent 20%),
      linear-gradient(45deg, #dca7ae 30%, transparent 30%),
      linear-gradient(45deg, #8d3742 40%, transparent 40%),
      linear-gradient(45deg, #dca7ae 50%, transparent 50%),
      linear-gradient(45deg, #8d3742 60%, transparent 60%),
      linear-gradient(45deg, #dca7ae 70%, transparent 70%),
      linear-gradient(45deg, #8d3742 80%, transparent 80%),
      linear-gradient(45deg, #dca7ae 90%, transparent 90%),
      linear-gradient(45deg, #8d3742 100%, transparent 100%);
  }
}
</style>
