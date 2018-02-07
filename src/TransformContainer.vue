<script>
import { Motion } from 'vue-motion'

export default {
  name: 'TransformContainer',
  props: {
    transformValue: {
      default: 0,
      type: Number
    },
    padding: {
      default: 0,
      type: Number
    },
    orientation: {
      default: 'vertical',
      type: String
    }
  },
  render (h, ctx) {
    // const { children, props } = ctx
    const getCSSTransform = (transform) => {
      return this.orientation === 'horizontal'
        ? `translate3d(${transform}px, 0px, 0px)`
        : `translate3d(0px, ${transform}px, 0px)`
    }
    return h(Motion, {
      props: {
        value: this.transformValue,
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
              transform: getCSSTransform(value),
              display: 'flex',
              flexDirection: this.orientation === 'horizontal' ? 'row' : 'column',
              position: 'absolute',
              width: '100%',
              [this.orientation === 'horizontal' ? 'left' : 'top']: `${this.padding}px`
            }
          }, this.$slots.default)
        }
      }
    })
  }
}
</script>
