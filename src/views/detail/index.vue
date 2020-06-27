<template>
  <div>
    <div class="search-container">
      <h1>{{title}}详情</h1>
    </div>

    <div class="detail-container">
      <p class="title">{{title}}详情</p>
      <item-card>
        <ve-wordcloud :data="wordCloudData"></ve-wordcloud>
      </item-card>

      <p class="title">近期{{title}}趋势</p>
      <item-card>
        <ve-line :data="wordLineData"></ve-line>
      </item-card>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'

import itemCard from '@/components/itemCard'

// 标题映射表
const wordTypeMap = {
  hotWords: '热词',
  sensitiveWords: '敏感词',
  foulWords: '污言秽语'
}

export default {
  name: 'detail',
  components: {
    itemCard
  },
  data () {
    return {
      // 词云图数据
      wordCloudData: {
        columns: ['word', 'count'],
        rows: []
      },
      // 折线图数据
      wordLineData: {
        columns: ['word', 'count'],
        rows: []
      }
    }
  },
  computed: {
    // store 中的 words 的数据
    ...mapState({
      hotWords: state => state.words.hotWords,
      sensitiveWords: state => state.words.sensitiveWords,
      foulWords: state => state.words.foulWords
    }),
    // 标题
    title () {
      return wordTypeMap[this.wordType]
    },
    // 词类，通过路由传的参数判断
    wordType () {
      return this.$route.query.target
    },
    // 要 dispatch 的 action
    actionType () {
      let wordtype = this.wordType
      wordtype = wordtype.replace(/([a-z])/, function (a, k) {
        return k.toUpperCase()
      })
      return `get${wordtype}`
    }
  },
  methods: {
    async getRecentHotWords () {
      /**
       * 判断 store 中有没有数据，（例在详情页刷新时 store 会清空）
       * 有就直接拿
       * 没有就重新获取
       */
      let data = this[this.wordType].length
        ? this[this.wordType]
        : (await this.$store.dispatch(this.actionType)).data

      this.wordCloudData.rows = data
      this.wordLineData.rows = data
    }
  },
  created () {
    this.getRecentHotWords()
  },
  beforeRouteEnter (to, form, next) {
    // 路由进来前判断输入的参数是否是存在的
    if (wordTypeMap[to.query.target]) next()
    else next('/error')
  }
}
</script>

<style lang="scss" scoped>
/* TODO 抽离 style */
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

.detail-container {
  margin: 30px 20vw;

  .title {
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.57);
  }
}
</style>