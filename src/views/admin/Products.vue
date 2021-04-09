<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right py-2">
      <button class="btn btn-primary" data-toggle="modal" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width>分類</th>
          <th>產品名稱</th>
          <th width>原價/售價</th>
          <th width>是否啟用</th>
          <th width>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.origin_price | currency }}/{{item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="removeData(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination :pagination="pagination" @emitPage="getProducts"></Pagination>
    <!-- /分頁 -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew == true">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fa fa-spinner fa-pulse" v-if="status.fileUploading === true"></i>
                    <!--FA動態讀取樣式-->
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  :src="tempProduct.imageUrl"
                  class="img-fluid"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">商品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">商品資訊</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group row">
                  <div class="form-check col-6">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                  <div class="form-check col-6">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.in_stock"
                      :true-value="1"
                      :false-value="0"
                      id="in_stock"
                    />
                    <label class="form-check-label" for="in_stock">是否有庫存</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="checkRemove">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>
<script>
import $ from 'jquery'
import Pagination from '../../components/admin/Pagination'
import { mapGetters } from 'vuex'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      products: {},
      // 分頁效果
      pagination: {},
      tempProduct: {
        // 送出欄位內容
        in_stock: 0
      },
      isNew: false,
      status: {
        fileUploading: false
      },
      modalTitle: ''
    }
  },
  methods: {
    getProducts (page = 1) {
      // 取得api資料
      // 'https://vue-course-api.hexschool.io/api/lovfee/products'取得api路徑
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then(response => {
        // 取得每筆商品資料
        vm.$store.dispatch('updateLoading', false)
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      // 打開表單,item=點選的商品資料
      const vm = this
      if (isNew) {
        vm.tempProduct = {}
        // true=>新增的
        vm.isNew = true
      } else {
        // 因為物件傳參考特性，用object.assign淺層複製
        vm.tempProduct = Object.assign({}, item)
        // false=>編輯
        vm.isNew = false
      }
      $('#productModal').modal('show')
    },
    removeData (item) {
      // 刪除資料
      const vm = this
      vm.tempProduct = item
      $('#delProductModal').modal('show')
    },
    checkRemove () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}` // 修改資料api
      vm.$http.delete(api).then(response => {
        vm.products = response.data.products
        $('#delProductModal').modal('hide')
        if (response.data.success) {
          // 刪除資料
          vm.getProducts()
        } else {
          // 資料刪除失敗
          $('#delProductModal').modal('hide')
          vm.getProducts()
        }
      })
    },
    updateProduct () {
      // 更新產品
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        // 不是新的資料時(編輯時)
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}` // 修改資料api
        // 編輯資料時修改http方式
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          // 商品建立時
          // 隱藏建立表單
          $('#productModal').modal('hide')
          // 重新取得購物車資料
          vm.getProducts()
        } else {
          // 驗證失敗時
          $('#productModal').modal('hide')
          vm.getProducts()
        }
      })
    },
    uploadFile () {
      const vm = this
      // 透過this找到裡面的圖片位置為物件
      const uploadedFile = vm.$refs.files.files[0]
      // 宣告formDate物件，送出資料
      const formData = new FormData()
      // 用append的方式將欄位新增進去(格式,上傳檔案)
      formData.append('file-to-upload', uploadedFile)
      // 定義路徑
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      // fontawesome載入樣式開啟
      vm.status.fileUploading = true
      vm.$http
        .post(url, formData, {
          headers: {
            // 修改表單形式為form-data
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          if (response.data.success) {
            // 上傳成功時
            // 強制寫入set,(位置,'欄位名',路徑)
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
            // 關閉loading樣式
            vm.status.fileUploading = false
          } else {
            // 上傳失敗時，出現樣式
            vm.$bus.$emit('message:push', response.data.message, 'danger')
          }
        })
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  created () {
    // 補上created
    const vm = this
    vm.getProducts()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";
.modal-content {
  background: $color-bg;
}
</style>
