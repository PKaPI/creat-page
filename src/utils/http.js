import 'whatwg-fetch'
import { reqHeader, authBeforeRes, authAfterRes } from './interceptor';
import ProgressBar from '../components/progressBar';
import {history}from '..';

class Http {
  get(url, params) { 
    let options = { method: 'GET' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.request(req_url, options)
  }

  post(url, data) { 
    let options = { method: 'POST', headers: { "content-type": "application/json;charset=UTF-8" } }
    if (data) options.body = JSON.stringify(data)
    return this.request(url, options)
  }

  delete(url, params) { 
    let options = { method: 'DELETE' }
    let req_url = params ? this.buildUrl(url, params) : url;
    return this.request(req_url, options)
  }

  put(url, data) {
    let options = { method: 'PUT' }
    if (data) options.body = JSON.stringify(data)
    return this.request(url, options)
  }

  postForm(url, data, flag) {
    let options = { method: 'POST' }
    if (data) options.body = flag ? this.buildFormData(data) : new FormData(data);
    return this.request(url, options)
  }
  head(url) {
    let options = { method: 'Head' }
    return this.request(url, options)
  }
  buildUrl(url, params) {
    const ps = []
    if (params) {
      for (let p in params) {
        if (p) {
          ps.push(p + '=' + encodeURIComponent(params[p]));
        }
      }
    }
    return url + '?' + ps.join('&')
  }

  buildFormData(params) {
    if (params) {
      const data = new FormData()
      for (let p in params) {
        if (p) {
          data.append(p, params[p])
        }
      }
      return data;
    }
  }
  request(url, options) {
    options.headers = options.headers || reqHeader;
    options.credentials = 'same-origin'
    ProgressBar.show();
    return fetch(url, options)
      .then(authBeforeRes)
      .then(response => {
        ProgressBar.hide();
        return response.json()
      })
      .catch(err => {
        console.error("错误信息：",JSON.stringify(err));
        this.handleExcept(e);//开发环境可讲此方法注视
      });
  }
  handleExcept(e){
    const status = e.name;
    if (status === 401) {
     window.location.href='/auth/login';
      return;
    }
    if (status === 403) {
      history.push('/auth/login');
      return;
    }
    if (status <= 504 && status >= 500) {
      history.push('/auth/login');
      return;
    }
    if (status >= 404 && status < 422) {
      history.push('/auth/login');
    }
  }
}
export default new Http()
