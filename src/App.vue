<template>
  <div id="app">
    <van-tabbar v-model="active" v-if="this.$route.meta.isShowTab" active-color="#fe5777" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="/classify">商城</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shopcard">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/login">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="scss">
</style>
