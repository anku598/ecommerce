import { TimelineMax, Power4, Expo, TweenMax } from 'gsap'

const LoaderEnter = () => {
  const introSmallLine: any = document.querySelector('.intro-small-line')
  const initialLoaderScreen: any = document.querySelector('.initial-loader-screen')
  const introLine: any = document.querySelector('.intro-line')
  const introLeftLogo: any = document.querySelector('.left-logo')
  const introRightLogo: any = document.querySelector(
    '.right-logo'
  )

  const tl = new TimelineMax({})

  tl.set(initialLoaderScreen, { visibility: 'visible' })
    .set(
      introSmallLine,
      {
        scale: 0,
        visibility: 'hidden'
      }
    )
    .set(introLeftLogo, { x: 200 }, 'start')
    .set(introRightLogo, { x: -200 }, 'start')
    .set(
      introLine,
      {
        scale: 0,
        visibility: 'hidden'
      }

    )
    .to(initialLoaderScreen, 0.8, { visibility: 'hidden' }, 'start+=0.1')
    .to(
      introLine,
      0.8,
      {
        scale: 1,
        transformOrigin: 'center center',
        visibility: 'visible',
        ease: Power4.easeOut
      },
      'start+=0.2'
    )
    .to(
      introSmallLine,
      0.8,
      {
        scale: 1,
        transformOrigin: '50% 50%',
        visibility: 'visible',
        ease: Power4.easeOut
      },
      'start+=0.1'
    )
    .to(
      introLeftLogo,
      0.8,
      { x: 84, transformOrigin: 'center center', ease: Power4.easeOut },
      'start+=0.12'
    )
    .to(
      introRightLogo,
      0.8,
      { x: -106, transformOrigin: 'center center', ease: Power4.easeOut },
      'start+=0.12'
    )
  return tl
}

export default LoaderEnter
