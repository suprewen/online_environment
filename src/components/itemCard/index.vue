<template>
  <div class="item-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'itemCard',
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.item-card {
  padding: 20px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.5s;

  &:hover {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.07),
      0 3px 14px 3px rgba(0, 0, 0, 0.06), 0 4px 5px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>