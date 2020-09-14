<template>
  <div>
    <van-nav-bar title="订单支付" left-text left-arrow @click-left="onClickLeft" />
    <div class="price">money</div>
    <div class="paymentmethods" v-for="(item,index) in list" :key="index">
      <div class="paymentmethods-one">
        <img :src="item.img" />
        <div>{{item.name}}</div>
      </div>
      <div>
        <van-checkbox
          v-model="item.checked"
          checked-color="#07c160"
          @click="checkedone(item,index)"
        ></van-checkbox>
      </div>
    </div>
    <van-password-input
      v-if="showKeyboard"
      :value="value"
      info="密码为 6 位数字"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
    <div class="confirm" @click="makeorder">确认支付</div>
  </div>
</template>

<script>
import { verifypassword, payOrder, antpay } from "../../request/api";
import qs from "qs";
export default {
  data() {
    return {
      list: [
        {
          name: "支付宝支付",
          checked: true,
          img: require("../../assets/img/支付/支付宝.png"),
        },
        {
          name: "微信支付",
          checked: false,
          img: require("../../assets/img/支付/微信.png"),
        },
        {
          name: "余额支付",
          checked: false,
          img: require("../../assets/img/支付/余额.png"),
        },
      ],
      value: "",
      showKeyboard: false,
      ordernumber: "",
      html: "",
    };
  },
  watch: {
    value(newval) {
      if (newval.length == 6) {
        console.log(1);
        console.log(this.value);
        verifypassword({ paypwd: this.$md5(this.value) }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            payOrder({ orderNum: this.ordernumber }).then((res) => {
              console.log(res);
              this.$toast(res.msg);
              if (res.code == 201) {
                this.$router.push("/finishpay");
              }
            });
          }
        });
      }
    },
  },
  created() {
    this.ordernumber = this.$route.query.order;
    console.log(this.$route.query.order);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    checkedone(item, index) {
      if (item.checked) {
        this.list.map((el) => {
          el.checked = false;
        });
        item.checked = true;
      }
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    zhifubao() {
      antpay({
        OutTradeNo: this.ordernumber,
        Subject: "支付测试",
        ProductCode: "QUICK_WAP_WAY",
        TotalAmount: 150,
      }).then((res) => {
        console.log(res);
        if (res.code == 201) {
          this.html = res.data;
          var form = res.data;
          const div = document.createElement("div");
          div.innerHTML = form;
          document.body.appendChild(div);
          document.forms[0].submit();
        }
      });
    },
    makeorder() {
      this.list.map((el, index) => {
        if (el.checked) {
          switch (index) {
            case 0:
              this.zhifubao();
              break;
            case 1:
              this.$toast("微信支付暂未开放");
              break;
            case 2:
              this.showKeyboard = true;
              break;

            default:
              break;
          }
        }
      });
    },
  },
};
</script>

<style>
.price {
  text-align: center;
  font-size: 34px;
}
.paymentmethods {
  display: flex;
  height: 100px;
  border-bottom: 1px solid #eee;
  padding: 20px 10px;
  align-items: center;
  justify-content: space-between;
  font-size: 28px;
}
.paymentmethods-one {
  display: flex;
  align-items: center;
}
.paymentmethods-one img {
  height: 85px;
}
.confirm {
  width: 100%;
  line-height: 110px;
  text-align: center;
  background: #009fe9;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 30px;
}
</style>