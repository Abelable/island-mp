import {
  ToKen
} from './models/token'

App({
  onLaunch() {
    const token = new ToKen()
    token.verify()
  }
})
