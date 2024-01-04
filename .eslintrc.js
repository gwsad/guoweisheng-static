module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // 指定 TypeScript 项目配置文件的路径
  },
  "extends": ['plugin:json/recommended',"eslint:recommended",'plugin:vue/recommended','plugin:@typescript-eslint/recommended'],
  "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "rules": {
  },
  globals: {
    "process": true,
    "__dirname": true,
    "module": true,
  }
};