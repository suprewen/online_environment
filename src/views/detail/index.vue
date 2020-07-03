<template>
  <div>
    <div class="search-container">
      <h1>{{title}}详情</h1>
    </div>

    <div class="detail-container">
      <p class="title">{{title}}详情</p>
      <item-card>
        <ve-wordcloud :data="wordCloudData">
          <data-empty v-show="wordCloudData.rows.length === 0"></data-empty>
        </ve-wordcloud>
      </item-card>

      <p class="title">近期{{title}}趋势</p>
      <item-card v-if="wordType === 'hotWords'">
        <ve-line :data="hotWordTrendData">
          <data-empty v-show="hotWordTrendData.rows.length === 0"></data-empty>
        </ve-line>
      </item-card>

      <item-card>
        <ve-line :data="wordLineData">
          <data-empty v-show="wordLineData.rows.length === 0"></data-empty>
        </ve-line>
      </item-card>

    </div>
  </div>

</template>

<script>
import { getHotWordTrend } from '@/api/index'
import { mapState } from 'vuex'
import itemCard from '@/components/itemCard'
import dataEmpty from '@/components/charts/dataEmpty'

// 标题映射表
const wordTypeMap = {
  hotWords: '热词',
  sensitiveWords: '敏感词',
  foulWords: '污言秽语'
}

export default {
  name: 'detail',
  components: {
    itemCard,
    dataEmpty
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
      },
      // 热词趋势数据
      hotWordTrendData: {
        columns: ['日期'],
        rows: []
      },
      // 查询参数
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
    async getWordData () {
      /**
       * 判断 store 中有没有数据，（例在详情页刷新时 store 会清空）
       * 有就直接拿
       * 没有就重新获取
       */
      let data = this[this.wordType].length
        ? this[this.wordType]
        : (await this.$store.dispatch(this.actionType, this.initQuery))

      this.wordCloudData.rows = data
      this.wordLineData.rows = data
    },
    async getHotWordTrend () {
      let { data } = await getHotWordTrend()
      let hotWordTrendData = {
        columns: ['日期'],
        rows: []
      }
      console.log(data)

      function res2TrendData () {
        if (data.length === 0) return
        let columns = hotWordTrendData.columns
        let rows = hotWordTrendData.rows

        // 初始化 rows数组 中每个元素的日期
        for (let k of data[0]) {
          rows.unshift({
            '日期': k.date
          })
        }

        for (let arr of data) {
          // 初始化 columns 中的单词
          columns.push(arr[0].word)

          for (let obj of arr) {
            // 往 rows 中对应的日期填入单词
            for (let row of rows) {
              if (obj.date === row['日期']) {
                row[obj.word] = obj.count * 564 || 1000
              }
            }
          }
        }

      }

      res2TrendData()
      this.hotWordTrendData = hotWordTrendData
    },
  },
  created () {
    this.getWordData()
    if (this.wordType === 'hotWords') this.getHotWordTrend()
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