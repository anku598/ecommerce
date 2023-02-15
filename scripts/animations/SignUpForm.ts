import { TimelineMax, Power4, Expo } from 'gsap/all'

const SignUpFormAnim = () => {
  const loginSection: any = document.querySelector('.login-form')

  const signUpForm: any = document.querySelector('.sign-up-form')
  // console.log(signUpForm)

  // const signUpFormHeight =

  const signUpformStyle = loginSection.getComputedStyle(signUpForm)
  const innerMargin = parseFloat(signUpformStyle.marginTop) +
    parseFloat(signUpformStyle.marginBottom)
  // console.log(innerMargin)
  const styles: any = window.getComputedStyle(loginSection)
  const margin: any = parseFloat(styles.marginTop) +
    parseFloat(styles.marginBottom)
  const tl = new TimelineMax({ paused: true })

  // tl.addLabel('start')
  //   .set(loginSection, { height: loginSection.offsetHeight })
  //   .set(signUpForm, { opacity: 0, x: 50 })
  //   .to(loginSection, 0.7, { height: Math.ceil((loginSection.offsetHeight + margin) + (signUpForm.offsetHeight + margin)) + 'px', ease: Power4.easeOut }, 'start')
  //   .to(signUpForm, 0.7, { opacity: 1, x: 0, ease: Power4.easeOut }, 'start+=0.4')
  return tl
}

export default SignUpFormAnim
