import { shallowMount } from '@vue/test-utils'
import LangSelect from './../../../components/LangSelect/index.vue'

describe('index.vue', () => {
    console.log('测试1')
    test('切换中英文', () => {
        console.log('测试2')
        const msg = 'new message'
        const wrapper = shallowMount(LangSelect, {
            propsData: { msg }
        })

        console.log('测试3')

        expect(wrapper.text()).toMatch(msg)
    })
})
