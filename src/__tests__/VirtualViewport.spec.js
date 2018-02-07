import { mount, createLocalVue } from 'vue-test-utils'
import VirtualViewport from '../VirtualViewport.vue'
import Vue from 'vue'
// import jest from 'jest'

describe('VirtualViewport', () => {
  let wrapper
  let localVue = createLocalVue()
  beforeEach(() => {
    Vue.util.warn = jest.fn()
    const ViewportWithSlots = {
      name: 'ViewportWithSlots',
      render (h) {
        const children = Array(10).fill(null).map((n, i) => h('div', { class: 'scrolleritem' }, i))
        return h(VirtualViewport, {
          props: {
            index: 1
          }
        }, children)
      }
    }
    const container = mount(ViewportWithSlots, {})
    wrapper = container
  })

  // render
  it('render', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
