const wordsData = require('./wordsData')
const wordsCN = wordsData.chineseWords
const wordsEN = wordsData.englishWords

module.exports = [
  {
    url: '/analysis/hotwords',
    type: 'get',
    response: config => {
      const { days, count, sort } = config.query

      return {
        code: 200,
        data: {
          data: wordsCN,
          msg: sort,
          count: wordsCN.length
        }
      }
    }
  },
  {
    url: '/analysis/sensitiveWords',
    type: 'get',
    response: config => {
      const { days, count, sort } = config.query

      return {
        code: 200,
        data: {
          data: wordsEN,
          msg: sort,
          count: wordsEN.length
        }
      }
    }
  },
  {
    url: '/analysis/foulWords',
    type: 'get',
    response: config => {
      const { days, count, sort } = config.query

      return {
        code: 200,
        data: {
          data: wordsEN,
          msg: sort,
          count: wordsEN.length
        }
      }
    }
  }
]