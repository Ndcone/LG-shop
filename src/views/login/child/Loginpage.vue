<template>
  <div class="Login">
    <div class="box">
      <header>
        <img src="http://localhost:8080/img/LE_logo_2.c513bd30.png" />
      </header>
      <section>
        <div class="sec-top">
          <div :class="{'active':login}" @click="log">登录</div>
          <div :class="{'active':register}" @click="reg">注册</div>
        </div>
        <div v-if="login" class="centerbox">
          <div class="login-box">
            <div>账号</div>
            <div>
              <input type="text" placeholder="请输入登录账号" v-model="account" />
            </div>
            <div>密码</div>
            <div>
              <input type="password" placeholder="请输入登录密码" v-model="passwor" />
            </div>
            <div>
              <van-checkbox v-model="checked" shape="square" icon-size="14px">记住密码</van-checkbox>
            </div>
            <div>
              <button @click="Loginother">登录</button>
            </div>
            <div class="bottom-i">
              <i>找回密码</i>&nbsp;&nbsp;&nbsp;
              <i>|</i>&nbsp;&nbsp;&nbsp;
              <i>还没有注册账户？</i>
              <i>立即注册</i>
            </div>
          </div>
        </div>
        <div v-if="register" class="centerbox">
          <div class="register-box">
            <div>手机号码</div>
            <div>
              <input
                type="text"
                :placeholder="phonecontext"
                @blur="phonecheck"
                v-model="telephone"
                :class="{'error':red}"
              />
            </div>
            <div>登录名</div>
            <div>
              <input
                type="text "
                :placeholder="nametitle"
                @blur="namecheck"
                v-model="name"
                :class="{'error':namered}"
              />
            </div>
            <div>密码</div>
            <div>
              <input
                type="password"
                placeholder="3-18位英文、数字、符号, 区分大小写"
                @blur="checkpassword"
                :class="{'error':pasred}"
                v-model="pasw"
              />
            </div>
            <div>短信验证码</div>
            <div class="message">
              <input type="text" placeholder="请输入验证码" v-model="verification" />
              <button @click="sendverification">发送验证码</button>
            </div>
            <div>
              <button @click="regist">注册</button>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div>
          <img src="https://www.upyun.com/static/img/%E6%A0%B7%E5%BC%8F%E5%9B%BE.7cf927c.png" />
        </div>
        <div>湘ICP备19027633号</div>
      </footer>
    </div>
  </div>
</template>

