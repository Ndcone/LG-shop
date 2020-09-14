<template>
  <div>
    <header>商品分类</header>
    <div class="box-input">
      <van-icon name="search" />
      <input type="text" placeholder="请输入需要搜索的商品" @focus="search" />
    </div>
    <van-row>
      <van-col span="7">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.cat_name"
            v-for="(item,index) in list"
            :key="index"
            @click="every(item.cat_id,item.cat_name)"
          />
        </van-sidebar>
      </van-col>
      <van-col span="17">
        <div class="shop-nav">
          <!-- <div v-for="(item,index) in navlist" :key="index" class="active">{{item}}</div> -->
          <div :class="{'active':all}" @click="synthesize">综合</div>
          <div :class="{'active':sales}" @click="saless">销量</div>
          <div :class="{'active':newgoods}" @click="newgood">新品</div>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="shopbox">
              <div v-for="(item,index) in newlist" :key="index" class="shopbox-box">
                <img :src="item.goodsLogo" />
                <div class="shopbox-title">{{item.goodsName}}</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-col>
    </van-row>
    <div style="height:100px"></div>
  </div>
</template>

<script>
import { Classify, Classifyshop, Searchshop } from "../../request/api";
export default {
  data() {
    return {
      activeKey: 0,
      list: [],
      all: true,
      sales: false,
      newgoods: false,
      newlist: [],
      page: 1,
      loading: false,
      finished: false,
      refreshing: false,
      id: 85,
      el: "帆布鞋",
      sortType: "syn",
    };
  },
  created() {
    Classify().then((res) => {
      this.list = res.data;
    });
    // Classifyshop({ cat_id: 85 }).then((res) => {
    //   this.newlist = res.data;
    // });
    Searchshop({
      page: 1,
      pageSize: 10,
      goodsname: this.el,
      sortType: this.sortType,
    }).then((res) => {
      // console.log(res);
      this.newlist = res.data;
    });
  },
  methods: {
    onRefresh() {
      Classifyshop({ cat_id: this.id, page: this.page++ }).then((res) => {
        this.newlist = [...this.newlist, ...res.data];
        this.refreshing = false;
      });
    },
    onLoad() {
      this.loading = true;
      if (this.newlist.length >= 40) {
        setTimeout(() => {
          this.finished = true;
          this.loading = false;
        }, 2000);
      }
      Classifyshop({ cat_id: this.id, page: this.page++ }).then((res) => {
        this.newlist = [...this.newlist, ...res.data];
      });
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    every(id, item) {
      this.newlist = [];
      this.el = item;
      this.id = id;
      Classifyshop({ cat_id: id, page: this.page }).then((res) => {
        // console.log(res.data);
        this.newlist = res.data;
      });
    },
    search() {
      this.$router.push("/search");
    },
    synthesize() {
      this.all = true;
      this.sales = false;
      this.newgoods = false;
      this.sortType = "syn";
      Searchshop({
        page: 1,
        pageSize: 10,
        goodsname: this.el,
        sortType: this.sortType,
      }).then((res) => {
        this.newlist = res.data;
      });
    },
    saless() {
      this.all = false;
      this.sales = true;
      this.newgoods = false;
      this.sortType = "sales";
      Searchshop({
        page: 1,
        pageSize: 10,
        goodsname: this.el,
        sortType: this.sortType,
      }).then((res) => {
        this.newlist = res.data;
      });
    },
    newgood() {
      this.all = false;
      this.sales = false;
      this.newgoods = true;
      this.sortType = "new";
      Searchshop({
        page: 1,
        pageSize: 10,
        goodsname: this.el,
        sortType: this.sortType,
      }).then((res) => {
        this.newlist = res.data;
      });
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 35px;
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
.shopbox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.shopbox-box {
  display: flex;
  width: 48%;
  flex-direction: column;
}
.shopbox-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>