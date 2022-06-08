// components/classic/music/index.js
import { classicBeh } from '../../classic/classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    title: String,
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached() {
    this._recoverStatus();
    this._monitorSwitch();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() { 
      if(!this.data.playing){
      
          this.setData({
            playing: true
          })
          mMgr.title = this.properties.title;
          mMgr.src = this.properties.src;
        
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return;
      }

      if (mMgr.src == this.properties.src){
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })

      mMgr.onPause(() => {
        this._recoverStatus()
      })

      mMgr.onStop(() => {
        this._recoverStatus()
      })

      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
