<template>
  <div class="shop pt150">
    <loading :active.sync="isLoading"></loading>
    <div class="row container m-auto">
      <div class="menuList col-md">
        <button @click.prevent="getAll()" :class="{'listActive':isMenuActive === '全部商品'}">全部商品</button>
        <button
          @click.prevent="getProtective()"
          :class="{'listActive':isMenuActive === '健身護具'}"
        >健身護具</button>
        <button @click.prevent="getWhey()" :class="{'listActive':isMenuActive === '優質乳清'}">優質乳清</button>
        <button @click.prevent="getLike()" :class="{'listActive':isMenuActive === '最愛商品'}">最愛商品</button>
      </div>
      <div class="menuMain col-md-10">
        <div class="menuBar row col-11 mx-0 mb-4 p-0">
          <div
            class="box1 p-0 col-4"
            @click.prevent="getAll()"
            :class="{'active':isMenuActive === '全部商品'}"
          >
            <p>全部商品</p>
          </div>
          <div
            class="box2 p-0 col-4"
            @click.prevent="getProtective()"
            :class="{'active':isMenuActive === '健身護具'}"
          >
            <p>健身護具</p>
          </div>
          <div
            class="box3 p-0 col-4"
            @click.prevent="getWhey()"
            :class="{'active':isMenuActive === '優質乳清'}"
          >
            <p>優質乳清</p>
          </div>
          <div
            class="box4 p-0 col-4"
            @click.prevent="getLike()"
            :class="{'active':isMenuActive === '最愛商品'}"
          >
            <p>最愛商品</p>
          </div>
        </div>
        <div class="subcate mb-3">{{isMenuActive}}</div>
        <div class="row">
          <div
            class="col-6 col-md-4 col-lg-3 mb-4"
            v-for="(item,key) in filteredProducts"
            :key="key"
          >
            <div v-if="item.is_enabled === 1">
              <div class="border-0 shadow-sm shop_info" @click.prevent="goInside(item.id)">
                <span
                  class="sale_style"
                  :class="{'soldOutStyle':item.in_stock === 0}"
                  v-if="item.origin_price != 0"
                >SALE</span>
                <img
                  :src="item.imageUrl"
                  :class="{'soldOutStyle':item.in_stock === 0}"
                  :alt="item.title"
                />
              </div>
              <div class="item_info" @click.prevent="goInside(item.id)">
                <p class="pdname" :class="{'soldOutStyle':item.in_stock === 0}">{{item.title}}</p>
                <p class="price" :class="{'soldOutStyle':item.in_stock === 0}">
                  <span :class="{'saleFont':item.origin_price != 0}">{{item.price | currency}}</span>
                  <span class="old" v-if="item.origin_price != 0">{{item.origin_price | currency}}</span>
                </p>
                <span class="like">
                  <i
                    class="fa fa-heart addLike"
                    @click.stop="removeLike(item)"
                    v-if="getFilterLocalData(item)"
                  ></i>
                  <i class="fa fa-heart-o" @click.stop="addLike(item)" v-else></i>
                </span>
              </div>
              <div class="soldOut" v-if="item.in_stock === 0">
                <p>SOLD OUT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isLike: false,
      isMenuActive: '全部商品',
      searchId: '',
      likeData: []
    }
  },
  methods: {
    ...mapActions(['getProducts']),
    getAll () {
      const vm = this
      const path = '/shop/all'
      // 避免重複點擊時報錯
      vm.$route.path !== path && vm.$router.push(path)
    },
    getProtective () {
      const vm = this
      const path = '/shop/protective'
      vm.$route.path !== path && vm.$router.push(path)
    },
    getWhey () {
      const vm = this
      const path = '/shop/whey'
      vm.$route.path !== path && vm.$router.push(path)
    },
    getLike () {
      const vm = this
      const path = '/shop/like'
      vm.$route.path !== path && vm.$router.push(path)
    },
    goInside (id) {
      const vm = this
      vm.$router.push(`/shop_inside/${id}`)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    getLocalData () {
      const vm = this
      vm.likeData = JSON.parse(localStorage.getItem('likeData')) || []
    },
    getFilterLocalData (item) {
      const vm = this
      return vm.likeData.some(function (ele) {
        return item.id === ele.id
      })
    },
    addLike (item) {
      const vm = this
      const likeArr = {
        title: item.title,
        id: item.id
      }
      vm.likeData.push(likeArr)
      localStorage.setItem(
        'likeData',
        JSON.stringify(vm.likeData)
      )
    },
    removeLike (item) {
      const vm = this
      const num = vm.likeData.findIndex(function (ele) {
        return ele.id === item.id
      })
      vm.likeData.splice(num, 1)
      // 更新localstrage資料
      localStorage.setItem(
        'likeData',
        JSON.stringify(vm.likeData)
      )
    }
  },
  computed: {
    ...mapGetters(['isLoading', 'products']),
    filteredProducts () {
      const vm = this
      const routeName = vm.$route.name
      let filtered = ''
      // 判斷網頁顯示內容
      switch (routeName) {
        case 'All':
          vm.isMenuActive = '全部商品'
          return vm.products
        case 'Protective':
          vm.isMenuActive = '健身護具'
          filtered = vm.products.filter(function (item) {
            return item.category === '護具'
          })
          return filtered
        case 'Whey':
          vm.isMenuActive = '優質乳清'
          filtered = vm.products.filter(function (item) {
            return item.category === '乳清'
          })
          return filtered
        case 'Like':
          vm.isMenuActive = '最愛商品'
          filtered = vm.products.filter(function (item, index, arr) {
            return vm.likeData.some(function (ele) {
              return item.id === ele.id
            })
          })
          return filtered
        default:
          // 搜尋
          filtered = vm.products.filter(function (item) {
            return item.title.includes(vm.searchId)
          })
          vm.isMenuActive = `查詢有關"${vm.searchId}"的結果`
          return filtered
      }
    }
  },
  created () {
    const vm = this
    vm.searchId = vm.$route.params.id
    vm.getProducts()
    vm.getLocalData()
    vm.$bus.$on('searchId:push', value => {
      vm.searchId = value
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";

/*shop*/
.shop {
  .menuList {
    @include pad() {
      display: none;
    }
    .listActive {
      opacity: 0.7;
    }
    & > button {
      background: $color-black;
      color: #fff;
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      padding: 15px 0;
      @include focusNone;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .menuMain {
    @include pad() {
      max-width: 100%;
      flex: 100%;
    }
  }
  .menuBar {
    display: none;
    @include pad() {
      display: flex;
    }
    .active {
      filter: grayscale(0);
      p {
        opacity: 1;
      }
    }
    cursor: pointer;
    flex-wrap: nowrap;
    height: 300px;
    @include pad() {
      height: 200px;
    }
    @include mobile() {
      height: 150px;
    }
    & > div {
      transition: 0.6s;
      filter: grayscale(1);
      p {
        transition: 0.6s;
        opacity: 0;
      }
    }
    & > div:hover {
      filter: grayscale(0%);
      p {
        opacity: 1;
      }
    }
  }
  div[class^="box"] {
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    position: relative;
    @include mobile {
      background-size: cover;
    }
    & > p {
      color: #fff;
      background: $color-bgActive;
      padding: 10px;
      font-size: 1.5rem;
      line-height: 2rem;
      width: 30%;
      position: absolute;
      font-weight: bold;
      top: 50%;
      transform: translate(-50%, -50%);
      @include mobile {
        font-size: 1rem;
        line-height: 1.5rem;
        width: 35%;
      }
      @include iphoneX {
        width: 45%;
      }
    }
  }
  .box1 {
    clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);
    background-image: url("../../assets/images/shop/m1.jpg");
    left: 0;
    & > p {
      left: 50%;
    }
  }
  .box2 {
    clip-path: polygon(25% 0, 100% 0%, 75% 100%, 0% 100%);
    background-image: url("../../assets/images/shop/m2.jpg");
    left: -8.4%;
    & > p {
      left: calc(50% + 4.2%);
    }
  }
  .box3 {
    clip-path: polygon(25% 0, 100% 0%, 75% 100%, 0% 100%);
    background-image: url("../../assets/images/shop/m3.jpg");
    left: -16.8%;
    & > p {
      left: calc(50% + 8.4%);
    }
  }
  .box4 {
    clip-path: polygon(25% 0, 100% 0%, 100% 100%, 0% 100%);
    background-image: url("../../assets/images/shop/m4.jpg");
    left: -25.2%;
    & > p {
      left: calc(50% + 12.6%);
    }
  }
  .subcate {
    padding-bottom: 20px;
    border-bottom: 1px solid $color-black;
  }
  .shop_info {
    @include fontStyle;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
      vertical-align: bottom;
      transition: 0.6s;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
  .activeOpacity {
    opacity: 0.5;
  }
  .sale_style {
    position: absolute;
    z-index: 1;
    right: 5px;
    top: 5px;
    transform: rotate(40deg);
    background: $color-red;
    color: white;
    border-radius: 5px;
    padding: 5px;
  }
  .item_info {
    cursor: pointer;
    position: relative;
    .addLike {
      color: $color-red;
    }
    .like {
      position: absolute;
      z-index: 1;
      top: 50%;
      right: 5%;
      font-size: 1.3rem;
      @include iphoneX() {
        position: sticky;
        float: left;
        margin-top: 0.8rem;
      }
    }
    .pdname {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
      padding: 0.8rem 0;
      font-weight: bold;
    }
    .price {
      .saleFont {
        color: $color-red;
        font-weight: bold;
      }
      .old {
        letter-spacing: 0;
        color: #666;
        margin-left: 0.5rem;
        font-size: 0.8rem;
        text-decoration: line-through;
      }
    }
  }
  .soldOut {
    display: flex;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 102%;
    justify-content: center;
    align-items: center;
    @include mobile {
      transform: translateY(0%);
      height: 95%;
    }
    p {
      color: #fff;
      font-weight: bold;
      text-align: center;
      padding: 15px;
      border: 2px solid #fff;
      @include iphone5() {
        padding: 10px;
      }
    }
  }
  .soldOutStyle {
    filter: contrast(0.5);
  }
}
</style>
