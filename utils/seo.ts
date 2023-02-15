export class ShareUtil {
  static createFacebookShareLink (link: string, fbid: string | null = null) {
    if (fbid !== null) {
      return `https://www.facebook.com/dialog/share?app_id=${fbid}&display=popup&href=${link}&redirect_uri=${link}`
    } else {
      return `https://www.facebook.com/sharer.php?u=${link}`
    }
  }

  static createTwitterShareLink (link: string, text: string | null = null) {
    if (text !== null) {
      return `https://twitter.com/intent/tweet?text=${text}&url=${link}`
    } else {
      return `https://twitter.com/intent/tweet?url=${link}`
    }
  }
}
