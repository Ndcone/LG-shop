<template>
  <div>
    <div v-show="loginstate">
      <van-nav-bar
        title="购物车"
        left-text
        right-text="删除"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <van-row v-for="(item,index) in list" :key="index">
        <van-col span="4">
          <div>
            <van-checkbox v-model="item.ischecked" @click="checkevery(item,index)"></van-checkbox>
          </div>
        </van-col>
        <van-col span="20">
          <van-swipe-cell>
            <van-card
              :num="item.product_amount"
              :price="item.price+'.00'"
              desc="描述信息"
              :title="item.title"
              class="goods-card"
              :thumb="item.image"
            >
              <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
              </template>
              <template #footer>
                <van-stepper v-model="item.product_amount" />
              </template>
            </van-card>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteone(item.cart_id)"
              />
            </template>
          </van-swipe-cell>
        </van-col>
      </van-row>
    </div>
    <van-submit-bar :price="totalprice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkall">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { getCart, payfromcard, delecart, addCart } from "../../request/api";
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      newdata: false,
      value: 1,
      list: [],
      newprice: 0,
      cartlength: 0,
      id: "",
      leng: 0,
      checked: false,
      idlist: [],
      newidlist: {},
    };
  },
  created() {
    getCart().then((res) => {
      this.list = res.data;
      this.list.pop();
      if (this.list.length > 0) {
        this.list.map((el) => {
          el.ischecked = false;
        });
      }
    });
  },
  mounted() {
    if (!this.loginstate) {
      this.$toast.loading({
        message: "未登录正在为你跳转到登录页面",
        forbidClick: true,
        duration: 1000,
      });
      setTimeout(() => {
        this.$router.push("/loginpage");
      }, 1000);
    }
    // this.list = this.$store.state.shopcard;
    this.list.map((el) => {
      el.ischecked = false;
    });
  },
  computed: {
    loginstate: function () {
      return this.$store.state.loginstate;
    },
    totalprice: function () {
      let price = 0;
      this.list.map((el) => {
        if (el.ischecked) {
          price += el.price * el.product_amount * 100;
        }
      });
      return price;
    },
  },
  methods: {
    onSubmit() {
      this.list.map((el) => {
        console.log(el);
        if (el.ischecked) {
          this.idlist.push(el.cart_id);
        }
      });
      let fh = " ";
      console.log(this.newidlist);
      this.newidlist = this.idlist
        .map(function (obj, index) {
          if (obj != null) {
            return obj;
          } else {
            fh = "";
          }
        })
        .join(fh);
      console.log(this.newidlist);
      this.$router.push({
        path: "/submitcard",
        query: {
          id: this.newidlist,
        },
      });
    },
    onClickEditAddress() {},
    checkall() {
      if (this.checked) {
        this.list.map((el) => {
          el.ischecked = true;
        });
      } else {
        this.list.map((el) => {
          el.ischecked = false;
        });
      }
    },
    checkevery(item) {
      this.checked = this.list.every((el) => {
        return el.ischecked === true;
      });
    },
    btn() {
      this.$store.commit("iflogin", this.newdata);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      delecart().then((res) => {
        console.log(res);
      });
    },
    deleteone(id, index) {
      this.list.splice(index, 1);
      delecart({ carid: id }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
.van-swipe-cell__right button {
  height: 100%;
}
.van-row .van-col--4 {
  text-align: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-row {
  background-color: #fafafa;
}
</style>