<template>
  <div class="container">
    <div class="search-container">
      <h1>基于大数据的网络环境分析</h1>
      <div class="search">
        <a-input-search placeholder="搜索词语热度" size="large" @search="onSearch">
          <a-button slot="enterButton" size="large">
            <a-icon type="search"></a-icon>
          </a-button>
        </a-input-search>
      </div>
    </div>

    <div class="content-container">
      <h2 class="title">近期热词</h2>
      <item-card>
        <ve-line :data="chartData"></ve-line>
      </item-card>
    </div>
  </div>

</template>

<script>
import { getRecentHotWords } from '@/api/index'

import itemCard from '@/components/itemCard'

export default {
  name: 'index',
  components: { itemCard },
  data () {
    return {
      chartData: {}
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
    },
    async getRecentHotWords () {
      const { data } = await getRecentHotWords()
      this.chartData = data
    }
  },
  created () {
    this.getRecentHotWords()
  }
}
</script>

<style lang="scss" scoped>
.container {
  // height: 1000px;
}

.search-container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 10vh 0;
  background: #0568c4;

  h1 {
    color: #ffffff;
    font-size: 3rem;
    text-align: center;
  }

  .search {
    width: 40vw;
    margin-top: 5vh;
  }
}

.content-container {
  margin: 30px 20vw;
  text-align: center;

  .title {
    text-align: left;
    font-size: 1.1rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.57);
  }
}
</style>