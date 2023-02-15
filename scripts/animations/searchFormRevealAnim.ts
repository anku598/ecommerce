import { TimelineMax, Power4, Expo } from 'gsap'

const searchFormRevealAnim = () => {
  const searchForm: any = document.querySelector('.search-form')
  const tl = new TimelineMax({ paused: true })
    .set(searchForm, { y: -123, visibility: 'hidden' }, 'start')
    .to(searchForm, 0.8, { y: 0, ease: Power4.easeOut, visibility: 'visible' }, 'start+=0.001')
  return tl
}

export default searchFormRevealAnim
