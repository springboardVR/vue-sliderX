<script>

export default {
  name: 'ViewportFunctional',
  functional: true,
  props: {
    transform: {},
  },
  render(h, ctx) {
    const { props, data, children } = ctx

    return h('div', {
      ...data,
      class: 'viewport',
    }, [
      h('div', {
        class: 'container',
        style: { transform: `translate3d(0, ${props.transform}px, 0)` },
      }, children)
    ])
  },
}
</script>
