<template>
  <div>
    <div class="home">
      <van-sticky :offset-top="0">
        <header>
          <div>
            <img src="../assets/img/home/LE_logo_2.png" />
          </div>
        </header>
        <div class="box-input">
          <van-icon name="search" />
          <input type="text" placeholder="请输入需要搜索的商品" @focus="search" />
        </div>
      </van-sticky>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        loading-text="正在刷新"
        finished-text="刷新完成"
      >
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in carousellist" :key="index">
            <img :src="item.slide_show_imgUrl" width="100%" />
          </van-swipe-item>
        </van-swipe>
        <div class="classifybox">
          <div v-for="(item,index) in classifylist" :key="index" class="classify">
            <img :src="item.sp_home_ico" />
            <div>{{item.sp_home_title}}</div>
          </div>
        </div>
        <van-sticky :offset-top="81">
          <div class="shop-nav">
            <div
              v-for="(item,index) in navlist"
              :key="index"
              @click="nav(item,index)"
              :class="{'active':item.active}"
            >{{item.name}}</div>
          </div>
        </van-sticky>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
        </van-list>
      </van-pull-refresh>
      <div style="height:60px"></div>
    </div>
  </div>
</template>

<script>
import { HomeClassify, Homeshop, Homenavshop } from "../request/api";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      carousellist: [],
      classifylist: [],
      goodslist: [],
      navlist: [
        { name: "流行", active: true },
        { name: "新款", active: false },
        { name: "精选", active: false },
      ],
      refreshing: false,
      loading: false,
      finished: false,
      sortType: "syn",
      shoplist: [],
    };
  },
  created() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    HomeClassify().then((res) => {
      this.classifylist = res.data[0];
      this.carousellist = res.data[1];
    });
    Homeshop({ sortType: "syn" }).then((res) => {
      // console.log(res);
      this.goodslist = res.data;
    });
  },
  mounted() {},
  methods: {
    search() {
      this.$router.push("/search");
    },
    nav(item, index) {
      // console.log(index);
      this.navlist.map((el) => {
        el.active = false;
      });
      switch (index) {
        case 0:
          this.sortType = "syn";
          this.botfood();
          item.active = true;
          break;
        case 1:
          this.sortType = "new";
          this.botfood();
          item.active = true;
          break;
        case 2:
          this.sortType = "sell";
          this.botfood();
          item.active = true;
          break;
        default:
          0;
          break;
      }
    },
    botfood() {
      Homeshop({ sortType: this.sortType }).then((res) => {
        console.log(res);
        this.goodslist = res.data;
      });
    },
    details(item) {
      this.$router.push({
        path: "/detail",
        query: {
          item: item,
        },
      });
    },
    onLoad() {
      this.goodslist = [...this.goodslist, ...this.goodslist];
      this.loading = false;
      if (this.goodslist.length >= 40) {
        this.finished = true;
      }
    },
    onRefresh() {
      // 清空列表数据
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
      // this.onLoad();
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style  scoped>
header {
  width: 100%;
  background-color: #fff;
}
header div {
  width: 60%;
  margin: 0 auto;
}
header img {
  width: 100%;
}
.box-input {
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  height: 86px;
  background-color: #fff;
}
.box-input input {
  border: 0;
  color: #606266;
  width: 80%;
  height: 80px;
  line-height: 60px;
  box-sizing: border-box;
}
.classify {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.classify img {
  width: 2.2rem;
}
.classifybox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
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
.active {
  color: #fe5777;
  border-bottom: 2px solid #fe5777;
}
</style>