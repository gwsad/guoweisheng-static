## 技术框架

```
 vite + typescript + vue
```

## 常规项目代码目录（所有组件以 es-button 样式方式引入）

```
├── components
│   ├── button //按钮
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
├── hooks
│   ├── use-namespace // 组件命名统一规范
├── librarys
│   ├── fun.ts   // 函数方法
│   ├── jsencrypt.ts   // 参数加密方法
│   ├── store.ts   //localStorage、sessionStorage 方法
│   ├── utils.ts   // 公共方法
│   ├── validate.ts   // 校验规则
│   ├── vueShared.ts   // @vueShared（用于JS数据类型判断）
├── props
│   ├── runTime.ts  // 对传入的props优化类型，方便管理
├── main.ts       //打包入口文件
├── CHANGELOG.md     // 更新日志文件
```
