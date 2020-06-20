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
        <ve-wordcloud :data="hotWords" :chartSettings="{sizeMin: 60, sizeMax: 120}" />
      </item-card>
      <router-link to="/detail">查看详情
        <a-icon type="arrow-right" />
      </router-link>

      <h2 class="title">敏感词</h2>
      <item-card>
        <ve-wordcloud :data="sensitivewords" :chartSettings="{sizeMin: 60, sizeMax: 120}" />
      </item-card>
      <router-link to="/detail">查看详情
        <a-icon type="arrow-right" />
      </router-link>

      <h2 class="title">粗言秽语</h2>
      <item-card>
        <ve-wordcloud :data="foulwords" :chartSettings="{sizeMin: 60, sizeMax: 120}" />
      </item-card>
      <router-link to="/detail">查看详情
        <a-icon type="arrow-right" />
      </router-link>
    </div>
  </div>

</template>

<script>
import { getHotWords, getSensitiveWords, getFoulWords } from '@/api/index'

import itemCard from '@/components/itemCard'
import VeWordcloud from 'v-charts/lib/wordcloud.common'

export default {
  name: 'index',
  components: { itemCard, VeWordcloud },
  data () {
    return {
      hotWords: {
        columns: ['word', 'count'],
        rows: []
      },
      sensitivewords: {
        columns: ['word', 'count'],
        rows: []
      },
      foulwords: {
        columns: ['word', 'count'],
        rows: []
      },
      initQuery: { days: 7, count: 1000, sort: true }
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
    },
    initWords () {
      this.getRecentHotWords()
      this.getSensitiveWords()
      this.getFoulWords()
    },
    async getRecentHotWords () {
      const { data } = await getHotWords(this.initQuery)
      this.hotWords.rows = data.data
    },
    async getSensitiveWords () {
      const { data } = await getSensitiveWords(this.initQuery)
      this.sensitivewords.rows = data.data
    },
    async getFoulWords () {
      const { data } = await getFoulWords(this.initQuery)
      this.foulwords.rows = data.data
    }
  },
  created () {
    this.initWords()
  }
}
</script>

<style lang="scss" scoped>
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
    margin-top: 30px;
    text-align: left;
    font-size: 1.1rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.57);
  }
}
</style>