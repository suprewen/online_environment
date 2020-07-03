<template>
  <div class="data-empty">
    暂无数据
  </div>
</template>

<script>
export default {
  name: 'dataEmpty',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.data-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /*   background-color: rgba(255, 255, 255, 0.7);
 */
  color: #888;
  font-size: 1.5rem;
}
</style>