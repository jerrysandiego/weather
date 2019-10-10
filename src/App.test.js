import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Weather from './App';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import { exportAllDeclaration } from '@babel/types';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('try it out', () => {

  const testRenderer = TestRenderer.create(<Weather />);
  const testInstance = testRenderer.root;
  expect(testInstance.findByType('input').props.value).toBe('san diego');

});