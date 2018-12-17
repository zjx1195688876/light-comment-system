import axios from 'axios';

const origin = 'http://127.0.0.1:3000';

const getDetailList = (config) => {
    return axios({
        method: 'GET',
        url: `${origin}/detail/list.json`,
        timeout: 5000,
        params: {
            shareId: config.shareId || ''
        },
        headers: {
            cookie: config.cookie || ''
        }
    });
};

export default {
    namespaced: true,
    // 要注意, state 一定要用函数返回值来初始化 state, 不然会导致所有用户共用 state
    state: () => ({
        pageData: {}
    }),
    actions: {
        // getPageData: ({ commit }) => commit('GET_PAGE_DATA', pageData)
        getPageData ({ commit }, config = {}) {
            return getDetailList(config)
                .then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        commit('GET_PAGE_DATA', {
                            detailList: data.body || []
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mutations: {
        // GET_PAGE_DATA: state => state.pageData
        GET_PAGE_DATA (state, pageData) {
            state.pageData = pageData;
        }
    }
  }