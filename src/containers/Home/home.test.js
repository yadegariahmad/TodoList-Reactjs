
import React from 'react';
import { shallow } from 'enzyme';
import Home from './index';

describe('Home', () =>
{
  const home = shallow(<Home />);

  it('renders properly', () =>
  {
    expect(home).toMatchSnapshot();
  });

  it('contains a two divs', () =>
  {
    expect(home.find('div').length).toBe(2);
  });

  it('contains a changeLang and a MainCard component', () =>
  {
    expect(home.find('withI18nextTranslation(ChangeLang)').length).toBe(1);
    expect(home.find('Connect(withI18nextTranslation(Card))').length).toBe(1);
  });
});
