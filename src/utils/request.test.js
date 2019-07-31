import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Request from './request';

describe('Request Class', () =>
{
  const mock = new MockAdapter(axios);
  const { init } = Request;
  const body = { data: 'data' };

  it('returns option object with Content-Type and Authorization in header', () =>
  {
    const mockOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer null',
      },
    };
    const options = Request.init();
    expect(localStorage.getItem).toHaveBeenLastCalledWith('token');
    expect(options).toEqual(mockOptions);
  });

  it('fetches and returns data from api', () =>
  {
    const data = { name: 'Ahmad', age: 23 };
    mock.onGet('Some api address', null, init()).reply(200, data);
    Request.get('Some api address').then((res) =>
    {
      expect(res).toEqual(data);
    });
  });

  it('posts data to api and returns response', () =>
  {
    const data = { message: 'Post done' };
    mock.onPost('Some api address', body, init()).reply(200, data);
    Request.post('Some api address', body).then((res) =>
    {
      expect(res).toEqual(data);
    });
  });

  it('deletes data from api and returns response', () =>
  {
    const data = { message: 'Delete done' };
    mock.onDelete('Some api address', body, init()).reply(200, data);
    Request.delete('Some api address', body).then((res) =>
    {
      expect(res).toEqual(data);
    });
  });

  it('puts data to api and returns response', () =>
  {
    const data = { message: 'Delete done' };
    mock.onPut('Some api address', body, init()).reply(200, data);
    Request.put('Some api address', body).then((res) =>
    {
      expect(res).toEqual(data);
    });
  });
});
