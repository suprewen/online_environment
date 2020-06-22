<template>
  <div>
    <div class="searchBar">
      <div class="searchBox">
        <input name="searchtext" id="searchInput" placeholder="输入你想要搜索的热词">
      </div>
    </div>
    <div class="dropdownBar">
      <a-cascader :options="options" placeholder="请选择时间段" @change="onChange" />
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

export default {
  name: 'search',
  components: { itemCard },
  data () {
    return {
      chartData: {
        columns: ['日期', '热度'],
          rows: [
            { '日期': '1/1', '热度': 1393 },
            { '日期': '1/2', '热度': 3530 },
            { '日期': '1/3', '热度': 2923 },
            { '日期': '1/4', '热度': 1723 },
            { '日期': '1/5', '热度': 3792 },
            { '日期': '1/6', '热度': 4593 }
          ]
      },
      options: [
        {
          value: '1',
          label: '过去一天内'
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
    onchange() {

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