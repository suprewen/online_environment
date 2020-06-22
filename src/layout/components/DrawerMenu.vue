<template>
  <a-drawer title="网络环境分析" placement="left" :closable="false" :maskClosable="true"
    :visible.sync="drawerVisible" @close="onClose">
    <div class="drawer-content">
      <a-menu style="flex-shrink: 0; width: 100%;" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1" @click="switchPage('index')">
          <a-icon type="home" />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="2" @click="switchPage('search')">
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
</template>

<script>
export default {
  name: 'DrawerMenu',
  props: {
    // 对外暴露visible属性
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
    drawerVisible: {
      get () {
        return this.visible
      },
      set () {
        this.$emit('update:visible')
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    onClose () {
      this.drawerVisible = false
    },
    switchPage(name) {
      this.$router.push({ name })
      this.drawerVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>