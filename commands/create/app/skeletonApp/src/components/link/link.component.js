import template from './link.component.html'
import './link.component.css'

export const LINK_COMPONENT_NAME = 'appLink'
export const LINK_COMPONENT_TAG = 'app-link'

export class LinkComponentController {
  static $inject = [];
}

export const linkComponentConfiguration = {
  transclude: true,
  controller: LinkComponentController,
  template,
  bindings: {
    className: '@',
    href: '@'
  }
}
