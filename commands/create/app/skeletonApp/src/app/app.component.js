import template from './app.component.html'
import './app.component.css'

export const APP_COMPONENT_NAME = 'app'
export const APP_COMPONENT_TAG = 'app'

export class AppComponentController {
  static $inject = [];
}

export const appComponentConfiguration = {
  controller: AppComponentController,
  template,
  bindings: {}
}
