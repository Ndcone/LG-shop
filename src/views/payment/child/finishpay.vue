<template>
  <div class="box">
    <van-nav-bar title="订单支付" left-text left-arrow @click-left="onClickLeft" />
    <div class="box-finish">
      <div class="finishimg">
        <img src="../../../assets/img/支付/完成.png" />
      </div>
      <div style="font-size:22px">支付完成</div>
      <div>订单支付完成</div>
    </div>
    <div class="btn" @click="getorderstate">查看订单</div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getorderstate(){
        this.$router.push('/getorderstate')
    }
  },
};
</script>

<style>
.box {
  width: 100%;
}
.box-finish {
  width: 80%;
  margin: 0 auto;
}
.box-finish div {
  width: 35%;
  margin: 0 auto;
  text-align: center;
  padding: 20px 0;
}
.finishimg img {
  width: 220px;
}
.btn {
  width: 80%;
  height: 90px;
  margin: 0 auto;
  background: #0d70ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  line-height: 90px;
  text-align: center;
  font-size: 32px;
}
</style>