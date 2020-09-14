<template>
  <div v-show="loginstate">
    <div class="home">
      <div class="top">
        <div style="height:30px"></div>
        <div class="top-context">
          <div class="top-context-msg" @click="datapage">
            <van-uploader v-model="fileList" />
            <div class="top-context-msg-inner">
              <div>admin</div>
              <div>性别</div>
              <div>号码</div>
            </div>
          </div>
          <div class="sign" @click="signin">签到领积分</div>
        </div>
        <div class="top-bottom">
          <div>每天领红包，年卡仅0.12元/天</div>
          <div class="top-bottom-left">正在开通</div>
        </div>
      </div>
      <div>
        <div class="sectio">
          <div class="public one">
            <div>账号余额</div>
            <div>积分</div>
          </div>
          <div class="public two">
            <div class="two-one">
              <div style="font-size:25px;font-weight:700">我的订单</div>
              <div style="color: #999;">查看全部订单</div>
            </div>
            <div class="two-two">
              <div>
                <img src="../../assets/img/myself/下载 (1).png" />
                <div>全部</div>
              </div>
              <div>
                <img src="../../assets/img/myself/下载.png" />

                <div>待支付</div>
              </div>
              <div>
                <img src="../../assets/img/myself/下载 (2).png" />

                <div>待收货</div>
              </div>
              <div>
                <img src="../../assets/img/myself/下载 (3).png" />
                <div>待评价</div>
              </div>
            </div>
          </div>
          <div class="public three">
            <div>
              <img src="../../assets/img/myself/banner.png" />
            </div>
          </div>
          <div class="public two">
            <div class="two-one">
              <div style="font-size:25px;font-weight:700">常用功能</div>
            </div>
            <div class="two-two">
              <div @click="area">
                <img src="../../assets/img/myself/下载 (1).png" />
                <div>收货地址</div>
              </div>
              <div>
                <img src="../../assets/img/myself/下载.png" />
                <div>我的收藏</div>
              </div>
              <div>
                <img src="../../assets/img/myself/下载 (2).png" />
                <div>浏览记录</div>
              </div>
              <div>
                <img src="../../assets/img/myself/下载 (3).png" />
                <div>设置</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
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
  },
  computed: {
    loginstate: function () {
      return this.$store.state.loginstate;
    },
  },
  methods: {
    datapage() {
      this.$router.push("/datapage");
    },
    signin() {},
    area() {
      this.$store.commit("showselect", false);
      this.$router.push("/address");
    },
  },
};
</script>

<style scoped>
.home {
  background-color: #eee;
  height: 1500px;
  width: 100%;
}
.top {
  background-image: url("../../assets/img/下载.png");
  width: 100%;
  height: 320px;
  position: relative;
}
.top-context {
  display: flex;
  height: 100px;
  justify-content: space-between;
  padding: 0 25px;
  align-items: center;
}
.top-context-msg {
  display: flex;
}
.top-context-msg-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
}
.sign {
  background: #ff6565;
  height: 70px;
  width: 140px;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  line-height: 70px;
  border: none;
  border-radius: 22px;
}
.top-bottom {
  position: absolute;
  left: 50%;
  margin-left: -46%;
  bottom: 0;
  width: 86%;
  height: 50px;
  background-color: #3b4a67;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#506183),
    to(#2d384c)
  );
  background: linear-gradient(to right, #506183, #2d384c);
  border-radius: 8px 8px 0 0;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.top-bottom-left {
  /* width: 50px; */
  background-color: #3b4a67;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#40e865),
    to(#1ebb4e)
  );
  height: 80%;
  background: linear-gradient(to right, #40e865, #1ebb4e);
  border: none;
  font-size: 0.3rem;
  color: #2d3947;
  border-radius: 30px;
  padding: 0 10px;
}
.sectio {
  width: 95%;
  margin: 0 auto;
}
.public {
  border-radius: 10px;
  margin: 20px;
  background: #fff;
}
.one {
  display: flex;
  justify-content: space-around;
  height: 80px;
  align-items: center;
}
.two {
  display: flex;
  flex-direction: column;

  justify-content: space-between;
}
.two-one {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
}
.two-two {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.two-two img {
  width: 100%;
  height: 80%;
}
.two-two div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.three {
  display: flex;
  align-items: center;
  justify-items: center;
  height: 180px;
}
.three div {
  width: 94%;
  margin: 0 auto;
}
.three img {
  width: 100%;
}
</style>