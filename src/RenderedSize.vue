<script>

import ResizeObserver from 'resize-observer-polyfill';

export default {
  name: 'RenderedSize',
  created() {
    this.$nextTick(() => {
      this._computeSize()
      const ro = new ResizeObserver((entries, observer) => {
        this._computeSize()
      })
      ro.observe(this.$el)
    })
  },
  methods: {
    _computeSize() {
      const el = this.$el
      if (!el) return
      this.$emit('changed', {
        width: el.scrollWidth,
        height: el.scrollHeight,
      })
    },
  },
  render (h) {
    // clone the element received via the default slot:
    if (!this.$slots.default) return
    const vNode = this.$slots.default[0]
    const children  = vNode.children || vNode.text
    const slot = h(vNode.tag, vNode.data, children)
    return h('span', {
      style: {
        position: 'absolute',
        visibility: 'hidden',
        left: '-10000px',
        top: '-10000px'
      }
    }, [slot])
  }
}
</script>
