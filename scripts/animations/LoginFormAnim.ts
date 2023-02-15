import { TimelineMax, Power4, Expo, TweenMax } from 'gsap'

const LoginFormAnim = () => {
  const loginSection: any = document.querySelector('.login-form')
  const loginForm: any = document.querySelector('.login-form form')
  const tl = new TimelineMax({ paused: true })

  tl
    .set(loginSection, { scaleY: 0 }, 'start')
    .set(loginForm, { opacity: 0, x: 50 }, 'start')
    .to(loginSection, 0.7, { scaleY: 1, transformOrigin: 'left top', ease: Power4.easeInOut }, 'start+=0.001')
    .to(loginForm, 0.7, { opacity: 1, x: 0, ease: Power4.easeOut }, 'start+=0.8')
  return tl
}

export default LoginFormAnim
