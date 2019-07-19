/** YTCTF Platform
 * Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
 * See full NOTICE at http://github.com/YummyTacos/YTCTF
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueShowdown from 'vue-showdown'

import App from "./routes/App";
import TaskList from "./routes/TaskList";
import Scoreboard from "./routes/Scoreboard";
import NotFound from "./routes/NotFound";
import User from "./routes/User";
import Task from "./routes/Task";
import ArticleList from "./routes/ArticleList";
import APIDocumentation from "./routes/APIDocumentation";
import Article from "./routes/Article";
import About from "./routes/About";

import api from './api';
import helpers from './helpers';

import 'bootstrap';


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueShowdown, {
    flavor: 'github',
    options: {
        emoji: true,
        noHeaderId: true,
        strikethrough: true,
        tables: true,
        literalMidWordUnderscores: true,
        requireSpaceBeforeHeadingText: true,
        simpleLineBreaks: false,
        openLinksInNewWindow: true
    }
});

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/tasks',
            name: 'tasks',
            component: TaskList
        },
        {
            path: '/scoreboard',
            name: 'scoreboard',
            component: Scoreboard
        },
        {
            path: '/user/:id',
            name: 'user',
            component: User,
            props: true
        },
        {
            path: '/task/:id',
            name: 'task',
            component: Task,
            props: true
        },
        {
            path: '/',
            name: 'articles',
            component: ArticleList
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article,
            props: true
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/about/api',
            name: 'apiDoc',
            component: APIDocumentation
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
        // TODO: platform (UI) settings
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
                // , offset: { x: 0, y: 10 }
            }
        } else if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

let lastNotificationId = 0;

const store = new Vuex.Store({
    state: {
        notifications: [],
        user: null
    },
    mutations: {
        [helpers.transactions.ADD_NOTIFICATION](state, options) {
            if (options === undefined) {
                return
            }
            const text = options.text;
            const header = options.header || null;
            const color = options.color || null;
            const n = {id: lastNotificationId, text, header, color};
            state.notifications.push(n);
            lastNotificationId++;
        },
        [helpers.transactions.REMOVE_NOTIFICATION](state, id) {
            state.notifications = state.notifications.filter((el) => el.id !== id);
        },
        [helpers.transactions.AUTH_USER](state, user) {
            state.user = user;
        },
        [helpers.transactions.DEAUTH_USER](state) {
            api.unloadToken();
            state.user = null;
        }
    },
    actions: {
        [helpers.transactions.AUTH_USER](context, token) {
            api.saveToken(token);
            helpers.getUser(function (r) {
                context.commit(helpers.transactions.AUTH_USER, r.user);
                context.commit({
                    type: helpers.transactions.ADD_NOTIFICATION,
                    text: 'Авторизация успешна!',
                    color: 'success'
                });
            }, context)
        },
        [helpers.transactions.DEAUTH_USER](context) {
            context.commit(helpers.transactions.DEAUTH_USER);
            context.commit({
                type: helpers.transactions.ADD_NOTIFICATION,
                text: 'Вы вышли из аккаунта',
                color: 'success'
            });
        },
        [helpers.transactions.UPDATE_USER](context) {
            helpers.getUser(function (r) {
                context.commit(helpers.transactions.AUTH_USER, r.user);
            }, context)
        }
    }
});


new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

window.api = api;
