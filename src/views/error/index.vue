<template>
  <div>
    <h1>404 NotFound</h1>
    <router-link class="link" to="/">首页</router-link>
  </div>
</template>

<script>
/**
 * TODO 完成 404 页面
 */
export default {
  name: 'error',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 200px;
}
.link {
  display: block;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}
</style>