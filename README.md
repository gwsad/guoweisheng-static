## Eesa-ui-vue3

npm install
npm run dev dev 开发环境
npm run test test 测试环境
npm run prod prod 生产环境

## 技术框架

```
 vite + typescript + vue
```

## 常规项目代码目录

```
├── components
│   ├── PageLoading //页面loading
│   │    ├── index.ts
│   │    └── index.vue
├── css
│   ├── app.scss  //引用程序主样式
│   ├── index.scss  //入口样式
│   ├── reset.scss  //重置样式
│   ├── ui-layout.scss  //布局样式
│   ├── ui-show-loading.scss  //公共ui样式
│   ├── ui-page-loading.scss //页面底部loading样式
├── librarys
│   ├── fun.ts   // 函数方法
│   ├── store.ts   //localStorage、sessionStorage 方法
│   ├── utils.ts   // 公共方法
│   ├── validate.ts   // 校验规则
├── main.ts       //打包入口文件
├── plugins
│   ├── lazyLoad
│   │    └── index.ts  //懒加载
│   ├── loading
│   │    ├── index.ts   //loading显示
│   │         └── index.vue
│   │── showToast           //提示框
│   │    ├── index.ts
│   │    └── index.vue

```
##  plugins 插件使用
app.use(loading)
app.use(showToast)
app.use(showModal)
```

  import { getCurrentInstance } from "vue"
  const {
    proxy: { $showModal, $showToast, $showLoading, $hideLoading }
  } = getCurrentInstance() as any

 $showToast("请输入手机号")  //弱提示
 $showLoading()  //页面显示loading
 $hideLoading()  //页面隐藏loading
```

##  lazyLoad 使用
```
  main.ts

  const app = createApp(App as any)
  app.directive("lazy", {
    mounted(el, binding, vnode) {
      setTimeout(() => {
        lazyLoad.init(el, binding, vnode)
      })
    }
  })

  <template>
    <div
      class="ui-lazyLoad-pic"
      v-lazy
      data-src="image"
    >
    </div>
  </template>

  <script lang="ts">

     import { defineComponent, onMounted, onBeforeUnmount } from "vue"
     import { lazyLoad } from "jlfront/static"
     export default defineComponent({
       setup() {
         onMounted(() => {
            LazyLoad.start()
         })
         onBeforeUnmount(() => {
            LazyLoad.remove()
         })
       }
     })
  </script>

```


