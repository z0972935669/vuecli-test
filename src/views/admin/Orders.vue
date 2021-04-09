<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買品項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody class>
        <tr v-for="(item,key) in orders" :key="key" :class="{'text-secondary':!item.is_paid}">
          <td>{{item.create_at | date}}</td>
          <td>
            <span v-if="item.user">{{ item.user.email }}</span>
            <span v-else>無</span>
          </td>
          <td>
            <ul class="list-unstyled" v-for="(product,i) in item.products" :key="i">
              <li>
                {{product.title}}
                <span
                  class="btn btn-sm"
                  :class="{'text-secondary':!item.is_paid}"
                >{{product.num}}</span>
                {{product.unit}}
              </li>
            </ul>
          </td>
          <td>{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-secondary">尚未付款</span>
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
              @click.prevent="getOrders(pagination.current_page-1)"
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
            <a class="page-link" href="#" @click.prevent="getOrders(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled' : !pagination.has_next}">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="getOrders(pagination.current_page+1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- /分頁 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      orders: '',
      pagination: ''
    }
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then(response => {
        // 取得訂單資料
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updateLoading', false)
      })
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  created () {
    const vm = this
    vm.getOrders()
  }
}
</script>
