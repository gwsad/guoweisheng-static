
import resolve from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd', // 输出模块格式，可选值有 'umd', 'es', 'cjs', 'iife'
    name: 'EesaStatic', // 指定 UMD 构建模式下的全局变量名
  },
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    resolve()  // 添加这个插件配置
  ]
};
