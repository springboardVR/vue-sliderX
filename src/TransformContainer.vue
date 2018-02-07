<script>
import { Motion } from 'vue-motion'

export default {
  name: 'TransformContainer',
  props: {
    transformValue: {
      default: '0px',
      type: String
    },
    padding: {
      default: '0px',
      type: String
    },
    orientation: {
      default: 'vertical',
      type: String
    }
  },
  render (h) {
    const pattern = /(\d*\.?\d*)(%|px)/
    const [, transform, unit] = this.transformValue.match(pattern)
    const getCSSTransform = (value, unit) => {
      return this.orientation === 'horizontal'
        ? `translate3d(-${value}${unit}, 0px, 0px)`
        : `translate3d(0px, -${value}${unit}, 0px)`
    }
    return h(Motion, {
      props: {
        value: Number(transform),
        tag: 'div'
      },
      class: 'viewport',
      style: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      },
      on: {
        // 'motion-end': this._stopTransition,
      },
      scopedSlots: {
        default: ({ value }) => {
          this.$emit('tick', value)
          return h('div', {
            class: 'transformcontainer',
            style: {
              transform: getCSSTransform(value, unit),
              display: 'flex',
              flexDirection: this.orientation === 'horizontal' ? 'row' : 'column',
              position: 'absolute',
              width: '100%',
              height: '100%',
              [this.orientation === 'horizontal' ? 'left' : 'top']: this.padding
            }
          }, this.$slots.default)
        }
      }
    })
  }
}
</script>
