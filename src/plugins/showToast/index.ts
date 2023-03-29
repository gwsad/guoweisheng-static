import { createVNode, render, App } from "vue"
import Toast from "./enter.vue"

export default {
  install(app: App): void {
    let vm = null
    let isClick = true
    const container = document.createElement("div")
    app.config.globalProperties.$showToast = (text: string) => {
      if (!isClick) {
        return
      }

      if (!vm) {
        vm = createVNode(Toast as any)
      }
      render(vm, container)
      document.body.appendChild(container)
      isClick = false
      Object.assign(vm.component.props, { text })
      setTimeout(() => {
        if (vm) {
          container.parentNode.removeChild(container)
          isClick = true
          vm = null
        }
      }, 2000)
    }
  }
}
