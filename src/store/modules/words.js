import { getHotWords, getSensitiveWords, getFoulWords } from '@/api/index'

export default {
  // state
  state: () => ({
    hotWords: [],
    sensitiveWords: [],
    foulWords: []
  }),

  // mutations
  mutations: {
    setHotWords: (state, hotWords) => {
      state.hotWords = hotWords
    },
    setSensitiveWords: (state, sensitiveWords) => {
      state.sensitiveWords = sensitiveWords
    },
    setFoulWords: (state, foulWords) => {
      state.foulWords = foulWords
    }
  },

  //actions
  actions: {
    getHotWords ({ commit }, query) {
      return new Promise((resolve, reject) => {

        getHotWords(query).then(res => {
          const { data } = res

          if (data.length) {
            let wordData = res2WordData(data[0].map)
            commit('setHotWords', wordData)
            resolve(wordData)
          } else {
            resolve(data)
          }
        }).catch(e => reject(e))

      })
    },
    getSensitiveWords ({ commit }, query) {
      return new Promise((resolve, reject) => {

        getSensitiveWords(query).then(res => {
          const { data } = res

          if (data.length) {
            let wordData = res2WordData(data[0].map)
            commit('setSensitiveWords', wordData)
            resolve(wordData)
          } else {
            resolve(data)
          }

        }).catch(e => reject(e))

      })
    },
    getFoulWords ({ commit }, query) {
      return new Promise((resolve, reject) => {

        getFoulWords(query).then(res => {
          const { data } = res

          if (data.length) {
            let wordData = res2WordData(data[0].map)
            commit('setFoulWords', wordData)
            resolve(wordData)
          } else {
            resolve(data)
          }

        }).catch(e => reject(e))

      })
    },
  }
}

/**
 * @param {object} map 词语与其数量的映射
 * @return {object[]}
 */
const res2WordData = function (map) {
  let wordData = []

  Object.keys(map).forEach(item => {
    wordData.push({
      word: item,
      count: map[item]
    })
  })

  return wordData
}