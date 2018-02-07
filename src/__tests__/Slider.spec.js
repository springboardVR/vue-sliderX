import { mount, createLocalVue } from 'vue-test-utils'
import Slider from '../Slider.vue'
import Vue from 'vue'
// import jest from 'jest'

describe('Slider', () => {
  let wrapper
  let localVue = createLocalVue()
  beforeEach(() => {
    Vue.util.warn = jest.fn()
    const SliderWithSlots = {
      name: 'SliderWithSlots',
      render (h) {
        const children = Array(10).fill(null).map((n, i) => h('div', { class: 'scrolleritem' }, i))
        return h(Slider, {
          scopedSlots: {
            prev: () => h('button', { class: 'prevbtn' }, 'prev'),
            next: () => h('button', { class: 'prevbtn' }, 'next')
          }
        }, children)
      }
    }
    const container = mount(SliderWithSlots, {
      // localVue,
    })
    wrapper = container.find({ name: 'Slider' })
  })

  // render
  it('render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('render navigation buttons as scopedSlots', () => {
    expect(wrapper.find('.prevbtn').text()).toBe('prev')
  })

  it('should next()', () => {
    wrapper.vm.next()
    expect(wrapper.vm.index).toBe(1)
    wrapper.setData({
      index: 9
    })
    wrapper.vm.next()
    expect(wrapper.vm.index).toBe(10)
  })

  it('should prev()', () => {
    expect(wrapper.vm.index).toBe(0)
    wrapper.setData({
      index: 1
    })
    wrapper.vm.prev()
    expect(wrapper.vm.index).toBe(0)
  })
})
