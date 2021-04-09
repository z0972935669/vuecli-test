<template>
  <nav class="col-12 row slideTop">
    <div class="col-6">
      <li class="nav-link initialism">管理員</li>
      <ul class="d-flex flex-wrap">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link text-dark" active-class="active">
            <span data-feather="home"></span>
            <i class="fa fa-window-restore"></i>
            產品列表
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link text-dark" active-class="active">
            <span data-feather="file"></span>
            <i class="fa fa-hamburger"></i>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupons" class="nav-link text-dark" active-class="active">
            <span data-feather="shopping-cart"></span>
            <i class="fa fa-money-check-alt"></i>
            優惠卷
          </router-link>
        </li>
      </ul>
    </div>
    <div class="col-6">
      <li class="nav-link initialism">模擬功能</li>
      <ul class="d-flex">
        <li class="nav-item">
          <router-link
            to="/customer_order"
            active-class="active"
            class="nav-link text-dark"
            href="#"
          >模擬訂單</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.slideTop {
  position: relative;
  top: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  background: rgb(209, 209, 209);
  ul,
  li {
    list-style: none;
  }
}
</style>
