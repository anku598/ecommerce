import { TimelineMax, Power4, Expo, TweenMax } from 'gsap'

const LoaderLeave = () => {
  const Loader: any = document.querySelector('.loader')
  const introSmallLine: any = document.querySelector('.intro-small-line')
  const introLine: any = document.querySelector('.intro-line')
  const introLeft: any = document.querySelector('.intro-left')
  const introRight: any = document.querySelector('.intro-right')
  const introLeftLogo: any = document.querySelector('.intro-left-inner .left-logo img')
  const introRightLogo: any = document.querySelector(
    '.intro-right-inner .right-logo img'
  )

  const tl = new TimelineMax({})

  tl
    .set(
      introLeft,
      {
        x: 0
      },
      'start'
    )
    .set(
      introRight,
      {
        x: 0
      },
      'start'
    )
    .to(
      introSmallLine,
      0.4,
      {
        opacity: 0,
        ease: Power4.easeOut
      },
      'start+=1.3'
    )
    .to(
      introLine,
      0.4,
      {
        opacity: 0,
        ease: Power4.easeOut
      },
      'start+=1.3'
    )
    .to(
      introLeftLogo,
      0.4,
      { opacity: 0, ease: Power4.easeOut },
      'start+=1.3'
    )
    .to(
      introRightLogo,
      0.4,
      { opacity: 0, ease: Power4.easeOut },
      'start+=1.3'
    )
    .to(
      introLeft,
      2,
      {
        x: '-150%',

        ease: Power4.easeOut
      },
      'start+=1.5'
    )
    .to(
      introRight,
      2,
      {
        x: '150%',
        ease: Power4.easeOut
      },
      'start+=1.5'
    )
    .to(
      Loader,
      0.2,
      {
        display: 'none'
      },
      'start+=2.2'
    )
  return tl
}

export default LoaderLeave
