import { TimelineMax, Power4, Expo } from 'gsap/all'
const MobileMenu = (element: any) => {
  const items = Array.from(element.querySelectorAll('.menu-link'))
  const wishlistItem = Array.from(element.querySelectorAll('.f-item'))
  const currency = element.querySelectorAll('.currency')
  const searchForm = element.querySelector('.type-form')
  const tl = new TimelineMax({ paused: true })
  tl.addLabel('start')
    .set(element, { xPercent: -110 })
    .set(wishlistItem, { y: 15, visibility: 'hidden', autoAlpha: 0 })
    .set(currency, { y: 15, visibility: 'hidden', autoAlpha: 0 })
    .set(items, { x: -100, autoAlpha: 0 })
    .to(element, 1, { xPercent: 0, ease: Power4.easeInOut }, 'start')
    .staggerTo(wishlistItem, 1, { y: 0, visibility: 'visible', autoAlpha: 1, ease: Expo.easeOut, transformOrigin: '100% 0%' }, 0.01, 'start+=1.1')
    .to(currency, 1, { y: 0, visibility: 'visible', autoAlpha: 1, ease: Expo.easeOut, transformOrigin: '100% 0%' }, 'start+=1.1')
    .staggerTo(items, 1, {
      x: 0,
      autoAlpha: 1,
      transformOrigin: '100% 0%',
      ease: Power4.easeOut
    }, 0.04, 'start+=0.7')
  return tl
}

export default MobileMenu
