<script>
import Scroller from './Scroller.vue'
import ViewportFunctional from './ViewportFunctional.vue'
import ResizeObserver from 'resize-observer-polyfill';
import { Motion } from 'vue-motion';

export default {
  name: 'Viewport',
  props: {
    index: {},
    perPage: {},
  },
  data: () => ({
    viewportHeight: 0,
    offsetHeight: 0,
    localIndex: 0,
    transformValue: 0,
    disableTransition: false,
    direction: 0,
  }),
  created() {
    this.localIndex = this.index
    this.$nextTick(() => {
      this._computeHeight()
      const ro = new ResizeObserver((entries, observer) => {
        this._computeHeight()
      })
      ro.observe(this.$el.querySelector('.current'))
    })
  },
  computed: {
    transitionIndexOffset() {
      return this.index - this.localIndex
    },
    transformOffset() {
      return this.transformValue * this.transitionIndexOffset
    }
  },
  methods: {
    _computeHeight() {
      this.$nextTick(() => {
        this.viewportHeight = this.$el.querySelector('.current').scrollHeight
        this.offsetHeight = this.$el.querySelector('.current').firstElementChild.scrollHeight
      })
    },
    _startTransition() {
      this.disableTransition = false
    },
    _stopTransition() {
      this.disableTransition = true
      this.localIndex = this.index
      this.transformValue = 0
    },
    goTo(to, from) {
      this.direction = to > from ? 1 : -1
      this.transformValue = 0
      this._startTransition()
      this.$nextTick(() => {
        this.transformValue = this.offsetHeight
      })
    },
  },
  watch: {
    index(to, from) {
      this.goTo(to, from)
    }
  },
  render(h, ctx) {
    this._computeHeight()
    const previousSlides = h(Scroller, {
      props: {
        index: this.localIndex - Math.abs(this.transitionIndexOffset) - 1, // -1 avoid blink
        perPage: Math.abs(this.transitionIndexOffset) + 1
      },
      class: 'prev',
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        transform: 'translateY(-100%)'
      },
    }, this.$slots.default)

    const currentSlides = h(Scroller, {
      props: {
        index: this.localIndex,
        perPage: this.perPage,
      },
      class: 'current',
    }, this.$slots.default)

    const nextSlides = h(Scroller, {
      props: {
        index: this.localIndex + this.perPage,
        perPage: Math.abs(this.transitionIndexOffset) + 1 // +1 avoid blink
      },
      class: 'next',
    }, this.$slots.default)

    const createViewport = (value) => h(ViewportFunctional, {
      props: { transform: value },
      style: { height: `${this.viewportHeight}px` }
    }, [
      previousSlides,
      currentSlides,
      nextSlides,
    ])

    const wrapMotion = (vNodeCreator) => {
      return h(Motion, {
        props: {
          value: this.transformOffset,
          tag: 'div',
        },
        key: 'e',
        on: {
          'motion-end': this._stopTransition,
        },
        scopedSlots: {
          default: ({ value }) => {
            return vNodeCreator(-value)
          }
        }
      })
    }
    return this.disableTransition
      ? createViewport(0)
      : wrapMotion(createViewport)
  },
}
</script>

<style scoped>

.viewport {
  overflow: hidden;
}

</style>
