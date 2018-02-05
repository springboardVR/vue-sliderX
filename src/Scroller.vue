<script>

export default {
  name: 'Scroller',
  functional: true,
  props: {
    perPage: {
      default: 3,
    },
    index: {
      default: 0
    },
  },
  render(h, ctx) {
    const { children, props, data } = ctx
    const { index, perPage } = props
    return h('div', data, children && children.slice(index, index+perPage)) // TODO issue test utils
    // return children
  }
}
</script>