<script>
import {
  Checkphone,
  Checkname,
  sendmes,
  sendlogin,
  addlogin,
} from "../../../request/api";
import axios from "axios";
import qs from "qs";
import md5 from "js-md5";
import jwtDecode from "jwt-decode";
export default {
  data() {
    return {
      login: true,
      register: false,
      checked: false,
      telephone: "",
      red: false,
      phonecontext: "注册手机为找回密码的唯一凭证",
      name: "",
      nametitle: "中、英文均可, 不超过12个字符",
      namered: false,
      pasred: false,
      verification: "",
      joinregister: false,
      pasw: "",
      account: "",
      passwor: "",
    };
  },
  methods: {
    Loginother() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
      });
      let params = {
        LoginName: this.account,
        LoginPassword: this.passwor,
        isPassing: "yes",
      };
      params.LoginPassword = md5(params.LoginPassword);
      axios
        .post(
          `http://www.hj0819.top:44369/api/LoginPage/Login`,
          qs.stringify(params)
        )
        .then((res) => {
          if (res.data.code == 200) {
            var newstate = true;
            this.$store.commit("changestate", newstate);
          }
          this.$store.commit("changetoken", res.data.tnToken.tokenStr);
          this.$router.push("/");
        });
    },
    sendverification() {
      sendmes({ phone: this.telephone, codeType: 1 }).then((res) => {
        console.log(res);
        if (this.verification == res.msg) {
          this.joinregister = true;
        }
      });
    },
    regist() {
      // console.log(this.joinregister);
      if (this.joinregister) {
        let params = {
          LoginName: this.name,
          LoginPassword: this.pasw,
          phone: this.telephone,
        };
        params.LoginPassword = md5(params.LoginPassword);
        axios
          .post(
            `http://www.hj0819.top:44369/api/LoginPage/AddLogin`,
            qs.stringify(params)
          )
          .then((res) => {
            // console.log(res.data.code);
            if (res.data.code == 201) {
              this.$toast("你已注册成功");
            }
          });
      } else {
        this.$toast("请按照规则填写内容");
      }
    },
    phonecheck() {
      var right = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/.test(
        this.telephone
      );
      // console.log(this.telephone);
      if (!right) {
        this.red = true;
        this.phonecontext = "请输入正确的手机号";
      } else {
        this.red = false;
        this.phonecontext = "注册手机为找回密码的唯一凭证";
      }
      Checkphone({ phone: this.telephone }).then((res) => {
        if (res.code == 415) {
          this.red = true;
          this.phonecontext = "请输入正确的手机号";
          this.joinregister = false;
        } else if (res.code == 204) {
          this.red = true;
          this.phonecontext = "该手机号已注册";
          this.joinregister = false;
        } else {
          this.red = false;
          this.phonecontext = "注册手机为找回密码的唯一凭证";
          this.joinregister = true;
        }
      });
    },
    namecheck() {
      Checkname({ LoginName: this.name }).then((res) => {
        // this.nametitle = res.msg;
        if (res.code == 200) {
          this.namered = true;
          this.joinregister = false;
          //已经存在
        } else if (res.code == 404) {
          this.namered = false;
          this.joinregister = true;
          //可以使用
        } else {
          this.namered = true;
          this.joinregister = false;
          //415为空
        }
      });
    },
    checkpassword() {
      var i = /^[0-9A-Za-z\\W]{3,18}$/.test(this.pasw);
      if (!i) {
        this.pasred = true;
        this.joinregister = false;
      }
    },
    reg() {
      this.register = true;
      this.login = false;
    },
    log() {
      this.register = false;
      this.login = true;
    },
  },
};
</script>

<style scoped>
.Login {
  width: 100%;
}
.box {
  width: 96%;
  margin: 10px auto;
  border: 1px solid #eee;
  box-sizing: border-box;
}
header {
  width: 100%;
  border: 1px solid #eee;
}
header img {
  width: 100%;
}
.sec-top {
  display: flex;
}
.sec-top div {
  width: 50%;
  height: 60px;
  background-color: #f5f5f5;
  font-size: 16px;
  text-align: center;
  line-height: 60px;
}
.sec-top .active {
  color: purple;
  background-color: #fff;
}
.centerbox {
  width: 100%;
}
.login-box,
.register-box {
  width: 75%;
  margin: 0 auto;
}
.login-box div {
  margin-top: 0.8rem;
  width: 100%;
}
.register-box div {
  margin-top: 0.8rem;
  width: 100%;
}
.login-box input {
  width: 100%;
  height: 1rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  border: 1px solid #cccccc;
}
.register-box input {
  width: 100%;
  height: 1rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  border: 1px solid #cccccc;
}
button {
  background-color: #409eff;
  width: 110%;
  height: 1.1rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  border: 0;
  margin-bottom: 1rem;
  cursor: pointer;
  text-align: center;
  line-height: 1rem;
  color: #fff;
  font-size: 16px;
}
i {
  font-style: normal;
}
.bottom-i {
  text-align: center;
  margin: 10px;
}
footer {
  width: 100%;
}
footer div {
  margin: 0 auto;
  width: 60%;
  text-align: center;
}
footer div img {
  width: 100%;
}
.message {
  display: flex;
  justify-content: space-between;
}
.message input {
  width: 40%;
}
.message button {
  width: 40%;
}
.centerbox .error {
  border: 1px solid red;
}
</style>