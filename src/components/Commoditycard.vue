<template>
  <div>
    <div class="shopbox">
      <div
        v-for="(item,index) in goodslist"
        :key="index"
        class="shopsmallbox"
        @click="details(item.goodsId)"
      >
        <img :src="item.goodsLogo" />
        <div class="shoptitle">{{item.goodsName}}</div>
        <div class="shopbox-context">
          <van-tag color="#999a9c">已售{{item.hot}}</van-tag>
          <div>{{item.goodsFav}}</div>
        </div>
        <s>{{item.goodsOldPrice}}</s>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodslist: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.shopbox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.shopsmallbox {
  width: 48%;
  display: flex;
  flex-direction: column;
}
.shoptitle {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shopsmallbox img {
  width: 100%;
}
.shopbox-context {
  display: flex;
  justify-content: space-between;
}
s {
  color: gainsboro;
  text-decoration: line-through;
  font-size: 10px;
}
.shop-nav {
  height: 90px;
  line-height: 90px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}
.shop-nav div {
  height: 90px;
  line-height: 90px;
  width: 100px;
  box-sizing: border-box;
  text-align: center;
}
</style>