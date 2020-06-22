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
      wordCloudData: {
        columns: ['word', 'count'],
        rows: []
      },
      wordLineData: {
        columns: ['word', 'count'],
        rows: [

        ]
      }
    }
  },
  computed: {
    ...mapState({
      hotWords: state => state.hotWords,
      sensitiveWords: state => state.sensitiveWords,
      foulWords: state => state.foulWords
    }),
    title () {
      return wordTypeMap[this.wordType]
    },
    wordType () {
      return this.$route.query.target
    },
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
    if (wordTypeMap[to.query.target]) next()
    else next('/error')
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

.detail-container {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  margin: 30px 20vw;

  .title {
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.57);
  }
}
</style>