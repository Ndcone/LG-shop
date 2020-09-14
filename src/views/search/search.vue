<template>
  <div>
    <header>
      <van-nav-bar title="商品搜索" left-arrow @click-left="onClickLeft" />
    </header>
    <div class="bigbox">
      <div class="smallbox">
        <div class="box">
          <div>商品名</div>
          <div class="box-context">
            <div>
              <van-icon name="search" />
            </div>
            <div>
              <input
                type="text"
                style=" text-align:center"
                placeholder="请输入商品关键字"
                ref="input"
                @focus="search"
                v-model="keytext"
              />
            </div>
          </div>
        </div>
        <div @click="searchfood">搜索</div>
      </div>
    </div>
    <div class="one" v-if="show">
      <div class="one-context">
        <div class="hottitle">全网热搜</div>
        <div>
          <span
            class="searchtop"
            v-for="(item,index) in hotsearchlist"
            :key="index"
            @click="clicksearch(item)"
          >{{item}}</span>
        </div>
        <div v-if="showhis">
          <div class="searchhistory">
            <div class="div"></div>
            <div>搜索历史</div>
            <div class="div"></div>
          </div>
          <div>
            <div class="searhistory" v-for="(item,index) in keylist" :key="index">
              <div>{{item}}</div>
              <div @click="delone(index)">X</div>
            </div>
          </div>
          <div class="delhis" @click="delall">清空历史记录</div>
        </div>
      </div>
    </div>
    <div class="shop-nav" v-if="!show">
      <div
        v-for="(item,index) in navlist"
        :key="index"
        @click="nav(item,index)"
        :class="{'active':activeindex==index}"
      >{{item}}</div>
    </div>
    <div>
      <div class="shopbox" v-if="!show">
        <div v-for="(item,index) in shoplist" :key="index" class="shopsmallbox">
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
  </div>
</template>

<script>
import { Searchshop, hotsearch } from "../../request/api";
import { debounce } from "../../function/function";
export default {
  data() {
    return {
      hotsearchlist: [],
      navlist: ["综合", "销量", "新品", "价格"],
      shoplist: [],
      show: true,
      showhis: false,
      keytext: "",
      keylist: [],
      activeindex: 0,
      sortType: "syn",
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log(from);
    next();
  },
  created() {
    if (localStorage.keylist) {
      this.keylist = JSON.parse(localStorage.keylist);
    }
    hotsearch().then((res) => {
      console.log(res);
      this.hotsearchlist = res.data;
    });
  },
  methods: {
    nav(item, index) {
      this.activeindex = index;
      switch (index) {
        case 0:
          // 综合
          this.sortType = "syn";
          break;
        case 1:
          // 销量
          this.sortType = "sales";
          break;
        case 2:
          // 价格
          this.sortType = "new";
          break;
        case 3:
          this.sortType = "price";
          //将价格显示器显示出来
          this.isPrice = true;
          break;
      }
      Searchshop({
        goodsName: this.keytext,
        page: 1,
        pagesize: 30,
        sortType: this.sortType,
      }).then((res) => {
        this.shoplist = res.data;
      });
    },
    onClickLeft() {
      if (!this.show) {
        this.show = true;
      } else {
        this.$router.go(-1);
      }
    },
    search() {
      this.showhis = !this.showhis;
    },
    clicksearch(item) {
      this.keytext = item;
      this.searchfood();
    },
    searchfood: debounce(function () {
      let join = true;
      this.keylist.map((el) => {
        if (this.keytext == el) {
          join = false;
        }
      });
      if (join) {
        this.keylist.push(this.keytext);
      }
      this.show = !this.show;
      localStorage.keylist = JSON.stringify(this.keylist);
      Searchshop({ goodsName: this.keytext }).then((res) => {
        // console.log(this.$refs.input.value);
        this.shoplist = res.data;
      });
    }, 2000),
    delone(index) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "确定要删除这一项嘛",
        })
        .then(() => {
          this.keylist.splice(index, 1);
          localStorage.keylist = JSON.stringify(this.keylist);
        })
        .catch(() => {
          this.$notify({
            message: "取消删除",
            color: "#000",
            background: "#EDF2FC",
          });
        });
    },
    delall() {
      this.$dialog
        .confirm({
          title: "删除",
          message: "确定要清空历史记录嘛",
        })
        .then(() => {
          this.keylist = [];
          localStorage.keylist = JSON.stringify(this.keylist);
        })
        .catch(() => {
          this.$notify({
            message: "取消删除",
            color: "#000",
            background: "#EDF2FC",
          });
        });
    },
  },
};
</script>

<style scoped>
span {
  display: inline-block;
}

.bigbox {
  display: flex;
  width: 100%;
}
.smallbox {
  width: 8rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  line-height: 80px;
}
.box {
  display: flex;
  background-color: #f7f8fa;
  height: 80px;
  line-height: 80px;
  justify-items: center;
  font-size: 30px;
}
.box-context {
  display: flex;
}
.box input {
  background-color: #f7f8fa;
  border: 0;
}
.searchtop {
  color: #969799;
  border: 1px solid #cccccd;
  padding: 0 5px;
  font-size: 30px;
  margin: 10px 15px;
  border-radius: 0.2em;
}
.searchhistory {
  display: flex;
  justify-items: center;
  align-items: center;
  margin: 30px;
  width: 100%;
}
.searchhistory .div {
  width: 35%;
  background-color: #1989fa;
  height: 1px;
  margin: 0 15px;
}
.one {
  width: 100%;
}
.one-context {
  width: 80%;
  margin: 0 auto;
}
.hottitle {
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 32px;
}
.searhistory {
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  color: #323233;
}
.delhis {
  width: 400px;
  margin: 0 auto;
  border-radius: inherit;
  height: 80px;
  border: 1px solid #1989fa;
  color: #1989fa;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
}
.shopbox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
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