<script>
import TransformContainer from './TransformContainer.vue'
import VirtualViewport from './VirtualViewport.vue'
import RenderedSize from './RenderedSize.vue'
import { cloneVNodes } from './helpers.js'

export default {
  name: 'Slider',
  props: {
    perPage: {
      default: 3,
      type: Number
    },
    current: {
      default: 0,
      type: Number
    },
    viewportClass: {
      default: '',
      type: String
    },
    orientation: {
      default: 'vertical',
      type: String
    },
    offset: {
      default: 1,
      type: Number
    },
    loop: {
      default: true,
      type: Boolean
    },
    clone: {
      default: true,
      type: Boolean
    },
    autoSize: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    index: 0,
    isTransitioning: false,
    effectiveTransform: 0,
    elementSize: 0
  }),
  computed: {
    canNext () {
      if (this.loop) return true
      const length = this.$slots.default.length
      return (this.index + this.perPage) < length
    },
    canPrev () {
      if (this.loop) return true
      return this.index > 0
    },
    transform () {
      if (this.autoSize) {
        return `${(this.index + this.offset) * this.elementSizeValue}px`
      } else {
        return `${(this.index + this.offset) * this.percentage}%`
      }
    },
    padding () {
      if (this.autoSize) {
        return `${(this.effectiveIndex * this.elementSizeValue) + (this.offset * this.elementSizeValue)}px`
      } else {
        return `${(this.effectiveIndex * this.percentage) + (this.offset * this.percentage)}%`
      }
    },
    effectiveIndex () {
      if (this.autoSize) {
        return Math.floor(-this.effectiveTransform / this.elementSizeValue) - this.offset
      } else {
        return Math.floor(this.effectiveTransform / this.percentage) - this.offset
      }
    },
    elementSizeValue () {
      return (this.orientation === 'horizontal' ? this.elementSize.width : this.elementSize.height) || 1
    },
    percentage () {
      return Math.round((1 / this.perPage) * 10000) / 100
    },
    viewportSize () {
      return this.orientation === 'horizontal'
        ? { width: this.elementSize.width * this.perPage, height: this.elementSize.height }
        : { width: this.elementSize.width, height: this.elementSize.height * this.perPage }
    }
  },
  watch: {
    current: {
      immediate: true,
      handler (val) { this.index = val }
    },
    orientation (val) {
      this.effectiveTransform = 0
    },
    loop (val) {
      this.index = this.current
    }
  },
  methods: {
    next () {
      this.index = this.canNext ? this.index + 1 : this.index
    },
    prev () {
      this.index = this.canPrev > 0 ? this.index - 1 : this.index
    }
  },
  render (h) {
    const slotWithClone = (() => {
      const remaining = (this.perPage + this.offset) - this.$slots.default.length
      const shouldClone = remaining > 0
      if (this.clone && shouldClone) {
        const clones = (() => {
          const cloneRecursive = (remaining, clones = []) => {
            if (remaining > 0) {
              const newClones = [...clones, ...cloneVNodes(this.$slots.default.slice(0, remaining), this.$createElement)]
              return cloneRecursive(Math.max(0, remaining - newClones.length), newClones)
            } else {
              return clones
            }
          }
          return cloneRecursive(remaining)
        })()
        return [
          ...this.$slots.default,
          ...clones.map((vnode, i) => ({ ...vnode, key: `clone${i}${vnode.key}` }))
        ]
      } else {
        return this.$slots.default
      }
    })()
    const children = slotWithClone
      .map(vnode => this.$parent.$createElement('div', {
        class: 'elwrapper',
        key: vnode.key,
        style: {
          [this.orientation === 'horizontal' ? 'width' : 'height']: `${this.percentage}%`,
          flexShrink: '0'
        }
      }, [vnode]))

    let measure
    if (this.autoSize) {
      measure = h(RenderedSize, {
        on: {
          changed: value => {
            this.elementSize = value
          }
        }
      }, [children[0]])
    }

    const viewport = h(TransformContainer, {
      class: ['viewport', this.viewportClass],
      on: {
        tick: (value) => { this.effectiveTransform = value }
      },
      props: {
        transformValue: this.transform,
        padding: this.padding,
        orientation: this.orientation
      }
    }, [
      h(VirtualViewport, {
        props: {
          index: this.effectiveIndex,
          perPage: this.perPage,
          orientation: this.orientation
        }
      }, children)
    ])

    return h('div',
      {
        class: {
          'slider-container': true,
          '-cannext': this.canNext,
          '-canprev': this.canPrev,
          '-is-transitioning': this.isTransitioning
        },
        style: {
          position: 'relative',
          ...(this.autoSize
            ? {
              height: `${this.viewportSize.height}px`,
              width: `${this.viewportSize.width}px`
            }
            : {
              // height: '100%',
              // width: '100%'
            }
          )
        }
      },
      [
        this.$scopedSlots.prev && this.$scopedSlots.prev({ canPrev: this.canPrev, prev: this.prev, index: this.index }),
        measure,
        viewport,
        this.$scopedSlots.next && this.$scopedSlots.next({ canNext: this.canNext, next: this.next, index: this.index })
      ])
  }
}
</script>
