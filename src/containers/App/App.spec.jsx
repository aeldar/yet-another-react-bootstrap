import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import App from './App.jsx';
import styles from './App.css';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('has a single wrapper element', () => {
    expect(wrapper.find(`.${styles.wrapper}`))
    .to.have.length(1);
  });
});
