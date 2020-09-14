<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text
      right-text="退出"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell title="昵称" :value="userdata.login_name" size="large" />
    <van-cell title="姓名" :value="userdata.customer_name" size="large" />
    <van-cell title="性别" value="男" size="large" />
    <van-cell title="邮箱" :value="userdata.customer_email" size="large" />
    <van-cell title="手机号码" :value="userdata.mobile_phone" size="large" />
    <van-cell title="证件号" :value="userdata.identity_card_no" size="large" />
    <van-cell title="出生日期" :value="userdata.birthday" size="large" />
  </div>
</template>

<script>
import { getUserData } from "../../../request/api";
import axios from "axios";
export default {
  data() {
    return {
      userdata: [],
      newstate: false,
      token: "",
    };
  },
  created() {
    // getUserData({ token: this.$store.state.token }).then((res) => {
    //   console.log(res);
    //   res.data = this.userdata;
    // });
    axios.interceptors.request.use(
      function (config) {
        config.headers.token = JSON.parse(localStorage.getItem("vuex")).token;
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    axios
      .get(`http://www.hj0819.top:44369/api/UserInfo/getUserData`)
      .then((res) => {
        console.log(res.data.data);
        this.userdata = res.data.data;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$dialog
        .confirm({
          title: "确定要退出吗",
        })
        .then(() => {
          this.$toast({
            message: "正在退出",
            forbidClick: true,
            duration: 1000,
          });
          this.$store.commit("changestate", this.newstate);
          this.$store.commit("changetoken", this.token);
          setTimeout(() => {
            this.$router.push("/loginpage");
          }, 1000);
        })
        .catch(() => {
          this.$notify({
            message: "已经取消",
            color: "#000",
            background: "#EDF2FC",
          });
          // on cancel
        });
    },
  },
};
</script>

<style>
</style>