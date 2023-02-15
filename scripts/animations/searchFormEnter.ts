import { TimelineMax, Power4, Expo, Sine } from 'gsap'

const searchFormEnter = () => {
  const searchResultWrapper: any = document.querySelector('.search-result')
  const productsWrapper: any = document.querySelector('.products-wrapper')
  const resetText: any = document.querySelector('.reset-text')
  const tl = new TimelineMax({ pasued: true })
    .set(searchResultWrapper, { scaleY: 0 }, 'start')
    .set(productsWrapper, { y: 50, opacity: 0 }, 'start')
    .set(resetText, { opacity: 0, y: 10 }, 'start')
    .to(searchResultWrapper, 0.7, { scaleY: 1, transformOrigin: 'left top', ease: Power4.easeInOut }, 'start+=0.001')
    .to(resetText, 0.7, { y: 0, opacity: 1, ease: Power4.easeOut }, 'start+=0.5')
    .to(productsWrapper, 1, { y: 0, opacity: 1, ease: Power4.easeOut }, 'start+=0.5')
  return tl
}

export default searchFormEnter
