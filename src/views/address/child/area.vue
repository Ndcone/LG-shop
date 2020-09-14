<template>
  <div>
    <van-nav-bar title="新增收货地址" left-text left-arrow @click-left="onClickLeft" />
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="收件人" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="name">
        <el-input v-model="ruleForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="name">
        <el-input v-model="ruleForm.province"></el-input>
      </el-form-item>
      <el-form-item label="地级市" prop="name">
        <el-input v-model="ruleForm.prefecturelevel"></el-input>
      </el-form-item>
      <el-form-item label="市，县级市" prop="name">
        <el-input v-model="ruleForm.county"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addadress } from "@/request/api";
// import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        telephone: "",
        province: "",
        prefecturelevel: "",
        county: "",
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submitForm() {
        console.log(this.ruleForm)
      addadress({
        Name: this.ruleForm.name,
        Phone: this.ruleForm.telephone,
        Province: this.ruleForm.province,
        City: this.ruleForm.prefecturelevel,
        District: this.ruleForm.county,
        Address: this.ruleForm.county,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>