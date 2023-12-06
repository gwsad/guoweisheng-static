## 更新日志

### 2.0.1

_2023-12-5_

#### Features

- 新增：`@src/style/common/config.scss` 组件库配置包括（命名空间及 BEM 命名规范）;
- 新增：`@src/style/common/mixins.scss` sass 工具函数库;
- 新增：`@src/style/common/var.scss` sass 变量库;
- 新增：`@src/style/button.scss` 新增 button 组件样式;

#### Fix

- 修改 ：NOOP 函数导入;

### 2.0.0

_2023-12-5_

#### Features

- 新增：BEM 命名规范 + 命名空间 （position: `@src/hooks/use-namespace.ts`）;
- 新增：props 传参的统一转化校验 （position: `@src/props/runTime.ts`） ;
- 新增：vueShared 工具类函数，主要是基本类型校验 （position: `@src/library/vueShared.ts`）;

#### Modified

- 优化：`@src/library/jsencrypt.ts` 加密参数的逻辑判断方式;
