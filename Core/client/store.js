import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        USER: {
            email: '',
            username: '',
            profilePic: ''
        },
        testData: 0
    },
    mutations: {
        increment(state) {
            state.testData++
        },
        initUser(state, email) {
            state.USER.email = email;
        }
    },
    getters: {
        sessionUser(state) {
            return state.USER;
        },
        getCount(state) {
            return state.testData;
        },
    }
});