const chartData = {
  columns: ['日期', '奇怪', '实力', '蝙蝠'],
  rows: [
    { '日期': '1/6', '奇怪': 1393, '实力': 1093, '蝙蝠': 5532 },
    { '日期': '2/6', '奇怪': 3530, '实力': 3230, '蝙蝠': 2426 },
    { '日期': '3/6', '奇怪': 2923, '实力': 2623, '蝙蝠': 4376 },
    { '日期': '4/6', '奇怪': 1723, '实力': 1423, '蝙蝠': 5649 },
    { '日期': '5/6', '奇怪': 3792, '实力': 3492, '蝙蝠': 3423 },
    { '日期': '6/6', '奇怪': 4593, '实力': 4293, '蝙蝠': 2378 }
  ]
}

module.exports = [
  {
    url: '/getRecentHotWords',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: chartData
      }
    }
  },
  {
    url: '/getAllHotWords',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: chartData
      }
    }
  }
]