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
        status: 200,
        data: {
          data: wordsCN,
          msg: sort,
          count: wordsCN.length
        }
      }
    }
  },
  {
    url: '/analysis/sensitivewords',
    type: 'get',
    response: config => {
      const { days, count, sort } = config.query

      return {
        status: 200,
        data: {
          data: wordsEN,
          msg: sort,
          count: wordsEN.length
        }
      }
    }
  },
  {
    url: '/analysis/foulwords',
    type: 'get',
    response: config => {
      const { days, count, sort } = config.query

      return {
        status: 200,
        data: {
          data: wordsEN,
          msg: sort,
          count: wordsEN.length
        }
      }
    }
  }
]