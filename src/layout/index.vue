<template>
  <section>
    <a-layout theme="light">
      <a-layout-header class="app-header">
        <header class="fixed-header">
          <span>网络环境分析</span>
        </header>
      </a-layout-header>
      <a-laytou-content class="app-content">
        <transition name="fade-transfrom" mode="out-in">
          <router-view></router-view>
        </transition>
      </a-laytou-content>
    </a-layout>
  </section>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  background: #f0f2f5;

  .fixed-header {
    background: #1890ff;
    box-shadow: rgba(0, 0, 0, 0.28) 0px 4px 8px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    padding: 0 10%;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: bold;
  }
}

.app-content {
  min-height: 80vh;
  // padding: 20px;
}
</style>