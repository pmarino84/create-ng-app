import { module } from 'angular'
import { LINK_COMPONENT_NAME, linkComponentConfiguration } from '../components/link/link.component'
import { APP_COMPONENT_NAME, appComponentConfiguration } from './app.component'

const appModule = module('prova', [])

appModule.component(LINK_COMPONENT_NAME, linkComponentConfiguration)
appModule.component(APP_COMPONENT_NAME, appComponentConfiguration)

export default appModule
