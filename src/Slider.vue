<script>
import TransformContainer from './TransformContainer.vue'
import VirtualViewport from './VirtualViewport.vue'
import RenderedSize from './RenderedSize.vue'

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
    }
  },
  data: () => ({
    index: 0,
    isTransitioning: false,
    effectiveTransform: 0,
    elementSize: 0,
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
      return (this.index * this.elementSizeValue) + (this.offset * this.elementSizeValue)
    },
    effectiveIndex () {
      return Math.floor(-this.effectiveTransform / this.elementSizeValue) - this.offset
    },
    elementSizeValue () {
      return (this.orientation === 'horizontal' ? this.elementSize.width : this.elementSize.height ) || 1
    },
    viewportSize () {
      return this.orientation === 'horizontal'
        ? { width: this.elementSize.width * this.perPage, height: this.elementSize.height }
        : { width: this.elementSize.width, height: this.elementSize.height * this.perPage }
    },
  },
  watch: {
    current: {
      immediate: true,
      handler (val) { this.index = val }
    },
    orientation(val) {
      this.effectiveTransform = 0
    },
    loop(val) {
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
  render (h, ctx) {
    const measure = h(RenderedSize, {
      on: {
        changed: value => { this.elementSize = value }
      }
    }, [this.$slots.default[0]])

    const viewport = h(TransformContainer, {
      class: ['viewport', this.viewportClass],
      on: {
        tick: (value) => { this.effectiveTransform = value }
      },
      props: {
        transformValue: -this.transform,
        padding: (this.effectiveIndex * this.elementSizeValue) + (this.offset * this.elementSizeValue),
        orientation: this.orientation
      }
    }, [
      h(VirtualViewport, {
        props: {
          index: this.effectiveIndex,
          perPage: this.perPage,
          orientation: this.orientation
        }
      }, this.$slots.default)
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
          height: `${this.viewportSize.height}px`,
          width: this.orientation === 'horizontal' ? `${this.viewportSize.width}px` : undefined
        }
      },
      [
        this.$scopedSlots.prev && this.$scopedSlots.prev({ canPrev: this.canPrev, prev: this.prev }),
        measure,
        viewport,
        this.$scopedSlots.next && this.$scopedSlots.next({ canNext: this.canNext, next: this.next })
      ])
  }
}
</script>
