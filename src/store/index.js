import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const origin = 'http://127.0.0.1:3000';
const getUser = (config) => {
    return axios({
        method: 'GET',
        url: `${origin}/user/getUser.json`,
        timeout: 5000,
        headers: {
            cookie: config.cookie || 'mock cookie'
        }
    });
};

export function createStore () {
    return new Vuex.Store({
        state: () => ({
            pageData: {}
        }),
        actions: {
            getUserInfo ({ commit }, config = {}) {
                return getUser(config)
                    .then(res => {
                        let data = res.data;
                        if (data && data.code === 200) {
                            commit('GET_USER_INFO', {
                                userInfo: data.body || {}
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        mutations: {
            GET_USER_INFO (state, pageData) {
                state.pageData = pageData;
            }
        }
    })
};
