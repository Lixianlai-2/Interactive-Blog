<template>
  <div id="index">
    <section class="blog-posts">
      <router-link
        class="item"
        v-for="blog in blogs"
        :key="blog.id"
        :to="`/detail/${blog.id}`"
      >
        <figure class="avatar">
          <!-- 用后台传来的数据替换原来设置的固定内容 -->
          <img :src="blog.user.avatar" :alt="blog.user.username" border="0" />
          <figcaption>{{ blog.user.username }}</figcaption>
        </figure>
        <h3>
          {{ blog.title }} <span>{{ blog.createdAt }}</span>
        </h3>
        <p>
          {{ blog.description }}
        </p>
      </router-link>
    </section>

    <section class="pagination">
      <!-- 引入分页组件 -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalArticle"
        :page="currentPage"
        @current-change="onPageChange"
      >
      </el-pagination>
    </section>
  </div>
</template>

<script>
import blog from "../api/blog";

export default {
  name: "index",
  data() {
    return {
      // 用来存放从后台获取的首页博客数据
      blogs: [],
      // page代表当前的页数
      currentPage: 1,
      // total代表每页的文章数量
      totalArticle: 0
    };
  },
  created() {
    blog.getIndexBlogs().then(res => {
      this.blogs = res.data;
      this.totalArticle = res.total;
      this.currentPage = res.page;
    });
  },
  methods: {
    onPageChange(nowPage) {
      console.log(nowPage);
      blog
        // 得到当前所在页的数据
        .getIndexBlogs({ page: nowPage })
        .then(res => {
          this.blogs = res.data;
          this.totalArticle = res.total;
          this.currentPage = res.page;
          // 进入Index页面，查询参数变成当前所在页
          this.$router.push({ path: "/", query: { page: nowPage } });
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
    }
  }
};
</script>

<style lang="less" scoped>
#index {
  .item {
    display: grid;
    grid: auto auto / 80px 1fr;
    margin-top: 50px;
    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;
      justify-self: center;
      margin-left: 0;
      text-align: center;
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    figcaption {
      font-size: 12px;
    }
  }
  h3 {
    grid-column: 2;
    grid-row: 1;

    span {
      color: #b5b5b4;
      font-size: 12px;
      font-weight: normal;
    }
  }
}
</style>
