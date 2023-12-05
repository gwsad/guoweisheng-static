
import ElementPlus from 'element-plus/es'
import './css/index.scss'
import Store from './librarys/store'
import validate from './librarys/validate'
export * from './librarys/utils'

export {
  Store,
  validate
}

// 导出组件
import EsButton from './components/button'
import EsInput from './components/input'
import EsSwitch from './components/switch'
import EsPreset from './components/preset'
import EsPagination from './components/pagination'
// import EsCheckBox from './components/checkbox'
import EsTextBtn from './components/textBtn'
import EsRadio from './components/radio'
import EsSelect from './components/select'
import EsDatePicker from './components/datePicker'
export {
  EsRadio,
  EsInput,
  EsSwitch,
  EsPreset,
  EsButton,
  EsTextBtn,
  EsPagination,
  EsSelect,
  EsDatePicker
}


