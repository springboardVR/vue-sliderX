import { mount, createLocalVue } from 'vue-test-utils'
import Scroller from '../Scroller.vue'
import Vue from 'vue'
// import jest from 'jest'

describe('Scroller', () => {
  let wrapper
  let localVue = createLocalVue()
  beforeEach(() => {
    Vue.util.warn = jest.fn()
    const ScrollerWithChildren = {
      name: 'ScrollerWithChildren',
      render(h) {
        const children = Array(10).fill(null).map((n, i) => h('div', { class: 'scrolleritem' }, i))
        return h(Scroller, {}, children)
      }
    }
    wrapper = mount(ScrollerWithChildren, {
      localVue,
    })
  })

  //render
  it('render', () => {
    expect(wrapper.exists()).toBe(true)
  })


})
