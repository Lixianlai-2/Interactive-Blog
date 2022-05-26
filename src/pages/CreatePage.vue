<template>
  <div class="createPage">
    <h2>创建文章</h2>
    <h3>文章标题</h3>
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="title"
      maxlength="30"
      show-word-limit
    >
    </el-input>

    <h3>内容简介</h3>
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="description"
      maxlength="30"
      show-word-limit
    >
    </el-input>

    <h3>文章内容</h3>
    <el-input
      type="textarea"
      :autosize="{ minRows: 15, maxRows: 50 }"
      placeholder="请输入内容"
      v-model="content"
      maxlength="10000"
      show-word-limit
    >
    </el-input>

    <p>
      <label>
        是否展示到首页
        <!-- 开关的值为true或false -->
        <el-switch
          v-model="atIndex"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch
      ></label>
    </p>

    <div class="btnContainer">
      <!-- 当用户点击确定时，提交用户输入的数据到后台 -->
      <el-button @click="onCreate">创建完成</el-button>
    </div>
  </div>
</template>

<script>
import blog from "../api/blog";

export default {
  name: "createPage",
  data() {
    return {
      title: "",
      description: "",
      content: "",
      atIndex: ""
    };
  },
  methods: {
    onCreate() {
      blog
        .createBlog({
          title: this.title,
          content: this.content,
          description: this.description,
          atIndex: this.atIndex
        })
        .then(res => {
          console.log(res);
          this.$router.push(`/detail/${res.data.id}`);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.createPage {
  margin-top: 40px;
}

span {
  color: blue;
}

h3 {
  margin-top: 40px;
}

p {
  margin-top: 10px;
}

// 让创建按钮居中
.btnContainer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
