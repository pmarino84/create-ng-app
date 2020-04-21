import appModule from '../src/app/app.module'
import { APP_COMPONENT_NAME } from '../src/app/app.component'

// eslint-disable-next-line no-undef
const ngMock = angular.mock
const module = ngMock.module
const inject = ngMock.inject

describe('Testing ' + appModule.name, function () {
  let $componentController = null

  beforeEach(module(appModule.name))

  beforeEach(inject(function (_$componentController_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $componentController = _$componentController_
  }))

  it(APP_COMPONENT_NAME + ' component defined', function () {
    const ctrl = $componentController(APP_COMPONENT_NAME, null)
    expect(ctrl).toBeDefined()
  })
})
