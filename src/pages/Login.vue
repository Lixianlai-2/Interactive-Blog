<template>
  <div>
    <el-button type="text" @click="open">点击打开 Message Box</el-button>
  </div>
</template>

<script>
import request from "../helper/request";
import auth from "../api/auth";
import blog from "../api/blog";

window.request = request;
window.auth = auth;
window.blog = blog;

export default {
  methods: {
    open() {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          alert(value);

          this.$message({
            type: "success",
            message: "你的邮箱是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
span {
  color: red;
}
</style>
