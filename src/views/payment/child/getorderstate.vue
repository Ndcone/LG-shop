<template>
  <div>
    <van-nav-bar title="我的订单" left-text left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { getOrderByState } from "../../../request/api";
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted() {
    getOrderByState().then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>