module.exports = {
  root: true,  // 表示该配置文件是根配置文件，不再向上查找其他配置文件
  env: {
    node: true,  // 启用 Node.js 环境的全局变量和语法
    browser: true,  // 启用浏览器环境的全局变量和语法
  },
  extends: [
    'eslint:recommended',  // 使用 ESLint 推荐的基本规则
    'plugin:@typescript-eslint/recommended',  // 使用 TypeScript 推荐的规则
  ],
  parser: '@typescript-eslint/parser',  // 指定解析器
  parserOptions: {
    ecmaVersion: 2021,  // 指定 ECMAScript 版本
    sourceType: 'module',  // 使用 ECMAScript 模块
  },
  plugins: [
    '@typescript-eslint',  // 使用 TypeScript 插件
  ],
  rules: {
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off", // any
    "no-debugger": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", // setup()
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ]
  }
};
