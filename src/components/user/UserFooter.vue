<template>
  <footer class="footer">
    <div class="info row">
      <div class="contact col-sm">
        <span>凱力位置</span>
        <div class="map"></div>
      </div>
      <div class="about col-sm py-sm-0 py-3">
        <span>關於凱力</span>
        <div>
          <p>凱力健人嚴選致力於打造最優質的健身護具，及品質最高的乳清蛋白，讓運動夥伴們可以專心訓練，由凱力做最強的後盾。 </p>
        </div>
      </div>
      <div class="follow col-sm-3 p-sm">
        <span>追蹤凱力</span>
        <div>
          <a href="https://twitter.com/?lang=zh-tw">
            <i class="fa fa-twitter-square"></i>Twitter
          </a>
          <a href="https://zh-tw.facebook.com/">
            <i class="fa fa-facebook-square"></i>Facebook
          </a>
          <a href="https://www.instagram.com/?hl=zh-tw">
            <i class="fa fa-instagram"></i>Instagram
          </a>
        </div>
      </div>
    </div>
    <div class="copyright text-center">
      <font style="vertical-align: inherit;">©Kaiz.BB【僅當練習作品無商業用途】</font>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'Restaurants',
  data () {
    return {
      map: null,
      // 預設經緯度在信義區附近
      lat: 25.063891,
      lng: 121.642334
    }
  },
  methods: {
    // 建立地圖
    async initMap () {
      const vm = this
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      const google = window.google
      vm.map = await new google.maps.Map(document.querySelector('.map'), {
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                hue: '#ff4400'
              },
              {
                saturation: -68
              },
              {
                lightness: -4
              },
              {
                gamma: 0.72
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels.icon'
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry',
            stylers: [
              {
                hue: '#0077ff'
              },
              {
                gamma: 3.1
              }
            ]
          },
          {
            featureType: 'water',
            stylers: [
              {
                hue: '#00ccff'
              },
              {
                gamma: 0.44
              },
              {
                saturation: -33
              }
            ]
          },
          {
            featureType: 'poi.park',
            stylers: [
              {
                hue: '#44ff00'
              },
              {
                saturation: -23
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                hue: '#007fff'
              },
              {
                gamma: 0.77
              },
              {
                saturation: 65
              },
              {
                lightness: 99
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                gamma: 0.11
              },
              {
                weight: 5.6
              },
              {
                saturation: 99
              },
              {
                hue: '#0091ff'
              },
              {
                lightness: -86
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                lightness: -48
              },
              {
                hue: '#ff5e00'
              },
              {
                gamma: 1.2
              },
              {
                saturation: -23
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                saturation: -64
              },
              {
                hue: '#ff9100'
              },
              {
                lightness: 16
              },
              {
                gamma: 0.47
              },
              {
                weight: 2.7
              }
            ]
          }
        ],
        // 設定地圖的中心點經緯度位置
        center: { lat: vm.lat, lng: vm.lng },
        // 設定地圖縮放比例 0-20
        zoom: 17,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false
      })
    },
    // 建立地標
    async setMarker () {
      const vm = this
      // 建立一個新地標
      const google = window.google
      const marker = await new google.maps.Marker({
        // 設定地標的座標
        position: { lat: vm.lat, lng: vm.lng },
        // 設定地標要放在哪一個地圖
        map: vm.map
      })
      window.marker = marker
    }
  },
  async mounted () {
    const vm = this
    await vm.initMap()
    vm.setMarker()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";
.footer {
  background: $color-black;
  position: relative;
  z-index: 0;
  bottom: 0;
  padding: 2.5rem 5rem;
  @include pad() {
    padding: 2rem 1.5rem;
  }
  @include mobile() {
    padding: 3rem 1rem;
  }
  & > .info {
    margin: 0 auto;
    span {
      font-size: 1.2rem;
      color: white;
    }
  }
  .contact {
    .map {
      margin: 20px 0;
      width: 100%;
      max-width: 900px;
      height: 150px;
      background: #000;
      @include pad() {
        height: 200px;
      }
    }
  }
  .about {
    p {
      color: #d4d4d4;
      margin: 20px 0;
      line-height: 1.5rem;
      text-align: justify;
    }
  }
  .follow {
    & > div {
      margin: 20px 0;
      a {
        display: block;
        color: $color-gray;
        text-decoration: none;
        padding: 5px 0;
        &:hover {
          opacity: 0.7;
        }
        i {
          padding-right: 0.3rem;
        }
      }
    }
  }
  .copyright {
    padding-top: 1rem;
    color: $color-gray;
    font-size: 0.8rem;
    border-top: 1px solid $color-gray;
  }
}
</style>
