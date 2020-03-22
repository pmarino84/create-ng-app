import { bootstrap, element } from 'angular'
import appModule from './app'
import './index.css'

const whenReady = (el, fn) => element(el).ready(fn)

const bootstrapModule = (el, moduleName) => bootstrap(el, [moduleName])

whenReady(document, () => bootstrapModule(document.body, appModule.name))
