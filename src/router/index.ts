// TODO： 配置 vue-router 文件
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "HomePage",
        component: () => import("@/views/Home/HomePage.vue"),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
