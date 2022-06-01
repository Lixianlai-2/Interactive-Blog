<template>
  <div id="my">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" />
      <h3>{{ user.username }}</h3>
    </section>
    <section>
      <router-link
        class="item"
        v-for="blog in this.blogs"
        :key="blog.id"
        :to="`/detail/${blog.id}`"
      >
        <div class="date">
          <span class="day">{{ splitDate(blog.createdAt).date }}</span>
          <span class="month">{{ splitDate(blog.createdAt).month }}月</span>
          <span class="year">{{ splitDate(blog.createdAt).year }}</span>
        </div>
        <h3>{{ blog.title }}</h3>
        <p>
          {{ blog.description }}
        </p>
        <div class="actions">
          <router-link :to="`/edit/${blog.id}`">编辑</router-link>
          <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
        </div>
      </router-link>
    </section>
    <section class="pagination">
      <!-- 引入分页组件 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        @current-change="onPageChange"
      >
      </el-pagination>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import blog from "../api/blog.js";
import ElementUI from "element-ui";

export default {
  name: "my",
  data() {
    return {
      blogs: [], // 博客文章的信息
      page: 1, // 分页数
      total: 0 // 一共有多少文章
    };
  },

  computed: {
    ...mapGetters(["user"])
  },

  created() {
    this.page = parseInt(this.$route.query.page) || 1;
    // 得到当前user的相关信息
    blog.getBlogsByUserId(this.user.id, { page: this.page }).then(res => {
      this.page = res.page;
      this.total = res.total;
      this.blogs = res.data;
    });
  },
  methods: {
    splitDate(dateStr) {
      let dateObj = typeof dateStr === "object" ? dateStr : new Date(dateStr);
      return {
        date: dateObj.getDate(),
        mouth: dateObj.getMonth() + 1,
        year: dateObj.getYear()
      };
    },
    onPageChange(nowPage) {
      blog
        // 得到当前所在页的数据
        .getBlogsByUserId(this.user.id, { page: nowPage })
        .then(res => {
          this.blogs = res.data;
          this.total = res.total;
          this.page = res.page;
          // 进入Index页面，查询参数变成当前所在页
          this.$router.push({
            path: "/my",
            query: { page: nowPage }
          });
        })
        .then(() => {
          // 当点击新的分页后，自动滚动到顶部
          const scrollToTop = () => {
            let sTop =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (sTop > 0) {
              window.requestAnimationFrame(scrollToTop);
              window.scrollTo(0, sTop - sTop / 8);
            }
          };
          scrollToTop();
        });
    },
    async onDelete(blogId) {
      await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });

      await blog.deleteBlog({ blogId }); // 删除对应blog

      this.$message({
        type: "success",
        message: "删除成功!"
      });
      // 删除点击的这篇博客，DOM更新
      this.blogs = this.blogs.filter(blog => blog.id !== blogId);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/base.less";

.user-info {
  display: grid;
  grid: auto auto/ 80px 1fr;
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ebebeb;

  h3 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-top: 10px;
  }

  img {
    grid-column: 1/2;
    grid-row: 1 / span 2;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}

.item {
  display: grid;
  // grid: auto auto auto / 80px 1fr;
  margin: 20px 0;
  grid-template-rows: auto auto auto;
  grid-template-columns: 80px 1fr;
  .date {
    grid-column: 1/2;
    grid-row: 1 / span 3;
    justify-self: center;
    text-align: center;
  }
  span {
    display: block;
  }

  .day {
    font-size: 40px;
  }

  h3 {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  p {
    grid-column: 2/3;
    grid-row: 2/3;
    margin-top: 7px;
  }

  .actions {
    grid-column: 2;
    grid-row: 3;
    font-size: 12px;
  }
}
</style>
