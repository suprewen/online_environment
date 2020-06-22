<template>
  <section class="app-container">
    <a-layout theme="light">

      <a-layout-header class="app-header">
        <header :class="{'fixed-header': true, 'has-shadow': hasShadow}">
          <a-icon type="bars" class="menu-icon" @click="showDrawer" />
          <router-link to="/" tag="span">网络环境分析</router-link>
        </header>
      </a-layout-header>

      <a-layout-content class="app-content">
        <transition name="fade-transfrom" mode="out-in">
          <router-view></router-view>
        </transition>
      </a-layout-content>

      <a-layout-footer>
        <footer class="app-footer">
          powered by @oceanwise
        </footer>
      </a-layout-footer>

      <a-drawer title="网络环境分析" placement="left" :closable="false" :maskClosable="true"
        :visible="drawerVisible" @close="onClose">
        <div class="drawer-content">
          <a-menu style="flex-shrink: 0; width: 100%;" :default-selected-keys="['1']" mode="inline">
            <a-menu-item key="1">
              <a-icon type="home" />
              <span>首页</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="search" />
              <span>搜索</span>
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="fire" />
              <span>热搜</span>
            </a-menu-item>
          </a-menu>
          <p>powered by @oceanwise</p>
        </div>
      </a-drawer>

    </a-layout>
  </section>
</template>

<script>
import { throttle } from '@/utils'

export default {
  name: 'layout',
  data () {
    return {
      hasShadow: false,
      drawerVisible: false
    }
  },
  methods: {
    handleScroll: throttle(function () {
      if (!this.hasShadow && document.documentElement.scrollTop > 10) {
        this.hasShadow = true
      } else if (document.documentElement.scrollTop <= 10) {
        this.hasShadow = false
      }
    }, 100),
    showDrawer () {
      this.drawerVisible = true
    },
    onClose () {
      this.drawerVisible = false
    }
  },
  created () {
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background: #f0f2f5;

  .fixed-header {
    background: #0568c4;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    padding: 0 20px;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: bold;
    transition: all 0.5s;

    .menu-icon {
      margin: 0 10px;
      font-weight: bold;
      cursor: pointer;
      vertical-align: middle;
      line-height: 0;
    }

    span {
      cursor: pointer;
    }
  }
}

.drawer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  p {
    position: absolute;
    bottom: 20px;
  }
}

.has-shadow {
  box-shadow: rgba(0, 0, 0, 0.28) 0px 4px 8px;
}

.app-content {
  min-height: 80vh;
  // padding: 20px;
}

.app-footer {
  text-align: center;
  user-select: none;
}
</style>