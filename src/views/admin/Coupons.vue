<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" data-toggle="modal" @click="openCouponModal(true)">建立新的優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody class>
        <tr v-for="(item,key) in coupons" :key="key" class>
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">已啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="removeCoupon(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled' : !pagination.has_pre}">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="getCoupon(pagination.current_page-1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in pagination.total_pages"
            :key="page"
            :class="{'active':pagination.current_page === page}"
          >
            <a class="page-link" href="#" @click.prevent="getCoupon(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled' : !pagination.has_next}">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="getCoupon(pagination.current_page+1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- /分頁 -->
    <!-- MODAL -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="modalTitle == true">新增優惠卷</span>
              <span v-else>編輯優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    v-model="tempCoupon.code"
                    placeholder="請輸入優惠碼"
                  />
                </div>
                <div class="form-group">
                  <label for="due_date">到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="due_date"
                    v-model="tempCoupon.due_date"
                    placeholder="請輸入截止日"
                  />
                </div>
                <div class="form-group">
                  <label for="percent">折扣百分比</label>
                  <input
                    type="number"
                    class="form-control"
                    id="percent"
                    v-model="tempCoupon.percent"
                    placeholder="請輸入折扣"
                  />
                </div>

                <hr />

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempCoupon.is_enabled"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL -->
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pagination: '',
      modalTitle: '',
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: '',
        percent: '',
        due_date: '',
        code: ''
      },
      isNew: false
    }
  },
  methods: {
    openCouponModal (isNew, item) {
      // 新建編輯表單
      const vm = this
      $('#couponModal').modal('show')
      vm.isNew = isNew
      if (isNew) {
        // 新增時
        vm.modalTitle = true
        vm.tempCoupon = {}
      } else {
        // 編輯時
        vm.modalTitle = false
        vm.tempCoupon = Object.assign({}, item)
      }
    },
    updateCoupon () {
      // 新增優惠卷
      const vm = this
      let api
      vm.$store.dispatch('updateLoading', true)
      if (vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
        vm.$http.post(api, { data: vm.tempCoupon }).then(response => {
          vm.getCoupon()
        })
      } else {
        // 編輯時的確認
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        vm.$http.put(api, { data: vm.tempCoupon }).then(response => {
          vm.getCoupon()
        })
      }
      vm.$store.dispatch('updateLoading', false)
      $('#couponModal').modal('hide')
    },
    removeCoupon (item) {
      // 刪除優惠卷
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.delete(url).then(response => {
        vm.coupons = response.data.coupons
        vm.getCoupon()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    getCoupon (page = 1) {
      // 取得資料
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(url, vm.tempProduct).then(response => {
        // 取得優惠卷
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  computed () {
    mapGetters(['isLoading'])
  },
  created () {
    const vm = this
    vm.getCoupon()
  }
}
</script>
