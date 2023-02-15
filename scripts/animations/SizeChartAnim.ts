import { TimelineMax, Power4, Expo } from 'gsap'

const SizeChartAnim = () => {
  const sizeDetails: any = document.querySelector('.size-content-section')
  const sizeChart: any = document.querySelector('.size-details')

  const tl = new TimelineMax({ paused: true })
  tl
    .set(sizeChart, { scaleY: 0 }, 'start')
    .set(sizeDetails, { opacity: 0, y: 50 }, 'start')
    .to(sizeChart, 0.7, { scaleY: 1, transformOrigin: 'left top', ease: Power4.easeInOut }, 'start+=0.001')
    .to(sizeDetails, 0.7, { opacity: 1, y: 0, ease: Power4.easeOut }, 'start+=0.8')
  return tl
}

export default SizeChartAnim
