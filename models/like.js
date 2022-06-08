import { HTTP } from '../utils/http.js'

class LikeModel extends HTTP{
  like(behavior, areID, categroy){
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    return this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: areID,
        type: categroy
      }
    })
  }

  getClassicLikeStatus(artID, category){
    return this.request({
      url: `classic/${category}/${artID}/favor`
    })
  }

}

export {
  LikeModel
}