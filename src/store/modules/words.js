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
          commit('setHotWords', data.data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },
    getSensitiveWords ({ commit }, query) {
      return new Promise((resolve, reject) => {

        getSensitiveWords(query).then(res => {
          const { data } = res
          commit('setSensitiveWords', data.data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },
    getFoulWords ({ commit }, query) {
      return new Promise((resolve, reject) => {

        getFoulWords(query).then(res => {
          const { data } = res
          commit('setFoulWords', data.data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },
  }
}