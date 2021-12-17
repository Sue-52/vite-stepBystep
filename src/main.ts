import { createApp } from 'vue'
import App from './App.vue'

// 路由文件引入
import router from "./router"
// 引入 vuex 文件
import store from "./store"

const app = createApp(App);

app.use(router).use(store)
  .mount("#app")
