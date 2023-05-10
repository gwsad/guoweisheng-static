## Eesa-ui-vue3

npm install
npm run dev dev 开发环境
npm run test test 测试环境
npm run prod prod 生产环境

## 技术框架

```
 vite + typescript + vue
```

## 常规项目代码目录（所有组件以 es-button 样式方式引入）

```
├── components
│   ├── button //按钮
│   │    └── src
│   │         └──enter.vue // html
│   │         └──props.ts  // 传参
│   │    └── index.ts // 组件入口文件
│   ├── checkbox / 多选框
│   ├── input // 输入框
│   ├── pagination // 分页
│   ├── preset // 预置输入框
│   ├── radio // 单选框
│   ├── select // 选择器
│   ├── switch // 开关
│   ├── textBtn // 文字按钮
├── compression
│   ├── jsencrypt // 压缩完的加密方法
│   ├── md5 // md5加密
├── css
│   ├── app.scss  //引用程序主样式
│   ├── index.scss  //入口样式
│   ├── reset.scss  //重置样式
│   ├── ui-layout.scss  //布局样式
│   ├── ui-show-loading.scss  //公共ui样式
│   ├── ui-page-loading.scss //页面底部loading样式
├── librarys
│   ├── fun.ts   // 函数方法
│   ├── jsencrypt.ts   // 参数加密方法
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


