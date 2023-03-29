import { App, DirectiveBinding, VNode } from "vue"
import { getPassiveValue } from "../../librarys/utils"

const lazyLoad = {
  ticking: false,
  timer: null,
  complete: false,
  position: { // 只要其中一个位置符合条件，都会触发加载机制
    top: 0, // 元素距离顶部
    right: 0, // 元素距离右边
    bottom: 0, // 元素距离下面
    left: 0 // 元素距离左边
  },
  list: [],
  init(el: HTMLElement, binding: DirectiveBinding<any>, vnode: VNode<any, any>) {
    this.list.push(el)
    this.scrollLoad()
  },
  /**
   * 滚动加载图片显示替换默认图片
   */
  scrollLoad() {
    if (!this.list.length && this.complete) {
      this.remove()
    } else {
      this.ticking = false
      this.list.forEach((el) => {
        if (el.dataset.LazyLoadImgState != 'success' && this.getClientRect(el, this.position)) {
          this.loadImage(el)
        }
      })
    }
  },
  scrollImage() {
    if(!this.ticking) {
      this.ticking = true
      this.timer = window.requestAnimationFrame(this.scrollLoad.bind(this))
    }
  },
  /**
   * @param {Object} el
   * @param {Object} options
   * @returns {Boolean}
   */
  getClientRect(el: HTMLElement, options: any) {
    const bcr = el.getBoundingClientRect() //取得元素在可视区的位置
    const mw = el.offsetWidth //元素自身宽度
    const mh = el.offsetHeight //元素自身的高度
    const h = window.innerHeight //视窗的高度
    const boolY = (!((bcr.bottom - options.top) <= 0 && ((bcr.top + mh) - options.top) <= 0) && !((bcr.top + options.bottom) >= h && (bcr.bottom + options.bottom) >= (mh + h))) //上下符合条件
    return mw != 0 && mh != 0 && boolY
  },
  /**
   * @param {Object} el
   * @param {Number} index
   */
  loadImage(el: HTMLElement) {
    const pic = el.dataset.src
    el.dataset.LazyLoadImgState = 'start'
    if (pic) {
      const img = new Image()
      img.src = pic
      img.addEventListener('load', () => {
        setTimeout(() => {
          el.style.background = 'url('+pic+') no-repeat #fff left top / cover'
          delete el.dataset.src
          el.dataset.LazyLoadImgState = 'success'
          el.classList.add('ui-lazyLoad-fade')
          this.list.forEach((item, index) => {
            if (item == el) {
              this.list.splice(index, 1)
            }
          })
          if (!this.list.length) {
            this.complete = true
          }
        }, 310)
      }, false)

      img.addEventListener('error', () => {
        delete el.dataset.src
        el.dataset.LazyLoadImgState = 'error'
      }, false)
    } else {
      delete el.dataset.src
    }
  },
  start(): void {
    window.addEventListener('scroll', this.scrollImage.bind(this), getPassiveValue())
  },
  remove(): void {
    cancelAnimationFrame(this.timer)
    window.removeEventListener('scroll', this.scrollImage.bind(this), getPassiveValue())
  }
}

export default {
  install(app: App) {
    app.directive("lazy", {
      mounted(el, binding: DirectiveBinding<any>, vnode: VNode<any, any>) {
        setTimeout(() => {
          lazyLoad.init(el, binding, vnode)
        })
      },
      unmounted() {
        lazyLoad.remove()
      }
    })
  }
}


