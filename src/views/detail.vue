<template>
  <div>
    <van-sticky>
      <div class="top" id="boxFixed" :class="{'is_fixed' : isFixed}">
        <van-row>
          <van-col span="4">
            <div style="padding:0 10px" @click="back">
              <img src="../assets/img/common/back.png" style="width:50%" />
            </div>
          </van-col>
          <van-col
            span="5"
            @click="changenav(item,index)"
            :class="{'active':activeindex==index}"
            v-for="(item,index) in list"
            :key="index"
          >{{item.name}}</van-col>
        </van-row>
      </div>
    </van-sticky>

    <div v-for="(item,index) in shopdetail" :key="index">
      <div class="swiper" id="commodity">
        <img :src="item.goodsLogo" style="width:100%;height:300px" />
      </div>
      <div class="main-title">{{item.goodsName}}</div>
      <div class="main-price">
        ￥{{item.goodsPrice}}
        <s>{{item.goodsOldPrice}}</s>
      </div>
      <div class="main-three">
        <div>销量{{item.goodsBuyNum}}</div>
        <div>收藏{{item.goodsFav}}</div>
        <div>{{item.goodsAre}}</div>
      </div>
      <div class="main-four">
        <div
          v-for="(inneritem,innerindex) in shopdetailthree"
          :key="innerindex"
          class="main-four-every"
        >
          <img :src="inneritem.icon" />
          <div>{{inneritem.name}}</div>
        </div>
      </div>
      <div id="comment"></div>
      <div v-html="item.goodsIntroduce" class="detailcontext" id="details">{{item.goodsIntroduce}}</div>
      <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :quota="quota"
        :quota-used="quotaUsed"
        :hide-stock="sku.hide_stock"
        :message-config="messageConfig"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
      >
        <template #sku-header-price>{{item.goodsPrice}}</template>
      </van-sku>
      <div id="recommend"></div>
    </div>

    <div class="bottom">
      <div class="bottom-left">
        <div class="bottom-left-service bottom-left-div">客服</div>
        <div class="bottom-left-shopcard bottom-left-div" @click="entershop">购物车</div>
        <div class="bottom-left-collect bottom-left-div">收藏</div>
      </div>
      <div class="bottom-right">
        <div style="color:#000;background-color: #ffe817;" @click="joinshopcard">加入购物车</div>
        <div style="color:#fff;background-color: #eb4868;" @click="purchase">购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Homenavshop, addCart } from "../request/api";
import axios from "axios";
export default {
  data() {
    return {
      goodsId: this.$route.query.item,
      quota: 0,
      quotaUsed: 0,
      show: false,
      sku: {
        tree: [
          {
            k: "颜色",
            k_s: "s1",
            v: [
              {
                id: "1",
                name: "红色",
                imgUrl: "https://img.yzcdn.cn/1.jpg",
                previewImgUrl: "https://img.yzcdn.cn/1p.jpg",
              },
              {
                id: "1",
                name: "蓝色",
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg",
              },
            ],
            largeImageMode: true,
          },
        ],
        list: [
          {
            id: 2259,
            s1: "1",
            s2: "1",
            price: 100,
            stock_num: 110,
          },
        ],
        price: "1.00",
        stock_num: 227,
        collection_id: 2261,
        none_sku: false,
        messages: [
          {
            datetime: "0",
            multiple: "0",
            name: "留言",
            type: "text",
            required: "1",
            placeholder: "",
          },
        ],
        hide_stock: false,
      },
      goods: {},
      messageConfig: {},
      isFixed: false,
      one: true,
      two: false,
      three: false,
      four: false,
      list: [
        {
          name: "商品",
          placeid: "commodity",
        },
        {
          name: "评论",
          placeid: "comment",
        },
        {
          name: "详情",
          placeid: "details",
        },
        {
          name: "推荐",
          placeid: "recommend",
        },
      ],
      activeindex: 0,
      new: "",
      shopdetail: [],
      shopdetailtwo: [],
      shopdetailthree: [],
      shopid: "",
      goodsPrice: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changenav(item, index) {
      this.activeindex = index;
      document.getElementById(item.placeid).scrollIntoView({
        behavior: "smooth",
      });
    },
    entershop() {
      this.$router.push("/shopcard");
    },
    joinshopcard() {
      // this.show = true;
      // this.sku.price = this.shopdetail[0].goodsPrice;
      addCart({
        product_id: this.shopid,
        product_amount: 1,
        price: this.goodsPrice,
      }).then((res) => {
        console.log(res);
      });
    },
    onBuyClicked() {},
    onAddCartClicked() {},
    purchase(){
      console.log(this.shopdetail[0]);
       this.$router.push({
        path: "/submitcard",
        query: {
          id: this.shopdetail[0].goodsId,
        },
      });
    }
  },
  created() {
    Homenavshop({ goodsId: this.$route.query.item }).then((res) => {
      console.log(res);
      this.shopdetail.push(res.data[0]);
      this.shopdetailtwo.push(res.data[1]);
      this.shopdetailthree = res.data[2];
      this.shopid = this.shopdetail[0].goodsId;
      this.goodsPrice = this.shopdetail[0].goodsPrice;
    });
  },
};
</script>

<style scoped>
.active {
  color: #ff5c7b;
}
#boxFixed {
  background-color: #fff;
}
.top {
  height: 1rem;
  font-size: 0.4rem;
}
.van-col--5 {
  line-height: 1rem;
}
.van-col--4 {
  line-height: 1.4rem;
}
.main-price {
  font-size: 0.6rem;
  color: #ff5c7b;
}
.main-price s {
  font-size: 20px;
  color: rgb(224, 221, 221);
}
.main-three {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  color: #999;
  font-size: 20px;
  padding: 20px 0;
}
.main-four {
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
}
.main-title {
  font-size: 25px;
}
.bottom {
  display: flex;
  background-color: #fff;
  height: 90px;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 25px;
}
.bottom-left {
  display: flex;
  justify-content: space-between;
  width: 55%;
}
.bottom-right {
  display: flex;
  width: 45%;
}
.bottom-left div {
  width: 33%;
  text-align: center;
}
.bottom-right div {
  height: 100%;
  width: 50%;
  text-align: center;
  line-height: 90px;
}
.bottom-left-service {
  background-position: 30px -2.2rem;
}
.bottom-left-shopcard {
  background-position: 30px -4.2rem;
}
.bottom-left-collect {
  background-position: 30px 2px;
}
.bottom-left-div {
  background-image: url("../assets/img/detail/detail_bottom.png");
  background-size: 69px;
  background-repeat: no-repeat;
  text-align: center;
  line-height: 150px;
}

.detailcontext {
  width: 100%;
  overflow: hidden;
}
.detailcontext >>> img {
  width: 100% !important;
  height: 100% !important;
  background-size: 100% 100%;
}
.main-four-every {
  display: flex;
  align-items: center;
}
.main-four-every img {
  width: 25px;
}
</style>
