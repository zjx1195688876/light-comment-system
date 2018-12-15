import axios from 'axios';

const origin = 'http://127.0.0.1:3000';
const getUserInfo = () => {
    return axios.get(`${origin}/user/getUser.json`);
};

const getShareList = () => {
    return axios.get(`${origin}/share/list.json`);
};

export default {
    namespaced: true,
    state: () => ({
        pageData: {}
    }),
    actions: {
        // getPageData: ({ commit }) => commit('GET_PAGE_DATA', pageData)
        getPageData ({ commit }) {
            axios.all([getUserInfo(), getShareList()])
                .then(axios.spread((userRes, listRes) => {
                    console.log('userRes: ', userRes.data);
                    console.log('listRes: ', listRes.data);
                    let userData = userRes.data;
                    let listData = listRes.data;
                    if (userData && userData.code === 200 && listData && listData.code === 200) {
                        commit('GET_PAGE_DATA', {
                            userInfo: userData.data || {},
                            shareList: listData.data || {}
                        })
                    }
                }))
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mutations: {
        // GET_PAGE_DATA: state => state.pageData
        GET_PAGE_DATA (state, pageData) {
            console.log(pageData);
            state.pageData = pageData;
        }
    }
  }