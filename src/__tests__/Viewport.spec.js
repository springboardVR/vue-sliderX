import { mount, createLocalVue } from 'vue-test-utils'
import Viewport from '../Viewport.vue'
import Vue from 'vue'
// import jest from 'jest'

describe('Viewport', () => {
  let wrapper
  let localVue = createLocalVue()
  beforeEach(() => {
    Vue.util.warn = jest.fn()
    const SliderWithSlots = {
      name: 'SliderWithSlots',
      render(h) {
        const children = Array(10).fill(null).map((n, i) => h('div', { class: 'scrolleritem' }, i))
        return h(Viewport, {
          scopedSlots: {
            prev: () => h('button', { class: 'prevbtn' }, 'prev'),
            next: () => h('button', { class: 'prevbtn' }, 'next'),
          },
        }, children)
      }
    }
    const container = mount(SliderWithSlots, {
      // localVue,
    })
    wrapper = container.find({ name: 'Viewport' })
  })

  //render
  it('render', () => {
    expect(wrapper.exists()).toBe(true)
  })
  //render
  // it('render current', () => {
  //   wrapper.setProps({ index: 1, perPage: 3 })
  //   // expect(wrapper.find('.before').findAll('div').length).toBe(1)
  //   expect(wrapper.find('.current').findAll('div').length).toBe(3)
  // })




})
