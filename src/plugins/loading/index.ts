import { createVNode, render, App } from "vue"
import { getPassiveValue } from "../../librarys/utils"
import Loading from "./index.vue"

export default {
  install (app: App) {
    let vm = null
    let isLoading = true
    const container = document.createElement("div")
    app.config.globalProperties.$showLoading = () => {
      if (!isLoading) {
        return
      }
      if (!vm) {
        vm = createVNode(Loading as any)
      }
      isLoading = false
      render(vm, container)
      document.body.appendChild(container)
      container.addEventListener('touchmove', (e) => {
        e.preventDefault()
        e.stopPropagation()
      }, getPassiveValue())
    }

    app.config.globalProperties.$hideLoading = () => {
      if (vm && !isLoading) {
        container.parentNode.removeChild(container)
        isLoading = true
      }
    }
  }
}
