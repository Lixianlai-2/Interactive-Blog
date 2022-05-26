<template>
  <!-- 根据是登出还是登入，展示不同的页面 -->
  <header :class="{ login: isLogin, logout: !isLogin }">
    <!-- 没有登录 -->
    <template v-if="!isLogin">
      <h1>先来写博客</h1>

      <p>记录学习的点点滴滴，分享总结的经验和踩过的坑</p>
      <div class="buttons">
        <router-link to="/login"> <el-button>立即登录</el-button></router-link>
        <router-link to="/register"
          ><el-button>注册账号</el-button></router-link
        >
      </div>
    </template>
    <!-- 登录后header展示的页面 -->
    <template v-if="isLogin">
      <h1>开始写博客吧！</h1>
      <!-- 导向createPage的图标 -->
      <router-link to="/createPage"> <i class="el-icon-edit"></i></router-link>
      <div class="user">
        <img
          class="avatar"
          :src="user.avatar"
          :alt="user.username"
          :title="user.username"
        />
        <ul>
          <li><router-link to="/my">我的</router-link></li>
          <li><a href="#" @click="onLogout">注销</a></li>
        </ul>
      </div>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import auth from "../api/auth.js";
window.auth = auth;

export default {
  data() {
    return {
      // isLogin: false
    };
  },
  computed: {
    // 这里能够得到getters，是因为main.js中引入了store中的index.js文件
    ...mapGetters(["isLogin", "user"])
  },
  methods: {
    ...mapActions(["checkLogin", "logout"]),
    onLogout() {
      this.logout();
      console.log("logout works!");
    }
  },
  created() {
    // 来自methods
    this.checkLogin();
  }
};
</script>

<style lang="less" scoped>
router-link {
  display: flex;
}
header.login {
  display: flex;
  align-items: center;
  background: #3f463c;

  .el-icon-edit {
    color: #eaeaea93;
    font-size: 25px;
    margin-right: 20px;
  }

  .el-icon-edit:hover {
    color: #eaeaea;
  }

  h1 {
    margin: 0;
    padding: 25px;
    font-size: 30px;
    text-transform: uppercase;
    flex: 1;
    color: rgba(255, 255, 255, 0.747);

    a {
      color: #fff;
    }
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }

  .user {
    position: relative;

    ul {
      display: none;
      position: absolute;
      right: 0;
      list-style: none;
      border: 1px solid #eaeaea;
      margin: 0;
      padding: 0;
      background-color: #fff;

      a {
        text-decoration: none;
        color: #333;
        font-size: 12px;
        display: block;
        padding: 5px 10px;

        &:hover {
          background-color: #eaeaea;
        }
      }
    }

    &:hover ul {
      display: block;
    }
  }
}

// -----------------------------------
// 未登录时的header
header.logout {
  padding: 0 12% 30px 12%;
  display: grid;
  justify-items: center;
  background: #323a2fef;
}

h1 {
  color: #fafcff;
  font-size: 40px;
  margin: 60px 0 0 0;
  text-transform: uppercase;
}

p {
  color: #fafcff;
  margin: 30px auto 0 auto;
}

.buttons {
  margin-top: 20px;
  display: flex;
  button {
    margin-right: 20px;
  }
}

.user {
  position: relative;

  ul {
    display: none;
    position: absolute;
    right: 0;
    list-style: none;
    border: 1px solid #eaeaea;
    margin: 0;
    padding: 0;
    background-color: #fff;

    a {
      text-decoration: none;
      color: #333;
      font-size: 12px;
      display: block;
      padding: 5px 10px;

      &:hover {
        background-color: #eaeaea;
      }
    }
  }

  &:hover ul {
    display: block;
  }
}
</style>
