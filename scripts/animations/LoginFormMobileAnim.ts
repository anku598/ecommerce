import { TimelineMax, Power4, Expo, TweenMax } from 'gsap/all'

const LoginFormMobileAnim = () => {
  const loginSection: any = document.querySelector('.login-form')
  const loginForm = document.querySelector('.login-form form')
  const tl = new TimelineMax({ paused: true })
  TweenMax.set(loginSection, { xPercent: 100 })
  tl.addLabel('start')
    .set(loginForm, { opacity: 0, x: 50 })
    .to(loginSection, 0.9, { xPercent: 0, ease: Power4.easeOut }, 'start')
    .to(loginForm, 0.9, { opacity: 1, x: 0, ease: Power4.easeOut }, 'start+=0.3')
  return tl
}

export default LoginFormMobileAnim
