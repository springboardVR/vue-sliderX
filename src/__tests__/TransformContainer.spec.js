import { mount, createLocalVue } from 'vue-test-utils'
import TransformContainer from '../TransformContainer.vue'
import Vue from 'vue'
// import jest from 'jest'

describe('TransformContainer', () => {
  let wrapper
  let localVue = createLocalVue()
  beforeEach(() => {
    Vue.util.warn = jest.fn()
    const ContainerWithSlots = {
      name: 'ContainerWithSlots',
      render (h) {
        const children = Array(10).fill(null).map((n, i) => h('div', { class: 'scrolleritem' }, i))
        return h(TransformContainer, {
          props: {
            orientation: 'horizontal',
            transformValue: '100px'
          }
        }, children)
      }
    }
    const container = mount(ContainerWithSlots, {})
    wrapper = container.find({ name: 'TransformContainer' })
  })

  // render
  it('render', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should transform along orientation axis', () => {
    wrapper.setProps({
      orientation: 'horizontal'
    })
    expect(wrapper.find('.transformcontainer').vnode.data.style.transform).toBe('translate3d(-100px, 0px, 0px)')
    wrapper.setProps({
      orientation: 'vertical'
    })
    expect(wrapper.find('.transformcontainer').vnode.data.style.transform).toBe('translate3d(0px, -100px, 0px)')
  })

  // render
  // it('render current', () => {
  //   wrapper.setProps({ index: 1, perPage: 3 })
  //   // expect(wrapper.find('.before').findAll('div').length).toBe(1)
  //   expect(wrapper.find('.current').findAll('div').length).toBe(3)
  // })
})
