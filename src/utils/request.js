import axios from 'axios';

export default class Request
{
  static init()
  {
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return options;
  }

  static get(url)
  {
    const options = this.init();
    return axios.get(url, options)
      .then(res => res.data);
  }

  static post(url, body)
  {
    const options = this.init();
    return axios.post(url, body, options)
      .then(res => res.data);
  }

  static put(url, body)
  {
    const options = this.init();
    return axios.put(url, body, options)
      .then(res => res.data);
  }

  static delete(url)
  {
    const options = this.init();
    return axios.delete(url, options)
      .then(res => res.data);
  }
}
