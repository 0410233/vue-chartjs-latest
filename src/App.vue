<template>
  <div class="page">
    <div class="page__sidebar">
      <div class="menu">
        <router-link to="/" class="menu__item">首页</router-link>
        <router-link to="/amap" class="menu__item">地图</router-link>
        <router-link to="/page-builder" class="menu__item">页面装修</router-link>
        <router-link to="/chart/line" class="menu__item">线形图表</router-link>
        <router-link to="/chart/bar" class="menu__item">柱形图表</router-link>
      </div>
    </div>
    <div class="page__header"></div>
    <div class="page__main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  padding-left: 200px;
  padding-top: 50px;
  background: #f5f5f5;

  position: relative;

  &__sidebar {
    width: 200px;
    height: 100%;
    padding: 66px 0 16px;
    background: #ffffff;

    position: absolute;
    top: 0;
    left: 0;
  }

  &__header {
    width: 100%;
    height: 50px;
    background: #ffffff;

    position: absolute;
    top: 0;
    left: 0;
  }

  &__main {
    width: 100%;
    height: 100%;
    padding: 16px;
    overflow: auto;
  }
}

.menu {
  &__item {
    display: block;
    padding: 8px 16px;
    text-decoration: none;
  }
}
</style>
