import { config } from '../config.js'

class ToKen {
  constructor(){
    this.verifyUrl = `${config.api_base_url}token/verify`
    this.toKenUrl = config.api_base_url + 'token';
  }

  verify(){
    const token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer();
    }else{
      this._verifyFromServer(token)
    }
  }

  _verifyFromServer(token){
    wx.request({
      url: this.verifyUrl,
      method: 'POST',
      data: { token },
      success: (res) => {
        if (!res.data.is_valid) {
          this.getToKenFromServer()
        }
      }
    })
  }

  getTokenFromServer(callBack){
    wx.login({
      success: (res) => {
        wx.request({
          url: this.toKenUrl,
          method: 'POST',
          data: {
            account: res.code,
            type: 100
          },
          success: (res) => {
            wx.setStorageSync('token', res.data.token)
            callBack && callBack(res.data.token)
          }
        })
      }
    })
  }
}

export {
  ToKen
}
