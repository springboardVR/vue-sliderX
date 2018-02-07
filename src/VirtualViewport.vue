<script>

export default {
  name: 'VirtualViewport',
  functional: true,
  props: {
    index: {
      required: true,
      type: Number
    },
    perPage: {
      required: true,
      type: Number
    },
    orientation: {
      required: true,
      type: String
    },
    offset: {
      type: Number,
      default: 1
    }
  },
  render (h, ctx) {
    const { props, children } = ctx

    const makeIntervals = (perPage, offset) => {
      const start = 0
      const end = 0 + perPage
      return [
        [start - offset],
        [start, end],
        [end, end + offset]
      ]
    }

    const length = children.length
    const {
      index,
      perPage,
      loop,
      offset
    } = props
    const realIndex = index < 0 ? (length + index) % length : index % length
    const intervals = makeIntervals(perPage, offset)

    const loopedChildren = realIndex !== 0 || loop
      ? [...children.slice(realIndex, length), ...children.slice(0, realIndex)]
      : children

    // const beforeSlides = h('div', { class: 'before bg-blue flex' }, loopedChildren.slice(...intervals[0]))
    const style = {
      display: 'flex',
      flexDirection: props.orientation === 'horizontal' ? 'row' : 'column'
    }
    const currentSlides = h('div', { class: 'current', style }, loopedChildren.slice(...intervals[1]))
    const afterSlides = h('div', { class: 'after', style }, loopedChildren.slice(...intervals[2]))

    const slides = [
      // beforeSlides,
      currentSlides,
      afterSlides
    ]
    return slides
  }
}
</script>
