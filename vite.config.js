import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { eesaStaticJs } from "./static.config"

const banner = `/*!
  * Eesa-static.js v${eesaStaticJs} ${new Date()}
  * Copyright(c) 2013-${new Date().getFullYear()} Eesa
  * Released under the MIT License.
  */`

export default defineConfig({
  plugins: [vue(), DefineOptions()],
  build: {
    polyfillModulePreload: false,
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'vue-router'],
      output: {
        dir: `./public/h5-static/Eesa-static@${eesaStaticJs}`,
        banner,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          "vue": "Vue"
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    lib: {
      entry: 'src/main.js',
      name: 'EesaStatic',
      formats: ['umd']
    },
    cssCodeSplit: false
  }
})

