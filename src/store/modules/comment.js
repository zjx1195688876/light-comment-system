export default {
    namespaced: true,
    state: () => ({
        radioList: [
            { index: 1, name: '1分' },
            { index: 2, name: '2分' },
            { index: 3, name: '3分' },
            { index: 4, name: '4分' },
            { index: 5, name: '5分' }
        ]
    }),
    actions: {
        getRadioList: ({ commit }) => commit('getRadioList')
    },
    mutations: {
        getRadioList: state => state.radioList
    }
  }