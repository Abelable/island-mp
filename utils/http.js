import { config } from '../config.js'
import { Base64 } from './base64.js'
import { ToKen } from '../models/token.js'

const tips = {
  1: '抱歉，出现了一个错误',
  3000: '期刊不存在'
}

class HTTP {
  request({url, data={}, method='GET'}){
    return new Promise((resolve, reject)=>{
      this._request(url, data, method, resolve, reject)
    })
  }

  _request(url, data = {}, method = 'GET', resolve, reject, noRefetch = false) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json",
        Authorization: this._encode()
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          if (code == '403') {
            if (!noRefetch) {
              this._refetch(url, resolve, reject, data, method)
            }
          }else{
            reject()
            const error_code = res.data.error_code
            this._show_error(error_code)
          }
        } 

      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }

    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

  _refetch(...param){
    const token = new ToKen();
    token.getTokenFromServer((token)=>{
      this._request(...param, true)
    })
  }

  _encode(){
    const token = wx.getStorageSync('token')
    const base64 = new Base64()
    const result = base64.encode(token + ':')
    return 'Basic ' + result
  }
}

export { HTTP }