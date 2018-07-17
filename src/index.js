import 'material-design-icons'
import 'material-design-icons/iconfont/material-icons.css'
import 'font-awesome/css/font-awesome.css'

import './assets/scss/main.scss'
import LButton from './components/LButton'
import LInput from './components/LInput'
import LSelect from './components/LSelect'
import LRadio from './components/LRadio'
import LDatePicker from './components/LDatePicker'

import ClickOutside from './directives/click-outside'

const components = [
  LButton,
  LInput,
  LSelect,
  LRadio,
  LDatePicker,
]

const Live = {
  install(Vue, options) {
    Object.values(components).forEach((component) => {
      Vue.use(component)
      Vue.directive('click-outside', ClickOutside)
    })
  },
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Live)
}

export default Live
