<template>
  <div class="login">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">KaizBB會員登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      />
      <div class="checkbox mb-3 text-danger">{{isMessage}}</div>
      <button class="btn-lg btn-block" type="submit">登入</button>
      <button class="goBack" @click.prevent="goBack">回上一頁</button>
      <p class="my-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMessage: '',
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      vm.$http.post(api, vm.user).then(response => {
        vm.isMessage = response.data.message
        if (response.data.success) {
          // 帳號登入成功時(true),將路由導致首頁
          vm.$router.push('admin/Products')
        }
      })
    },
    goBack () {
      const vm = this
      vm.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/helpers/breakpoint.scss";
.login {
  background: $color-bg;
  height: 100vh;
}
.goBack {
  background: transparent;
  color: gray;
  border: 0;
  margin-top: 15px;
  @include focusNone;
  &:hover {
    opacity: 0.7;
  }
}
h1 {
  color: $color-darkGray;
  font-family: impact;
}
button {
  background: $color-darkGray;
  color: $color-bg;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
