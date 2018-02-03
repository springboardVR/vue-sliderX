<script>
import Viewport from './Viewport.vue'
import { Motion } from 'vue-motion';

export default {
  name: 'Slider',
  props: {
    perPage: {
      default: 3,
    },
    current: {
      default: 0,
    },
  },
  data: () => ({
    index: 0,
  }),
  watch: {
    current: {
      immediate: true,
      handler(val) { this.index = val}
    }
  },
  methods: {
    next () {
      this.index = this.canNext ? this.index + 1 : this.index
    },
    prev () {
      this.index = this.canPrev > 0 ? this.index - 1 : this.index
    },
  },
  computed: {
    canNext () {
      const length = this.$slots.default.length
      return (this.index + 1) < length
    },
    canPrev () {
      return this.index > 0
    },
  },
  render(h, ctx) {
    const viewport = h(Viewport, {
      class: 'viewport',
      props: {
        ...this.$props,
        index: this.index,
      },
    },
    this.$slots.default)

    return h('div',
      {
        class: 'slider-container',
        style: {
          position: 'relative'
        },
      },
      [
        this.$scopedSlots.prev && this.$scopedSlots.prev({ canPrev: this.canPrev, prev: this.prev }),
        viewport,
        this.$scopedSlots.next && this.$scopedSlots.next({ canNext: this.canNext, next: this.next }),
      ])
  },
}
</script>

<style scoped>

.slider-container {
}

</style>
