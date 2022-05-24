<template>
  <div id="app">
    <Header id="Header" />
    <main><router-view></router-view></main>
    <Footer id="Footer" />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: { Footer, Header }
};
</script>

<style lang="less">
@import "./assets/reset.less";

body {
  min-height: 100vh;
}

#app {
  // height: ;
  min-height: 100vh;
  display: grid;
  // 左右两边12%的宽度
  grid-template-columns: 12% auto 12%;
  // 中间的main部分尽可能撑开
  grid-template-rows: auto 1fr auto;
  // .代表不放
  grid-template-areas:
    "header header header"
    ".      main  ."
    "footer footer footer";

  #Header {
    grid-area: header;
    padding-left: 12%;
    padding-right: 12%;
  }

  main {
    // border: 1px solid blue;
    // padding-top: 30px;
    // margin-top: 30px;
    grid-area: main;
  }

  #Footer {
    // padding-top: 30px;
    grid-area: footer;
    padding-left: 12%;
    padding-right: 12%;
    // border: 1px solid red;
    background: #000000b7;
  }
}

@media (max-width: 768px) {
  #app {
    grid-template-columns: 10px auto 10px;

    #Header,
    #Footer {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
}
</style>
