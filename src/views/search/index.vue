<template>
  <div>
    <div class="searchBar">
      <div class="searchBox">
        <input name="searchtext" id="searchInput" v-model="searchWord" placeholder="输入你想要搜索的热词"
          autocomplete="off" @keydown.enter="onSearch">
        <a-icon class="searchIcon" type="search" @click="onSearch" />
      </div>
    </div>
    <div class="dropdownBar">
      <a-cascader :options="options" :default-value="['7', '过去7天内']" :allowClear="false"
        placeholder="请选择时间段" @change="onChange" />
    </div>
    <div class="graphBox">
      <item-card>
        <ve-line :data="chartData"></ve-line>
      </item-card>
    </div>
  </div>
</template>

<script>
import itemCard from '@/components/itemCard'
import { message } from 'ant-design-vue'
import { getSearchWord } from '@/api/index'

export default {
  name: 'search',
  components: { itemCard },
  data () {
    return {
      days: 1,
      searchWord: '',
      chartData: {
        columns: ['日期', '热度'],
        rows: [
          { '日期': '6/25', '热度': 1393 },
          { '日期': '6/26', '热度': 3530 },
          { '日期': '6/27', '热度': 2923 },
          { '日期': '6/28', '热度': 1723 },
          { '日期': '6/29', '热度': 3792 },
          { '日期': '6/30', '热度': 4593 }
        ]
      },
      options: [
        {
          value: '1',
          label: '过去1天内'
        },
        {
          value: '3',
          label: '过去3天内'
        },
        {
          value: '7',
          label: '过去7天内'
        },
        {
          value: '15',
          label: '过去15天内'
        },
        {
          value: '30',
          label: '过去30天内'
        }
      ]
    }
  },
  methods: {
    onChange (e) {
      this.days = e[0]
      this.onSearch(); // 重选时间段时重新请求更新数据
    },
    onSearch () {
      console.log("search")
      getSearchWord({ word: this.searchWord, days: this.days })
        .then(function (res) {
          if (res.status === 200 && res.msg === "OK") {
            this.chartData.rows = res.data.map(obj => ({ "日期": obj.date.slice(4), "热度": obj.count }))
          } else {
            message.warning('oops! something went wrong!')
          }
        })
        .catch(function (err) {
          console.log(err)
          message.warning('oops! something went wrong!')
        })
    }
  },
  mounted: function () {
    this.searchWord = this.$route.query.word // 将主页跳转过来时带的搜索关键词保存起来
    if (this.searchWord !== '') {
      this.onSearch(); // 发起请求获取数据
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBar {
  width: 100%;
  height: 150px;
  border-bottom: 1px solid lightgray;

  .searchBox {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
    position: relative;

    #searchInput {
      height: 100%;
      width: 100%;
      padding: 20px;
      font-size: 20px;
      line-height: 30%;
      background-color: transparent;
      box-sizing: border-box;
      border: none;

      &:hover {
        background-color: #e6e8eb;
      }
      &:focus {
        background-color: #f0f2f5;
        outline: none;
      }
    }

    .searchIcon {
      font-size: 30px;
      position: absolute;
      right: 25px;
      top: 60px;
    }
  }
}

.dropdownBar {
  height: 55px;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 2px 4px;
  position: relative;
}

.graphBox {
  margin: 0 15%;
  padding-top: 40px;
}
</style>