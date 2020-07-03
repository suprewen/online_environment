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
        <ve-wordcloud :data="hotWordData" :chartSettings="{sizeMin: 60, sizeMax: 120}">
          <data-empty v-show="hotWords.length === 0"></data-empty>
        </ve-wordcloud>
      </item-card>
      <router-link to="/detail?target=hotWords">查看详情
        <a-icon type="arrow-right" />
      </router-link>

      <h2 class="title">敏感词</h2>
      <item-card>
        <ve-wordcloud :data="sensitiveWordData" :chartSettings="{sizeMin: 60, sizeMax: 120}">
          <data-empty v-show="sensitiveWords.length === 0"></data-empty>
        </ve-wordcloud>
      </item-card>
      <router-link to="/detail?target=sensitiveWords">查看详情
        <a-icon type="arrow-right" />
      </router-link>

      <h2 class="title">粗言秽语</h2>
      <item-card>
        <ve-wordcloud :data="foulWordData" :chartSettings="{sizeMin: 60, sizeMax: 120}">
          <data-empty v-show="foulWords.length === 0"></data-empty>
        </ve-wordcloud>
      </item-card>
      <router-link to="/detail?target=foulWords">查看详情
        <a-icon type="arrow-right" />
      </router-link>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import itemCard from '@/components/itemCard'
import dataEmpty from '@/components/charts/dataEmpty'

export default {
  name: 'index',
  components: { itemCard, dataEmpty },
  data () {
    return {
      initQuery: { days: 7, count: 1000, sort: true }
    }
  },
  computed: {
    // store 中的 words 的数据
    ...mapState({
      hotWords: state => state.words.hotWords,
      sensitiveWords: state => state.words.sensitiveWords,
      foulWords: state => state.words.foulWords
    }),
    hotWordData () {
      return {
        columns: ['word', 'count'],
        rows: this.hotWords
      }
    },
    sensitiveWordData () {
      return {
        columns: ['word', 'count'],
        rows: this.sensitiveWords
      }
    },
    foulWordData () {
      return {
        columns: ['word', 'count'],
        rows: this.foulWords
      }
    }
  },
  methods: {
    onSearch (val) {
      this.$router.push({ name: 'search', query: { word: val } })
    },
    initWords () {
      this.getRecentHotWords()
      this.getSensitiveWords()
      this.getFoulWords()
    },
    async getRecentHotWords () {
      const { data } = await this.$store.dispatch('getHotWords', this.initQuery)
      this.hotWords.rows = data
    },
    async getSensitiveWords () {
      const { data } = await this.$store.dispatch('getSensitiveWords', this.initQuery)
      this.sensitiveWords.rows = data
    },
    async getFoulWords () {
      const { data } = await this.$store.dispatch('getFoulWords', this.initQuery)
      this.foulWords.rows = data
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