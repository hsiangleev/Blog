import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)

import home from "./assets/components/lee-article.vue"
import list from "./assets/link/lee-list.vue"
import timeaxis from "./assets/link/lee-timeaxis.vue"
import text from "./assets/link/lee-text.vue"
import about from "./assets/link/lee-about.vue"
import manager from "./assets/link/lee-manager.vue"
import add from "./assets/manager/lee-manager-add.vue"
import error from "./assets/components/lee-error.vue"

export default {
    router: function () {
        return new VueRouter({
            mode: "history",
            base: __dirname,
            routes: [
                {
                    path: "/home",
                    name: "home",
                    alias: "/",
                    // redirect: "/manager",
                    component: home
                },
                {
                    path: "/list",
                    name: "list",
                    component: list
                },
                {
                    path: "/timeaxis/:type",
                    name: "timeaxis",
                    props: true,
                    component: timeaxis
                },
                {
                    path: "/text/:id",
                    name: "text",
                    props: true,
                    component: text
                },
                {
                    path: "/about",
                    name: "about",
                    props: true,
                    component: about
                },
                {
                    path: "/manager",
                    name: "manager",
                    props: true,
                    component: manager
                },
                // 新增随笔
                {
                    path: "/manager/add/:id",
                    name: "manager/add",
                    props: true,
                    component: add
                },
                // 404
                {
                    path: "*",
                    name: "error",
                    component: error
                },
            ]
        })
    }
}