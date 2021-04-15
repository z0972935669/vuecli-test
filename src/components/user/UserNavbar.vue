<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header class="header" :class="{ bgTransparent: menuBgFn }">
      <div class="inner">
        <router-link to="/home" class="logo" alt="首頁">
          <h1>RUN</h1>
        </router-link>
        <nav class="nav">
          <button
            @click.prevent="goShop"
            :class="{ menuActive: isMenuActive === '商品列表', menuActiveFn }"
          >
            商品列表
          </button>
          <button
            @click.prevent="goDiscount"
            :class="{ menuActive: isMenuActive === '優惠活動', menuActiveFn }"
          >
            優惠活動
          </button>
          <button
            @click.prevent="goNews"
            :class="{ menuActive: isMenuActive === '健康資訊', menuActiveFn }"
          >
            健康資訊
          </button>
          <router-link to="/login" tag="button">會員登入</router-link>
        </nav>
        <button class="mobNavIcan" @click.prevent="isMobNav = !isMobNav">
          <span class="fa fa-bars"></span>
        </button>
      </div>
    </header>
    <div :class="{ zindex: !bagToggle }">
      <div :class="{ bagBg: bagToggle === false }" @click="bagToggleFn"></div>
      <a class="headerBag" @click="bagToggleFn(false)">
        <i :class="{ iconActive: !bagToggle }" class="fa fa-shopping-cart"></i>
        <span v-if="cart.carts.length >= 1">{{ cart.carts.length }}</span>
      </a>
      <div class="headerBagInfo" :class="{ bagActive: bagToggle }">
        <div class="bagBgActive"></div>
        <div class="text-center mb-3" v-if="cart.carts.length < 1">
          您的購物車是空的
        </div>
        <div v-if="cart.carts">
          <div class="bagItem" v-for="item in cart.carts" :key="item.id">
            <div v-if="item.product">
              <img :src="item.product.imageUrl" width="50" />
              <div>
                <div
                  class="cartItemDelete"
                  @click.prevent="cartItemDelete(item)"
                >
                  <i class="fa fa-times"></i>
                </div>
                <p>{{ item.product.title }}</p>
                <span class="d-block">
                  <p>{{ item.size }}</p>
                  <p>x{{ item.qty }}</p>
                  <p>
                    {{ item.product.price | currency }}/{{ item.product.unit }}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="bagPrice">
          <div v-if="cart.carts.length >= 1">
            <p class="d-inline-block">NTD.</p>
            <p class="d-inline-block">{{ cart.total | currency }}</p>
          </div>
          <button
            class="d-block"
            @click.prevent="goCheckProduct"
            v-if="cart.carts.length < 1"
          >
            前往去購物
          </button>
          <button class="d-block" @click.prevent="goCheckProduct" v-else>
            查看購物車
          </button>
        </div>
      </div>
    </div>
    <div :class="{ zindex: isSearch }">
      <label for="inSearch" @click="isSearch = !isSearch" class="headerSearch">
        <i :class="{ iconActive: isSearch }" class="fa fa-search"></i>
      </label>
      <div class="search" v-if="isSearch">
        <input
          id="inSearch"
          type="text"
          placeholder="一鍵搜尋所有商品"
          v-model="id"
          @keyup.enter="goProducts"
        />
        <button @click.prevent="goProducts">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <div
        :class="{ bgActive: isSearch }"
        @click.prevent="isSearch = !isSearch"
      ></div>
    </div>
    <div :class="{ navMobBg: isMobNav }" @click.prevent="mobNavFn"></div>
    <nav class="navMob" :class="{ active: isMobNav }">
      <div class="logo">
        <span>KizZ BB</span>
        <span></span>
      </div>
      <div class="menuButton">
        <button
          @click.prevent="goShop"
          :class="{ menuActive: isMenuActive === '商品列表', menuActiveFn }"
        >
          商品列表
        </button>
        <button
          @click.prevent="goDiscount"
          :class="{ menuActive: isMenuActive === '優惠活動', menuActiveFn }"
        >
          優惠活動
        </button>
        <button
          @click.prevent="goNews"
          :class="{ menuActive: isMenuActive === '健康資訊', menuActiveFn }"
        >
          健康資訊
        </button>
        <router-link to="/login" tag="button">會員登入</router-link>
        <button>其他</button>
      </div>
      <button class="close" @click.prevent="mobNavFn">
        <i class="fa fa-times"></i>
      </button>
      <div class="footer">
        <button>關於我們</button>
        <button>最新訊息</button>
        <button>常見QA</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserNavbar",
  data() {
    return {
      isMobNav: false,
      isAnimateOut: false,
      isCheckOut: false,
      isSearch: false,
      isMenuActive: "",
      isMenuActiveMob: "",
      id: "",
    };
  },
  methods: {
    ...mapActions(["bagToggleFn", "cartItemDelete"]),
    ...mapActions("cartsModules", ["getCart"]),
    goShop() {
      const vm = this;
      const path = "/shop/all";
      vm.$route.path !== path && vm.$router.push(path);
      vm.isMobNav = false;
    },
    goDiscount() {
      const vm = this;
      const path = "/discount";
      vm.$route.path !== path && vm.$router.push(path);
      vm.isMobNav = false;
    },
    goNews() {
      const vm = this;
      const path = "/News";
      vm.$route.path !== path && vm.$router.push(path);
      vm.isMobNav = false;
    },
    mobNavFn() {
      const vm = this;
      vm.isMobNav = false;
    },
    goProducts() {
      // 搜尋商品頁
      const vm = this;
      const path = `/search/${vm.id}`;
      vm.$bus.$emit("searchId:push", vm.id);
      vm.$route.path !== path && vm.$router.push(path);
      vm.isSearch = false;
    },
    goCheckProduct(context) {
      const vm = this;
      if (vm.$store.state.cartsModules.cart.carts.length >= 1) {
        vm.$store.dispatch("bagToggleFn", true);
        vm.$router.push({
          path: "/checkProduct",
        });
      } else {
        vm.$store.dispatch("bagToggleFn", true);
        this.goShop();
      }
    },
  },
  computed: {
    ...mapGetters(["isbagToggleFn", "bagToggle", "isLoading"]),
    ...mapGetters("cartsModules", ["cart"]),
    menuActiveFn() {
      const vm = this;
      const routeName = vm.$route.name;
      if (
        routeName === "All" ||
        routeName === "Protective" ||
        routeName === "Whey" ||
        routeName === "Like" ||
        routeName === "ShopSearch" ||
        routeName === "ShopInside"
      ) {
        return (vm.isMenuActive = "商品列表");
      } else if (routeName === "Discount" || routeName === "Turn") {
        return (vm.isMenuActive = "優惠活動");
      } else if (routeName === "News") {
        return (vm.isMenuActive = "健康資訊");
      } else {
        return (vm.isMenuActive = "");
      }
    },
    menuBgFn() {
      const vm = this;
      const routeName = vm.$route.name;
      if (routeName === "Home") {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    const vm = this;
    vm.getCart();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/helpers/breakpoint.scss";

.bgTransparent {
  background: transparent !important;
}
.header {
  position: fixed;
  background: $color-black;
  width: 100%;
  max-width: 100%;
  max-height: 60px;
  padding: 1.6rem 0;
  z-index: 2;
  .inner {
    transition: 1s;
    max-width: 90%;
    position: relative;
    margin: 0 auto;
    display: flex;
    .logo {
      display: block;
      font-weight: bold;
      font-size: 2em;
      line-height: 10px;
      h1 {
        color: $color-gray;
        font-family: impact;
      }
      @include a-text;
      @include pad() {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
      }
      @include iphone5() {
        font-size: 1.5em;
      }
    }
    .nav {
      position: absolute;
      top: 0;
      right: 50%;
      transform: translateX(50%);
      line-height: 10px;
      width: 400px;
      @include pad() {
        right: 0%;
      }
      button:hover {
        border-bottom: 2px solid $color-gray;
      }
      .menuActive {
        border-bottom: 2px solid $color-gray;
      }
      button {
        padding-bottom: 5px;
        transition: 0.5s;
        color: $color-gray;
        font-weight: 500;
        margin: 0 0.75rem;
        @include fontStyle;
        @include a-text;
        @include focusNone;
        &[class^="header"] {
          font-size: 1.4em;
          @include pad() {
            font-size: 1.2em;
          }
          @include iphone5() {
            font-size: 1em;
          }
        }
        @include mobile() {
          padding: 0 0.2em;
        }
        &:nth-child(-n + 4) {
          @include pad() {
            display: none;
          }
        }
      }
    }
    .mobNavIcan {
      color: $color-gray;
      @include a-text;
      display: none;
      @include pad() {
        cursor: pointer;
        font-size: 1.5rem;
        display: inline-block;
        position: absolute;
        top: 0;
        transform: translateY(-25%);
      }
    }
  }
}
.zindex {
  .headerBag {
    z-index: 511;
  }
  .headerBagInfo {
    z-index: 511;
  }
}
.iconActive {
  font-size: 1.5rem;
}
.bagBg {
  position: fixed;
  transition: 1s;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 510;
}
.headerBag {
  cursor: pointer;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: transparent;
  font-size: 1.3rem;
  margin-right: 5%;
  @include iphoneX {
    width: 30px;
  }
  &:hover i {
    font-size: 1.5rem;
  }
  & i {
    transition: 0.5s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $color-gray;
  }
  & span {
    font-size: 0.8rem;
    line-height: 1.1rem;
    color: #fff;
    font-weight: bold;
    background: $color-red;
    border-radius: 999%;
    width: 18px;
    height: 18px;
    text-align: center;
    position: absolute;
    top: calc(50% - 9px);
    left: calc(50% + 9px);
    transform: translate(-50%, -50%);
  }
}
.bagActive {
  display: none;
}
.headerBagInfo {
  position: fixed;
  top: 6%;
  right: 5%;
  background: #fff;
  border: 2px solid $color-gray;
  border-radius: 6px;
  overflow-y: auto;
  max-height: 450px;
  padding: 1.2rem;
  @include mobile() {
    top: 7%;
  }
  .animateOut {
    transform: translateX(-100px);
    opacity: 0;
  }
  .bagItem {
    padding: 5px;
    margin-bottom: 5%;
    transition: 2s ease;
    border-bottom: 1px solid $color-gray;
    .cartItemDelete {
      cursor: pointer;
      position: absolute;
      right: 0;
    }
    & > div:nth-child(1) {
      display: flex;
      img {
        width: 50px;
        height: 100%;
      }
      & > div {
        position: relative;
        padding-left: 5%;
        width: 180px;
        & > p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          p:nth-child(1) {
            padding: 3px 0;
            opacity: 0.5;
            font-size: 0.5rem;
          }
          p:nth-child(2) {
            clear: both;
            float: left;
          }
          p:nth-child(3) {
            float: right;
          }
        }
      }
    }
  }
  .bagPrice {
    div {
      padding-bottom: 5%;
      p:nth-child(2) {
        float: right;
        font-weight: bold;
      }
    }
    button {
      white-space: nowrap;
      background: $color-darkRed;
      color: #fff;
      padding: 0.6rem 3.2rem;
      margin: 0;
      width: 100%;
      @include mobile() {
        letter-spacing: 1px;
      }
    }
  }
}
.zindex {
  .headerSearch {
    z-index: 511;
  }
  .search {
    z-index: 511;
  }
}
.headerSearch {
  cursor: pointer;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 60px;
  width: 60px;
  height: 60px;
  background: transparent;
  color: $color-gray;
  font-size: 1.3rem;
  margin-right: calc(5% + 0px);
  &:hover i {
    font-size: 1.5rem;
  }
  & > i {
    transition: 0.5s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @include focusNone;
  @include iphoneX {
    width: 30px;
    margin-right: 0;
  }
}
.search {
  white-space: nowrap;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  input {
    position: relative;
    border: 2px solid #000;
    border-radius: 18px;
    padding: 5px 0 5px 20px;
    background: rgba(255, 255, 255, 0.4);
    color: #000;
    width: 198px;
    max-width: 100%;
    height: 100%;
    &::placeholder {
      color: #000;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    &:focus {
      outline: none;
    }
  }
}
.navMob {
  &.active {
    transform: translateX(0%);
  }
  display: none;
  transform: translateX(-100%);
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  transition: 1s;
  height: 100vh;
  background: $color-darkGray;
  padding: 0.5em 1.25em;
  z-index: 3;
  & > .logo {
    position: relative;
    margin-top: 15px;
    opacity: 0.6;
    & span:nth-child(1) {
      position: relative;
      z-index: 1;
      top: 0%;
      left: 5%;
      color: $color-gray;
      background: $color-darkGray;
      font-family: impact;
      display: inline-block;
      font-weight: bold;
      font-size: 1.2rem;
    }
    & span:nth-child(2) {
      content: "";
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background: transparent;
      border: 4px solid $color-red;
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 0;
      transform: translate(10%, -50%);
    }
  }
  .menuButton {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
  }
  .menuActive {
    color: $color-red !important;
  }
  .menuButton > button {
    color: $color-gray;
    display: block;
    padding: 0.75em 0;
    width: 100%;
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
    @include focusNone;
  }
  .close {
    color: $color-gray;
    position: absolute;
    top: 0%;
    right: 0;
    padding: 15px;
    @include focusNone;
  }
  @include pad() {
    display: block;
    min-width: 60%;
  }
  @include mobile() {
    min-width: 80%;
  }
  .footer {
    color: $color-darkGray;
    position: absolute;
    bottom: 10px;
    left: 0%;
    & > button {
      width: 100%;
      color: $color-gray;
      font-weight: bold;
      font-size: 1.2rem;
      padding: 0.5rem 1.25rem;
      text-align: left;
      @include focusNone;
    }
  }
}
.navMobBg {
  display: none;
  @include pad() {
    display: block;
    position: fixed;
    transition: 1s;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
