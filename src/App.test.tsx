import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { configure, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

import { App } from './App'

configure({ adapter: new Adapter() })

it('smoke test', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('shallow render test', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.contains(<div>React TypeScript</div>)).toEqual(true)
})