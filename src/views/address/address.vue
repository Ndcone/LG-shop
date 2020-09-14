<template>
  <div>
    <van-nav-bar
      title="我的收货地址"
      left-text
      left-arrow
      @click-left="onClickLeft"
      right-text="新增"
      @click-right="onClickRight"
    />
    <div class="address" v-for="(item,index) in list" :key="index">
      <div v-if="showselect">
        <van-checkbox v-model="checked[index].ischecked" @click="checkone(index)"></van-checkbox>
      </div>
      <div style="width:10%;height:100%"></div>
      <div class="address-text">
        <div>
          {{item.name}}
          <span>{{item.tel}}</span>
        </div>
        <div>{{item.address}}</div>
      </div>
      <div style="width:10%;">编辑</div>
    </div>

    <div class="select" v-if="showselect" @click="selectaddress">选择该地址</div>
  </div>
</template>

<script>
import { getaddress } from "@/request/api";
export default {
  data() {
    return {
      list: [],
      checked: [{ ischecked: false }],
      index: 0,
    };
  },

  mounted() {
    getaddress({ page: 0, pageSize: 1 }).then((res) => {
      this.list = res.data;
      for (var i = 0; i < this.list.length; i++) {
        this.checked.push({ ischecked: false });
      }
      this.checked[this.$store.state.addressindex].ischecked = true;
    });
  },
  computed: {
    showselect: function () {
      return this.$store.state.selectaddress;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/area");
    },
    checkone(index) {
      this.checked.map((el) => {
        el.ischecked = false;
      });
      this.checked[index].ischecked = true;
      this.index = index;
    },
    selectaddress() {
      this.$store.commit("changeindex", this.index);
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.address {
  display: flex;
  align-items: center;
  height: 150px;
  background-color: #eee;
  border-radius: 20px;
  margin: 10px;
  justify-content: space-between;
}
.address-text {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 100%;
}
.select {
  position: absolute;
  bottom: 0;
  width: 90%;
  margin: 30px;
  height: 90px;
  border-radius: 50px;
  color: #fff;
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
  line-height: 90px;
  text-align: center;
  font-size: 30px;
}
</style>