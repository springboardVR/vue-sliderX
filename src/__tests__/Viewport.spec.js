import { mount, createLocalVue } from 'vue-test-utils'
import Viewport from '../Viewport.vue'
import Vue from 'vue'
// import jest from 'jest'

describe('Viewport', () => {
  let wrapper
  let localVue = createLocalVue()
  beforeEach(() => {
    Vue.util.warn = jest.fn()
    const ViewportWithSlots = {
      name: 'ViewportWithSlots',
      render(h) {
        const children = Array(10).fill(null).map((n, i) => h('div', { class: 'scrolleritem' }, i))
        return h(Viewport, {
          props: {
            index: 1,
          }
        }, children)
      }
    }
    const container = mount(ViewportWithSlots, {
      // localVue,
    })
    wrapper = container.find({ name: 'Viewport' })
  })

  //render
  it('render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('orientation', () => {
    it('should transform along orientation axis', () => {
      wrapper.setProps({
        orientation: 'horizontal',
        index: 1,
      })

      expect(wrapper.find('.container').vnode.data.style.transform).toBe('translate3d(0px, 0px, 0px)')
    })

  })

  //render
  // it('render current', () => {
  //   wrapper.setProps({ index: 1, perPage: 3 })
  //   // expect(wrapper.find('.before').findAll('div').length).toBe(1)
  //   expect(wrapper.find('.current').findAll('div').length).toBe(3)
  // })




})
