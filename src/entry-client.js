// 仅运行于浏览器
// 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    app.$mount('#app')
});