<template>
  <div>
    <van-nav-bar title="确认订单" left-text left-arrow @click-left="onClickLeft" />
    <div class="address" @click="selectaddress">
      <div style="width:15%">
        <img src="../../../assets/img/mylogo.png" style="width:100%" />
      </div>
      <div class="addressdetail">
        <div>
          {{list.name}}
          <span>{{list.tel}}</span>
        </div>
        <div>{{list.district}}</div>
        <div style=" color: rgb(233, 55, 10);">收货不便时，可选择暂存服务</div>
      </div>
      <div style="width:10%;">更换地址</div>
    </div>
    <div class="shopdatail" v-for="(item,index) in shoplist" :key="index">
      <div class="shopdatail-shopName">
        <img :src="item[1].shopLogo" />
        {{item[1].shopName}}
      </div>
      <div class="shopdatail-center">
        <img :src="item[0].goodsLogo" />
        <div class="shopdatail-center-center">
          <div>{{item[0].goodsName}}</div>
          <div style="color:rgb(216, 216, 128)">发货时间:</div>
        </div>
        <div>
          <div style="font-size:17px">￥{{item[0].goodsPrice}}</div>
          <div style="text-align:right;color:#999">x 1</div>
        </div>
      </div>
      <div class="shopdatail-bottom">
        <div>
          工艺宝贝
          <span>成交后卖家将捐献1.00元给公益宝</span>
        </div>
        <div>
          配送方式
          <span>成交后卖家将捐献1.00元给公益宝</span>
        </div>
        <div>
          运费险
          &nbsp;&nbsp;
          <span>成交后卖家将捐献1.00元给公益宝</span>
        </div>
        <div>
          订单备注
          <span>选填，请先跟商家协商一致</span>
        </div>
        <div class="shopdatail-bottom-price">
          <span>共 件</span>
          <strong>小计:</strong>
          <i>￥{{item[0].goodsPrice * 1}}</i>
        </div>
      </div>
    </div>
    <van-submit-bar :price="totalprice" button-text="确认订单" @submit="onSubmit"></van-submit-bar>
  </div>
</template>

<script>
import {
  payment,
  payfromcard,
  getorder,
  getaddress,
  createorder,
} from "../../../request/api";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      id: "",
      list: [],
      shoplist: [],
    };
  },
  computed: {
    totalprice: function () {
      let price = 0;
      this.shoplist.map((el) => {
        console.log(el);
        price += el[0].goodsPrice * 1 * 100;
      });
      return price;
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    getaddress({ page: 0, pageSize: 0 }).then((res) => {
      this.list = res.data[this.$store.state.addressindex];
      console.log(this.list);
    });
    getorder({ goodsid: this.id }).then((res) => {
      console.log(res);
      this.shoplist = res.data;
      if (this.shoplist.length > 0) {
        this.shoplist.map((el) => {
          // console.log(el);
        });
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    selectaddress() {
      this.$store.commit("showselect", true);
      this.$router.push("/address");
    },
    onSubmit() {
      createorder({
        price: this.totalprice / 100,
        consignee_addr:
          this.list.district + "," + " " + "," + " " + " " + " " + " ",
        goodsId: this.id,
        isFcart: false,
        num: 1,
      }).then((res) => {
        console.log(res);
        if (res.code == 201) {
          this.$router.push({
            path: "/payment",
            query: {
              order: res.data[0].orderNumber,
            },
          });
        }
      });
    },
  },
};
</script>

<style>
.address {
  height: 140px;
  display: flex;
  padding: 30px 15px;
  background-color: #eee;
  border-radius: 20px;
  margin: 0 15px;
  align-items: center;
}
.addressdetail {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
span {
  display: inline-block;
  font-size: 22px;
  color: rgb(165, 165, 165);
}
.shopdatail {
  background-color: #eee;
  margin: 40px 15px;
  border-radius: 20px;
}
.shopdatail-shopName {
  padding: 25px 15px;
  font-size: 30px;
  height: 60px;
}
.shopdatail-shopName img {
  height: 100%;
}
.shopdatail-center {
  display: flex;
  font-size: 26px;
}
.shopdatail-center img {
  width: 140px;
  height: 160px;
}
.shopdatail-center-center {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
  padding: 0 5px;
}
/* .shopdatail-bottom {
  margin: 15px 0;
} */
.shopdatail-bottom div {
  padding-left: 50px;
  margin: 30px 20px;
  padding-bottom: 5px;
}
.shopdatail-bottom-price {
  text-align: right;
}
i {
  font-style: normal;
  font-size: 25px;
  color: rgb(238, 81, 34);
}
strong {
  font-size: 28px;
  margin-left: 15px;
  margin-right: 10px;
}
</style>