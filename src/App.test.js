
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () =>
{
  const app = shallow(<App />);

  it('renders properly', () =>
  {
    expect(app).toMatchSnapshot();
  });

  it('contains a Routes component with Router', () =>
  {
    expect(app.find('withRouter(Routes)').exists()).toBe(true);
  });

  describe('browserRouter', () =>
  {
    it('contains a BrowserRouter component with basename attr', () =>
    {
      expect(app.find('BrowserRouter').exists()).toBe(true);
    });

    it('browserRouter has `basename` attribute with `/` value', () =>
    {
      expect(app.find('BrowserRouter').props().basename).toBe('/');
    });
  });
});
