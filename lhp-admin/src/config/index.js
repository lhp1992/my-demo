import { Message } from 'element-ui'
import menu from './menu'
import authoritys from './authoritys'
import breadcrumbs from './breadcrumbs'

let config = {
  menu,
  authoritys,
  breadcrumbs,
  errorFnc(err) {
    Message({ type: 'error', message: err })
  },
  serverApi: '../../VideoLocationServices/'
}

export default config
