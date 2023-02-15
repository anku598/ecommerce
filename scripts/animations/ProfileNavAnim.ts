import { TimelineMax, Power4, Expo } from 'gsap'

const ProfileNav = () => {
  const profileNav: any = document.querySelector('.profile-wrapper')
  const settingNav = document.querySelector('.settings-nav')

  // let styles: any = window.getComputedStyle(profileNav);
  // let margin: any = parseFloat(styles['marginTop']) +
  //   parseFloat(styles['marginBottom']);
  const tl = new TimelineMax({ paused: true })

  // tl.addLabel('start')
  //   .set(profileNav, { height: 0 })
  //   .set(settingNav, { opacity: 0, x: 50 })
  //   .to(profileNav, 0.7, { height: '258px', ease: Power4.easeOut }, 'start')
  //   .to(settingNav, 0.7, { opacity: 1, x: 0, ease: Power4.easeOut }, 'start+=0.4')

  tl
    .set(profileNav, { scaleY: 0 }, 'start')
    .set(settingNav, { opacity: 0, x: 50 }, 'start')
    .to(profileNav, 0.7, { scaleY: 1, transformOrigin: 'left top', ease: Power4.easeInOut }, 'start+=0.001')
    .to(settingNav, 0.7, { opacity: 1, x: 0, ease: Power4.easeOut }, 'start+=0.8')
  return tl
}

export default ProfileNav
