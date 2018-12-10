# light-comment-system
a light comment system by ssr

# 需要做的点
1. 组件级别cache
2. 降级为前端渲染的方案
3. elementUI的组件可以按需引入

# 可能遇到的踩坑
1. 一个页面多次访问之后，state一直增加导致内存泄漏，这个时候只需每个路由建一个 key 即可，例详情页只建立一个 detail 的 key，请求的数据赋值给 detail 即可 [https://segmentfault.com/a/1190000015440082]